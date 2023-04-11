import React, { useEffect, useState } from "react";
import bookApi from "../../api/bookApi";
import "./Turnover.css";

export default function Turnover() {
    const [totalBook, setTotalBook] = useState("");
    const [totalMoney, setTotalMoney] = useState("");

    const formatCash = (n) => {
        return n?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    useEffect(() => {
        const Data1 = async () => {
            try {
                const res = await bookApi.getTotalOfBook();
                setTotalBook(res.data);
            } catch (error) {
                console.log("Không lấy được dữ liệu total book từ API");
            }
        };

        const Data2 = async () => {
            try {
                const res = await bookApi.getTotalMoney();
                setTotalMoney(res.data);
            } catch (error) {
                console.log("Không lấy được dữ liệu total book từ API");
            }
        };

        Data1();
        Data2();
    });

    return (
        <div className="Turnover-container">
            <div className="Turnover-detail">
                <span>
                    Hơn <h2 className="Turnover-detail__numOf">{totalBook} quyển sách</h2> được bán
                    ra mỗi tuần và doanh thu lên đến{" "}
                    <h2 className="Turnover-detail__numOf">{formatCash(totalMoney)} VNĐ</h2>
                </span>
            </div>
        </div>
    );
}
