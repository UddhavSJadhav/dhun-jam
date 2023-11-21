import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth.jsx";

import EyeOpen from "../components/EyeOpen.jsx";
import EyeClose from "../components/EyeClose.jsx";
import Loading from "../components/Loading.jsx";

import { axiosOpen } from "../utils/axios.js";

const Login = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [isShowingPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    message: "",
  });

  useEffect(() => {
    if (auth?.token) navigate("/", { replace: true });
  }, [auth]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value.trim();
    const password = event.target.password.value.trim();

    let newErrors = {
      username: username ? "" : "Username is required!",
      password: password ? "" : "Password is required!",
    };

    setErrors({ ...newErrors });

    if (Object.values(newErrors).filter((e) => e).length > 0) return;

    setLoading(true);
    try {
      const { data } = await axiosOpen.post("/account/admin/login", {
        username,
        password,
      });

      localStorage.setItem("auth", JSON.stringify({ ...(data?.data || {}) }));
      setAuth({ ...(data?.data || {}) });
    } catch (error) {
      console.log(error);
      const data = error?.response?.data;
      setErrors({
        username: data?.username?.length > 0 ? data.username[0] : "",
        password: data?.password?.length > 0 ? data.password[0] : "",
        message: data?.ui_err_msg || "",
      });
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-616px p-2">
        <h4 className="text-heading font-bold text-center">
          Venue Admin Login
        </h4>

        <form className="mt-12" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className={`w-600px bg-transparent outline-none border border-solid ${
                errors?.username || errors?.message
                  ? "border-red-500"
                  : "border-white"
              } rounded-xl px-2 py-3`}
            />
            <p className="h-4 text-xs mt-1 text-red-500">{errors?.username}</p>
          </div>

          <div className="relative">
            <input
              type={isShowingPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              className={`mt-3 w-600px bg-transparent outline-none border border-solid ${
                errors?.password || errors?.message
                  ? "border-red-500"
                  : "border-white"
              } rounded-xl ps-2 py-3 pr-12`}
            />
            <p className="h-4 text-xs mt-1 text-red-500">
              {errors?.password || errors?.message}
            </p>
            <div
              className="absolute w-6 top-[25px] right-3 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {isShowingPassword ? <EyeClose /> : <EyeOpen />}
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-btn w-600px font-bold p-3 rounded-xl border border-solid border-btn hover:border-custom-border active:border-custom-border"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="mx-auto inline-block">
                  <Loading className="animate-spin w-6 inline-block me-2 mb-[2px]" />
                  <span>Signing in</span>
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </div>

          <p className="text-center mt-4 cursor-pointer">New Registration ?</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
