import { Container, Typography } from "@mui/material";
import Spacebox from "../components/styles/Spacebox";
import { useState } from "react";
import Toast from "../components/Toast";
import Flexbox from "../components/Flexbox";
import { useDispatch } from "react-redux";
import { updatefile } from "../features/files";
import { useNavigate } from "react-router-dom";
import '../css/home.css'
import CustomGrid from "../components/styles/Grid";
import CustomButton from "../components/styles/Custombutton";
import { isMobile } from "react-device-detect";
import Footer from "../components/Footer";

const Home = ({ title }) => {
    document.querySelector("title").innerHTML = title

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [msg, setToastMsg] = useState('');

    const [step, setStep] = useState(1)

    const checkFileType = (type) => {
        if (type.includes("image"))
            return true
        else
            return false
    }

    const handleFile = (file) => {
        if (checkFileType(file.type)) {
            dispatch(updatefile(file))
            navigate('/preview')
        } else {
            setOpen(true);
            setSeverity('error');
            setToastMsg('Invalid file type');
        }
    }


    return (
        <div className="home-page">
            <Toast open={open} setOpen={setOpen} severity={severity} timer={3000}>{msg}</Toast>
            <Container>
                <div style={{ height: isMobile ? '45vh' : '35vh' }}></div>
                {step === 1 && <div className="step-one">
                    <CustomGrid gap="20px" grid={isMobile ? "1" : "2"}>
                        <div>
                            {!isMobile && <Typography variant={"h3"}>
                                ALX <br />
                                <b>Selfie Generator</b>
                            </Typography>}
                            {isMobile && <Typography variant={"h4"}>
                                ALX <b>Selfie Generator</b>
                            </Typography>}
                            {isMobile && (<Spacebox padding="10px" />)}
                            <Typography>
                                <b>Take a selfie</b> and <b style={{ color: 'var(--primary)' }}>post it on your Instagram account.</b> with hashtag #AlxSelfieGenerator Ensure that the account is not private and that the selfie is visible to the public.
                            </Typography>
                            <Spacebox padding={isMobile ? "10px" : "20px"} />
                            {!isMobile && <CustomButton handleClick={() => setStep(2)} className="btn-shadow" style={{ padding: '15px 40px', fontSize: '25px' }}>
                                START
                            </CustomButton>}
                        </div>
                        <div>
                            <CustomGrid grid={isMobile ? 1 : 2} gap="10px">
                                <div style={{ background: 'url(/assets/guard1.png)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '20px', height: '350px', width: '100%' }}></div>
                                <div style={{ background: 'url(/assets/guard2.png)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '20px', height: '350px', width: '100%' }}></div>
                            </CustomGrid>
                        </div>
                        {isMobile && <Spacebox padding="10px" />}
                        {isMobile && <CustomButton handleClick={() => setStep(2)} className="btn-shadow" style={{ padding: '15px 40px', fontSize: '25px' }}>
                            START
                        </CustomButton>}
                    </CustomGrid>
                </div>}
                {step === 2 && <div className="step-two">
                    <Typography variant={isMobile ? "h5" : "h4"} textAlign="center">
                        Take or upload a photo of yourself.
                    </Typography>
                    <Typography variant={isMobile ? "h5" : "h4"} textAlign="center">
                        Smile!
                    </Typography>
                    <div style={{ textAlign: 'center' }}>
                        <img src="/assets/smile.png" alt="smile" style={{ width: '50px' }} />
                    </div>
                    <Spacebox padding="10px" />
                    <Flexbox justifyContent="center" alignItems="center">
                        <div className="border10 btn-shadow pointer" onClick={() => navigate('/camera')}>
                            <Spacebox padding="20px">
                                <Flexbox justifyContent="center" alignItems="center">
                                    <img src="/assets/photo-camera.png" alt="camera" style={{ width: '40px' }} />
                                </Flexbox>
                            </Spacebox>
                        </div>
                        <Spacebox padding="20px" />
                        <div className="border10 btn-shadow pointer" style={{ position: 'relative' }}>
                            <Spacebox padding="20px">
                                <Flexbox justifyContent="center" alignItems="center">
                                    <img src="/assets/upload.png" alt="upload" style={{ width: '35px' }} />
                                </Flexbox>
                            </Spacebox>
                            <input
                                type="file"
                                onChange={(e) => handleFile(e.target.files[0])}
                                style={{ position: 'absolute', top: 0, left: 0, height: '75px', opacity: 0, width: 75, cursor: 'pointer' }}
                            />
                        </div>
                    </Flexbox>
                    <Spacebox padding="20px" />
                    <div className="mid margin-auto">
                        <Flexbox justifyContent="center" >
                            <img src="/assets/notice.png" alt="notice" style={{ width: '100%', }} />
                        </Flexbox>
                    </div>
                </div>}
                <Spacebox padding="30px" />
                <Footer />
                <Spacebox padding="10px" />
            </Container>
        </div>
    );
}

export default Home;