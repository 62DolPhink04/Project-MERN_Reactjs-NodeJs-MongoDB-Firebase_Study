// import { updatePassword } from "firebase/auth";
// import { useState } from "react";
// import useAuth from "../../../hooks/useAuth";

// import useAxiosSecure from "../../../hooks/useUser";

// const ChangePass = () => {
//   const { currentUser } = useAxiosSecure();
//   const auth = useAuth();
//   const user = auth.currentUser;
//   const [form, setForm] = useState({
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   updatePassword(user, form.newPassword)
//     .then(() => {
//       console.log("Firebase password updated!");
//     })
//     .catch((error) => {
//       console.error(error);
//     });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (form.newPassword !== form.confirmPassword) {
//       setError("Mật khẩu mới và xác nhận mật khẩu không khớp.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:3000/change-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: currentUser?.email,
//           oldPassword: form.oldPassword,
//           newPassword: form.newPassword,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.message || "Có lỗi xảy ra.");
//       } else {
//         alert("Đổi mật khẩu thành công!");
//         setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
//       }
//     } catch (err) {
//       setError("Lỗi kết nối đến server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center items-center min-h-screen">
//       <h1 className="text-center text-4xl font-bold my-7">
//         Change <span className="text-secondary">Password</span>
//       </h1>
//       <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
//         <div>
//           <label className="block mb-1">Mật khẩu cũ</label>
//           <input
//             type="password"
//             name="oldPassword"
//             value={form.oldPassword}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Mật khẩu mới</label>
//           <input
//             type="password"
//             name="newPassword"
//             value={form.newPassword}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Xác nhận mật khẩu mới</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             value={form.confirmPassword}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         {error && <p className="text-red-500">{error}</p>}

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50"
//           disabled={loading}
//         >
//           {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChangePass;

import { updatePassword } from "firebase/auth";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useUser";

const ChangePass = () => {
  const { currentUser } = useAxiosSecure(); // Đây là user từ MongoDB
  const auth = useAuth(); // Đây là Firebase Auth
  const user = auth.currentUser;

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Reset lỗi khi user nhập
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.newPassword !== form.confirmPassword) {
      setError("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    setLoading(true);

    try {
      if (user && user.providerData[0]?.providerId === "google.com") {
        // ✅ Nếu dùng Google Firebase
        await updatePassword(user, form.newPassword);
        alert("Đổi mật khẩu Firebase thành công!");
      } else {
        // ✅ Nếu dùng MongoDB (local auth)
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

        if (!response.ok) {
          throw new Error(data.message || "Có lỗi xảy ra khi đổi mật khẩu.");
        }

        alert("Đổi mật khẩu thành công!");
      }

      // Reset form sau khi đổi thành công
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error(err);
      setError(err.message || "Lỗi không xác định.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-center text-4xl font-bold my-7">
        Change <span className="text-secondary">Password</span>
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Old Password
          </label>
          <input
            type="password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loading ? "Loading..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePass;
