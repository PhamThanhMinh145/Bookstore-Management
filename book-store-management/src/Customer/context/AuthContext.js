import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import authApi from "../api/authApi";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();

        await signInWithPopup(auth, provider)
            .then((result) => {
                const token = result.user.accessToken;
                const send = async () => {
                    try {
                        await authApi
                            .verifyAccessToken(token)
                            .then((res) => {
                                if (res?.data?.isNewUser === true) {
                                    alert("Vui lòng xác thực tài khoản thông qua email của bạn!");
                                    localStorage.setItem("jwt", "null");
                                    localStorage.setItem("accountId", "null");
                                } else {
                                    localStorage.setItem("jwt", JSON.stringify(res?.data?.jwt));
                                    localStorage.setItem(
                                        "accountId",
                                        JSON.stringify(res?.data?.accountId)
                                    );
                                    // console.log(res);
                                }
                            })
                            .catch((err) => {
                                if (err.response.status === 400) {
                                    alert(
                                        "Tài khoản của bạn đã bị vô hiệu hóa! Vui lòng liên hệ admin!"
                                    );
                                    setUser(null);
                                    localStorage.setItem("jwt", "null");
                                    localStorage.setItem("accountId", "null");
                                }
                            });
                    } catch (error) {
                        console.log(error);
                    }
                };
                send();
            })
            .catch((err) => {
                const errorCode = err.code;
                const errorMessage = err.message;
                console.log(errorCode, errorMessage);
            });
    };

    const logOut = () => {
        signOut(auth);
    };

    //Set user
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            try {
                authApi
                    .verifyAccessToken(currentUser.accessToken)
                    .then((res) => {
                        if (res?.data?.isNewUser === true) {
                            localStorage.setItem("jwt", "null");
                            localStorage.setItem("accountId", "null");
                        } else {
                            localStorage.setItem("jwt", JSON.stringify(res?.data?.jwt));
                            localStorage.setItem("accountId", JSON.stringify(res?.data?.accountId));
                            console.log(res);
                        }
                        // console.log(currentUser.accessToken);
                    })
                    .catch((err) => {
                        if (err.response.status === 400) {
                            alert("Tài khoản của bạn đã bị vô hiệu hóa! Vui lòng liên hệ admin!");
                            setUser(null);
                            localStorage.setItem("jwt", "null");
                            localStorage.setItem("accountId", "null");
                        }
                    });
            } catch (error) {
                console.log("Bạn chưa nhập hoặc chưa xác thực tài khoản!");
            }
        });
        return () => {
            unsubcribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
