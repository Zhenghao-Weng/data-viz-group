import React, { useState, useEffect } from 'react';
import { useSpring, a } from '@react-spring/web';
import './index.css';

const VideoHomePage = () => {
    const videoSource = "/video/bw.mp4";
    const words = ['Creative', 'Marketing', 'Architecture', 'Design', 'Video', 'IT', 'Music', 'Publishing'];
    const [index, setIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState(words[0]);

    const fade = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        reset: true,
        reverse: currentWord !== words[index],
        onRest: () => {
            if (currentWord !== words[index]) {
                setCurrentWord(words[index]);
            }
        },
    });


    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % words.length);
        }, 3000); // Change word every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="video-container">
            <video autoPlay="autoplay" loop="loop" muted playsInline className="video">
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="content">
                <h1 style={{ textAlign: 'left', marginLeft: '-500px' }}>
                    <div className='montserrat-font' style={{ fontSize: "57px", }}>{"A Manifesto for UK’s Future".toUpperCase()}</div>
                    <a.div style={fade}>
                        <div style={{ fontSize: '100px', color: 'red' }}>{currentWord.toUpperCase()}</div>
                    </a.div>
                    <div className='montserrat-font' style={{ fontSize: "57px", }}>ECONOMY</div>
                </h1>
            </div>
            <div className="source-info">
                Video source: https://www.youtube.com/watch?v=ijcltwG7DlU
            </div>
        </div>
    );
};

export default VideoHomePage;



