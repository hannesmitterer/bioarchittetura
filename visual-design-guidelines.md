# Visual Design Guidelines for Bioarchitettura Websites
## Specific Implementation Guide for Modern Architectural Style

### Color Specifications

#### Primary Palette
```css
/* Sustainable Architecture Color Palette */
:root {
  --primary-forest-green: #2D5530;
  --primary-stone-gray: #7D8288;
  --primary-sky-blue: #87CEEB;
  
  --secondary-warm-white: #FAFAFA;
  --secondary-charcoal: #36454F;
  --secondary-terracotta: #E2725B;
  
  --accent-sage-green: #9CAF88;
  --accent-earth-brown: #8B7355;
  --accent-soft-gray: #E8E8E8;
}
```

#### Usage Guidelines
- **Headers**: `--primary-forest-green` for main navigation and section titles
- **Body Text**: `--secondary-charcoal` for optimal readability
- **Backgrounds**: `--secondary-warm-white` with `--accent-soft-gray` for sections
- **Call-to-Actions**: `--secondary-terracotta` for buttons and links
- **Architectural Elements**: `--primary-stone-gray` for borders and structural elements

### Typography Recommendations

#### Font Stack Hierarchy
```css
/* Modern Architectural Typography */
--heading-font: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
--body-font: 'Crimson Text', Georgia, 'Times New Roman', serif;
--accent-font: 'Oswald', 'Franklin Gothic', sans-serif;
--monospace-font: 'Source Code Pro', 'Monaco', monospace;
```

#### Size Scale
```css
--text-xs: 0.75rem;    /* 12px - Small captions */
--text-sm: 0.875rem;   /* 14px - Meta information */
--text-base: 1rem;     /* 16px - Body text */
--text-lg: 1.125rem;   /* 18px - Large body text */
--text-xl: 1.25rem;    /* 20px - Small headings */
--text-2xl: 1.5rem;    /* 24px - Section headings */
--text-3xl: 1.875rem;  /* 30px - Page headings */
--text-4xl: 2.25rem;   /* 36px - Hero headings */
--text-5xl: 3rem;      /* 48px - Display headings */
```

### Layout Grid System

#### Architectural-Inspired Grid
```css
/* 12-column grid inspired by architectural blueprints */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
}

/* Responsive breakpoints */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
```

#### Spacing System
```css
/* Consistent spacing based on 8px baseline */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
```

### Component Design Patterns

#### Modern Card Design
```css
.bio-card {
  background: var(--secondary-warm-white);
  border: 1px solid var(--accent-soft-gray);
  border-radius: 8px;
  padding: var(--space-6);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.bio-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
```

#### Architectural Navigation
```css
.bio-nav {
  background: var(--secondary-warm-white);
  border-bottom: 3px solid var(--primary-forest-green);
  padding: var(--space-4) 0;
}

.bio-nav-item {
  font-family: var(--heading-font);
  font-weight: 500;
  color: var(--secondary-charcoal);
  text-decoration: none;
  padding: var(--space-3) var(--space-4);
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.bio-nav-item:hover {
  color: var(--primary-forest-green);
  border-bottom-color: var(--secondary-terracotta);
}
```

### Imagery Guidelines

#### Architectural Photography Standards
1. **High Resolution**: Minimum 1920x1080 for hero images
2. **Aspect Ratios**:
   - Hero images: 16:9
   - Project thumbnails: 4:3
   - Portrait architecture: 3:4
   - Panoramic views: 21:9

3. **Composition Rules**:
   - Follow rule of thirds for building placement
   - Include environmental context
   - Show human scale for reference
   - Emphasize sustainable features

4. **Color Treatment**:
   - Natural color grading
   - Slight warmth for inviting feel
   - Consistent saturation levels
   - Highlight green/natural elements

#### Image Optimization
```css
/* Responsive image containers */
.bio-image-container {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
}

.bio-image {
  width: 100%;
  height: auto;
  transition: transform 0.3s ease;
}

.bio-image-container:hover .bio-image {
  transform: scale(1.05);
}
```

### Interactive Elements

#### Sustainable Design Buttons
```css
.bio-button {
  font-family: var(--heading-font);
  font-weight: 600;
  padding: var(--space-3) var(--space-6);
  background: var(--secondary-terracotta);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.bio-button:hover {
  background: #d65a42;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(226, 114, 91, 0.3);
}

.bio-button--secondary {
  background: transparent;
  color: var(--primary-forest-green);
  border: 2px solid var(--primary-forest-green);
}

.bio-button--secondary:hover {
  background: var(--primary-forest-green);
  color: white;
}
```

#### Form Elements
```css
.bio-input {
  font-family: var(--body-font);
  padding: var(--space-3);
  border: 2px solid var(--accent-soft-gray);
  border-radius: 4px;
  font-size: var(--text-base);
  transition: border-color 0.3s ease;
}

.bio-input:focus {
  outline: none;
  border-color: var(--primary-forest-green);
  box-shadow: 0 0 0 3px rgba(45, 85, 48, 0.1);
}
```

### Animation Guidelines

#### Micro-interactions
```css
/* Subtle animations for modern feel */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bio-animate-in {
  animation: fadeInUp 0.6s ease-out;
}

/* Parallax effect for hero sections */
.bio-parallax {
  transform: translateY(var(--scroll-y));
  transition: transform 0.1s ease-out;
}
```

#### Loading States
```css
.bio-loading {
  position: relative;
  overflow: hidden;
}

.bio-loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  to {
    left: 100%;
  }
}
```

### Accessibility Compliance

#### WCAG 2.1 AA Standards
```css
/* High contrast ratios */
:root {
  --contrast-ratio-normal: 4.5:1;  /* AA standard */
  --contrast-ratio-large: 3:1;     /* AA large text */
}

/* Focus indicators */
.bio-focus:focus {
  outline: 3px solid var(--primary-sky-blue);
  outline-offset: 2px;
}

/* Screen reader support */
.bio-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Mobile-First Responsive Design

#### Breakpoint Strategy
```css
/* Mobile-first approach */
/* Small devices (phones) */
@media (min-width: 640px) { /* sm */ }

/* Medium devices (tablets) */
@media (min-width: 768px) { /* md */ }

/* Large devices (desktops) */
@media (min-width: 1024px) { /* lg */ }

/* Extra large devices */
@media (min-width: 1280px) { /* xl */ }
```

#### Mobile Navigation
```css
.bio-mobile-menu {
  position: fixed;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100vh;
  background: var(--secondary-warm-white);
  transition: left 0.3s ease;
  z-index: 1000;
}

.bio-mobile-menu.active {
  left: 0;
}
```

### Performance Optimization

#### Image Loading
```css
/* Lazy loading support */
.bio-lazy-image {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.bio-lazy-image.loaded {
  opacity: 1;
}
```

#### Critical CSS
```css
/* Above-the-fold critical styles */
.bio-critical {
  font-family: var(--heading-font);
  color: var(--secondary-charcoal);
  background: var(--secondary-warm-white);
  line-height: 1.6;
}
```

This visual design guide provides the technical foundation for implementing modern architectural styling across all three bioarchitettura websites while maintaining their academic credibility and sustainable architecture focus.