import { Typography } from "@mui/material";

const Footer = () => {
    return (
        <div className="footer">
            <Typography style={{ textAlign: 'center', fontSize: '16px' }}>
                This app was created with 💙 by <a href="https://github.com/octagod">Nicklaus</a>
            </Typography>
        </div>
    );
}

export default Footer;