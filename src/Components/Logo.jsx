// src/Logo.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
    const navigate = useNavigate();

    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            textDecoration: 'none',
            userSelect: 'none',
        },
        chipIcon: {
            width: '32px',
            height: '32px',
            backgroundColor: '#2c3e50',
            borderRadius: '4px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 10px rgba(0, 123, 255, 0.3)',
            border: '1px solid #34495e',
        },
        chipTrace: {
            width: '18px',
            height: '2px',
            backgroundColor: '#007bff',
            position: 'absolute',
            borderRadius: '2px',
            boxShadow: '0 0 8px #007bff', 
        },
        chipPinTop: { position: 'absolute', top: '-2px', width: '4px', height: '2px', background: '#34495e' },
        chipPinBottom: { position: 'absolute', bottom: '-2px', width: '4px', height: '2px', background: '#34495e' },
        
        textContainer: {
            fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif", 
            lineHeight: '1',
            display: 'flex',
            flexDirection: 'column', 
            justifyContent: 'center',
        },
        gpuText: {
            fontWeight: '900',
            fontSize: '18px',
            color: '#2c3e50', 
            letterSpacing: '-0.5px',
        },
        trackerText: {
            fontWeight: '500', 
            fontSize: '11px',
            color: '#007bff', 
            textTransform: 'uppercase',
            letterSpacing: '2px', 
        },
    };

    return (
        <div style={styles.container} onClick={() => navigate('/')}>
            
            <div style={styles.chipIcon}>
                <div style={{...styles.chipPinTop, left: '8px'}}></div>
                <div style={{...styles.chipPinTop, right: '8px'}}></div>
                <div style={{...styles.chipPinBottom, left: '8px'}}></div>
                <div style={{...styles.chipPinBottom, right: '8px'}}></div>
                
                <div style={styles.chipTrace}></div>
            </div>

            <div style={styles.textContainer}>
                <span style={styles.gpuText}>GPU</span>
                <span style={styles.trackerText}>TRACKER</span>
            </div>
        </div>
    );
};

export default Logo;