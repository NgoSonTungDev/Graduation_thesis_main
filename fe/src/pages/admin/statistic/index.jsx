import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React from "react";
import SidebarAdmin from "../../../components/narbar_admin";
import { Box } from "@mui/material";
import ChartStatisticDay from "./chart_statistic_day";

const Statistic = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const renderForm = () => {
    return (
      <Box sx={{ width: "100%", height: "100vh", overflow: "hidden" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Thống kê theo ngày" value="1" />
              <Tab label="Thống kê theo khoảng thời gian" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div style={{ width: "100%", height: "85vh" }}>
              <ChartStatisticDay />
            </div>
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
        </TabContext>
      </Box>
    );
  };

  //   const fetchData = (url) => {
  //     axiosClient
  //       .get(url)
  //       .then((res) => {
  //         console.log(res.data.data);
  //         setData(res.data.data);
  //       })
  //       .catch((err) => {
  //         toastify("error", err.response.data.message || "Lỗi hệ thông !");
  //       });
  //   };

  //   useEffect(() => {
  //     let url = `/statistic/general-statistics`;
  //     fetchData(url);
  //   }, []);

  return (
    <div>
      <SidebarAdmin ReactNode={renderForm()} />
    </div>
  );
};

export default Statistic;
