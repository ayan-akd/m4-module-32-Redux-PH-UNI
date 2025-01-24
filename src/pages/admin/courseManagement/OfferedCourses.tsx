import {
  useEnrollCourseMutation,
  useGetAllOfferedCoursesQuery,
} from "@/redux/features/student/studentCourseManagement.api";
import { TResponse } from "@/types";
import { Button, Row, Col, Card, Typography, Space, Flex } from "antd";
import { toast } from "sonner";

const { Title, Text } = Typography;

export default function OfferedCourses() {
  const { data: offeredCourseData } = useGetAllOfferedCoursesQuery(undefined);
  const [enroll] = useEnrollCourseMutation();
  const singleObject = offeredCourseData?.data?.result?.reduce((acc, item) => {
    const key = item?.course?.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] };
    acc[key].sections.push({
      section: item?.section,
      _id: item?._id,
      startTime: item?.startTime,
      endTime: item?.endTime,
      days: item?.days,
    });
    return acc;
  }, {});
  const modifiedData = Object.values(singleObject ? singleObject : {});

  const handleEnroll = async (id: string) => {
    const toastId = toast.success("Enrolling.....");
    const enrollData = {
      offeredCourse: id,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await enroll(enrollData) as TResponse<any>;
    if (res.data) {
      toast.success("Enrolled Successfully", {
        id: toastId,
      });
    } else if (res.error) {
      toast.error(res.error.data.message, {
        id: toastId,
      });
    }
  };

  if(modifiedData?.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <h1>No Courses Found</h1>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Row gutter={[16, 16]}>
        {modifiedData?.map((item) => (
          <Col key={item.courseTitle} xs={24} lg={12}>
            <Card>
              <Title level={4}>{item.courseTitle}</Title>
              <Row gutter={[16, 16]}>
                {item.sections?.map((section) => (
                  <Col key={section._id} span={24}>
                    <Card type="inner">
                      <Space direction="vertical" size="small">
                        <Flex gap="small" align="center">
                          <Text strong>Section:</Text>
                          <Text>{section.section}</Text>
                        </Flex>
                        <Flex gap="small" align="center">
                          <Text strong>Time:</Text>
                          <Text>
                            {section.startTime} - {section.endTime}
                          </Text>
                        </Flex>
                        <Flex gap="small" align="center">
                          <Text strong>Days:</Text>
                          <Text>{section.days.join(", ")}</Text>
                        </Flex>
                        <Button
                          onClick={() => handleEnroll(section._id)}
                          type="primary"
                        >
                          Enroll
                        </Button>
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
