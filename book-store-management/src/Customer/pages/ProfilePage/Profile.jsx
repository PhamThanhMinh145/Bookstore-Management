import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import orderApi from "../../api/orderApi";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { UserAuth } from "../../context/AuthContext";
import "./Profile.css";

const Profile = () => {
    const { user } = UserAuth();
    const [orders, setOrders] = useState([]);
    const [orderId, setOrderId] = useState("");

    const formatCash = (n) => {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        const Data = async () => {
            const accId = localStorage.getItem("accountId");
            try {
                const res = await orderApi.getByCustomerId(accId);
                setOrders(res.data);
                // console.log(res.data);
            } catch (err) {
                toast.error("Không fetch được dữ liệu!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                });
            }
        };
        // gọi hàm
        Data();
    }, []);

    //huy don hang
    const updateOrderStatus = async () => {
        try {
            await orderApi.updateStatus(orderId, { status: false });
            window.location.reload();
            // console.log(res);
        } catch (err) {
            toast.error("Không xóa được order!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <div className="profile">
            <Navbar />
            <div className="profile__wrap">
                <div className="profile__content">
                    <h1>
                        <span className="user__displayName">{user?.displayName}</span>
                    </h1>
                    <p>
                        Email: <span className="user__email">{user?.email}</span>
                    </p>
                    <div className="profile__content-item">
                        <h1>Đơn hàng của bạn</h1>
                        {orders.map((item, index) => (
                            <div className="order-details__items" key={index}>
                                <div className="order-details__item-name">
                                    <Link
                                        to={`/orderDetail/${item.orderID}`}
                                        className="clickViewOrder"
                                    >
                                        <h2>Đơn hàng {item?.orderID}</h2>
                                    </Link>
                                    <div className="order-details__item-order-date">
                                        <p className="order-details__item-order-date-p">
                                            Ngày đặt hàng: {item?.dateOfOrder.slice(0, 10)}
                                        </p>
                                    </div>
                                </div>

                                <div className="order-details__item-order-total-price">
                                    <p className="order-details__item-total-price-p">
                                        Tổng số tiền:{" "}
                                        <span className="order-details__item-total-price-span">
                                            {formatCash(item?.totalAmount) + " VNĐ"}
                                        </span>
                                    </p>
                                    {item?.orderStatus === true ? (
                                        <button
                                            className="btn-cancel"
                                            onMouseOver={() => {
                                                setOrderId(item?.orderID);
                                            }}
                                            onClick={() => {
                                                updateOrderStatus();
                                            }}
                                        >
                                            Hủy đơn hàng
                                        </button>
                                    ) : (
                                        <button className="btn-cancel-disable" disabled>
                                            Hủy đơn hàng
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover={false}
                theme="light"
            />
        </div>
    );
};

export default Profile;
