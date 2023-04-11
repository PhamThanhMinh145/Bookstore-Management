import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import "./SignIn.css";

const SignIn = () => {
    const [isActive, setPanelActive] = useState("");
    const navigate = useNavigate();

    const handleClickSignUp = () => {
        setPanelActive("right-panel-active");
    };

    const handleClickSignIn = () => {
        setPanelActive("");
    };

    // Login with google
    const { googleSignIn } = UserAuth();
    // console.log(newUser);

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="formMain">
            <div className={"container " + isActive} id="container">
                <div className="form-container sign-up-container">
                    <form action="/#">
                        <h1 className="Signup-label">Đăng ký</h1>
                        <input type="text" placeholder="Tên đầy đủ" />
                        <input type="email" placeholder="Email" />
                        <input type="tel" placeholder="Số điện thoại" />
                        <input type="password" placeholder="Mật khẩu" />
                        <button className="btn-SignUp">Đăng ký</button>
                        <span>hoặc đăng nhập với</span>
                        <div className="social-container">
                            <FcGoogle onClick={handleGoogleSignIn} />
                        </div>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="/#">
                        <h1 className="Signin-label">Đăng nhập</h1>
                        <div className="social-container">
                            <FcGoogle
                                onClick={() => {
                                    handleGoogleSignIn();
                                }}
                            />
                        </div>
                        <span>hoặc sử dụng tài khoản</span>
                        <input type="email" placeholder="Tài khoản" />
                        <input type="password" placeholder="Mật khẩu" />
                        <a href="/#">Quên mật khẩu?</a>
                        <button className="btn-SignIn">Đăng nhập</button>
                    </form>
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
                            <h1>Bookly here!</h1>
                            <p>
                                Bạn chưa có tài khoản? Nhập thông tin cá nhân để bắt đầu cuộc phiêu
                                lưu!
                            </p>
                            <button className="ghost" id="signUp" onClick={handleClickSignUp}>
                                Đăng ký
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
