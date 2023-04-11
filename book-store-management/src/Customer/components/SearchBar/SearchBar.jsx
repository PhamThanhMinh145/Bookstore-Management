import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useClickOutside } from "react-click-outside-hook";
import { IoClose, IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
import styled from "styled-components";
import bookApi from "../../api/bookApi";
import { useDebounce } from "../../hooks/debounceHook";
import "./SearchBar.css";

const SearchBarContainer = styled(motion.div)`
    display: flex;
    position: absolute;
    z-index: 2;
    flex-direction: column;
    margin: 16px 0;
    width: 68em;
    height: 3.8em;
    left: 50%;
    background-color: #fff;
    border-radius: 99px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transform: translate(-50%);
`;

const SearchInputContainer = styled.div`
    width: 100%;
    min-height: 4em;
    display: flex;
    align-items: center;
    position: relative;
    padding: 2px 8px;
`;

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    font-size: 18px;
    color: #12112e;
    font-weight: 500;
    border-radius: 6px;
    background-color: transparent;
    &:focus {
        outline: none;
        &::placeholder {
            opacity: 0;
        }
    }
    &::placeholder {
        font-size: 18px;
        color: #bebebe;
        transition: all 250ms ease-in-out;
    }
`;

const SearchIcon = styled.span`
    color: #bebebe;
    font-size: 22px;
    vertical-align: middle;
    padding: 0 4px;
`;

const CloseIcon = styled(motion.span)`
    color: #bebebe;
    font-size: 23px;
    vertical-align: middle;
    transition: all 200ms ease-in-out;
    cursor: pointer;
    &:hover {
        color: #dfdfdf;
    }
`;

const LineSeperator = styled.span`
    display: flex;
    min-width: 100%;
    min-height: 1px;
    background-color: #d8d8d878;
`;

const SearchContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1em;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const LoadingWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const WarningMessage = styled.span`
    color: #a1a1a1;
    font-size: 14px;
    display: flex;
    align-self: center;
    justify-self: center;
`;

const containerVariants = {
    expanded: {
        borderRadius: "20px 20px 8px 8px",
        height: "30em",
    },
    collapsed: {
        borderRadius: "20px",
        height: "3.8em",
    },
};

// Book SHoww
const BookShowContainer = styled.div`
    height: 100%;
    max-height: 650px;
    display: flex;
    z-index: 2;
    border-bottom: 1px solid #d8d8d852;
    padding: 6px 0;
    align-items: center;
`;

const Thumbnail = styled.div`
    width: auto;
    height: 100%;
    display: flex;
    justify-content: center;
    flex: 0.2;
    img {
        width: auto;
        height: 100%;
    }
`;

const Name = styled.h3`
    font-size: 15px;
    color: #000;
    margin-left: 10px;
    flex: 1.6;
    width: calc(100% - 10px);
    display: flex;
`;

const Price = styled.span`
    color: #a1a1a1;
    font-size: 16px;
    display: flex;
    justify-content: center;
    flex: 0.4;
`;

const containerTransition = { type: "spring", damping: 22, stiffness: 150 };

export function SearchBar() {
    const inputRef = useRef();
    const [isExpanded, setExpanded] = useState(false);
    const [parentRef, isClickedOutside] = useClickOutside();
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [bookShows, setBookShows] = useState([]);
    const [noBookShows, setNoBookShows] = useState(false);

    //Format VNĐ
    const formatCash = (n) => {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    // ---------------------------------------------------------------------------
    const isEmpty = !bookShows || bookShows.length === 0;

    const changeHandler = (e) => {
        e.preventDefault();
        if (e.target.value.trim() === "") setNoBookShows(false);

        setSearchQuery(e.target.value);
    };

    const expandContainer = () => {
        setExpanded(true);
    };

    const collapseContainer = () => {
        setExpanded(false);
        setSearchQuery("");
        setLoading(false);
        setNoBookShows(false);
        setBookShows([]);
        if (inputRef.current) inputRef.current.value = "";
    };

    useEffect(() => {
        if (isClickedOutside) collapseContainer();
    }, [isClickedOutside]);

    //call api search
    const searchBookShow = async () => {
        if (!searchQuery || searchQuery.trim() === "") return;
        // console.log(searchQuery)

        setLoading(true);
        setNoBookShows(false);

        const response = await bookApi.getByName(searchQuery).catch((err) => {
            console.log("Error: ", err);
        });

        if (response) {
            if (response.data && response.data.length === 0) setNoBookShows(true);

            setBookShows(response.data);
            // console.log("Response: ", response.data);
        }

        setLoading(false);
    };

    useDebounce(searchQuery, 500, searchBookShow);
    // console.log(searchQuery.trim())
    // ---------------------------------------------------------------------------

    return (
        <SearchBarContainer
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={containerVariants}
            transition={containerTransition}
            ref={parentRef}
        >
            <SearchInputContainer>
                <SearchIcon>
                    <IoSearch />
                </SearchIcon>
                <SearchInput
                    placeholder="Tìm kiếm sách"
                    onFocus={expandContainer}
                    ref={inputRef}
                    value={searchQuery}
                    onChange={changeHandler}
                />
                <AnimatePresence>
                    {isExpanded && (
                        <CloseIcon
                            key="close-icon"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={collapseContainer}
                            transition={{ duration: 0.2 }}
                        >
                            <IoClose />
                        </CloseIcon>
                    )}
                </AnimatePresence>
            </SearchInputContainer>
            {isExpanded && <LineSeperator />}
            {isExpanded && (
                <SearchContent>
                    {isLoading ? (
                        <LoadingWrapper>
                            <MoonLoader loading color="#000" size={20} />
                        </LoadingWrapper>
                    ) : (
                        <></>
                    )}
                    {!isLoading && isEmpty && !noBookShows && (
                        <LoadingWrapper>
                            <WarningMessage>Gõ vào để tìm sách</WarningMessage>
                        </LoadingWrapper>
                    )}
                    {!isLoading && noBookShows && (
                        <LoadingWrapper>
                            <WarningMessage>Không tìm thấy sách tương ứng!</WarningMessage>
                        </LoadingWrapper>
                    )}
                    {!isLoading && !isEmpty && (
                        <>
                            {bookShows.map((item, index) => (
                                <Link
                                    to={`/bookDetail/${item?.bookID}`}
                                    className="linkToBook"
                                    key={index}
                                >
                                    <BookShowContainer>
                                        <Thumbnail>
                                            <img src={item?.image} alt="" />
                                        </Thumbnail>
                                        <Name>{item?.bookName}</Name>
                                        <Price>{formatCash(item?.price) + " VNĐ" || "N/A"}</Price>
                                    </BookShowContainer>
                                </Link>
                            ))}
                        </>
                    )}
                </SearchContent>
            )}
        </SearchBarContainer>
    );
}
