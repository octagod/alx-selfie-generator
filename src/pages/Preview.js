import { Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../components/styles/Custombutton";
import { useDispatch, useSelector } from "react-redux";
import Spacebox from "../components/styles/Spacebox";
import Flexbox from "../components/Flexbox";
import { useEffect, useState } from "react";
import { updateimage } from "../features/images";
import '../css/home.css'
import Footer from "../components/Footer";
import Toast from "../components/Toast";

const Preview = ({ title }) => {
    document.querySelector("title").innerHTML = title

    const file = useSelector(state => state.file.value)

    const dispatch = useDispatch()

    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [msg, setToastMsg] = useState('');

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const removeBG = async () => {
        setLoading(true)

        const formData = new FormData();

        formData.append("image_file", file);

        try {
            const response = await fetch("https://sdk.photoroom.com/v1/segment",
                {
                    method: "POST",
                    headers: { "x-api-key": process.env.REACT_APP_PHOTOROOM_API },
                    body: formData
                }
            );
    
            const stream = response.body;
    
            // Create a Blob object from the stream
            const blob = await new Response(stream).blob();
    
            // Create a FileReader to read the Blob as an array buffer
            const reader = new FileReader();
    
            reader.onload = (event) => {
                const imageData = event.target.result; // Image data as an array buffer
                const blob = new Blob([imageData], { type: 'image/png' });
                const imageUrl = URL.createObjectURL(blob); // Create a temporary URL for the Blob
                dispatch(updateimage(imageUrl))
                setLoading(false)
                navigate('/selection')
            };
    
            reader.onerror = (error) => {
                console.error(error); // Handle errors during reading
            };
    
            // Read the Blob as an array buffer using async/await
            await reader.readAsArrayBuffer(blob);
        } catch (err) {
            setToastMsg(err.message)
            setSeverity('error')
            setOpen(true)
            setLoading(false)
        }

    }

    useEffect(() => {
        if (!file.type)
            navigate('/')
        // eslint-disable-next-line
    }, [])

    return (
        <div className="preview-page home-page">
            <Toast open={open} setOpen={setOpen} severity={severity} timer={3000}>{msg}</Toast>
            <Container>
                <div style={{ height: '15vh' }}></div>
                {file.type && <Flexbox justifyContent="center">
                    <div style={{ width: '300px', height: '400px', border: '5px solid var(--primary)', borderRadius: '20px', boxShadow: '10px -10px 20px #00000030', backgroundImage: `url('${URL.createObjectURL(file)}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                </Flexbox>}
                <Spacebox padding="20px" />
                <Flexbox justifyContent="center">
                    <CustomButton backgroundColor="var(--primary)" className="btn-shadow" style={{ padding: '20px 40px', fontSize: '20px' }} handleClick={removeBG}>
                        {loading ? "Please wait.." : "Continue"}
                    </CustomButton>
                </Flexbox>
                <Spacebox padding="10px" />
                <Flexbox justifyContent="center">
                    <Link style={{ textDecoration: 'none', color: 'var(--primary)' }} to="/"> ← Choose Image</Link>
                </Flexbox>
                <Spacebox padding="20px" />
                <Footer />
                <Spacebox padding="10px" />
            </Container>
        </div>
    );
}

export default Preview;