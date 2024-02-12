"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import scss from "./logout.module.scss";

import type { UserDataType } from "../hooks/useUserData";
import { Button, Typography } from "@mui/material";

function LogoutPage(): JSX.Element {
    const [userData, setUserData] = useState<UserDataType | null>(null);
    const router = useRouter();

    useEffect(() => {
        // When reading the cookie, parse the JSON data
        const userDataCookie = Cookies.get("userData");
        const parsedUserData = JSON.parse(
            userDataCookie || "{}"
        ) as UserDataType; // Explicitly cast to UserData
        setUserData(parsedUserData);
    }, []);

    const handleSignOut = () => {
        router.push("/logout");
    };

    const handleSignIn = () => {
        router.push("/login");
    };

    return (
        <div className={scss.logout}>
            {userData?.isLoggedIn ? (
                <>
                    <Typography variant={"h6"}>
                        Are you sure you want to sign out?
                    </Typography>
                    <Button variant="contained" onClick={handleSignOut}>
                        Sign Out
                    </Button>
                </>
            ) : (
                <>
                    {" "}
                    <Typography variant={"h6"}>
                        Thank you for signing out
                    </Typography>
                    <Button variant="contained" onClick={handleSignIn}>
                        Sign In
                    </Button>
                </>
            )}
        </div>
    );
}

export default LogoutPage;
