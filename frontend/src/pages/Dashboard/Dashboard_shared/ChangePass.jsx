import { useState } from "react";
import useAxiosSecure from "../../../hooks/useUser";

const ChangePass = () => {
  const [user, setUser] = useState(null);
  const { currentUser } = useAxiosSecure();
  // console.log("data nhận được: ", currentUser); // Log giá trị của currentUser

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu có khớp không
    if (form.newPassword !== form.confirmPassword) {
      setError("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    console.log("Dữ liệu gửi lên: ", {
      email: currentUser?.email, // email người dùng
      oldPassword: form.oldPassword, // mật khẩu cũ
      newPassword: form.newPassword, // mật khẩu mới
    });

    try {
      const response = await fetch("http://localhost:3000/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: currentUser?.email,
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        }),
      });

      const data = await response.json();
      // console.log(data);
      if (!response.ok) {
        setError(data.message);
      } else {
        alert("Đổi mật khẩu thành công!");
        setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
        setError("");
      }
    } catch (err) {
      setError("Lỗi kết nối đến server.");
    }
  };

  return (
    <div>
      <h1 className="text-center text-4xl font-bold my-7">
        Change <span className="text-secondary">Password</span>
      </h1>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="bg-white shadow-2xl rounded-lg p-10 relative w-max max-w-screen-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
            Đổi Mật Khẩu
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="oldPassword"
              >
                Mật khẩu hiện tại
              </label>
              <input
                type="password"
                name="oldPassword"
                value={form.oldPassword}
                onChange={(e) =>
                  setForm({ ...form, oldPassword: e.target.value })
                }
                required
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="newPassword"
              >
                Mật khẩu mới
              </label>
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
                required
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="confirmPassword"
              >
                Xác nhận mật khẩu mới
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                required
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-500"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition duration-200"
            >
              Đổi mật khẩu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePass;
