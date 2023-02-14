import React, { useEffect } from "react";
import { userApi } from "../../api/auther";

const Home = () => {
  const fetchData = async () => {
    // không cần check truong hop thành công

    // const data = userApi.getUser();
    // console.log(data);

    // khi thành công thi làm việc tiêp theo

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
