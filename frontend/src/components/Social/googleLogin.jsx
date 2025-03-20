import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const GoogleLogin = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const handleLogin = () => {
    googleLogin()
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        if (user) {
          const userImp = {
            name: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL,
            role: "user",
            gender: "Is not specified",
            address: "Is not specified",
            phone: "Is not specified",
          };
          if (user.email && user.displayname) {
            return axios
              .post("http://localhost:3000/new-user", userImp)
              .then(() => {
                navigate("/");
                return "Registration Successfully";
              })
              .catch((error) => {
                throw new Error(error);
              });
          }
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <div className="flex items-center justify-center my-3">
      <button
        onClick={() => handleLogin()}
        className="flex items-center outline-none bg-white border-gray-300 rounded-lg shadow-md px-6 py-4 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none"
      >
        <FcGoogle className="h-6 w-6 mr-2" />
        <span>Continue with Google </span>
      </button>
    </div>
  );
};

export default GoogleLogin;
