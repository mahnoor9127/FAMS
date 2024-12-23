import { React, useContext } from "react";
import { UserOutlined, AppstoreOutlined } from "@ant-design/icons/lib/icons";
import { Menu, Layout } from "antd";
const { Sider } = Layout;
import { AppContext } from "../context/AppContext";

const SidebarLeft = () => {
  const { setSelectedPage } = useContext(AppContext);
  return (
    <Sider width={200} className="site-layout-background">
      <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
        <Menu.Item
          style={{ backgroundColor: "black", color: "white" }}
          key="1"
          icon={<UserOutlined />}
          onClick={() => {
            setSelectedPage("Users");
          }}
        >
          Users
        </Menu.Item>
        <Menu.Item
          style={{ backgroundColor: "black", color: "white" }}
          key="2"
          icon={<AppstoreOutlined />}
          onClick={() => {
            setSelectedPage("Products");
          }}
        >
          Products
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SidebarLeft;
