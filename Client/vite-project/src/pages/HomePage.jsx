import React from "react";
import { Button, Typography, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

const HomePage = () => {
  const Navigate = useNavigate();

  const handleGetStartedClick = () => {
    Navigate("/login");
  };

  return (
    <div className="homepage-container">
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col>
          <Title
            level={1}
            style={{
              textAlign: "center",
              color: "#fff",
              fontSize: "3rem",
              marginBottom: "20px",
              textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)", // Add shadow to text
            }}
          >
            Welcome to FAMS!
          </Title>
          <Button
            type="primary"
            size="large"
            block
            onClick={handleGetStartedClick}
            style={{
              backgroundColor: "#ffb703",
              border: "none",
              color: "#fff",
              fontSize: "1.2rem",
              borderRadius: "8px",
              padding: "15px 30px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            Get Started
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
