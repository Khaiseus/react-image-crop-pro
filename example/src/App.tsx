import { useState } from 'react';
import { ImageCropUpload, CropResult, ImageCropError, UploadState, ThemeName } from 'react-image-crop-pro';
import 'react-image-crop-pro/dist/react-image-crop-pro.css';
import './App.css';

type DemoType = 'avatar' | 'banner' | 'social' | 'touch-gestures' | 'theming' | 'advanced';

function App() {
  const [activeDemo, setActiveDemo] = useState<DemoType>('avatar');
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>('light');

  const handleCropComplete = (result: CropResult) => {
    console.log('Crop complete:', result);
    setCroppedImage(result.base64 || null);
    setErrorMessage('');
  };

  const handleError = (error: ImageCropError) => {
    console.error('Error:', error);

    switch (error.type) {
      case 'FILE_TOO_LARGE':
        setErrorMessage(`File too large. Max size: ${error.maxSize / 1024 / 1024}MB`);
        break;
      case 'INVALID_FILE_TYPE':
        setErrorMessage(`Invalid file type. Allowed: ${error.allowedTypes.join(', ')}`);
        break;
      case 'FILE_READ_ERROR':
      case 'CROP_ERROR':
      case 'CANVAS_ERROR':
        setErrorMessage(error.message);
        break;
    }
  };

  const handleStateChange = (state: UploadState) => {
    setUploadState(state);
    if (state === 'idle') {
      setErrorMessage('');
    }
  };

  const renderDemo = () => {
    switch (activeDemo) {
      case 'avatar':
        return (
          <div className="demo-container">
            <div className="demo-info">
              <h2>Avatar Upload</h2>
              <p>Perfect for profile pictures. Features circular crop and 1:1 aspect ratio.</p>
              <ul>
                <li>Circular crop enabled</li>
                <li>1:1 aspect ratio</li>
                <li>5MB max file size</li>
                <li>PNG output with transparency</li>
                <li>Touch gestures enabled (pinch-to-zoom & rotate)</li>
              </ul>
            </div>
            <div className="demo-cropper">
              <ImageCropUpload
                onCropComplete={handleCropComplete}
                onError={handleError}
                onChange={handleStateChange}
                aspectRatio={1}
                circularCrop
                showPreview
                maxFileSize={5 * 1024 * 1024}
                outputType="image/png"
                outputQuality={0.95}
              />
            </div>
          </div>
        );

      case 'banner':
        return (
          <div className="demo-container">
            <div className="demo-info">
              <h2>Banner Image</h2>
              <p>Ideal for hero images and banners with 16:9 aspect ratio.</p>
              <ul>
                <li>16:9 aspect ratio</li>
                <li>Maximum output: 1920x1080</li>
                <li>High quality JPEG</li>
                <li>Rotation enabled</li>
              </ul>
            </div>
            <div className="demo-cropper">
              <ImageCropUpload
                onCropComplete={handleCropComplete}
                onError={handleError}
                onChange={handleStateChange}
                aspectRatio={16 / 9}
                outputFormat="blob"
                outputMaxWidth={1920}
                outputMaxHeight={1080}
                outputQuality={0.92}
                enableRotation
                rotationStep={90}
              />
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="demo-container">
            <div className="demo-info">
              <h2>Social Media Posts</h2>
              <p>Multiple aspect ratio options for different social media platforms.</p>
              <ul>
                <li>Multiple aspect ratios</li>
                <li>Square (1:1)</li>
                <li>Portrait (4:5)</li>
                <li>Story (9:16)</li>
                <li>Free crop</li>
              </ul>
            </div>
            <div className="demo-cropper">
              <ImageCropUpload
                onCropComplete={handleCropComplete}
                onError={handleError}
                onChange={handleStateChange}
                aspectRatioPresets={[
                  { label: 'Square', value: 1 },
                  { label: 'Portrait', value: 4 / 5 },
                  { label: 'Landscape', value: 16 / 9 },
                  { label: 'Story', value: 9 / 16 },
                  { label: 'Free', value: 'free' }
                ]}
                enableRotation
                rotationStep={45}
                minZoom={0.5}
                maxZoom={5}
              />
            </div>
          </div>
        );

      case 'touch-gestures':
        return (
          <div className="demo-container">
            <div className="demo-info">
              <h2>Touch Gestures Demo</h2>
              <p>Experience native mobile gestures on your device.</p>
              <div className="gesture-instructions">
                <h4>Try these gestures:</h4>
                <ul>
                  <li><strong>Pinch to Zoom:</strong> Use two fingers to pinch in/out to zoom the image</li>
                  <li><strong>Two-Finger Rotation:</strong> Place two fingers on the image and rotate them to rotate the image</li>
                  <li><strong>Pan:</strong> Drag with one finger to reposition the image</li>
                </ul>
                <div className="gesture-note">
                  <strong>Note:</strong> On desktop, enable touch emulation in Chrome DevTools (F12 → Toggle device toolbar)
                </div>
              </div>
              <ul>
                <li>✅ Pinch-to-zoom enabled</li>
                <li>✅ Touch rotation enabled</li>
                <li>Extended zoom range (0.5x - 5x)</li>
                <li>Smooth gesture transitions</li>
                <li>Works alongside slider/button controls</li>
              </ul>
            </div>
            <div className="demo-cropper">
              <ImageCropUpload
                onCropComplete={handleCropComplete}
                onError={handleError}
                onChange={handleStateChange}
                aspectRatio={4 / 3}
                minZoom={0.5}
                maxZoom={5}
                enableRotation
                rotationStep={15}
                enablePinchZoom={true}
                enableTouchRotation={true}
                showGrid
              />
            </div>
          </div>
        );

      case 'theming':
        return (
          <div className="demo-container">
            <div className="demo-info">
              <h2>Theming System</h2>
              <p>Customize the component appearance with pre-defined themes or create your own.</p>
              <div className="theme-selector">
                <h4>Select a Theme:</h4>
                <div className="theme-buttons">
                  {(['light', 'dark', 'modern', 'minimal'] as ThemeName[]).map((theme) => (
                    <button
                      key={theme}
                      className={`theme-button ${selectedTheme === theme ? 'active' : ''}`}
                      onClick={() => setSelectedTheme(theme)}
                    >
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <ul>
                <li><strong>Light:</strong> Default blue/gray palette</li>
                <li><strong>Dark:</strong> Dark backgrounds with high contrast</li>
                <li><strong>Modern:</strong> Vibrant purple/pink gradients</li>
                <li><strong>Minimal:</strong> Subtle grays with minimal styling</li>
              </ul>
              <div className="theme-code">
                <h4>Usage:</h4>
                <pre><code>{`<ImageCropUpload theme="${selectedTheme}" />`}</code></pre>
              </div>
            </div>
            <div className="demo-cropper">
              <ImageCropUpload
                onCropComplete={handleCropComplete}
                onError={handleError}
                onChange={handleStateChange}
                theme={selectedTheme}
                aspectRatioPresets={[
                  { label: 'Free', value: 'free' },
                  { label: '1:1', value: 1 },
                  { label: '4:3', value: 4 / 3 },
                  { label: '16:9', value: 16 / 9 }
                ]}
                enableRotation
                showPreview
              />
            </div>
          </div>
        );

      case 'advanced':
        return (
          <div className="demo-container">
            <div className="demo-info">
              <h2>Advanced Configuration</h2>
              <p>Fully customized with all available options.</p>
              <ul>
                <li>All output formats</li>
                <li>Custom zoom range (0.5x - 5x)</li>
                <li>15° rotation increments</li>
                <li>WebP output format</li>
                <li>Custom max dimensions</li>
                <li>Touch gestures enabled</li>
              </ul>
            </div>
            <div className="demo-cropper">
              <ImageCropUpload
                onCropComplete={handleCropComplete}
                onError={handleError}
                onChange={handleStateChange}
                aspectRatioPresets={[
                  { label: 'Free', value: 'free' },
                  { label: '1:1', value: 1 },
                  { label: '4:3', value: 4 / 3 },
                  { label: '16:9', value: 16 / 9 },
                  { label: '21:9', value: 21 / 9 }
                ]}
                minZoom={0.5}
                maxZoom={5}
                initialZoom={1}
                enableRotation
                rotationStep={15}
                outputFormat="all"
                outputQuality={0.95}
                outputType="image/webp"
                outputMaxWidth={2048}
                outputMaxHeight={2048}
                showPreview
                previewSize={200}
                showGrid
                enablePinchZoom
                enableTouchRotation
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>React Image Crop Pro</h1>
        <p className="subtitle">A powerful, accessible React component for image cropping</p>
        <div className="links">
          <a href="https://github.com/yourusername/react-image-crop-pro" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.npmjs.com/package/react-image-crop-pro" target="_blank" rel="noopener noreferrer">
            npm
          </a>
        </div>
      </header>

      <div className="content">
        <aside className="sidebar">
          <h3>Examples</h3>
          <nav className="nav">
            <button
              className={`nav-button ${activeDemo === 'avatar' ? 'active' : ''}`}
              onClick={() => setActiveDemo('avatar')}
            >
              Avatar Upload
            </button>
            <button
              className={`nav-button ${activeDemo === 'banner' ? 'active' : ''}`}
              onClick={() => setActiveDemo('banner')}
            >
              Banner Image
            </button>
            <button
              className={`nav-button ${activeDemo === 'social' ? 'active' : ''}`}
              onClick={() => setActiveDemo('social')}
            >
              Social Media
            </button>
            <button
              className={`nav-button ${activeDemo === 'touch-gestures' ? 'active' : ''}`}
              onClick={() => setActiveDemo('touch-gestures')}
            >
              Touch Gestures
            </button>
            <button
              className={`nav-button ${activeDemo === 'theming' ? 'active' : ''}`}
              onClick={() => setActiveDemo('theming')}
            >
              Theming
            </button>
            <button
              className={`nav-button ${activeDemo === 'advanced' ? 'active' : ''}`}
              onClick={() => setActiveDemo('advanced')}
            >
              Advanced
            </button>
          </nav>

          <div className="status">
            <h3>Status</h3>
            <div className="status-item">
              <span className="status-label">State:</span>
              <span className={`status-badge ${uploadState}`}>{uploadState}</span>
            </div>
            {errorMessage && (
              <div className="error-message" role="alert">
                {errorMessage}
              </div>
            )}
          </div>
        </aside>

        <main className="main">
          {renderDemo()}

          {croppedImage && (
            <div className="result-section">
              <h3>Cropped Result</h3>
              <div className="result-container">
                <img src={croppedImage} alt="Cropped" className="result-image" />
                <div className="result-actions">
                  <button
                    className="download-button"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = croppedImage;
                      link.download = 'cropped-image.jpg';
                      link.click();
                    }}
                  >
                    Download Image
                  </button>
                  <button
                    className="clear-button"
                    onClick={() => setCroppedImage(null)}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <footer className="footer">
        <p>
          Built with ❤️ using{' '}
          <a href="https://github.com/ValentinH/react-easy-crop" target="_blank" rel="noopener noreferrer">
            react-easy-crop
          </a>{' '}
          and{' '}
          <a href="https://github.com/react-dropzone/react-dropzone" target="_blank" rel="noopener noreferrer">
            react-dropzone
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
