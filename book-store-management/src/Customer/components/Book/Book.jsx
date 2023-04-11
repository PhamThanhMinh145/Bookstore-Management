import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "react-use-cart";
import "./Book.css";

function Book(props) {
    // eslint-disable-next-line
    let { bookID, image, quantity, bookName, price } = props.data;
    let { authorName } = props.data.author;

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
        toast.success("📒 Thêm vào giỏ thành công!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: 0,
            theme: "light",
            style: { fontSize: "18px", borderRadius: "6px" },
        });

    return (
        <>
            <div className="bookList__book">
                {/* Book cover */}
                <div className="bookList__book-wrapper">
                    <Link to={`/bookDetail/${bookID}`} className="bookList__book-cover">
                        <div className="bookList__book-image">
                            <img alt="" src={image} loading="lazy" />
                        </div>
                    </Link>
                </div>

                <div className="bookList__book-titleAndAuthor">
                    {/* Book Title */}
                    <h2 className="bookList__book-title">
                        <a href="/books/stay-curious-and-keep-exploring-50-amazing-bubbly-and-creative-science-experiments-to-do-with-the-whole-family/9781797216225?listref=bookshop-org-best-sellers-of-the-week">
                            {bookName}
                        </a>
                    </h2>

                    {/* Book Author */}
                    <h3 className="bookList__book-author">{authorName}</h3>
                </div>

                {/* Book Price */}
                <div className="bookList__book-price">
                    {/* <div className="bookList__book-price-old">$22.95</div> */}
                    <div className="bookList__book-price-new">{formatCash(price) + " VNĐ"}</div>
                </div>

                <button
                    className="btn-secondary"
                    onClick={() => {
                        addToCart();
                        addSuccess();
                    }}
                >
                    THÊM VÀO GIỎ
                </button>
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

export default Book;
