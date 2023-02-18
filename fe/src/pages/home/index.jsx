import React, { useEffect } from "react";
import { userApi } from "../../api/auther";
import { momentLocale } from "../../utils/common";

const Home = () => {
  const fetchData = async () => {
    // không cần check truong hop thành công

    // const data = userApi.getUser();
    // console.log(data);

    // khi thành công thi làm việc tiêp theo

    await userApi.getUser().then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>{momentLocale(1676701905107)}</div>;
};

export default Home;
