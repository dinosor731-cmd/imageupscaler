import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import ImagePreview from './components/ImagePreview';
import UpscaleOptions from './components/UpscaleOptions';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [originalImage, setOriginalImage] = useState(null);
  const [upscaledImage, setUpscaledImage] = useState(null);
  const [scale, setScale] = useState(2);
  const [loading, setLoading] = useState(false);

  const handleUpscale = async () => {
    if (!originalImage) return;
    setLoading(true);
    // Integrasi dengan Replicate API (ganti dengan API key Anda)
    const formData = new FormData();
    formData.append('file', originalImage);
    formData.append('scale', scale);

    try {
      const response = await fetch('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: {
          'Authorization': 'Token YOUR_REPLICATE_API_KEY', // Ganti dengan API key Anda
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          version: "42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b3", // Real-ESRGAN model ID
          input: {
            image: originalImage, // Anda perlu mengonversi file ke base64 atau URL
            scale: scale,
          },
        }),
      });
      const result = await response.json();
      // Tunggu hasil (polling atau webhook)
      // Untuk demo, asumsikan langsung dapat URL hasil
      setUpscaledImage(result.output); // Sesuaikan dengan response API
    } catch (error) {
      console.error('Error upscaling image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (upscaledImage) {
      const link = document.createElement('a');
      link.href = upscaledImage;
      link.download = 'upscaled_image.png';
      link.click();
    }
  };

  return (
    <div className="app">
      <h1>Image Upscaler</h1>
      <ImageUploader onImageUpload={setOriginalImage} />
      <UpscaleOptions scale={scale} onScaleChange={setScale} />
      <button onClick={handleUpscale} disabled={!originalImage || loading}>
        {loading ? 'Processing...' : 'Upscale'}
      </button>
      {loading && <LoadingSpinner />}
      <ImagePreview original={originalImage} upscaled={upscaledImage} />
      {upscaledImage && (
        <button onClick={handleDownload}>Download Result</button>
      )}
    </div>
  );
}

export default App;