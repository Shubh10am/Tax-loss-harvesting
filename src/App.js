import React, { useState, useEffect } from 'react';
import './App.css';
import CapitalGainsCards from './components/CapitalGainsCards';
import HoldingsTable from './components/HoldingsTable';
import { fetchHoldings, fetchCapitalGains } from './api/api';

function App() {
    const [holdings, setHoldings] = useState([]);
    const [capitalGains, setCapitalGains] = useState(null);
    const [selectedHoldings, setSelectedHoldings] = useState([]);
    const [afterHarvestingGains, setAfterHarvestingGains] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                setIsLoading(true);
                const [holdingsData, gainsData] = await Promise.all([
                    fetchHoldings(),
                    fetchCapitalGains()
                ]);
                setHoldings(holdingsData);
                setCapitalGains(gainsData);
                setAfterHarvestingGains(gainsData); // Initially the same
                setIsLoading(false);
            } catch (err) {
                setError('Failed to fetch data. Please try again later.');
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleHoldingSelection = (selectedIds) => {
        setSelectedHoldings(selectedIds);

        // Calculate new capital gains based on selections
        if (capitalGains) {
            const newGains = {...capitalGains };

            // Reset to original values
            newGains.stcg = {...capitalGains.stcg };
            newGains.ltcg = {...capitalGains.ltcg };

            // Add gains/losses from selected holdings
            selectedIds.forEach(id => {
                const holding = holdings.find(h => h.coin === id);
                if (holding) {
                    // Short-term gains
                    if (holding.stcg.gain > 0) {
                        newGains.stcg.profits += holding.stcg.gain;
                    } else if (holding.stcg.gain < 0) {
                        newGains.stcg.losses += Math.abs(holding.stcg.gain);
                    }

                    // Long-term gains
                    if (holding.ltcg.gain > 0) {
                        newGains.ltcg.profits += holding.ltcg.gain;
                    } else if (holding.ltcg.gain < 0) {
                        newGains.ltcg.losses += Math.abs(holding.ltcg.gain);
                    }
                }
            });

            setAfterHarvestingGains(newGains);
        }
    };

    if (isLoading) {
        return <div className = "loading" > Loading... < /div>;
    }

    if (error) {
        return <div className = "error" > { error } < /div>;
    }

    return ( <
        div className = "App" >
        <
        header className = "App-header" >
        <
        h1 > Tax Optimisation < span className = "how-it-works" > How it works ? < /span></h
        1 >
        <
        div className = "disclaimer-container" >
        <
        div className = "disclaimer-header" >
        <
        span className = "info-icon" > ⓘ < /span> <
        span > Important Notes And Disclaimers < /span> <
        span className = "dropdown-icon" > ▼ < /span> <
        /div> <
        /div> <
        /header> <
        main > {
            capitalGains && afterHarvestingGains && ( <
                CapitalGainsCards preHarvesting = { capitalGains }
                afterHarvesting = { afterHarvestingGains }
                />
            )
        }

        {
            holdings.length > 0 && ( <
                HoldingsTable holdings = { holdings }
                onSelectionChange = { handleHoldingSelection }
                />
            )
        } <
        /main> <
        /div>
    );
}

export default App;