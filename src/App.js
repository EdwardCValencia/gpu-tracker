import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from './(Pages)/Welcome'
import Results from './(Pages)/Results'
import { flattenData } from "./utils";
import ProductDetails from "./(Pages)/Details";

function App(){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('output.json')
      .then(response => {
        if (!response.ok) {
          throw new Error("Could not find Data File");
        }
        return response.json()
      })
      .then(jsonData => {
        const flat = flattenData(jsonData);
        setData(flat);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading data:', err);
        setError('Failed to load GPU data. Please try agian later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}> Loading Latest Pricing Data. One Moment...</div>
  }
  if (error) {
    return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}> {error}</div>
  }

  return (
    <Router>
      <div className="App" style={styles.appContainer}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/results" element={<Results allData={data} />} />
          <Route path="/product/:id" element={<ProductDetails allData={data} />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  appContainer: {
    fontFamily: "'Inter', 'Arial', sans-serif",
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%,#c3cfe2 100%',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover'
  }
}

export default App;