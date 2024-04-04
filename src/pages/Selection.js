import { Container, Typography } from '@mui/material';
import Spacebox from '../components/styles/Spacebox';
import '../css/home.css'
import { isMobile } from 'react-device-detect';
import CustomGrid from '../components/styles/Grid';
import CustomButton from '../components/styles/Custombutton';
import Flexbox from '../components/Flexbox';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Selection = () => {

    const [baseImage, setBaseImage] = useState('/assets/base-image1-placeholder.png')
    const [id, setId] = useState(1)
    const navigate = useNavigate()

    return (
        <div className="section-page home-page">
            <Container>
                <div style={{ height: isMobile ? '25vh' : '35vh' }}></div>
                <CustomGrid grid={isMobile ? 1 : 2} gap="20px">
                    <Flexbox justifyContent="center" alignItems="center">
                        <div style={{ borderRadius: '20px', height: '400px', width: '300px', backgroundImage: `url(${baseImage})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '3px solid var(--primary)', boxShadow: '10px -10px 20px #00000032' }}></div>
                    </Flexbox>
                    <div className='mid margin-auto'>
                        <Typography variant={isMobile ? 'h5' : 'h4'}>
                            Choose Your Selfie format!
                        </Typography>
                        <Spacebox padding={isMobile ? "20px" : "40px"} />
                        <div style={{ width: isMobile ? '100%' : '80%' }}>
                            <CustomButton className="fullwidth" style={{ padding: '15px 40px', fontSize: '25px', background: id === 1 ? 'var(--primary)' : 'var(--secondary)', color: id === 1 ? 'white' : '#000' }} handleClick={() => {
                                setBaseImage('/assets/base-image1-placeholder.png')
                                setId(1)
                            }}>
                                Guardian Corvette 1
                            </CustomButton>
                            <Spacebox padding="10px" />
                            <CustomButton className="fullwidth" style={{ padding: '15px 40px', fontSize: '25px', background: id === 2 ? 'var(--primary)' : 'var(--secondary)', color: id === 2 ? 'white' : '#000' }} handleClick={() => {
                                setBaseImage('/assets/base-image2-placeholder.png')
                                setId(2)
                            }}>
                                Guardian Corvette 2
                            </CustomButton>
                            <Spacebox padding="20px" />
                            <CustomGrid grid={2} gap="20px">
                                <CustomButton style={{ padding: '15px', fontSize: '20px' }} handleClick={() => navigate('/editor/' + id)}>
                                    Continue
                                </CustomButton>
                                <CustomButton style={{ padding: '15px', fontSize: '20px', background: '#fff', color: '#000', border: '1px solid #000' }} handleClick={() => navigate('/')}>
                                    Retake photo
                                </CustomButton>
                            </CustomGrid>
                        </div>
                    </div>
                </CustomGrid>
                <Spacebox padding="30px" />
                <Footer />
                <Spacebox padding="10px" />
            </Container>
        </div>
    );
}

export default Selection;