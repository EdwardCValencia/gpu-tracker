import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Components/Logo";

export default function Welcome(){
    const [term, setTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/results?search=${term}`);
    };

    return (
        <div style={styles.container}>
            <div style={styles.logoWrapper}>
                <div style={{ transform: 'scale(3)', transformOrigin: 'center'}}>
                    <Logo />
                </div>
            </div>
            <p style={styles.subtitle}>Check prices. Compare models. Buy smart.</p>

            <form onSubmit={handleSearch} style={styles.form}>
                <input 
                    type="text"
                    placeholder="Ex: RTX 5090, ASUS, B580, etc..."
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Search</button>
            </form>
        </div>
    )
}

const styles = {
    container: { 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '20px',
        fontFamily: "'Inter', sans-serif"
    },
    logoWrapper: {
        marginBottom: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
    },
    subtitle: {
        marginBottom: '40px',
        fontSize: '1.2.rem',
        color: '#555',
        textAlign: 'center',
        maxWidth: '600px',
        lineHeight: '1.5'
    },
    form: {
        display: 'flex',
        gap: '10px',
        width: '100%',
        maxWidth: '600px',
        filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1)'
    },
    input: {
        flex: 1,
        padding: '15px',
        fontSize: '18px',
        borderRadius: '8px',
        border: '1px solid #ccc'
    },
    button: {
        padding: '15px 30px',
        fontSize: '18px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer'
    }
}
