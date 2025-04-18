import React from 'react';

interface InkMeterProps {
  ink: number;
}

const InkMeter: React.FC<InkMeterProps> = ({ ink }) => {
  // Format the ink value with one decimal place
  const formattedInk = ink.toFixed(1);
  
  return (
    <div className="ink-meter">
      <div className="ink-label">Ink Used:</div>
      <div className="ink-value">{formattedInk} px</div>
    </div>
  );
};

export default InkMeter; 