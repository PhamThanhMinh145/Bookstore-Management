import React from "react";
import { Link } from "react-router-dom";
import "./Bonus.css";

const Bonus = (props) => {
    const { data2 } = props;

    //Format VNĐ
    const formatCash = (n) => {
        return n?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <>
            {data2.map((item, index) => (
                <div className="bonus-container" key={index}>
                    <div className="bonus-wrap">
                        <div className="bonus-header">
                            <div className="bonus-header__left">
                                <img
                                    src={require("../../assets/images/icons8-open-book.gif")}
                                    alt=""
                                    className="bonus-header__under-logo"
                                />
                                <Link
                                    className="bonus-header__fieldName-link"
                                    to={`/field/${item?.fieldID}`}
                                >
                                    <h1 className="bonus-header__fieldName">{item?.fieldName}</h1>
                                </Link>
                            </div>
                        </div>

                        <div className="bonus-body">
                            <div className="bonus-body__row">
                                {item?.books[0]?.bookID === undefined ? (
                                    <></>
                                ) : (
                                    <div className="bonus-body__column">
                                        <Link
                                            to={`/bookDetail/${item?.books[0]?.bookID}`}
                                            className="bonus-body__column-img-link"
                                        >
                                            <div className="bonus-body__column-img">
                                                <img
                                                    src={item?.books[0]?.image}
                                                    alt=""
                                                    className="bonus-book"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </Link>
                                        <div className="bonus-body__column-detail">
                                            <Link
                                                to={`/bookDetail/${item?.books[0]?.bookID}`}
                                                className="bonus-body__column-img-link"
                                            >
                                                <h3 className="bonus-body__column-detail-bookName">
                                                    {item?.books[0]?.bookName}
                                                </h3>
                                            </Link>
                                            <p className="bonus-body__column-detail-authorName">
                                                {item?.books[0]?.author?.authorName}
                                            </p>
                                            <p className="bonus-body__column-detail-price">
                                                {formatCash(item?.books[0]?.price) + " VNĐ"}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {item?.books[1]?.bookID === undefined ? (
                                    <></>
                                ) : (
                                    <div className="bonus-body__column">
                                        <Link
                                            to={`/bookDetail/${item?.books[1]?.bookID}`}
                                            className="bonus-body__column-img-link"
                                        >
                                            <div className="bonus-body__column-img">
                                                <img
                                                    src={item?.books[1]?.image}
                                                    alt=""
                                                    className="bonus-book"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </Link>
                                        <div className="bonus-body__column-detail">
                                            <Link
                                                to={`/bookDetail/${item?.books[1]?.bookID}`}
                                                className="bonus-body__column-img-link"
                                            >
                                                <h3 className="bonus-body__column-detail-bookName">
                                                    {item?.books[1]?.bookName}
                                                </h3>
                                            </Link>
                                            <p className="bonus-body__column-detail-authorName">
                                                {item?.books[1]?.author?.authorName}
                                            </p>
                                            <p className="bonus-body__column-detail-price">
                                                {formatCash(item?.books[1]?.price) + " VNĐ"}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {item?.books[2]?.bookID === undefined ? (
                                    <></>
                                ) : (
                                    <div className="bonus-body__column">
                                        <Link
                                            to={`/bookDetail/${item?.books[2]?.bookID}`}
                                            className="bonus-body__column-img-link"
                                        >
                                            <div className="bonus-body__column-img">
                                                <img
                                                    src={item?.books[2]?.image}
                                                    alt=""
                                                    className="bonus-book"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </Link>
                                        <div className="bonus-body__column-detail">
                                            <Link
                                                to={`/bookDetail/${item?.books[2]?.bookID}`}
                                                className="bonus-body__column-img-link"
                                            >
                                                <h3 className="bonus-body__column-detail-bookName">
                                                    {item?.books[2]?.bookName}
                                                </h3>
                                            </Link>
                                            <p className="bonus-body__column-detail-authorName">
                                                {item?.books[2]?.author?.authorName}
                                            </p>
                                            <p className="bonus-body__column-detail-price">
                                                {formatCash(item?.books[2]?.price) + " VNĐ"}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {item?.books[3]?.bookID === undefined ? (
                                    <></>
                                ) : (
                                    <div className="bonus-body__column">
                                        <Link
                                            to={`/bookDetail/${item?.books[3]?.bookID}`}
                                            className="bonus-body__column-img-link"
                                        >
                                            <div className="bonus-body__column-img">
                                                <img
                                                    src={item?.books[3]?.image}
                                                    alt=""
                                                    className="bonus-book"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </Link>
                                        <div className="bonus-body__column-detail">
                                            <Link
                                                to={`/bookDetail/${item?.books[3]?.bookID}`}
                                                className="bonus-body__column-img-link"
                                            >
                                                <h3 className="bonus-body__column-detail-bookName">
                                                    {item?.books[3]?.bookName}
                                                </h3>
                                            </Link>
                                            <p className="bonus-body__column-detail-authorName">
                                                {item?.books[3]?.author?.authorName}
                                            </p>
                                            <p className="bonus-body__column-detail-price">
                                                {formatCash(item?.books[3]?.price) + " VNĐ"}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* row 2 */}
                            <div className="bonus-body__row">
                                {item?.books[4]?.bookID === undefined ? (
                                    <></>
                                ) : (
                                    <div className="bonus-body__column">
                                        <Link
                                            to={`/bookDetail/${item?.books[4]?.bookID}`}
                                            className="bonus-body__column-img-link"
                                        >
                                            <div className="bonus-body__column-img">
                                                <img
                                                    src={item?.books[4]?.image}
                                                    alt=""
                                                    className="bonus-book"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </Link>
                                        <div className="bonus-body__column-detail">
                                            <Link
                                                to={`/bookDetail/${item?.books[4]?.bookID}`}
                                                className="bonus-body__column-img-link"
                                            >
                                                <h3 className="bonus-body__column-detail-bookName">
                                                    {item?.books[4]?.bookName}
                                                </h3>
                                            </Link>
                                            <p className="bonus-body__column-detail-authorName">
                                                {item?.books[4]?.author?.authorName}
                                            </p>
                                            <p className="bonus-body__column-detail-price">
                                                {formatCash(item?.books[4]?.price) + " VNĐ"}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {item?.books[5]?.bookID === undefined ? (
                                    <></>
                                ) : (
                                    <div className="bonus-body__column">
                                        <Link
                                            to={`/bookDetail/${item?.books[5]?.bookID}`}
                                            className="bonus-body__column-img-link"
                                        >
                                            <div className="bonus-body__column-img">
                                                <img
                                                    src={item?.books[5]?.image}
                                                    alt=""
                                                    className="bonus-book"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </Link>
                                        <div className="bonus-body__column-detail">
                                            <Link
                                                to={`/bookDetail/${item?.books[5]?.bookID}`}
                                                className="bonus-body__column-img-link"
                                            >
                                                <h3 className="bonus-body__column-detail-bookName">
                                                    {item?.books[5]?.bookName}
                                                </h3>
                                            </Link>
                                            <p className="bonus-body__column-detail-authorName">
                                                {item?.books[5]?.author?.authorName}
                                            </p>
                                            <p className="bonus-body__column-detail-price">
                                                {formatCash(item?.books[5]?.price) + " VNĐ"}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {item?.books[6]?.bookID === undefined ? (
                                    <></>
                                ) : (
                                    <div className="bonus-body__column">
                                        <Link
                                            to={`/bookDetail/${item?.books[6]?.bookID}`}
                                            className="bonus-body__column-img-link"
                                        >
                                            <div className="bonus-body__column-img">
                                                <img
                                                    src={item?.books[6]?.image}
                                                    alt=""
                                                    className="bonus-book"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </Link>
                                        <div className="bonus-body__column-detail">
                                            <Link
                                                to={`/bookDetail/${item?.books[6]?.bookID}`}
                                                className="bonus-body__column-img-link"
                                            >
                                                <h3 className="bonus-body__column-detail-bookName">
                                                    {item?.books[6]?.bookName}
                                                </h3>
                                            </Link>
                                            <p className="bonus-body__column-detail-authorName">
                                                {item?.books[6]?.author?.authorName}
                                            </p>
                                            <p className="bonus-body__column-detail-price">
                                                {formatCash(item?.books[6]?.price) + " VNĐ"}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {item?.books[7]?.bookID === undefined ? (
                                    <></>
                                ) : (
                                    <div className="bonus-body__column">
                                        <Link
                                            to={`/bookDetail/${item?.books[7]?.bookID}`}
                                            className="bonus-body__column-img-link"
                                        >
                                            <div className="bonus-body__column-img">
                                                <img
                                                    src={item?.books[7]?.image}
                                                    alt=""
                                                    className="bonus-book"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </Link>
                                        <div className="bonus-body__column-detail">
                                            <Link
                                                to={`/bookDetail/${item?.books[7]?.bookID}`}
                                                className="bonus-body__column-img-link"
                                            >
                                                <h3 className="bonus-body__column-detail-bookName">
                                                    {item?.books[7]?.bookName}
                                                </h3>
                                            </Link>
                                            <p className="bonus-body__column-detail-authorName">
                                                {item?.books[7]?.author?.authorName}
                                            </p>
                                            <p className="bonus-body__column-detail-price">
                                                {formatCash(item?.books[7]?.price) + " VNĐ"}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Bonus;
