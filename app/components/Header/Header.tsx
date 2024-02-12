import Button from "@mui/material/Button";
import scss from "./Header.module.scss";
import { Typography } from "@mui/material";
import Link from "next/link";
import { UserDataType } from "../../hooks/useUserData";
import { useRouter } from "next/navigation";

export interface HeaderProps {
    userData: UserDataType | null;
}

const Header: React.FC<HeaderProps> = ({ userData }): JSX.Element => {
    console.log("isLoggedIn:", userData?.isLoggedIn || undefined)
    return (
        <header className={scss.header}>
            <nav className={scss.nav}>
                <ul className={scss.menu}>
                    <li>
                        <Link href="/">
                            <Typography
                                variant="h6"
                                style={{ textTransform: "initial" }}
                            >
                                LearnIt
                            </Typography>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <Typography color={"white"}>Home</Typography>
                        </Link>
                    </li>

                    {!userData ? (
                        <li>
                            <Link href="/login">
                                <Typography>Login</Typography>
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link href="/profile">
                                <Typography>Profile</Typography>
                            </Link>
                        </li>
                    )}
                </ul>
                {userData?.isLoggedIn ? (
                    <Button
                        className={scss.signOutBtn}
                        color="error"
                        href="/logout"
                        variant="contained"
                    >
                        Sign Out
                    </Button>
                ) : (
                    <>
                        <Button
                            className={scss.signOutBtn}
                            color="success"
                            href="/login"
                            variant="contained"
                            style={{ marginRight: "1rem" }}
                        >
                            Sign In
                        </Button>
                    
                        <Button
                            className={scss.signOutBtn}
                            color="info"
                            href="/register"
                            variant="contained"
                        >
                            Register
                        </Button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
