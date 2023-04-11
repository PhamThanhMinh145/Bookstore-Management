import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import "./Field.css";

function Field(props) {
    const { data } = props;

    // Pagination
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };
    // End Pagination

    return (
        <>
            {currentItems.map((item, index) => (
                <div className="content" key={index}>
                    <div className="content__header">
                        <div className="content__header-left">
                            <img
                                src={require("../../assets/images/icons8-open-book.gif")}
                                alt=""
                                className="content__header-logo"
                            />
                            <h1 className="content__header-name">{item?.fieldName}</h1>
                        </div>
                        <a href={`/field/${item?.fieldID}`}>
                            <button className="btn-primary">
                                XEM TẤT CẢ
                                <i className="bx bx-right-arrow-alt"></i>
                            </button>
                        </a>
                    </div>

                    <div className="content__body">
                        <div className="row">
                            {item?.books[0]?.image === undefined ? (
                                <></>
                            ) : (
                                <div className="column">
                                    <Link to={`/bookDetail/${item?.books[0]?.bookID}`}>
                                        <img
                                            src={item?.books[0]?.image}
                                            alt=""
                                            className="book"
                                            loading="lazy"
                                        />
                                    </Link>
                                </div>
                            )}
                            {item?.books[1]?.image === undefined ? (
                                <></>
                            ) : (
                                <div className="column">
                                    <Link to={`/bookDetail/${item?.books[1]?.bookID}`}>
                                        <img
                                            src={item?.books[1]?.image}
                                            alt=""
                                            className="book"
                                            loading="lazy"
                                        />
                                    </Link>
                                </div>
                            )}
                            {item?.books[2]?.image === undefined ? (
                                <></>
                            ) : (
                                <div className="column">
                                    <Link to={`/bookDetail/${item?.books[2]?.bookID}`}>
                                        <img
                                            src={item?.books[2]?.image}
                                            alt=""
                                            className="book"
                                            loading="lazy"
                                        />
                                    </Link>
                                </div>
                            )}
                            {item?.books[3]?.image === undefined ? (
                                <></>
                            ) : (
                                <div className="column">
                                    <Link to={`/bookDetail/${item?.books[3]?.bookID}`}>
                                        <img
                                            src={item?.books[3]?.image}
                                            alt=""
                                            className="book"
                                            loading="lazy"
                                        />
                                    </Link>
                                </div>
                            )}
                            {item?.books[4]?.image === undefined ? (
                                <></>
                            ) : (
                                <div className="column">
                                    <Link to={`/bookDetail/${item?.books[4]?.bookID}`}>
                                        <img
                                            src={item?.books[4]?.image}
                                            alt=""
                                            className="book"
                                            loading="lazy"
                                        />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="active"
            />
        </>
    );
}

export default Field;
