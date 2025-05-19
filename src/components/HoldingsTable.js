import React, { useState } from 'react';
import './HoldingsTable.css';

const HoldingsTable = ({ holdings, onSelectionChange }) => {
  const [selectedHoldings, setSelectedHoldings] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showAll, setShowAll] = useState(false);
  
  // Display only first 5 holdings unless showAll is true
  const displayedHoldings = showAll ? holdings : holdings.slice(0, 5);

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    
    if (isChecked) {
      const allIds = holdings.map(holding => holding.coin);
      setSelectedHoldings(allIds);
      onSelectionChange(allIds);
    } else {
      setSelectedHoldings([]);
      onSelectionChange([]);
    }
  };

  const handleSelectHolding = (e, holdingId) => {
    const isChecked = e.target.checked;
    
    let newSelected;
    if (isChecked) {
      newSelected = [...selectedHoldings, holdingId];
    } else {
      newSelected = selectedHoldings.filter(id => id !== holdingId);
      setSelectAll(false);
    }
    
    setSelectedHoldings(newSelected);
    onSelectionChange(newSelected);
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }).format(value).replace('₹', '₹');
  };

  // Format number with commas
  const formatNumber = (value, decimals = 2) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals
    }).format(value);
  };

  return (
    <div className="holdings-section">
      <h2>Holdings</h2>
      
      <div className="holdings-table">
        <div className="table-header">
          <div className="checkbox-cell">
            <input 
              type="checkbox" 
              checked={selectAll}
              onChange={handleSelectAll}
            />
          </div>
          <div className="asset-cell">Asset</div>
          <div className="holdings-cell">
            Holdings
            <div className="subtext">Avg Buy Price</div>
          </div>
          <div className="price-cell">Current Price</div>
          <div className="short-term-cell">
            Short-Term
            <div className="sort-icon">▲</div>
          </div>
          <div className="long-term-cell">Long-Term</div>
          <div className="amount-cell">Amount to Sell</div>
        </div>
        
        <div className="table-body">
          {displayedHoldings.map(holding => {
            const isSelected = selectedHoldings.includes(holding.coin);
            
            // Determine if gains are positive or negative
            const shortTermClass = holding.stcg.gain > 0 ? 'positive' : holding.stcg.gain < 0 ? 'negative' : '';
            const longTermClass = holding.ltcg.gain > 0 ? 'positive' : holding.ltcg.gain < 0 ? 'negative' : '';
            
            return (
              <div className={`table-row ${isSelected ? 'selected' : ''}`} key={holding.coin}>
                <div className="checkbox-cell">
                  <input 
                    type="checkbox" 
                    checked={isSelected}
                    onChange={(e) => handleSelectHolding(e, holding.coin)}
                  />
                </div>
                
                <div className="asset-cell">
                  <div className="asset-info">
                    <img src={holding.logo} alt={holding.coin} className="asset-logo" />
                    <div>
                      <div className="asset-name">{holding.coinName}</div>
                      <div className="asset-symbol">{holding.coin}</div>
                    </div>
                  </div>
                </div>
                
                <div className="holdings-cell">
                  <div>{formatNumber(holding.totalHolding)}</div>
                  <div className="subtext">{formatCurrency(holding.averageBuyPrice)}</div>
                </div>
                
                <div className="price-cell">
                  {formatCurrency(holding.currentPrice)}
                </div>
                
                <div className={`short-term-cell ${shortTermClass}`}>
                  <div>{formatCurrency(holding.stcg.gain)}</div>
                  <div className="subtext">{formatNumber(holding.stcg.balance)}</div>
                </div>
                
                <div className={`long-term-cell ${longTermClass}`}>
                  <div>{formatCurrency(holding.ltcg.gain)}</div>
                  <div className="subtext">{formatNumber(holding.ltcg.balance)}</div>
                </div>
                
                <div className="amount-cell">
                  {isSelected ? formatNumber(holding.totalHolding) : '-'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {holdings.length > 5 && (
        <div className="view-all" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'View Less' : 'View All'}
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;
