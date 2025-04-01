import axios from "axios";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Import Firebase
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const GoogleLogin = () => {
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  const googleLogin = () => {
    const auth = getAuth(); // Lấy đối tượng auth từ Firebase
    const provider = new GoogleAuthProvider(); // Khởi tạo GoogleAuthProvider

    // Đăng nhập bằng popup của Google
    return signInWithPopup(auth, provider)
      .then((result) => {
        // Nếu đăng nhập thành công, trả về đối tượng user
        const user = result.user;
        return user; // Trả về user
      })
      .catch((error) => {
        // Nếu có lỗi xảy ra, throw lỗi
        console.error("Google login error:", error);
        throw error;
      });
  };

  const handleLogin = () => {
    googleLogin()
      .then((user) => {
        // Kiểm tra xem user có tồn tại không
        if (user) {
          console.log(user);

          const userImp = {
            name: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL,
            role: "user",
            gender: "Is not specified",
            address: "Is not specified",
            phone: "Is not specified",
          };

          // Đảm bảo rằng user có email và displayName trước khi gửi yêu cầu
          if (user.email && user.displayName) {
            return axios
              .post("http://localhost:3000/new-user", userImp)
              .then(() => {
                navigate("/"); // Điều hướng về trang chủ sau khi đăng ký thành công
                alert("Đăng ký thành công!");
              })
              .catch((error) => {
                console.error("Error during registration:", error);
                alert(
                  `Đã có lỗi xảy ra khi đăng ký người dùng: ${
                    error.message || error
                  }`
                );
              });
          }
        } else {
          console.error("Google login error: user is undefined");
          alert("Đã có lỗi xảy ra khi đăng nhập với Google. Vui lòng thử lại.");
        }
      })
      .catch((error) => {
        console.error("Google login error:", error);
        alert(
          `Đã có lỗi xảy ra khi đăng nhập với Google: ${error.message || error}`
        );
      });
  };

  return (
    <div className="flex items-center justify-center my-3">
      <button
        onClick={handleLogin}
        className="flex items-center justify-center outline-none bg-white border-gray-300 rounded-lg shadow-md px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none w-auto"
      >
        <FcGoogle className="h-6 w-6 mr-2" />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default GoogleLogin;
