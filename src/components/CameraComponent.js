import { useRef } from 'react'
import Webcam from 'react-webcam'
import Flexbox from './Flexbox'
import Spacebox from './styles/Spacebox'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updatefile } from '../features/files'

const CameraComponent = () => {
    const webcamRef = useRef(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const capture = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const file = await getImageAsFile(imageSrc)
        dispatch(updatefile(file))
        navigate('/preview')
    }

    async function getImageAsFile(imageSrc) {
        const response = await fetch(imageSrc); // Assuming imageSrc is a base64 encoded data URL
        const blob = await response.blob();

        // Get the image format from the data URL (optional)
        const imageType = imageSrc.split(';')[0].split('/')[1];  // Extract MIME type (e.g., "image/jpeg")

        const file = new File([blob], `webcam-image.${imageType || 'jpeg'}`, { type: imageType || 'image/jpeg' });
        return file;
    }

    const isPortrait = window.matchMedia("(orientation: portrait)").matches;

    return (
        <div className="camera-component">
            <Webcam className={isPortrait ? 'portrait' : "landscape"} audio={false} ref={webcamRef} screenshotFormat='image/jpeg' />
            <Spacebox padding="10px" />
            <Flexbox justifyContent="center" alignItems="center">
                <div onClick={capture} style={{ width: '60px', height: '60px', borderRadius: '1000px', background: '#d8d8d8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '1000px', background: 'var(--primary)' }}></div>
                </div>
            </Flexbox>
        </div>
    );
}

export default CameraComponent;