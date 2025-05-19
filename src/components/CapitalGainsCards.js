import React from 'react';
import './CapitalGainsCards.css';

const CapitalGainsCards = ({ preHarvesting, afterHarvesting }) => {
  // Calculate net gains
  const preHarvestingShortTermNet = preHarvesting.stcg.profits - preHarvesting.stcg.losses;
  const preHarvestingLongTermNet = preHarvesting.ltcg.profits - preHarvesting.ltcg.losses;
  const preHarvestingTotal = preHarvestingShortTermNet + preHarvestingLongTermNet;
  
  const afterHarvestingShortTermNet = afterHarvesting.stcg.profits - afterHarvesting.stcg.losses;
  const afterHarvestingLongTermNet = afterHarvesting.ltcg.profits - afterHarvesting.ltcg.losses;
  const afterHarvestingTotal = afterHarvestingShortTermNet + afterHarvestingLongTermNet;
  
  // Calculate savings
  const savings = preHarvestingTotal - afterHarvestingTotal;
  const showSavings = savings > 0;

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }).format(value).replace('₹', '₹');
  };

  return (
    <div className="capital-gains-container">
      <div className="capital-gains-card pre-harvesting">
        <h2>Pre Harvesting</h2>
        
        <div className="gains-table">
          <div className="table-header">
            <div className="label"></div>
            <div className="value">Short-term</div>
            <div className="value">Long-term</div>
          </div>
          
          <div className="table-row">
            <div className="label">Profits</div>
            <div className="value">{formatCurrency(preHarvesting.stcg.profits)}</div>
            <div className="value">{formatCurrency(preHarvesting.ltcg.profits)}</div>
          </div>
          
          <div className="table-row">
            <div className="label">Losses</div>
            <div className="value">{formatCurrency(preHarvesting.stcg.losses)}</div>
            <div className="value">{formatCurrency(preHarvesting.ltcg.losses)}</div>
          </div>
          
          <div className="table-row net">
            <div className="label">Net Capital Gains</div>
            <div className="value">{formatCurrency(preHarvestingShortTermNet)}</div>
            <div className="value">{formatCurrency(preHarvestingLongTermNet)}</div>
          </div>
        </div>
        
        <div className="total-gains">
          <div className="label">Realised Capital Gains:</div>
          <div className="value">{formatCurrency(preHarvestingTotal)}</div>
        </div>
      </div>
      
      <div className="capital-gains-card after-harvesting">
        <h2>After Harvesting</h2>
        
        <div className="gains-table">
          <div className="table-header">
            <div className="label"></div>
            <div className="value">Short-term</div>
            <div className="value">Long-term</div>
          </div>
          
          <div className="table-row">
            <div className="label">Profits</div>
            <div className="value">{formatCurrency(afterHarvesting.stcg.profits)}</div>
            <div className="value">{formatCurrency(afterHarvesting.ltcg.profits)}</div>
          </div>
          
          <div className="table-row">
            <div className="label">Losses</div>
            <div className="value">{formatCurrency(afterHarvesting.stcg.losses)}</div>
            <div className="value">{formatCurrency(afterHarvesting.ltcg.losses)}</div>
          </div>
          
          <div className="table-row net">
            <div className="label">Net Capital Gains</div>
            <div className="value">{formatCurrency(afterHarvestingShortTermNet)}</div>
            <div className="value">{formatCurrency(afterHarvestingLongTermNet)}</div>
          </div>
        </div>
        
        <div className="total-gains">
          <div className="label">Effective Capital Gains:</div>
          <div className="value">{formatCurrency(afterHarvestingTotal)}</div>
        </div>
        
        {showSavings && (
          <div className="savings-message">
            You're going to save {formatCurrency(savings)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CapitalGainsCards;
