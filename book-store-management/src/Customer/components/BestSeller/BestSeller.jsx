import parse from "html-react-parser";
import React from "react";
import { Link } from "react-router-dom";
import "./BestSeller.css";

const BestSeller = (props) => {
    const { data3 } = props;

    const formatCash = (n) => {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <div className="best-seller-container">
            <h1 className="best-seller__title">Bán chạy nhất</h1>
            {data3?.map((item, index) => (
                <div className="best-seller-wrap" key={index}>
                    <div className="best-seller__left">
                        <Link
                            to={`/bookDetail/${item?.bookID}`}
                            className="best-seller__left-img-link"
                        >
                            <div className="best-seller__left-img-cover">
                                <img
                                    src={item?.image}
                                    alt=""
                                    className="best-seller__left-img"
                                    loading="lazy"
                                />
                            </div>
                        </Link>
                    </div>
                    <div className="best-seller__right">
                        <div className="best-seller__right-title">
                            <Link
                                to={`/bookDetail/${item?.bookID}`}
                                className="best-seller__left-img-link"
                            >
                                <h1 className="best-seller__right-title-h1">{item?.bookName}</h1>
                            </Link>
                        </div>
                        <div className="best-seller__right-author">
                            <p>{item?.author?.authorName}</p>
                        </div>
                        <div className="best-seller__right-price">
                            <p>{formatCash(item?.price) + " VNĐ"}</p>
                        </div>
                        <div className="best-seller__right-desc">
                            <p>{parse(item?.description)}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BestSeller;
