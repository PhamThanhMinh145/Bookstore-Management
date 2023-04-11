import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "../../components/form/Input";
import AuthService from "../../services/auth.service";
import "./signIn.css";
const initialFValues = {
  accountEmail: "",
  password: "",
};
const Login = () => {
  const checkRef = useRef();
  const form = useRef();
  const navigate = useNavigate();

  const [isActive, setPanelActive] = useState("");
  const [values, setValues] = useState(initialFValues);
  const [errorsValid, setErrorsValid] = useState({});

  const [messageErr, setMessageErr] = useState("");
  const [loading, setLoading] = useState(false);

  const validationOnChange = true;

  const validation = (fieldValues = values) => {
    let temp = { ...errorsValid };
    if ("accountEmail" in fieldValues)
      temp.accountEmail = /$^|.+@.+..+/.test(fieldValues.accountEmail)
        ? ""
        : "Incorrect email format";

    if ("accountEmail" in fieldValues)
      temp.accountEmail = fieldValues.accountEmail
        ? ""
        : "This field is required";

    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "This field is required";

    // if ("password" in fieldValues)
    //   temp.password =
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,10}$/.test(
    //       fieldValues.password
    //     )
    //       ? ""
    //       : "4 to 10 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.";
    setErrorsValid({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    if (validationOnChange) validation({ [name]: value });
  };

  const handleClickSignIn = () => {
    setPanelActive("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (validation()) {
      setMessageErr("");
      setLoading(true);

      if (checkRef.current.context._errors.length === 0) {
        AuthService.login(values.accountEmail, values.password).then(
          () => {
            navigate("/");
            window.location.reload();
          },
          (err) => {
            if (!err?.response) {
              setMessageErr("No Server Response");
            } else if (err.response.status === 400) {
              setMessageErr("Unauthenticated");
            } else if (!err.response?.status === 401) {
              setMessageErr("Unauthorized");
            } else {
              setMessageErr("Login Failed");
            }
            setLoading(false);
          }
        );
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <div className="formMain">
      <div className={"container " + isActive} id="container">
        <div className="form-container sign-in-container">
          <Form onSubmit={handleLogin} ref={form}>
            <h2>Sign In</h2>

            <div style={{ width: "100%" }}>
              <Input
                className="size"
                type="email"
                name="accountEmail"
                label="Email"
                value={values.accountEmail}
                onChange={handleInputChange}
                error={errorsValid.accountEmail}
              />
            </div>
            <div style={{ width: "100%" }}>
              <Input
                className="size"
                type="password"
                name="password"
                label="Password"
                value={values.password}
                onChange={handleInputChange}
                error={errorsValid.password}
              />
            </div>

            <button className="btn-SignIn" disabled={loading}>
              {loading && (
                <svg
                  role="status"
                  class="inline mr-3 w-4 h-4 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              Sign In
            </button>

            {messageErr && (
              <div
                class="p-4 mb-3  text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                role="alert"
              >
                <span class="font-bold text-sm">{messageErr}</span>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkRef} />
          </Form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Đã có tài khoản?</h1>
              <p>Giữ kết nối với chúng tôi bằng cách đăng nhập</p>
              <button className="ghost" id="signIn" onClick={handleClickSignIn}>
                Đăng nhập
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Bookly</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
