import { BsFacebook, BsInstagram } from "react-icons/bs";
import { Component } from "react";
import "./Footer.css";

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer__wrap">
                    <div className="footer__wrap-left">
                        <h1 className="footer__wrap-left-header">Chấp nhận thanh toán</h1>
                        <img
                            src={require("../../assets/images/payment.webp")}
                            alt=""
                            className="footer__wrap-left-img"
                        />
                    </div>
                    <div className="footer__wrap-middle">
                        <a href="/#">
                            <h1 className="footer__wrap-middle-item">Về Bookly</h1>
                        </a>
                        <a href="/#">
                            <h1 className="footer__wrap-middle-item">Hỗ trợ</h1>
                        </a>
                        <a href="/#">
                            <h1 className="footer__wrap-middle-item">Liên hệ</h1>
                        </a>
                    </div>
                    <div className="footer__wrap-right">
                        <h1 className="footer__wrap-right-header">Theo dõi chúng tôi</h1>
                        <a href="/#">
                            <BsFacebook className="footer__wrap-right-item" />
                            <BsInstagram className="footer__wrap-right-item" />
                        </a>
                    </div>
                </div>
                <div className="footer__wrap-down">
                    <h1>@Group 1 SWP391</h1>
                </div>
            </footer>
        );
    }
}
