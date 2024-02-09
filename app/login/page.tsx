'use client';
import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import scss from './login.module.scss';

type UserData = {
    authToken: string;
    userName: string;
    isLoggedIn: boolean;
};

function LoginPage(): JSX.Element {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [userData, setUserData] = useState<UserData | null>(null);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        console.log("This is a test");

        try {
            const response = await fetch("127.0.0.1:1337/api/auth/local", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ identifier, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // format the user-related data before storing in the cookie
                const userData: UserData = {
                    authToken: data.jwt,
                    userName: data.user.username,
                    isLoggedIn: data.user.confirmed,
                };
                setUserData(userData);
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
        setUserData(null);
        console.log(userData);
    };

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
                        variant="outlined"
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
