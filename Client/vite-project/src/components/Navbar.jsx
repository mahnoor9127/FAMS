import React from "react";
import { UserOutlined, AppstoreOutlined } from "@ant-design/icons/lib/icons";
import { Menu } from "antd";

const Navbar = () => {
  const items = [
    {
      key: "sub1",
      icon: <UserOutlined />,
      label: "Users",
      children: [
        {
          key: "1",
          label: "List all users Users",
        },
        {
          key: "2",
          label: "Create Users",
        },
        {
          key: "3",
          label: "Edit Users",
        },
        {
          key: "4",
          label: "Delete Users",
        },
      ],
    },
    {
      key: "sub2",
      icon: <AppstoreOutlined />,
      label: "Products",
      children: [
        {
          key: "5",
          label: "List all products",
        },
        {
          key: "6",
          label: "Create Products",
        },
        {
          key: "7",
          label: "Delete Products",
        },
        {
          key: "8",
          label: "Edit Products",
        },
      ],
    },
  ];

  const onClick = (e) => {
    console.log("click", e);
  };
  return (
    <>
      <Menu
        onClick={onClick}
        style={{
          width: 256,
          height: 600,
        }}
        mode="vertical"
        items={items}
      />
    </>
  );
};

export default Navbar;
