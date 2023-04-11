import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fieldApi from "../../api/fieldApi";
import Book from "../../components/Book/Book";
import Footer from "../../components/Footer/Footer";
import FieldDetailSkeleton from "../../components/LoadingSkeleton/FieldDetailSkeleton";
import Navbar from "../../components/Navbar/Navbar";
import "./FieldDetail.css";

const FieldDetail = () => {
    //----------------------------
    const { fieldId } = useParams();
    const [books, setBooks] = useState([]);
    const [field, setField] = useState([]);
    const [sortState, setSortState] = useState("none");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);

    const sortMethods = {
        none: { method: (a, b) => null },
        ascending: { method: (a, b) => (a.bookName > b.bookName ? 1 : -1) },
        descending: { method: (a, b) => (a.bookName > b.bookName ? -1 : 1) },
        priceAscending: { method: (a, b) => a.price - b.price },
        priceDescending: { method: (a, b) => b.price - a.price },
    };

    //Get book by Id
    useEffect(() => {
        const getBooks = async () => {
            try {
                const res = await fieldApi.getById(fieldId);
                setBooks(res.data[0].books);
                setField(res.data);
                // console.log("tesst", res.data[0].books);
            } catch (error) {
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
            setLoading(false);
        };
        getBooks();
    }, [fieldId]);
    //-----------------------------

    // console.log(books);

    return (
        <div className="main">
            {/* Navbar */}
            <Navbar />

            {field.map((item, index) => (
                <div className="field-name" key={index}>
                    <div className="fieldName-container">
                        <h1>{item?.fieldName}</h1>
                        <div className="fieldName-container__desc">
                            <p>{item?.fieldDescription}</p>
                        </div>
                    </div>
                </div>
            ))}

            <div className="sort-select__container">
                <div className="sort-select__div">
                    <div className="sort-select">
                        <select
                            defaultValue={"DEFAULT"}
                            onChange={(e) => setSortState(e.target.value)}
                        >
                            <option value="DEFAULT" disabled>
                                Sắp xếp
                            </option>
                            <option value="ascending">Tăng dần</option>
                            <option value="descending">Giảm dần</option>
                            <option value="priceAscending">Giá tăng dần</option>
                            <option value="priceDescending">Giá giảm dần</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bookListContainer">
                <div className="bookList">
                    {loading && <FieldDetailSkeleton books={10} />}
                    {books.sort(sortMethods[sortState].method).map((item, index) => (
                        <Book data={item} key={index} />
                    ))}
                </div>
            </div>

            {/* Footer */}
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

export default FieldDetail;
