import parse from "html-react-parser";
import { React } from "react";
import { AiFillCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "react-use-cart";
import "./BookDetail.css";

function BookDetail(props) {
    //Lấy dữ liệu từ api getbookbyId
    console.log(props.data);
    let { bookID, image, bookName, quantity, price, description, dateOfPublished } = props.data;
    let { authorName } = props.data.author;
    let { publisherName } = props.data.publisher;

    //add key "id" = "bookId"
    props.data.id = props.data.bookID;
    props.data.storeQuantity = props.data.quantity;

    //cart logic
    const { addItem } = useCart();

    const addToCart = () => {
        addItem(props.data);
    };

    //Format VNĐ
    const formatCash = (n) => {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const addSuccess = () =>
        toast.success("📚 Thêm vào giỏ thành công!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: 0,
            theme: "light",
            style: { fontSize: "18px" },
        });

    return (
        <>
            <div className="bookDetail">
                <div className="bookDetail__wrapper">
                    {/* book Cover */}
                    <div className="bookDetail__bookImg">
                        <div className="bookDetail__bookImg-cover">
                            <Link to={`/bookDetail/${bookID}`} className="bookDetail__bookImg-link">
                                <img className="bookDetail__bookImg-img" src={image} alt="book" />
                            </Link>
                        </div>
                    </div>

                    {/* book detail */}
                    <div className="bookDetail__detail">
                        {/* title */}
                        <div className="bookDetail__detail-title">
                            <h1>{bookName}</h1>
                            <span>
                                <a href="/#">{authorName}</a> (Tác giả)
                            </span>
                        </div>

                        {/* price */}
                        {/* <h1 className="bookDetail__detail-oldPrice">$27.95</h1> */}
                        <h1 className="bookDetail__detail-newPrice">
                            {formatCash(price) + " VNĐ"}
                        </h1>

                        {/* status */}
                        {quantity > 0 ? (
                            <div className="bookDetail__detail-status">
                                <AiFillCheckCircle className="bookDetail__detail-statusIcon" />
                                AVAILABLE
                            </div>
                        ) : (
                            <>
                                <div className="bookDetail__detail-status-un">
                                    <AiOutlineCloseCircle className="bookDetail__detail-statusIcon-un" />
                                    UNAVAILABLE
                                </div>
                            </>
                        )}

                        {/* action button */}
                        <button
                            className="btn-secondary mt-20"
                            onClick={() => {
                                addToCart();
                                addSuccess();
                            }}
                        >
                            THÊM VÀO GIỎ
                        </button>

                        {/* description */}
                        <div className="bookDetail__detail-description">
                            <h1>Mô tả</h1>
                            <p style={{ whiteSpace: "break-spaces" }}>{parse(description)}</p>
                        </div>

                        {/* Detail */}
                        <div className="bookDetail__detail-detail mt-20">
                            <h1>Chi tiết sản phẩm</h1>
                            <span>
                                Giá:{" "}
                                <p className="bookDetail__detail-detail-price">
                                    {formatCash(price) + " VNĐ"}
                                </p>
                            </span>
                            <br />

                            <span>
                                Nhà xuất bản: <p>{publisherName}</p>
                            </span>
                            <br />

                            <span>
                                Ngày xuất bản: <p>{dateOfPublished.slice(0, 10)}</p>
                            </span>
                            <br />
                            <span>
                                Ngôn ngữ: <p>Tiếng Việt</p>
                            </span>
                            <br />
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable={false}
                    pauseOnHover={false}
                    theme="light"
                />
            </div>
        </>
    );
}

export default BookDetail;
