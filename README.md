# Harford Bridge International School - React App

A modern React application for Harford Bridge International School built with React, Tailwind CSS, and Vite.

## Features

- ✨ Modern, responsive design with Tailwind CSS
- 📱 Mobile-friendly navigation with hamburger menu
- 🎠 Image carousel/gallery
- 📋 Admission form with comprehensive validation
- 🗺️ Embedded Google Maps
- ⚡ Fast development with Vite
- 🎨 Beautiful animations and transitions

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── MultipleIntelligencies.jsx
│   ├── Gallery.jsx
│   ├── AdmissionForm.jsx
│   └── Footer.jsx
├── App.jsx
├── index.jsx
└── index.css
public/
└── index.html
```

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Technologies Used

- **React 19** - UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

## Form Validation

The admission form includes comprehensive validation for:
- Names (letters only, min 2 characters)
- Email addresses
- Phone numbers
- Date of birth (age restrictions: 2-120 years)
- Required fields
- Address completeness

## License

ISC
