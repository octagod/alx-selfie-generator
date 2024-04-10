import { Container, IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Spacebox from "../components/styles/Spacebox";
import { useEffect, useState } from "react";
import Flexbox from "../components/Flexbox";
import { Add, ArrowBack, Remove, RotateLeft, RotateRight } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import Toast from "../components/Toast";
import CustomButton from "../components/styles/Custombutton";
import CustomGrid from "../components/styles/Grid";
import { isMobile } from "react-device-detect";
import '../css/home.css'

const Editor = ({ title }) => {
    document.querySelector('title').innerHTML = title
    const image = useSelector(state => state.image.value)

    const { id } = useParams()

    const [translateX, setTranslateX] = useState(0)
    const [translateY, setTranslateY] = useState(0)

    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)

    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [msg, setToastMsg] = useState('');

    const navigate = useNavigate()

    const [engine, setEngine] = useState(null);


    const changeXVal = (action) => {
        let x = translateX
        if (action === "add") {
            x = x + 5
            setTranslateX(x)
        } else {
            x = x - 5
            setTranslateX(x)
        }
    }

    const changeYVal = (action) => {
        let y = translateY
        if (action === "add") {
            y = y + 5
            setTranslateY(y)
        } else {
            y = y - 5
            setTranslateY(y)
        }
    }

    const handleDownload = (div) => {
        div.classList.add('remove-br')
        document.querySelector("div.editor div").classList.add('remove-br')
        html2canvas(div).then(canvas => {
            var myImage = canvas.toDataURL();
            downloadURI(myImage, `sg_${Date.now()}`);
            setToastMsg("Downloaded successfully")
            setOpen(true)
            setSeverity('success')
            div.classList.remove('remove-br')
            document.querySelector("div.editor div").classList.remove('remove-br')
        });
    }

    function downloadURI(uri, name) {
        var link = document.createElement("a");

        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        //after creating link you should delete dynamic link
        link.remove()
    }

    const moveUp = (event) => {
        clearInterval(engine)
        if (isMobile)
            event.preventDefault() // Prevents context menu in mobile
        let y = translateY
        const newEngine = setInterval(() => {
            y = y - 5
            setTranslateY(y)
            console.log("running", y)
        }, 300);
        setEngine(newEngine)
    }

    const moveDown = (event) => {
        clearInterval(engine)
        if (isMobile)
            event.preventDefault() // Prevents context menu in mobile
        let y = translateY
        const newEngine = setInterval(() => {
            y = y + 5
            setTranslateY(y)
            console.log("running", y)
        }, 300);
        setEngine(newEngine)
    }

    const moveLeft = (event) => {
        clearInterval(engine)
        if (isMobile)
            event.preventDefault() // Prevents context menu in mobile
        let x = translateX
        const newEngine = setInterval(() => {
            x = x - 5
            setTranslateX(x)
            console.log("running", x)
        }, 300);
        setEngine(newEngine)
    }

    const moveRight = (event) => {
        clearInterval(engine)
        if (isMobile)
            event.preventDefault() // Prevents context menu in mobile
        let x = translateX
        const newEngine = setInterval(() => {
            x = x + 5
            setTranslateX(x)
            console.log("running", x)
        }, 300);
        setEngine(newEngine)
    }

    const stopEngine = () => {
        clearInterval(engine)
        setEngine(null)
    }

    useEffect(() => {
        if (image.length < 1) {
            navigate('/')
        }
        return () => clearInterval(engine)
        // eslint-disable-next-line
    }, [])


    return (
        <div className="editor-page home-page">
            <Toast open={open} setOpen={setOpen} severity={severity} timer={3000}>{msg}</Toast>
            <Container>
                <div style={{ height: isMobile ? '40vh' : '35vh' }}></div>
                <div>
                    <IconButton onClick={() => navigate('/selection')}>
                        <ArrowBack style={{ color: 'var(--primary)' }} />
                    </IconButton>
                </div>
                {isMobile && <Spacebox padding="10px" />}
                <CustomGrid grid={isMobile ? 1 : 2} gap="20px">
                    <Flexbox justifyContent="center" alignItems="center">
                        <div className="editor">
                            <div className="img-1" style={{ backgroundImage: `url(/assets/base-image${id ?? 1}.png)` }}></div>
                            <img className="img-2" src={image} style={{ transform: `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotate}deg)`, }} alt="" />
                            <div className="img-3" style={{ backgroundImage: `url(/assets/base-image${id ?? 1}-cust.png)` }}></div>
                        </div>
                    </Flexbox>
                    <Flexbox justifyContent="center" alignItems="center">
                        <div className="controls" style={{ width: '100%' }}>
                            {!isMobile && <Typography variant={isMobile ? 'h5' : 'h4'}>
                                Reposition your selfie
                            </Typography>}
                            {!isMobile && <Spacebox padding="20px" />}
                            <div className="">
                                <Flexbox justifyContent="center">
                                    <IconButton onClick={() => changeYVal("minus")} onMouseDown={moveUp} onMouseUp={stopEngine} onTouchStart={moveUp} onTouchEnd={stopEngine}>
                                        <img src="/assets/arrow-up.png" alt="arrow-up" className="btn-shadow" style={{ width: isMobile ? '55px' : '70px', borderRadius: '10px' }} />
                                    </IconButton>
                                </Flexbox>
                                <Flexbox justifyContent="space-between" alignItems="center" style={{ width: '70%', margin: 'auto' }}>
                                    <IconButton onClick={() => changeXVal("minus")} onMouseDown={moveLeft} onTouchStart={moveLeft} onMouseUp={stopEngine} onTouchEnd={stopEngine}>
                                        <img src="/assets/arrow-left.png" alt="arrow-up" className="btn-shadow" style={{ width: isMobile ? '55px' : '70px', borderRadius: '10px' }} />
                                    </IconButton>
                                    {isMobile && (
                                        <IconButton onClick={() => changeYVal("add")} onMouseDown={moveDown} onTouchStart={moveDown} onMouseUp={stopEngine} onTouchEnd={stopEngine}>
                                            <img src="/assets/arrow-down.png" alt="arrow-up" className="btn-shadow" style={{ width: isMobile ? '55px' : '70px', borderRadius: '10px' }} />
                                        </IconButton>
                                    )}
                                    <IconButton onClick={() => changeXVal("add")} onMouseDown={moveRight} onTouchStart={moveRight} onMouseUp={stopEngine} onTouchEnd={stopEngine}>
                                        <img src="/assets/arrow-right.png" alt="arrow-up" className="btn-shadow" style={{ width: isMobile ? '55px' : '70px', borderRadius: '10px' }} />
                                    </IconButton>
                                </Flexbox>
                                {!isMobile && <Flexbox justifyContent="center">
                                    <IconButton onClick={() => changeYVal("add")} onMouseDown={moveDown} onTouchStart={moveDown} onMouseUp={stopEngine} onTouchEnd={stopEngine}>
                                        <img src="/assets/arrow-down.png" alt="arrow-up" className="btn-shadow" style={{ width: isMobile ? '55px' : '70px', borderRadius: '10px' }} />
                                    </IconButton>
                                </Flexbox>}
                            </div>
                            <Spacebox padding="10px" />
                            <Flexbox justifyContent="space-between" alignItems="center">
                                <Remove style={{ color: 'var(--primary)' }} />
                                <Spacebox padding="5px" />
                                <input
                                    type="range"
                                    min={0}
                                    max={3}
                                    step={0.1}
                                    value={scale}
                                    onChange={(e) => setScale(e.target.value)}
                                />
                                <Spacebox padding="5px" />
                                <Add style={{ color: 'var(--primary)' }} />
                            </Flexbox>
                            {isMobile && <Spacebox padding="5px" />}
                            {!isMobile && <Spacebox padding="10px" />}
                            <Flexbox justifyContent="space-between" alignItems="center">
                                <RotateLeft style={{ color: 'var(--primary)' }} />
                                <Spacebox padding="5px" />
                                <input
                                    type="range"
                                    min={-90}
                                    max={90}
                                    step={1}
                                    value={rotate}
                                    onChange={(e) => setRotate(e.target.value)}
                                />
                                <Spacebox padding="5px" />
                                <RotateRight style={{ color: 'var(--primary)' }} />
                            </Flexbox>
                            <Spacebox padding="20px" />
                            <CustomGrid grid={2} gap="20px">
                                <CustomButton backgroundColor="var(--primary)" className="fullwidth" handleClick={() => handleDownload(document.querySelector("div.editor"))} style={{ padding: '15px 0px', fontSize: '20px', }}>
                                    Download
                                </CustomButton>
                                <CustomButton style={{ padding: '10px', fontSize: '20px', background: '#fff', color: '#000', border: '1px solid #000' }} handleClick={() => navigate('/')}>
                                    Retake photo
                                </CustomButton>
                            </CustomGrid>
                        </div>
                    </Flexbox>
                </CustomGrid>
                <Spacebox padding="10px" />
            </Container>
        </div>
    );
}

export default Editor;