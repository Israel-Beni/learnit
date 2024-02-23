"use client";
import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Cookies from "js-cookie";
import scss from "./login.module.scss";
import type { UserDataType } from "../hooks/useUserData";

function LoginPage(): JSX.Element {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [userData, setUserData] = useState<UserDataType | null>(null);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        console.log("This is a test");
        console.log("Second test");


        try {
            const response = await fetch(
                `http://localhost:1337/api/auth/local`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ identifier, password }),
                }
            );

            const data = await response.json();

            console.log("response.ok", response.ok);

            if (response.ok) {
                // format the user-related data before storing in the cookie
                const userData: UserDataType = {
                    authToken: data.jwt,
                    userName: data.user.username,
                    isLoggedIn: data.user.confirmed,
                };

                Cookies.set('userData', JSON.stringify(userData), { expires: 30}); // Expires in 30 days

                // Update the user data in the state to trigger re-render
                setUserData(userData);
                // location.reload();
                // router.push('/profile'); // Replace '/profile' with your actual profile page route
                console.log(userData);
            } else {
                setLoginError(data.message[0].messages[0].message);
            }
        } catch (error) {
            console.error("login error:", error);
            setLoginError(
                "An error occured during login. Please try again later."
            );
        }
    };

    const handleSignOut = () => {
        // Remove the userData cookie to log the user out
        Cookies.remove("userData");
        // Clear the user data from state to trigger re-render
        setUserData(null);
        location.reload();
        // router.push('/login'); // Replace '/profile' with your actual profile page route
        console.log(userData);
    };

    console.log(userData?.isLoggedIgit )

    return (
        <div className={scss.login}>
            <Typography>Login</Typography>
            {!userData?.isLoggedIn && (
                <form onSubmit={handleLogin}>
                    <TextField
                        label="Username or Email"
                        variant="outlined"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        value={password}
                        autoComplete={"true"}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    {loginError && (
                        <Typography style={{ color: "red" }}>
                            {loginError}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        onClick={handleLogin}
                        style={{ marginRight: "0.5rem" }}
                    >
                        Login
                    </Button>
                    <Button
                        variant="outlined"
                        color={"info"}
                        href={"/register"}
                    >
                        Register
                    </Button>
                </form>
            )}
            {userData?.isLoggedIn && (
                <div>
                    <p>Logged in as: {userData.userName}</p>
                    <p>Is logged in: {userData.isLoggedIn ? "Yes" : "No"} </p>
                    <Button
                        variant="contained"
                        onClick={handleSignOut}
                        color={"error"}
                    >
                        Sign Out
                    </Button>
                </div>
            )}
        </div>
    );
}

export default LoginPage;
