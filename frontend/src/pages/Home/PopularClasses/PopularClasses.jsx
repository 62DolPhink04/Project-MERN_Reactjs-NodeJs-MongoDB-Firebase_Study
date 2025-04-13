import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import Card from "./Card";

import axios from "axios"; // Thư viện axios để gọi API

const PopularClasses = () => {
  const axiosFetch = useAxiosFetch();
  const [classes, setClasses] = useState([]);
  const [siteSettings, setSiteSettings] = useState(null); // Để lưu trữ dữ liệu từ API
  const [loading, setLoading] = useState(true); // Để kiểm soát trạng thái loading

  useEffect(() => {
    const fetchClasses = async () => {
      const reponse = await axiosFetch.get("/classes");
      console.log(reponse);
      setClasses(reponse.data);
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    // Lấy dữ liệu từ API khi component được render lần đầu tiên
    axios
      .get("http://localhost:3000/site-settings")
      .then((response) => {
        setSiteSettings(response.data); // Cập nhật dữ liệu vào state
        setLoading(false); // Thay đổi trạng thái loading sau khi có dữ liệu
      })
      .catch((error) => {
        console.error("Có lỗi khi lấy dữ liệu:", error);
        setLoading(false); // Dù có lỗi cũng phải set loading là false
      });
  }, []); // []

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (!siteSettings) {
    return <div>Lỗi khi lấy dữ liệu.</div>;
  }

  return (
    <div className="md:w-[80% mx-auto my-36]">
      <h1 className="text-5xl font-bold text-center">
        Our <span className="text-secondary">Popular</span> Classes
      </h1>
      <div className="w-[40%] text-center mx-auto my-4">
        <p className="text-gray-500">{siteSettings.titlePopularClasses} </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  );
};
export default PopularClasses;
