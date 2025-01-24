import { useGetAllEnrolledCoursesQuery } from "@/redux/features/student/studentCourseManagement.api";

export default function MySchedule() {
    const { data } = useGetAllEnrolledCoursesQuery(undefined);
    console.log(data);
    return (
        <div>
            {
                data?.data?.map((item)=>{
                    return (
                        <div key={item._id}>
                            <h1>{item.course.title}</h1>
                            <h1>{item.offeredCourse.section}</h1>
                            <h1>{item.offeredCourse.days.join(", ")}</h1>
                        </div>
                    )
                })
            }
        </div>
    );
}