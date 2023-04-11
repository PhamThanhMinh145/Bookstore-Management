import Logout from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import fieldApi from "../../api/fieldApi";
import { UserAuth } from "../../context/AuthContext";
import { SearchBar } from "../SearchBar/SearchBar";
import Turnover from "../Turnover/Turnover";
import "./Navbar.css";

// Styled Badge
const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        fontSize: "12px",
        right: 4,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "6px",
    },
}));

function Navbar() {
    //props
    const { isEmpty, totalItems, emptyCart } = useCart();
    // handle logout
    const navigate = useNavigate();
    const { logOut, user } = UserAuth();

    const handleSignOut = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    // MUI dropdown menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //Lấy suggest từ api
    const [suggests, setSuggests] = useState([]);
    useEffect(() => {
        const Data = async () => {
            try {
                const res = await fieldApi.get8Row();
                setSuggests(res.data);
            } catch (error) {
                console.log("Không lấy được dữ liệu từ API");
            }
        };
        Data();
    }, []);

    return (
        <>
            <div className="navbar">
                <div className="navbar__up">
                    <div className="navbar__left">
                        {/* <a href="/">
                            <img
                                src={require("../../assets/images/logo.gif")}
                                alt=""
                                className="navbar__logo-img"
                            />
                        </a> */}
                        <a href="/" className="navbar__logo-name">
                            <h1 className="navbar__logo-name">Bookly</h1>
                        </a>
                    </div>

                    <SearchBar />
                    <div className="navbar__middle">
                        <div className="navbar__middle-suggest">
                            {suggests.map((item, index) => (
                                <a
                                    href={`/field/${item?.fieldID}`}
                                    className="navbar__middle-suggest-item"
                                    key={index}
                                >
                                    <p>{item.fieldName}</p>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="navbar__right">
                        {user?.displayName ? (
                            <React.Fragment>
                                <Tooltip title="Account settings">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? "account-menu" : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? "true" : undefined}
                                    >
                                        <Avatar src={user?.photoURL} sx={{ width: 40, height: 40 }}>
                                            M
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: "visible",
                                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                            mt: 1.5,
                                            "& .MuiAvatar-root": {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            "&:before": {
                                                content: '""',
                                                display: "block",
                                                position: "absolute",
                                                top: 0,
                                                right: 20,
                                                width: 10,
                                                height: 10,
                                                bgcolor: "background.paper",
                                                transform: "translateY(-50%) rotate(45deg)",
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                                >
                                    <a href="/profile" className="navbar__right-menu-item">
                                        <MenuItem
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                paddingLeft: "32px",
                                                fontSize: "1.6rem",
                                                lineHeight: "1.6rem",
                                            }}
                                        >
                                            <Avatar
                                                src={user?.photoURL}
                                                sx={{ marginBottom: "4px" }}
                                            />{" "}
                                            Hồ sơ
                                        </MenuItem>
                                    </a>
                                    <Divider />

                                    <MenuItem
                                        onClick={() => {
                                            handleSignOut();
                                            emptyCart();
                                        }}
                                        className="navbar__right-menu-item"
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            fontSize: "1.6rem",
                                            lineHeight: "1.6rem",
                                            paddingTop: "14px",
                                            paddingRight: "24px",
                                            height: "100%",
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginBottom: "2px",
                                            }}
                                        >
                                            <Logout fontSize="large" />
                                        </ListItemIcon>
                                        Đăng xuất
                                    </MenuItem>
                                </Menu>
                            </React.Fragment>
                        ) : (
                            <a href="/signIn" className="navbar__right-login-text">
                                Đăng nhập
                            </a>
                        )}
                        {!isEmpty && (
                            <StyledBadge badgeContent={totalItems} color="error">
                                <Link to="/cart" className="navbar__right-cart">
                                    <FiShoppingCart className="navbar__right-cart-logo" />
                                </Link>
                            </StyledBadge>
                        )}
                    </div>
                </div>
                <div className="navbar__down">
                    <Turnover />
                </div>
            </div>
        </>
    );
}

export default Navbar;
