import React, {useState, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import { getVerdict } from "../utils";
import { useNavigate } from "react-router-dom";

export default function Results({ allData }){
    const navigate = useNavigate()
    
    const [searchParams, setSearcParams] = useSearchParams();
    const initialSearch = searchParams.get('search') || '';

    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [filteredData, setFilteredData] = useState([]);
    const [viewMode, setViewMode] = useState('list');

    //Filters
    const [selectedManufacturer, setSelectedManufacturer] = useState('All');
    const [selectedTiers, setSelectedTiers] = useState([]);
    const [maxPrice, setMaxPrice] = useState(5000);
    const [selectedBrands, setSelectedBrands] = useState([]);

    const brands = [...new Set(allData.map(item => item.brand))].filter(Boolean).sort();
    const tiers = [...new Set(allData.map(item => item.tier))].filter(Boolean).sort();

    useEffect(() => {
        const lowerTerm = searchTerm.toLowerCase();

        const results = allData.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(lowerTerm) || item.tier.toLowerCase().includes(lowerTerm);
            const matchesManufacturer = selectedManufacturer === 'All' || item.brand === selectedManufacturer;
            const matchesPrice = (item.price || 0) <= maxPrice;
            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(item.brand);
            const matchesTiers = selectedTiers.length === 0 || selectedTiers.includes(item.tier);

            return matchesSearch && matchesManufacturer && matchesPrice && matchesBrand && matchesTiers;
        });

        setFilteredData(results);
    }, [searchTerm, selectedManufacturer, maxPrice,, selectedBrands,selectedTiers, allData]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setSearcParams({ search: e.target.value });
    };

    const handleCardClick = (id) => {
        navigate(`/product/${id}`);
    };

    const checkFilter = (item, list, setList) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>



            <div style={{ marginBottom: '20px', display: "flex", justifyContent: 'center',}}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ padding: '10px', width: '50%', fontSize: '16px' }}
                    placeholder="Enter Search Terms..."
                />
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ flex: '0 0 250px', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', height: 'fit-content' }}>
                    <h3 style={{marginTop: 0}}>Filters</h3>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: "block", marginBottom: '5px', fontWeight: 'bold' }}>Manufacturer</label>
                        <select
                            value={selectedManufacturer}
                            onChange={(e) => setSelectedManufacturer(e.target.value)}
                            style={{ width: '100%', padding: '8px'}}
                        >
                            <option value='All'>Any</option>
                            <option value='Nvidia'>Nvidia</option>
                            <option value='AMD'>AMD</option>
                            <option value='Intel'>Intel</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Max Price: ${maxPrice}</label>
                        <input
                            type="range"
                            min='0' max='5000' step='10'
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            style={{ width: '100%'}}
                        />
                    </div>

                    <div style={{ marginBottom: '20px'}}>
                        <label style={{ display: "block", marginBottom: '8px', fontWeight: 'bold', }}>Brand</label>
                        <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #eee', padding: '10px', borderRadius: '6px'}}>
                            {brands.map(brand => (
                                <div key={brand} style={{ marginBottom: '5px'}}>
                                    <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
                                        <input 
                                            type="checkbox"
                                            checked={selectedBrands.includes(brand)}
                                            onChange={() => checkFilter(brand, setSelectedBrands,setSelectedBrands)}
                                            style={{ marginRight: '8px'}}
                                        />
                                        {brand}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px'}}>
                        <label style={{ display: "block", marginBottom: '8px', fontWeight: 'bold', }}>Tier</label>
                        <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #eee', padding: '10px', borderRadius: '6px'}}>
                            {tiers.map(tier => (
                                <div key={tiers} style={{ marginBottom: '5px'}}>
                                    <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
                                        <input 
                                            type="checkbox"
                                            checked={selectedTiers.includes(tier)}
                                            onChange={() => checkFilter(tier, setSelectedTiers,setSelectedTiers)}
                                            style={{ marginRight: '8px'}}
                                        />
                                        {tier}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{flex: 1}}>
                        
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', marginBottom:'15px'}}>
                        <h3 style={{ display: 'flex'}}>Showing {filteredData.length} Results.</h3>
                        <div style={{ display: 'flex', gap: '0px', justifyContent: 'right', flex: 1}}>
                            <button
                                onClick={() => setViewMode('list')}
                                style={{ padding: '8px 12px', background: viewMode === 'list' ? '#007bff' : '#eee', color: viewMode === 'list' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                            >
                                ☰ List
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                style={{ padding: '8px 12px', background: viewMode === 'grid' ? '#007bff' : '#eee', color: viewMode === 'grid' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                            >
                                ⊞ Grid
                            </button>
                        </div>
                    </div>

                    {/* List */}
                    {viewMode === 'list' && (
                        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', overflow: 'hidden'}}>
                            {/* Header */}
                            <div style={{ display: 'grid', gridTemplateColumns: '80px 3fr 1fr 1fr 1fr 1fr', padding: '15px', background: '#f8f9fa', borderBottom: '2px solid #eee', fontWeight: 'bold'}}>
                                <div>Image</div>
                                <div>Model Name</div>
                                <div>MSRP</div>
                                <div>Price</div>
                                <div>Verdict</div>
                                <div>Link</div>
                            </div>
                            {/* Data */}
                            {filteredData.map((gpu,index) => {
                                const verdict = getVerdict(gpu.price, gpu.msrp);

                                const bgColor = index % 2 === 0 ? 'white' : '#f0efefff';

                                return(
                                    <div key={gpu.id} style={{ display: 'grid', gridTemplateColumns: '80px 3fr 1fr 1fr 1fr 1fr', padding: '15px', borderBottom: '1px solid #eee', alignItems: "center", backgroundColor: bgColor}}>
                                        
                                        <div style={{display: 'flex', justifyContent: 'center'}}>
                                            <img src={gpu.image} alt={gpu.name} onClick={() => handleCardClick(gpu.id)} style={{ width: '60px', height: '40px', objectFit: 'contain'}} />
                                        </div>
                                        <div>
                                            <div onClick={() => handleCardClick(gpu.id)} style={{ cursor: 'pointer', fontWeight: "bold", fontSize: '1.1rem'}}>{gpu.brand} {gpu.name}</div>
                                            <div style={{ color: '#666', fontSize: '0.85rem'}}>{gpu.brand} | {gpu.tier}</div>
                                        </div>

                                        <div style={{ color: '#555'}}>${gpu.msrp}</div>

                                        <div style={{ fontWeight: 'bold', color: verdict.color === 'gray' ? '#999': '#000'}}>
                                            {gpu.price ? `$${gpu.price}` : '---'}
                                        </div>

                                        <div>
                                            <span style={{
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                color: verdict.color,
                                                fontSize: '0.85rem',
                                                fontWeight: 'bold',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {verdict.text}
                                            </span>
                                        </div>

                                        <div style={{display: 'block', textAlign: 'center'}}>
                                            {(gpu.bestStore !== '---') ? (
                                                <a href={gpu.url} target="_blank" rel="noreferrer" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold'}}>
                                                    Go to {gpu.bestStore} &rarr;
                                                </a>
                                            ) : ("Currently Unavailable")}
                                        </div>

                                    </div>
                                );
                            })}

                        </div>
                    )}

                    {/* Grid */}
                    {viewMode === 'grid' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px'}}>
                            {filteredData.map(gpu => {
                                const verdict = getVerdict(gpu.price, gpu.msrp);
                                return(
                                    <div key={gpu.id} style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'}}>
                                        
                                        <div onClick={() => handleCardClick(gpu.id)} style={{ cursor:'pointer', padding:'10px'}}>
                                            <img src={gpu.image} alt={gpu.name} style={{width: '100%', height:' 160px', objectFit: 'contain'}} />
                                        </div>
                                        
                                        <h4 onClick={()=> handleCardClick(gpu.id)} style={{ cursor:'pointer', margin: '0 0 5px 0'}}>{gpu.brand} {gpu.name}</h4>
                                        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem'}}>{gpu.brand} | {gpu.tier}</p>

                                        <div style={{ margin: '15px 0', padding: '10px', background: '#f0efefff', borderRadius: '5px'}}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                                <span>MSRP:</span><strong>${gpu.msrp}</strong>
                                            </div>
                                            <div style={{display: 'flex',justifyContent: 'space-between', marginTop: '5px'}}>
                                                <span>Best:</span><strong>{gpu.price ? `$${gpu.price}`: '---'}</strong>
                                            </div>
                                        </div>

                                        <div style={{
                                            textAlign: 'center', 
                                            padding: '8px', 
                                            marginBottom: '15px', 
                                            borderRadius: '4px', 
                                            fontWeight: 'bold',
                                            color: verdict.color
                                        }}>
                                            {verdict.text}
                                        </div>

                                        <div>
                                            {(gpu.bestStore !== '---') ? (
                                                <a href={gpu.url} target="_blank" rel="noreferrer" style={{ display: 'block', textAlign:'center',color: '#007bff', textDecoration: 'none', fontWeight: 'bold'}}>
                                                    Go to {gpu.bestStore} &rarr;
                                                </a>
                                            ) : (
                                                <div style={{ textAlign: 'center', fontWeight: 'bold'}}>
                                                    Currently Unavailable
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}