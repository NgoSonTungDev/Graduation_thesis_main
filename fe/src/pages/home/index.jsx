import React, { useEffect } from "react";
import { userApi } from "../../api/auther";

const Home = () => {
  const fetchData = async () => {
    await userApi.getUser().then((res) => {
      alert("thanh cong");
      console.log(res);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>abcxyz</div>;
};

export default Home;
