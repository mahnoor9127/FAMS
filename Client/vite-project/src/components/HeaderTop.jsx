import { React, useContext } from "react";
import { Button, Layout, Typography } from "antd";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const { Title } = Typography;

const HeaderTop = () => {
  const navigate = useNavigate();
  const { setIsLoggedin } = useContext(AppContext);

  const handleLogout = () => {
    toast.success("Logged Out Successfully!");

    setIsLoggedin(false);
    navigate("/login");
  };
  return (
    <Header
      style={{
        background: "black",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
      }}
    >
      <Title
        level={2}
        style={{
          textAlign: "center",
          color: "white",
          margin: 0,
          textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
          flex: 1,
        }}
      >
        Welcome!
      </Title>

      <Button
        type="primary"
        danger
        size="middle"
        style={{
          backgroundColor: "white",

          color: "black",
        }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Header>
  );
};

export default HeaderTop;
