import axios from "axios"; // Thư viện axios để gọi API
import React, { useEffect, useState } from "react";

const Hero = () => {
  const [siteSettings, setSiteSettings] = useState(null); // Để lưu trữ dữ liệu từ API
  const [loading, setLoading] = useState(true); // Để kiểm soát trạng thái loading

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
    <div
      className="min-h-screen bg-cover"
      style={{ backgroundImage: `url(${siteSettings.imgBanner1})` }}
    >
      <div className="min-h-screen flex justify-start pl-11 items-center text-white bg-black bg-opacity-60">
        <div>
          <div className="space-y-4">
            <h3 className="md:text-4xl text-2xl">{siteSettings.h3Banner1}</h3>
            <h1 className="md:text-7xl text-4xl font-bold">
              {siteSettings.h1Banner1}
            </h1>
            <div className="md:w-1/2">
              <p>{siteSettings.pBanner1}</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-5 py-2 rounded-lg bg-blue-600 text-white font-bold uppercase hover:bg-blue-700 w-auto">
                Join Today
              </button>
              <button className="px-5 py-2 rounded-lg border bg-transparent hover:bg-secondary border-gray-400 text-gray-700 font-bold uppercase hover:border-gray-600 w-auto">
                View Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
