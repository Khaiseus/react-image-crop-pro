# React Image Crop Pro - Example Application

This is a demo application showcasing the React Image Crop Pro component with various configurations.

## Features Demonstrated

### 1. Avatar Upload
- Circular crop mode
- 1:1 aspect ratio
- PNG output with transparency
- 5MB file size limit
- Perfect for profile pictures

### 2. Banner Image
- 16:9 aspect ratio
- Maximum output dimensions (1920x1080)
- High-quality JPEG output
- Rotation controls enabled
- Ideal for hero images

### 3. Social Media
- Multiple aspect ratio presets
- Square (1:1), Portrait (4:5), Story (9:16), Landscape (16:9)
- Free crop option
- Extended zoom range
- 45° rotation increments

### 4. Touch Gestures
- **Pinch-to-Zoom**: Use two fingers to zoom in/out
- **Two-Finger Rotation**: Rotate the image with gesture
- **Pan/Drag**: Single finger to reposition
- Interactive gesture instructions
- Works on touch devices and desktop (with touch emulation)
- Extended zoom range (0.5x - 5x)
- Smooth gesture transitions

### 5. Theming System
- **Pre-defined Themes**: Light, Dark, Modern, and Minimal
- **Light Theme**: Default blue/gray palette with clean aesthetics
- **Dark Theme**: Dark backgrounds with high contrast for better visibility
- **Modern Theme**: Vibrant purple/pink gradients with contemporary styling
- **Minimal Theme**: Subtle grays with minimal styling for clean interfaces
- **Custom Themes**: Ability to create and apply custom theme configurations
- Live theme switching demonstration
- Full CSS variable support for easy customization

### 6. Advanced Configuration
- All output formats (base64, blob, file)
- Custom zoom range (0.5x - 5x)
- 15° rotation increments
- WebP output format
- Custom maximum dimensions
- All available options demonstrated

## Running the Example

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The application will be available at http://localhost:3000

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
example/
├── src/
│   ├── App.tsx          # Main demo application
│   ├── App.css          # Styling
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
└── vite.config.ts       # Vite configuration
```

## Features in the Demo

- **Interactive Navigation**: Switch between different demo configurations
- **Touch Gesture Support**: Pinch-to-zoom and two-finger rotation on touch devices
- **Theming System**: Live theme switching between Light, Dark, Modern, and Minimal themes
- **Real-time Status**: View current upload state
- **Error Handling**: Visual error messages for validation failures
- **Result Preview**: See the cropped image immediately
- **Download Functionality**: Download the cropped image
- **Responsive Design**: Works on desktop and mobile devices
- **Beautiful UI**: Modern gradient design with glassmorphism effects

## Testing Touch Gestures

To test touch gestures on a desktop browser:

1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. Select a mobile device or use "Responsive" mode
4. Navigate to the "Touch Gestures" demo
5. You can now simulate pinch-to-zoom and rotation with your mouse

## Using the Theming System

The demo includes a dedicated "Theming" section that demonstrates:

1. **Pre-defined Themes**: Switch between Light, Dark, Modern, and Minimal themes
2. **Live Preview**: See theme changes applied in real-time
3. **Code Examples**: View the exact code needed to implement each theme

### Available Themes

```tsx
import { ImageCropUpload } from 'react-image-crop-pro';

// Light theme (default)
<ImageCropUpload theme="light" {...props} />

// Dark theme
<ImageCropUpload theme="dark" {...props} />

// Modern theme (vibrant purple/pink)
<ImageCropUpload theme="modern" {...props} />

// Minimal theme (subtle grays)
<ImageCropUpload theme="minimal" {...props} />
```

### Theme Characteristics

- **Light**: Clean blue/gray palette, perfect for standard web applications
- **Dark**: High contrast dark mode, ideal for low-light environments
- **Modern**: Bold purple/pink gradients, great for creative applications
- **Minimal**: Understated grays, suitable for professional interfaces

## Technologies Used

- React 19
- TypeScript
- Vite
- React Image Crop Pro

## Learn More

- [Main Documentation](../README.md)
- [API Reference](../docs/API.md)
- [Theming Documentation](../THEMING.md)
- [GitHub Repository](https://github.com/yourusername/react-image-crop-pro)
