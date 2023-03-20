import React from "react";
import MenuSaleAgent from "../../../components/navbar_sale_agent";

const TicketSaleAgent = () => {
  const renderForm = () => {
    return (
      <div>
        <p>tung</p>
      </div>
    );
  };

  return (
    <div>
      <MenuSaleAgent ReactNode={renderForm()} />
    </div>
  );
};

export default TicketSaleAgent;
