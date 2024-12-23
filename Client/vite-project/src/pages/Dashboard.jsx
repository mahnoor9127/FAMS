import { React } from "react";

import { Layout } from "antd";

import HeaderTop from "../components/HeaderTop";
import SidebarLeft from "../components/SidebarLeft";
import MainContent from "../components/MainContent";
import FooterBottom from "../components/FooterBottom";

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderTop />

      <Layout>
        <SidebarLeft />

        <Layout style={{ padding: "0 24px 24px", backgroundColor: "white" }}>
          <MainContent />
        </Layout>
      </Layout>

      <FooterBottom />
    </Layout>
  );
};

export default Dashboard;
