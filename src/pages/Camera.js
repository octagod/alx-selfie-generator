import { Container } from "@mui/material";
import '../css/home.css'
import CameraComponent from "../components/CameraComponent";


const Camera = () => {
    return (
        <div className="camera-page home-page">
            <Container>
                <div style={{ height: '15vh' }}></div>
                <div className="mid margin-auto">
                    <CameraComponent />
                </div>
            </Container>
        </div>
    );
}

export default Camera;