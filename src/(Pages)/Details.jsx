import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVerdict } from '../utils';

export default function ProductDetails({ allData }){
    const { id } = useParams();

    const gpu = allData.find(item => item.id === id);

    if (!gpu) return <div style={{ padding: '50px', textAlign: 'center' }}>GPU not found.</div>;

    const verdict = getVerdict(gpu.price, gpu.msrp);

    return(
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
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
        </div>
    );
}