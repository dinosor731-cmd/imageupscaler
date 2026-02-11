import React from 'react';

function LoadingSpinner() {
  return (
    <div className="spinner">
      <div className="loader"></div>
      <p>Upscaling image...</p>
    </div>
  );
}

export default LoadingSpinner;