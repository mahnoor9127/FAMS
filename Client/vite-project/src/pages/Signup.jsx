import { Form, Input, Button, Typography } from "antd";
import React from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons/lib/icons";
import { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const { Title } = Typography;

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { backendUrl } = useContext(AppContext);

  const onFinish = async (values) => {
    const { data } = await axios.post(
      backendUrl + "/api/auth/signup",
      {
        name,
        password,
      },
      { withCredentials: true }
    );
    toast.success("Successfully Signed Up!");

    if (data.success) {
      navigate("/login");
    } else {
      toast.error(data.message);
    }
  };
  const onFinishFailed = async (values) => {
    toast.error(data.message);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
          Create Your Account
        </Title>
        <Form
          name="signup"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="name"
            rules={[
              { required: "true", message: "Please Enter Your Username" },
            ]}
          >
            <Input
              placeholder="Enter Username"
              prefix={<UserOutlined />}
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please Enter Your Password" }]}
          >
            <Input.Password
              placeholder="Enter Password"
              prefix={<LockOutlined />}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </Form.Item>

          <Form.Item>
            <Button
              style={{
                backgroundColor: "black",
                border: "none",
                color: "#fff",
              }}
              htmlType="submit"
              block
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
