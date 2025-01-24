import StudentDashboard from "../pages/student/StudentDashboard";
import OfferedCourses from "@/pages/admin/courseManagement/OfferedCourses";

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
  }
];
