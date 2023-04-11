import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bookApi from "../../api/bookApi";
import BookDetail from "../../components/BookDetail/BookDetail";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

function BookDetails() {
    const { bookId } = useParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const res = await bookApi.getById(bookId);
                setBooks(res.data);
                // console.log(res.data);
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
    }, [bookId]);

    return (
        <div className="main">
            {/* Navbar */}
            <Navbar />

            {loading && <></>}
            {books.map((item, index) => (
                <BookDetail data={item} key={index} />
            ))}
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
}

export default BookDetails;
