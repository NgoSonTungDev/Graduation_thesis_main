import { Button } from "@mui/material";
import React, { useEffect } from "react";
import axiosClient from "../../../api/axiosClient";
import LoadingBar from "../../../components/loadding/loading_bar";
import MenuSaleAgent from "../../../components/navbar_sale_agent";
import { toastify } from "../../../utils/common";
import { getUserDataLocalStorage } from "../../../utils/localstorage";
import ModalAddTicket from "./modal_add_ticket";
import "./style.scss";
import TableTicket from "./table_ticket";

const TicketSaleAgent = () => {
  const [openModalAddTicket, setOpenModalAddTicket] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const userIdStorage = getUserDataLocalStorage();

  const handleUpdateData = (id, value) => {
    const index = data.findIndex((e) => e._id === id);
    if (index !== -1) {
      data.splice(index, 1, {
        ...data[index],
        childTicket: value.childTicket,
        adultTicket: value.adultTicket,
        numberTickets: value.numberTickets,
      });
    }
  };

  const handleDeleteData = (id) => {
    setData(
      data.filter((item) => {
        return item._id !== id;
      })
    );
  };

  const handleClickOpenModalAddTicket = () => {
    setOpenModalAddTicket(true);
  };

  const handleCloseModalAddTicket = () => {
    setOpenModalAddTicket(false);
  };

  const fetchData = (url) => {
    setLoading(true);
    axiosClient
      .get(`/ticket/get-by-id-sale-agent/${userIdStorage._id}`)
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toastify("error", err.response.data.message || "Lỗi hệ thông !");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderForm = () => {
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <Button
          variant="outlined"
          style={{ marginTop: "10px" }}
          onClick={handleClickOpenModalAddTicket}
        >
          Thêm vé
        </Button>
        {loading ? (
          <LoadingBar />
        ) : (
          <div className="box_table">
            <TableTicket
              data={data}
              updateData={handleUpdateData}
              deleteData={handleDeleteData}
            />
          </div>
        )}
        <ModalAddTicket
          open={openModalAddTicket}
          handleClose={handleCloseModalAddTicket}
          callBackApi={fetchData}
        />
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
