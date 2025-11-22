# React Image Crop Pro

[![npm version](https://img.shields.io/npm/v/react-image-crop-pro.svg)](https://www.npmjs.com/package/react-image-crop-pro)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/mashrulhaque/react-image-crop-pro/pulls)

> **The only React image crop component with built-in upload, mobile touch gestures, and enterprise-grade accessibility**

A modern, professional-grade React component for image cropping with drag-and-drop upload, advanced touch gestures (pinch-zoom & rotation), and full TypeScript support. Perfect for avatars, profile pictures, banner images, and any image editing needs.

## 🎮 Live Demo

**[Try it out live →](https://react-image-crop-pro.easyappdev.com/)**

Experience all features in action: drag-and-drop upload, circular crops, multiple themes, touch gestures, and more!

## ✨ Features

### 🎯 Core Features
- **📤 Drag & Drop Upload** - Intuitive file selection with `react-dropzone` integration
- **✂️ Easy Cropping** - Smooth cropping powered by `react-easy-crop`
- **📱 Touch Gestures** - Pinch-to-zoom and two-finger rotation on mobile devices
- **🔄 Rotation Controls** - Rotate images with customizable step angles
- **🔍 Zoom Controls** - Smooth zoom with customizable min/max range
- **📐 Aspect Ratios** - Multiple presets (1:1, 16:9, 4:3, free) and custom options

### 🎨 Advanced Features
- **👁️ Live Preview** - Real-time crop preview as you adjust
- **⭕ Circular Crops** - Perfect for avatar/profile picture uploads
- **🎨 Grid Overlay** - Visual guides for better composition
- **📏 Multiple Output Formats** - Export as base64, Blob, File, or all formats
- **🎯 Smart Resizing** - Automatic output size constraints with aspect ratio preservation
- **🖼️ Image Validation** - MIME type whitelist and content validation for security

### 💎 Quality & Developer Experience
- **♿ Accessible** - WCAG 2.1 AA compliant with full keyboard support and ARIA labels
- **📘 TypeScript** - Full type definitions and IntelliSense support
- **🪶 Lightweight** - Optimized bundle size with all dependencies included
- **🎨 Themeable** - Pre-defined themes (Light, Dark, Modern, Minimal) and custom theme support
- **🎨 Customizable** - Extensive props for configuration and styling
- **🧪 Well Tested** - Comprehensive test suite with high coverage
- **🔒 Secure** - MIME type validation and content validation built-in

## 📦 Installation

```bash
npm install react-image-crop-pro
```

```bash
yarn add react-image-crop-pro
```

```bash
pnpm add react-image-crop-pro
```

**Important:** Don't forget to import the CSS file:

```tsx
import 'react-image-crop-pro/dist/react-image-crop-pro.css';
// or
import 'react-image-crop-pro/style.css';
```

## 🚀 Quick Start

```tsx
import { ImageCropUpload } from 'react-image-crop-pro';
import 'react-image-crop-pro/dist/react-image-crop-pro.css';

function App() {
  const handleCropComplete = (result) => {
    console.log('Cropped image:', result);
    // result.base64 - Data URL
    // result.blob - Blob object
    // result.file - File object
    // result.width, result.height - Dimensions
  };

  return (
    <ImageCropUpload
      onCropComplete={handleCropComplete}
    />
  );
}
```

## 📖 Usage Examples

### Avatar Upload (Circular Crop)

Perfect for user profile pictures with circular cropping:

```tsx
<ImageCropUpload
  onCropComplete={handleCropComplete}
  aspectRatio={1}
  circularCrop
  showPreview
  maxFileSize={5 * 1024 * 1024} // 5MB
  outputType="image/png"
/>
```

### Banner Image (16:9)

Great for hero images, banners, and social media covers:

```tsx
<ImageCropUpload
  onCropComplete={handleCropComplete}
  aspectRatio={16 / 9}
  outputFormat="blob"
  outputMaxWidth={1920}
  outputMaxHeight={1080}
/>
```

### Social Media Posts

Multiple aspect ratio options for different platforms:

```tsx
<ImageCropUpload
  onCropComplete={handleCropComplete}
  aspectRatioPresets={[
    { label: 'Square (1:1)', value: 1 },
    { label: 'Portrait (4:5)', value: 4 / 5 },
    { label: 'Story (9:16)', value: 9 / 16 },
    { label: 'Landscape (16:9)', value: 16 / 9 },
    { label: 'Free', value: 'free' }
  ]}
  enableRotation
  rotationStep={90}
/>
```

### Advanced Configuration

Full control over all features:

```tsx
<ImageCropUpload
  // Callbacks
  onCropComplete={handleCropComplete}
  onError={handleError}
  onChange={(state) => console.log('State:', state)}

  // Upload constraints
  maxFileSize={10 * 1024 * 1024} // 10MB
  allowedFormats={['image/jpeg', 'image/png', 'image/webp', 'image/gif']}

  // Crop settings
  aspectRatio={1}
  circularCrop
  showGrid

  // Zoom & rotation
  minZoom={1}
  maxZoom={5}
  initialZoom={1}
  enableRotation
  rotationStep={90}

  // Touch gestures (mobile)
  enablePinchZoom
  enableTouchRotation

  // Output settings
  outputFormat="all" // base64, blob, and file
  outputQuality={0.95}
  outputType="image/jpeg"
  outputMaxWidth={2048}
  outputMaxHeight={2048}

  // UI customization
  className="my-custom-class"
  showPreview
  previewSize={200}
/>
```

## 📚 API Reference

### Main Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onCropComplete` | `(result: CropResult) => void` | **Required** | Callback when crop is complete |
| `onError` | `(error: ImageCropError) => void` | - | Error callback |
| `onChange` | `(state: UploadState) => void` | - | State change callback |
| `aspectRatio` | `number` | `1` | Fixed aspect ratio (width/height) |
| `aspectRatioPresets` | `AspectRatioPreset[]` | Default presets | Available aspect ratio options |
| `circularCrop` | `boolean` | `false` | Enable circular crop |
| `showGrid` | `boolean` | `true` | Show crop grid overlay |

### Upload Settings

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxFileSize` | `number` | `10485760` (10MB) | Max file size in bytes |
| `allowedFormats` | `string[]` | `['image/jpeg', 'image/png', 'image/webp', 'image/gif']` | Allowed MIME types |

### Zoom & Rotation

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `minZoom` | `number` | `1` | Minimum zoom level |
| `maxZoom` | `number` | `3` | Maximum zoom level |
| `initialZoom` | `number` | `1` | Initial zoom level |
| `enableRotation` | `boolean` | `true` | Enable rotation control |
| `rotationStep` | `number` | `90` | Rotation step in degrees |

### Touch Gestures (Mobile)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enablePinchZoom` | `boolean` | `true` | Enable pinch-to-zoom gesture |
| `enableTouchRotation` | `boolean` | `true` | Enable two-finger rotation |

### Output Settings

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `outputFormat` | `'base64' \| 'blob' \| 'file' \| 'all'` | `'base64'` | Output format(s) |
| `outputQuality` | `number` | `0.95` | JPEG quality (0-1) |
| `outputType` | `'image/png' \| 'image/jpeg' \| 'image/webp'` | `'image/jpeg'` | Output MIME type |
| `outputMaxWidth` | `number` | - | Max output width |
| `outputMaxHeight` | `number` | - | Max output height |

### Styling & Theming

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `ThemeName \| ThemeConfig` | `'light'` | Theme name or custom theme configuration |
| `className` | `string` | - | Custom CSS class for container |
| `cropAreaClassName` | `string` | - | Custom CSS class for crop area |
| `previewClassName` | `string` | - | Custom CSS class for preview |
| `showPreview` | `boolean` | `true` | Show live preview |
| `previewSize` | `number` | `150` | Preview size in pixels |

### Types

```typescript
interface CropResult {
  base64?: string;      // Data URL (when outputFormat includes 'base64' or 'all')
  blob?: Blob;          // Blob object (when outputFormat includes 'blob' or 'all')
  file?: File;          // File object (when outputFormat includes 'file' or 'all')
  width: number;        // Final image width
  height: number;       // Final image height
}

type UploadState =
  | 'idle'              // Ready for file upload
  | 'uploading'         // Reading file
  | 'cropping'          // User is cropping
  | 'processing'        // Generating output
  | 'complete'          // Crop complete
  | 'error';            // Error occurred

type ImageCropError =
  | { type: 'FILE_TOO_LARGE'; maxSize: number }
  | { type: 'INVALID_FILE_TYPE'; allowedTypes: string[] }
  | { type: 'FILE_READ_ERROR'; message: string }
  | { type: 'CROP_ERROR'; message: string }
  | { type: 'CANVAS_ERROR'; message: string };

interface AspectRatioPreset {
  label: string;        // Display label
  value: number | 'free'; // Aspect ratio or 'free'
  icon?: ReactNode;     // Optional icon
}
```

## 🛡️ Error Handling

Handle errors gracefully with the `onError` callback:

```tsx
const handleError = (error: ImageCropError) => {
  switch (error.type) {
    case 'FILE_TOO_LARGE':
      toast.error(`File too large. Max: ${error.maxSize / 1024 / 1024}MB`);
      break;
    case 'INVALID_FILE_TYPE':
      toast.error(`Invalid type. Allowed: ${error.allowedTypes.join(', ')}`);
      break;
    case 'FILE_READ_ERROR':
    case 'CROP_ERROR':
    case 'CANVAS_ERROR':
      toast.error(`Error: ${error.message}`);
      break;
  }
};

<ImageCropUpload
  onCropComplete={handleCropComplete}
  onError={handleError}
/>
```

## 🎨 Customization

### Custom Labels

Customize all UI text for internationalization:

```tsx
<ImageCropUpload
  onCropComplete={handleCropComplete}
  labels={{
    dropzone: {
      idle: 'Drag & drop your image here or click to browse',
      active: 'Release to upload',
      reject: 'Invalid file type'
    },
    buttons: {
      cancel: 'Cancel',
      crop: 'Apply Crop',
      retry: 'Try Again'
    },
    controls: {
      zoom: 'Zoom',
      rotation: 'Rotation',
      aspectRatio: 'Aspect Ratio'
    }
  }}
/>
```

### Custom Styling

Apply your own styles:

```tsx
<ImageCropUpload
  className="my-cropper"
  cropAreaClassName="my-crop-area"
  previewClassName="my-preview"
  onCropComplete={handleCropComplete}
/>
```

Or override CSS variables:

```css
.my-cropper {
  --cropper-primary: #007bff;
  --cropper-border: #dee2e6;
  --cropper-radius: 8px;
  --cropper-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

## 🎨 Theming System

The component comes with a powerful theming system that allows you to customize colors, spacing, borders, typography, and other visual properties without writing CSS.

### Pre-defined Themes

Choose from four professionally designed themes:

#### Light Theme (default)
Clean, modern look with blue accents - perfect for standard web applications.

```tsx
<ImageCropUpload theme="light" onCropComplete={handleCrop} />
```

**Features:**
- Primary color: Blue (#4299e1)
- Background: White
- Best for: Light-themed applications

#### Dark Theme
Dark mode with high contrast and vibrant accents - ideal for low-light environments.

```tsx
<ImageCropUpload theme="dark" onCropComplete={handleCrop} />
```

**Features:**
- Primary color: Light blue (#63b3ed)
- Background: Dark gray (#1a202c)
- Best for: Dark-mode applications, night usage

#### Modern Theme
Vibrant purple and pink gradients with contemporary styling - great for creative applications.

```tsx
<ImageCropUpload theme="modern" onCropComplete={handleCrop} />
```

**Features:**
- Primary color: Purple (#8b5cf6)
- Secondary: Pink (#ec4899)
- Best for: Creative, trendy applications

#### Minimal Theme
Clean, subtle design with minimal colors and borders - suitable for professional interfaces.

```tsx
<ImageCropUpload theme="minimal" onCropComplete={handleCrop} />
```

**Features:**
- Primary color: Black (#171717)
- Background: White
- Best for: Minimalist, professional applications

### Custom Themes

Create custom themes by passing a configuration object:

#### Simple Color Customization

```tsx
<ImageCropUpload
  theme={{
    colors: {
      primary: '#10b981',
      primaryHover: '#059669',
      text: '#1f2937',
    }
  }}
  onCropComplete={handleCrop}
/>
```

#### Comprehensive Custom Theme

```tsx
<ImageCropUpload
  theme={{
    name: 'custom-brand',
    colors: {
      primary: '#10b981',
      primaryHover: '#059669',
      primaryActive: '#047857',
      primaryLight: '#d1fae5',
      background: '#ffffff',
      text: '#1f2937',
      border: '#e5e7eb',
    },
    spacing: {
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
    },
    borders: {
      radius: {
        md: '8px',
        lg: '12px',
      }
    }
  }}
  onCropComplete={handleCrop}
/>
```

#### Extending a Base Theme

```tsx
import { createCustomTheme } from 'react-image-crop-pro';

const myTheme = createCustomTheme('dark', {
  colors: {
    primary: '#f59e0b', // Override primary color
    primaryHover: '#d97706',
  },
  spacing: {
    lg: '2rem', // Override large spacing
  }
});

<ImageCropUpload theme={myTheme} onCropComplete={handleCrop} />
```

### Dynamic Theme Switching

```tsx
import { useState } from 'react';
import { ImageCropUpload, ThemeName } from 'react-image-crop-pro';

function ThemeDemo() {
  const [theme, setTheme] = useState<ThemeName>('light');

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value as ThemeName)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="modern">Modern</option>
        <option value="minimal">Minimal</option>
      </select>

      <ImageCropUpload
        theme={theme}
        onCropComplete={(result) => console.log(result)}
      />
    </div>
  );
}
```

### Theme Configuration Reference

#### Colors

All available color properties:

```typescript
interface ThemeColors {
  // Primary colors
  primary: string;
  primaryHover: string;
  primaryActive: string;
  primaryLight: string;

  // Secondary colors
  secondary: string;
  secondaryHover: string;

  // State colors
  success: string;
  successLight: string;
  error: string;
  errorLight: string;
  errorBorder: string;

  // Neutral colors
  background: string;
  backgroundAlt: string;
  surface: string;
  border: string;
  borderHover: string;

  // Text colors
  text: string;
  textSecondary: string;
  textOnPrimary: string;

  // Component-specific
  dropzoneBackground: string;
  dropzoneBorder: string;
  cropperBackground: string;
  sliderThumb: string;
}
```

#### Spacing Scale

```typescript
interface ThemeSpacing {
  xs: string;   // Extra small (default: 0.25rem)
  sm: string;   // Small (default: 0.5rem)
  md: string;   // Medium (default: 1rem)
  lg: string;   // Large (default: 1.5rem)
  xl: string;   // Extra large (default: 2rem)
  xxl: string;  // 2X large (default: 3rem)
}
```

#### Borders

```typescript
interface ThemeBorders {
  radius: {
    sm: string;   // Small radius (default: 4px)
    md: string;   // Medium radius (default: 6px)
    lg: string;   // Large radius (default: 8px)
    full: string; // Full circle (default: 9999px)
  };
  width: {
    thin: string;   // Thin border (default: 1px)
    normal: string; // Normal border (default: 2px)
    thick: string;  // Thick border (default: 4px)
  };
  style: string; // Border style (default: 'solid')
}
```

### CSS Custom Properties

The theming system uses CSS custom properties (CSS variables) which are applied at runtime. All variables use the `--ricu-` prefix.

#### Variable Naming Convention

```css
--ricu-colors-primary
--ricu-colors-primaryHover
--ricu-spacing-md
--ricu-borders-radius-lg
--ricu-typography-fontSize-base
```

#### Manual CSS Overrides

```css
/* Global override */
:root {
  --ricu-colors-primary: #10b981;
  --ricu-spacing-md: 1.25rem;
}

/* Scoped override */
.my-custom-cropper {
  --ricu-colors-primary: #ef4444;
  --ricu-borders-radius-lg: 16px;
}
```

### Theme Utility Functions

```typescript
import {
  resolveTheme,
  mergeTheme,
  applyTheme,
  getThemeColor,
  isDarkTheme,
  themeToCSSVariables,
} from 'react-image-crop-pro';

// Resolve a theme prop to a full theme object
const theme = resolveTheme('dark');

// Merge two themes
const customTheme = mergeTheme(lightTheme, {
  colors: { primary: '#10b981' }
});

// Check if a theme is dark
const isDark = isDarkTheme(theme); // true/false

// Get a specific color
const primaryColor = getThemeColor(theme, 'primary');

// Convert theme to CSS variables object
const cssVars = themeToCSSVariables(theme);
```

### Example Themes

#### Brand-Colored Theme

```tsx
<ImageCropUpload
  theme={{
    colors: {
      primary: '#EA4335',        // Google Red
      primaryHover: '#D33B2C',
      primaryLight: '#FDECEA',
      text: '#202124',
      border: '#DADCE0',
    }
  }}
  onCropComplete={handleCrop}
/>
```

#### High-Contrast Accessibility Theme

```tsx
<ImageCropUpload
  theme={{
    colors: {
      primary: '#000000',
      primaryHover: '#333333',
      background: '#FFFFFF',
      text: '#000000',
      border: '#000000',
    },
    borders: {
      width: {
        thin: '2px',
        normal: '3px',
        thick: '5px',
      }
    }
  }}
  onCropComplete={handleCrop}
/>
```

#### Compact Theme

```tsx
<ImageCropUpload
  theme={{
    spacing: {
      xs: '0.125rem',
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
    },
    borders: {
      radius: {
        sm: '2px',
        md: '3px',
        lg: '4px',
      }
    }
  }}
  onCropComplete={handleCrop}
/>
```

### TypeScript Support

The theming system is fully typed:

```typescript
import {
  Theme,
  ThemeConfig,
  ThemeName,
  ThemeProp,
  ThemeColors,
  ThemeSpacing,
  ThemeBorders,
} from 'react-image-crop-pro';

// Use a theme name
const themeName: ThemeName = 'dark';

// Create a custom theme configuration
const themeConfig: ThemeConfig = {
  colors: {
    primary: '#10b981',
  }
};

// Full theme object
const theme: Theme = {
  name: 'my-theme',
  colors: { /* ... */ },
  spacing: { /* ... */ },
  // ... all required properties
};
```

### Best Practices

1. **Use Pre-defined Themes First**: Start with a pre-defined theme and customize only what's needed
2. **Maintain Consistency**: Keep color relationships consistent (e.g., hover should be darker than normal)
3. **Accessibility**: Ensure sufficient color contrast for text and interactive elements
4. **Performance**: Avoid creating new theme objects on every render; use `useMemo` or define themes outside components
5. **TypeScript**: Leverage TypeScript types for autocomplete and type safety

## ♿ Accessibility

Built with accessibility as a priority:

- ✅ Full keyboard navigation support
- ✅ ARIA labels and descriptions on all interactive elements
- ✅ Screen reader friendly
- ✅ Focus management
- ✅ High contrast mode support
- ✅ WCAG 2.1 AA compliant
- ✅ Automated accessibility tests

### Keyboard Shortcuts

- `Tab` / `Shift+Tab` - Navigate between controls
- `Enter` / `Space` - Activate buttons and open file dialog
- `Arrow Keys` - Adjust sliders (zoom, rotation)
- `Escape` - Cancel operation

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📦 Bundle Size

- Lightweight and optimized for production
- Includes all dependencies (react-easy-crop, react-dropzone)
- Zero additional dependencies required
- Tree-shakeable exports

## 📱 Mobile Support

Special attention to mobile experience:

- **Touch gestures**: Pinch-to-zoom and two-finger rotation
- **Responsive design**: Works on all screen sizes
- **Performance**: Optimized for mobile devices
- **Native feel**: Smooth interactions like native apps

## 🔒 Security

Built-in security features:

- ✅ MIME type whitelist validation
- ✅ File content validation (not just extension)
- ✅ Size validation before processing
- ✅ No external URL loading
- ✅ No eval() or dangerous APIs

## 📝 TypeScript

Full TypeScript support with exported types:

```typescript
import {
  ImageCropUpload,
  ImageCropUploadProps,
  CropResult,
  ImageCropError,
  UploadState,
  AspectRatioPreset,
  // Theme types
  Theme,
  ThemeConfig,
  ThemeName,
  ThemeProp,
  ThemeColors,
  ThemeSpacing,
  ThemeBorders,
  ThemeTypography,
  ThemeShadows,
  ThemeTransitions,
  ThemeZIndex,
} from 'react-image-crop-pro';
```

## 🧪 Testing

Comprehensive test coverage:

- ✅ Unit tests for all utilities
- ✅ Component integration tests
- ✅ Accessibility tests (jest-axe)
- ✅ Performance tests
- ✅ Run tests with `npm test`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © Mashrul Haque

## 🙏 Acknowledgments

Built on top of excellent open-source libraries:

- [react-easy-crop](https://github.com/ValentinH/react-easy-crop) - Smooth cropping functionality
- [react-dropzone](https://github.com/react-dropzone/react-dropzone) - File upload handling

## 💬 Support

- 📖 [Documentation](./docs/API.md)
- 🐛 [GitHub Issues](https://github.com/mashrulhaque/react-image-crop-pro/issues)
- 💻 [Examples](./example)
- ⭐ Star us on [GitHub](https://github.com/mashrulhaque/react-image-crop-pro)

## 📊 Stats

- ![npm downloads](https://img.shields.io/npm/dm/react-image-crop-pro.svg)
- ![GitHub stars](https://img.shields.io/github/stars/mashrulhaque/react-image-crop-pro.svg)
- ![GitHub issues](https://img.shields.io/github/issues/mashrulhaque/react-image-crop-pro.svg)

---

<div align="center">

**Made with ❤️ for the React community**

[⭐ Star on GitHub](https://github.com/mashrulhaque/react-image-crop-pro) • [📦 View on npm](https://www.npmjs.com/package/react-image-crop-pro) • [🐛 Report Bug](https://github.com/mashrulhaque/react-image-crop-pro/issues) • [✨ Request Feature](https://github.com/mashrulhaque/react-image-crop-pro/issues)

</div>
