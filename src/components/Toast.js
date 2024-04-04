import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

const Toast = ({ children, severity, timer, open, setOpen }) => {

    // check for mobile view
    let media = window.matchMedia("(max-width: 600px)");
    
    const [vertical, setVertical] = useState('top');
    const [horizontal, setHorizontal] = useState('right');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }

    useEffect(() => {
        if (media.matches) {
            setVertical('bottom');
            setHorizontal('center');
        }
    }, [media.matches]);


    return (
        <div className="toast_wrap">
            <Snackbar
                open={open}
                autoHideDuration={timer}
                onClose={handleClose}
                anchorOrigin={{ vertical, horizontal }}
                key={vertical + horizontal}
            >
                <Alert onClose={handleClose} severity={severity}>
                    {children}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Toast;