import React from "react";
import SidebarAdmin from "../../../components/narbar_admin";
import "./style.scss";

const renderForm = () => {
  return (
    <>
      <div>heelo0</div>
    </>
  );
};

const AdminMessage = () => {
  return (
    <div>
      <SidebarAdmin ReactNode={renderForm()} />
    </div>
  );
};

export default AdminMessage;
