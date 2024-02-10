import Button from "@mui/material/Button";
import scss from "./Header.module.scss";
import { Typography } from "@mui/material";
import Link from "next/link";
import { UserDataType } from "../../hooks/useUserData";
import { useRouter } from "next/router";

export interface HeaderProps {
    userData: UserDataType;
}

const Header: React.FC<HeaderProps> = ({ userData }): JSX.Element => {
    const router = useRouter();

    const handleSignOut = () => router.push("/logout");
    const handleSignIn = () => router.push("/login");

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
                {}
                <div className={scss.buttonGroup}>
                    <Button variant="contained" color="success" href="/login">
                        Sign in
                    </Button>
                    <Button variant="contained" color="error" href="/logout">
                        Sign out
                    </Button>
                    <Button variant="contained" color="info" href="/register">
                        register
                    </Button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
