import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome(){
    const [term, setTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/results?search=${term}`);
    };

    return (
        <div style={styles.container}>
            <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}> GPU Price Tracker</h1>
            <p style={{ marginBottom: '40px' }}>Find the best time to upgrade your GPU</p>

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
        backgroundColor: '#f0f2f5',
    },
    form: {
        display: 'flex',
        gap: '10px',
        width: '500px'
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
