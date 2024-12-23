import { useContext, React } from "react";
import { Layout } from "antd";
const { Content } = Layout;

import UserTable from "../components/UserTable";
import ProductTable from "./ProductTable";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const MainContent = () => {
  const navigate = useNavigate();
  const { selectedPage } = useContext(AppContext);
  console.log(selectedPage);
  return (
    <Content
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
        background: "#fff",
      }}
    >
      {selectedPage === "Users" ? (
        <UserTable></UserTable>
      ) : (
        <ProductTable></ProductTable>
      )}
    </Content>
  );
};

export default MainContent;
