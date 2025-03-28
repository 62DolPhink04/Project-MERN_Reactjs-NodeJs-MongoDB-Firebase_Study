import moment from "moment";
import React, { useEffect, useState } from "react";
import { FiDollarSign } from "react-icons/fi";
import { MdDeleteSweep } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";

// import { useUser } from

const SelectedClass = () => {
  const { currentUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [page, setPage] = useState(1);
  const itemPerPage = 5;
  const totalPage = Math.ceil(classes.length / itemPerPage);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/cart/${currentUser?.email}`)
      .then((res) => {
        setClasses(res.data);
        // setPaginatedData(res.data.slice(0, itemPerPage));
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // tính  tiền tổng cart
  const totalPrice = classes.reduce(
    (total, item) => total + parseInt(item.price),
    0
  );
  // tính tổng thuế
  const totalTax = totalPage * 0.01;

  // tính tiền thực
  const price = totalPrice + totalTax;

  // sự kiện nút xóa Item cart
  const hanleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/delete-cart-item/${id}`)
          .then((res) => {
            // console.log("API Response:", res);
            if (res.data.deleteCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              }).then(() => {
                // Reload lại trang sau khi xóa thành công
                window.location.reload();
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  // sự kiện nút thanh toán
  const handlePayment = (id) => {
    // console.log(id);

    const classesArray = Object.values(classes);
    const item = classesArray.find((item) => item._id === id);
    const price = item.price;
    console.log(price);
    navigate("/dashboard/user/payment", {
      state: { price: price, itemId: id },
    });
  };

  return (
    <div>
      <div className="my-6">
        <h1 className="text-4xl text-center font-bold">
          My <span className="text-secondary">Select</span> Class
        </h1>
      </div>

      <div className="h-screen py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
          <div className="flex flex-col md:flex-row gap-4 ">
            {/* left div  */}
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">#</th>
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-left font-semibold">Price</th>
                      <th className="text-left font-semibold">Date</th>
                      <th className="text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center text-2xl font-bold"
                        >
                          No Classes
                        </td>
                      </tr>
                    ) : (
                      classes.map((item, index) => {
                        const letindex = (page - 1) * itemPerPage + index + 1;
                        return (
                          <tr key={item._id}>
                            <td className="py-4">{letindex}</td>
                            <td className="py-4">
                              <div className="flex items-center">
                                <img
                                  src={item.image}
                                  alt=""
                                  className="h-16 w-16 mr-4"
                                />
                                <span>{item.name}</span>
                              </div>
                            </td>
                            <td className="py-4">{item.price}</td>
                            <td className="py-4">
                              <p className="text-green-700 text-sm">
                                {moment(item.submited).format("MMMM Do YYYY")}
                              </p>
                            </td>
                            <td className="py-4 flex pt-8 gap-2">
                              <button
                                onClick={() => hanleDelete(item._id)}
                                className="px-3 py-1 cursor-pointer bg-red-500 rounded-3xl text-white font-bold"
                              >
                                <MdDeleteSweep />
                              </button>
                              <button
                                onClick={() => handlePayment(item._id)}
                                className="px-3 py-1 cursor-pointer bg-green-500 rounded-3xl text-white font-bold flex items-center"
                              >
                                <FiDollarSign className="mr-2" />
                                Pay
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* right div  */}
            <div className="md:w-1/5 fixed right-3 ">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes</span>
                  <span>${totalTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Extra Fees</span>
                  <span>$0</span>
                </div>
                <hr className="my-2 " />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${price.toFixed(2)}</span>
                </div>
                <button
                  disabled={price <= 0}
                  onClick={() =>
                    navigate("/dashboard/user/payment", {
                      state: { price: price, itemId: null },
                    })
                  }
                  className="bg-secondary text-white py-2 px-4 rounded-lg mt-4 w-full"
                >
                  CheckOut
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedClass;
