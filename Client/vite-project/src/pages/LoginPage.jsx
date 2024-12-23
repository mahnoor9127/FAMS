import { Form, Input, Button, Typography, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons/lib/icons";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const { Text, Title } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin } = useContext(AppContext);

  const [rememberMe, setRememberMe] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const rememberedName = localStorage.getItem("rememberedName");
    const rememberedPassword = localStorage.getItem("rememberedPassword");

    if (rememberedName && rememberedPassword) {
      form.setFieldsValue({
        name: rememberedName,
        password: rememberedPassword,
      });
      setRememberMe(true);
    }
  }, [form]);

  const onFinish = async (values) => {
    try {
      console.log(values);
      console.log(backendUrl);
      const { data } = await axios.post(backendUrl + "/api/auth/login", values);
      setIsLoggedin(true);

      if (data.success) {
        if (rememberMe) {
          localStorage.setItem("rememberedName", values.name);
          localStorage.setItem("rememberedPassword", values.password);
        } else {
          localStorage.removeItem("rememberedName", values.name);
          localStorage.removeItem("rememberedPassword", values.password);
        }

        toast.success("Login Successful!");
        console.log(data);
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onFinishFailed = async (err) => {
    console.error("Validation failed:", err);
    toast.error("Validation error. Please check your inputs.");
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <Title
          level={2}
          style={{
            textAlign: "Center",
            marginBottom: "20px",
          }}
        >
          Login To Your Account
        </Title>

        <Form
          form={form}
          name="login"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="name"
            rules={[{ required: true, message: "Please Enter Your Username" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter Username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please Enter Your Password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter Password"
            />
          </Form.Item>

          <Form.Item>
            <Checkbox
              checked={rememberMe}
              onChange={(e) => {
                setRememberMe(e.target.checked);
              }}
            >
              Remember Me
            </Checkbox>
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
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="register-link">
          <Text>Don't have an account?</Text>
          <a onClick={handleRegisterClick}>Register</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
