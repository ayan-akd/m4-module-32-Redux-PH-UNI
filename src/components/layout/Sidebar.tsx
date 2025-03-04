import { Menu, Layout } from "antd";
const { Sider } = Layout;
import { sidebarItemGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppSelector } from "@/redux/hook";
import { TUser, useCurrentToken } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { ItemType, MenuItemType } from "antd/es/menu/interface";

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

export default function Sidebar() {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }

  let sidebarItems: ItemType<MenuItemType>[] | undefined;
  switch (user?.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemGenerator(adminPaths, userRole.ADMIN) as ItemType<MenuItemType>[];
      break;
    case userRole.FACULTY:
      sidebarItems = sidebarItemGenerator(facultyPaths, userRole.FACULTY) as ItemType<MenuItemType>[];
      break;
    case userRole.STUDENT:
      sidebarItems = sidebarItemGenerator(studentPaths, userRole.STUDENT) as ItemType<MenuItemType>[];
      break;
    default:
      sidebarItems = undefined;
      break;
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
      }}
    >
      <div
        style={{
          color: "white",
          textAlign: "center",
          height: "4rem",
          lineHeight: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>PH Uni</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
}
