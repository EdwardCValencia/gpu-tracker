import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getVerdict } from '../utils';
import Logo from '../Components/Logo';

export default function ProductDetails({ allData }){
    const { id } = useParams();
    const navigate = useNavigate();

    const gpu = allData.find(item => item.id === id);

    if (!gpu) return( 
        <div style={{ padding: '100px', textAlign: 'center', color: '#666' }}>
            <h2>GPU not found.</h2>
            <button
                onClick={() => navigate('/results')}
            >
                Return to Results
            </button>
        </div>
    )

    const verdict = getVerdict(gpu.price, gpu.msrp);

    return(
        <div style={{ minHeight: '100vh', paddingBottom: '40px'}}>
            <div style={{ padding: '20px 40px', display:'flex', alignItems: 'center'}}>
                <div style={{ flex: '0 0 250px'}}>
                    <Logo />
                </div>
            </div>

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px'}}>
                <div style={{ marginBottom: '20px'}}>
                    <button
                        onClick={() => navigate(-1)}
                        style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', padding: 0}}
                    >
                        &larr; Back to Results
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '40px', background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', alignItems:'flex-start', flexWrap: 'wrap'}}>

                    <div style={{ flex: '1 1 400px', display:'flex', justifyContent:'center', alignItems:'center', background: '#f8f9fa', borderRadius: '8px', padding: '20px', minHeight: '300px'}}>
                        <img
                            src={gpu.image}
                            alt={gpu.name}
                            style={{ width: '100%', borderRadius: '8px', objectFit: 'contain', maxHeight: '400px'}}
                        />
                    </div>
                    
                    <div style={{ flex: '1 1 400px' }}>
                        <div style={{borderBottom: '1px solid #eee', paddingBottom:'20px', marginBottom: '20px'}}>
                            <h4 style={{margin: '0 0 5px 0', color: '#888', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px'}}>
                                {gpu.brand} | {gpu.series}
                            </h4>
                            <h1 style={{ margin: 0, fontSize:'2.5rem', color: '#333', lineHeight: '1.2' }}>{gpu.name}</h1>
                            <p style={{ margin: '8px 0 0 0', color: '#666', fontSize: '1rem'}}>{gpu.tier}</p>
                        </div>

                        <div style={{background: '#f8f9fa', padding: '25px', borderRadius: '10px', marginBottom:'30px'}}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                                <span>Reference MSRP:</span>
                                <strong style={{fontSize: '1.1rem', color: '#333'}}>${gpu.msrp}</strong>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <span style={{ fontSize: '1rem', color: '#555' }}>Best Current Price:</span>
                                <strong style={{fontSize: '2rem', color: gpu.price ? '#000' : '#999'}}>{gpu.price ? `$${gpu.price}`: '---'}</strong>
                            </div>

                            <div style={{
                                marginTop: '15px',
                                padding: '12px',
                                background: '#eee',
                                color: verdict.color,
                                borderRadius: '6px',
                                textAlign: 'center',
                                fontWeight: 'bold'
                            }}>
                                {verdict.text}
                            </div>
                        </div>

                        <h3 style={{ marginTop: '0', marginBottom: '15px', fontSize: '1.2rem'}}>Availability</h3>

                        {(!gpu.links || gpu.links.length === 0 ) ? (
                            <div style={{ padding: '15px', background: '#fff3cd', color: '#856404', borderRadius: '6px', fontSize: '0.9rem'}}>
                                No Current Listings Found.
                            </div>
                        ) : (
                            <div style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden'}}>
                                <table style={{ width: '100%', borderCollapse:'collapse'}}>
                                    <thead style={{background: '#f1f3f5'}}>
                                        <tr>
                                            <th style={{padding: '12px 15px', textAlign: 'left', fontSize: '0.85rem', color: '#555', textTransform: 'uppercase'}}>Store</th>
                                            <th style={{padding: '12px 15px', textAlign: 'left', fontSize: '0.85rem', color: '#555', textTransform: 'uppercase'}}>Price</th>
                                            <th style={{padding: '12px 15px', textAlign: 'right', fontSize: '0.85rem', color: '#555'}}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gpu.links.map((link, index) => (
                                            <tr key={index} style={{ alignItems: 'center', borderBottom: index !== gpu.links.length -1 ? '1px solid #eee' : 'none', background: 'white'}}>
                                                <td style={{padding: '15px', fontWeight: 'bold', color: '#333'}}>{link.store}</td>
                                                <td style={{ padding: '15px'}}>
                                                    {link.price ? (
                                                        <span style={{ fontWeight: 'bold', color: '#333'}}>${link.price}</span>
                                                    ) : (
                                                        <span style={{ color: '#999', fontSize: '0.9rem'}}>Out of Stock</span>
                                                    )}
                                                </td>
                                                <td style={{ padding: '15px 5px', textAlign: 'right'}}>
                                                    {link.price ? (
                                                        <a
                                                            href={link.url}
                                                            style={{
                                                                display: 'inline-block',
                                                                background: '#007bff',
                                                                color: 'white',
                                                                padding: '8px 20px',
                                                                textDecoration: 'none',
                                                                borderRadius:'50px',
                                                                fontSize:'0.85rem',
                                                                fontWeight:'bold',
                                                                boxShadow:'0 2px 4px rgba(0,0,0,0.2)'
                                                            }}
                                                            >View at {link.store}</a>
                                                    ) : (
                                                        <a 
                                                            href={link.url}
                                                            style={{ color: '#007bff', fontSize: '0.85rem', textDecoration: 'none'}}
                                                        >
                                                            Check
                                                            </a>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

/* <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
            <Link to="/results" style={{ textDecoration: 'none', color: '#555', marginBottom: '20px', display: 'inline-block' }}>
                &larr; Back
            </Link>

            <div style={{ display: 'flex', gap: '40px', background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}}>
                <div style={{ flex: 1}}>
                    <img src={gpu.image} alt={gpu.name} style={{width: '100%', borderRadius: '8px', objectFit: 'contain', maxHeight: '400px'}} />
                </div>

                <div style={{ flex: 1}}>
                    <h1 style={{marginTop: 0}}>{gpu.brand} {gpu.name}</h1>
                    <h3 style={{ color: '#666' }}>{gpu.series} - {gpu.tier}</h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', margin: '20px 0'}}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold'}}>
                            MSRP: ${gpu.msrp}
                        </div>
                        <div style={{
                            padding: '5px 10px',
                            borderRadius: '5px',
                            color: 'verdict.color',
                            fontWeight: 'bold'
                        }}>
                            {verdict.text}
                        </div>
                    </div>

                    <h3>Retailers</h3>
                    {gpu.links.length === 0 ? (
                        <p>No Stock Found</p>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse'}}>
                            <thead>
                                <tr style={{ background: '#f8f9fa', textAlign: 'left'}}>
                                    <th style={{ padding: '10px'}}>Store</th>
                                    <th style={{ padding: '10px'}}>Price</th>
                                    <th style={{ padding: '10px'}}>Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gpu.links.map((link, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid #eee'}}>
                                        <td style={{ padding: '10px'}}>{link.store}</td>
                                        <td style={{ padding: '10px', fontWeight: 'bold'}}>
                                            {link.price ? `$${link.price}` : 'Out of Stock'}
                                        </td>
                                        <td style={{ padding: '10px'}}>
                                            {link.price ? (
                                                <a
                                                    href={link.url}
                                                    target="_blank"
                                                    rel='noreferrer'
                                                    style={{ background: '#007bff', color: 'white', padding: '6px 12px', textDecoration: 'none', borderRadius: '4px', fontSize: '0.9rem'}}
                                                >
                                                    Buy Now
                                                </a>
                                            ) : (
                                                <span style={{ color: '#999', fontSize: '0.9rem'}}>Unavailable</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                </div>
            </div>
        </div>*/