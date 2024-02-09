import Button from "@mui/material/Button";
import scss from "./Header.module.scss";
import { Typography } from "@mui/material";
import Link from "next/link";

const Header = () => {
    return (
        <header className={scss.header}>
            <ul className={scss.menu}>
                <li>
                    <Link href="/" className={scss.logo}>
                        <Typography variant="h6" >
                            LearnIt
                        </Typography>
                    </Link>
                </li>
                <li><Link href="/"><Typography color={'white'}>Home</Typography></Link></li>
                <li><Link href="/profile"><Typography color={'white'}>Profile</Typography></Link></li>
            </ul>
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
        </header>
    );
};

export default Header;
