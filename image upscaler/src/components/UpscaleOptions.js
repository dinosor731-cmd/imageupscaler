import React from 'react';

function UpscaleOptions({ scale, onScaleChange }) {
  return (
    <div className="options">
      <label>
        Scale:
        <select value={scale} onChange={(e) => onScaleChange(Number(e.target.value))}>
          <option value={2}>2x</option>
          <option value={4}>4x</option>
        </select>
      </label>
    </div>
  );
}

export default UpscaleOptions;