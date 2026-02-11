import React from 'react';

function ImagePreview({ original, upscaled }) {
  return (
    <div className="preview">
      {original && (
        <div>
          <h3>Original</h3>
          <img src={URL.createObjectURL(original)} alt="Original" />
        </div>
      )}
      {upscaled && (
        <div>
          <h3>Upscaled</h3>
          <img src={upscaled} alt="Upscaled" />
        </div>
      )}
    </div>
  );
}

export default ImagePreview;