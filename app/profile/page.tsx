'use client';
import React, { useState, useEffect } from "react";
import scss from "./profile.module.scss";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button, Typography } from "@mui/material";

function ProfilePage(): JSX.Element {
    const router = useRouter();
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        // Read the user data cookie and parse the JSON data
        const userDataCookie = Cookies.get("userData");
        const parsedUserData = JSON.parse(userDataCookie || "{}");
        setUserName(parsedUserData.userName || null);
    }, []);

    const handleSignOut = () => {
        // Remove the userData cookie to log the user out
        Cookies.remove("userData");
        setUserName(null);
        // Redirect to the login page after logout
        router.push("/login");
    };

    return (
        <div className={scss.profile}>
            {userName ? (
                <>
                    <Typography variant={"h6"} component={"h1"}>
                        Welcome to your profile page,{" "}
                        <span style={{ color: "red" }}>{userName}</span>
                    </Typography>
                    <Button
                        style={{ marginTop: "2rem" }}
                        variant="contained"
                        onClick={handleSignOut}
                        color="error"
                    >
                        Log Out
                    </Button>
                </>
            ) : (
                <Typography>You need to sign in.</Typography>
            )}
        </div>
    );
}

export default ProfilePage;
