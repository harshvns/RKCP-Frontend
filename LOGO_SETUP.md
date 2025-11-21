# Logo Setup Instructions

## Required Logo Files

Place the following logo files in the `frontend/public/` directory:

### 1. RKCP Project Logo
- **File name options**: `rkcp-logo.png`, `rkcp-logo.svg`, or `rkcp-logo.jpg`
- **Location**: `frontend/public/rkcp-logo.png` (or .svg/.jpg)
- **Usage**: Displayed in the header next to the title
- **Recommended size**: 50px height (width will auto-scale)

### 2. College Logo (MMM University)
- **File name options**: `college-logo.png`, `college-logo.svg`, or `college-logo.jpg`
- **Location**: `frontend/public/college-logo.png` (or .svg/.jpg)
- **Usage**: Background watermark on the About page
- **Recommended size**: 600x600px (will be scaled and made transparent)

## File Format Support

The application will automatically try different file extensions:
- `.png` (first attempt)
- `.svg` (fallback)
- `.jpg` (final fallback)

## Quick Setup

1. Copy your RKCP logo to: `frontend/public/rkcp-logo.png`
2. Copy your college logo to: `frontend/public/college-logo.png`
3. Restart the development server if running
4. The logos should appear automatically

## Troubleshooting

If logos don't appear:
1. Check that files are in `frontend/public/` (not `frontend/src/`)
2. Verify file names match exactly (case-sensitive)
3. Check browser console for 404 errors
4. Ensure the development server is running
5. Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

