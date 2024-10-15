import React from 'react';
import loading from './loading.gif';

const Spinner = ({ altText = 'Loading...', className = 'my-3' }) => {
  return (
    <div className={`text-center ${className}`}>
      <img src={loading} alt={altText} className="img-fluid" />
    </div>
  );
};

export default Spinner;
