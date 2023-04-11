import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { useEffect, useState } from "react";
import orderApi from "../../api/orderApi";
import orderDetailApi from "../../api/orderDetailApi";
import "./Success.css";

function Success() {
    const [orderId, setOrderId] = useState(0);
    const { items, emptyCart } = useCart();
    // const { user } = UserAuth();
    // console.log(user);

    useEffect(() => {
        const createOrder = async () => {
            const accId = localStorage.getItem("accountId");
            try {
                const res = await orderApi.create(accId);
                if (res) {
                    // console.log("thanh cong, res:", res.data);
                    setOrderId(res.data);
                }
            } catch (error) {
                console.log("Không tạo được order", error);
            }
        };
        createOrder();
    }, []);

    const a = [];
    for (var i = 0; i < items.length; i++) {
        a.push({
            orderID: orderId,
            bookID: items[i].bookID,
            quantity: items[i].quantity,
        });
    }
    const b = JSON.stringify(a);

    //create order detail
    useEffect(() => {
        if (orderId === 0) {
            return;
        } else {
            const createOrderDetail = async () => {
                try {
                    // console.log(b);
                    const res = await orderDetailApi.create(b);
                    if (res) {
                        console.log("SUCESSFULLY!");
                    }
                } catch (error) {
                    console.log("Không tạo được orderDetail");
                }
            };
            createOrderDetail();
        }
    }, [b, orderId]);

    return (
        <>
            <div className="success-container">
                <div className="check-container">
                    <div className="check-background">
                        <svg viewBox="-16 0 100 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 25L27.3077 44L58.5 7"
                                stroke="white"
                                strokeWidth="13"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <div className="check-shadow"></div>
                    <div className="check-notification">
                        <h1>Thanh toán thành công</h1>
                    </div>
                    <Link to="/profile">
                        <button
                            className="success-container__back"
                            onClick={() => {
                                emptyCart();
                            }}
                        >
                            Xem order của bạn
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
export default Success;
