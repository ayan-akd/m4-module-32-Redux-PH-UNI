import MySchedule from "@/pages/student/MySchedule";
import StudentDashboard from "../pages/student/StudentDashboard";
import OfferedCourses from "@/pages/student/OfferedCourses";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Offered Courses",
    path: "offered-courses",
    element: <OfferedCourses />,
  },
  {
    name: "My Schedule",
    path: "my-schedule",
    element: <MySchedule />,
  },
];
