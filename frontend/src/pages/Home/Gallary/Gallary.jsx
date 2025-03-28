import React from "react";
import img1 from "../../../assets/gallary/image1.png";
import img2 from "../../../assets/gallary/image2.png";
import img3 from "../../../assets/gallary/image3.png";
import img4 from "../../../assets/gallary/image4.png";
import img5 from "../../../assets/gallary/image5.png";

const Gallary = () => {
  return (
    <div className="md:w-[80%] mx-auto my-28">
      <div>
        <h1 className="text-5xl font-bold text-center mb-8">Our Gallary</h1>
      </div>

      {/* show img container */}
      <div className="md:grid grid-cols-2 items-center justify-center gap-4">
        <div className="mb-4 md:mb-0">
          <img
            src={img3}
            alt=""
            className="md:h-[720px] w-full mx-auto rounded-sm"
          />
        </div>
        <div className="gap-4 grid grid-cols-2 items-start">
          <div>
            <img src={img1} alt="" className="md:h-[350px] rounded-sm" />
          </div>
          <div>
            <img src={img2} alt="" className="md:h-[350px] rounded-sm" />
          </div>
          <div>
            <img src={img4} alt="" className="md:h-[350px] rounded-sm" />
          </div>
          <div>
            <img src={img5} alt="" className="md:h-[350px] rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Gallary;
