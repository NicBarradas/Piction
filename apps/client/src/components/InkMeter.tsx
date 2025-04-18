import React from 'react';

interface InkMeterProps {
  ink: number;
}

const InkMeter: React.FC<InkMeterProps> = ({ ink }) => {
  // Format the ink value nicely (round to nearest integer)
  const formattedInk = Math.round(ink);
  
  return (
    <div className="ink-meter">
      <div className="ink-label">Ink Used:</div>
      <div className="ink-value">{formattedInk} px</div>
    </div>
  );
};

export default InkMeter; 