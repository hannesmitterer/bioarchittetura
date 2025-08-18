# Visual Design Guidelines for Bioarchitettura®

## Design Philosophy

The Bioarchitettura® visual design system reflects the core principles of sustainable architecture: harmony with nature, functional beauty, and environmental consciousness. This guide provides technical specifications for implementing a modern, accessible, and responsive design that honors the platform's 30-year academic legacy while embracing contemporary web standards.

## Color System

### Primary Palette - Natural Materials Inspiration

#### Forest Green - Primary Brand Color
```css
--primary-green: #2D5A3D;
--primary-green-light: #4A7C59;
--primary-green-dark: #1B3B2A;
```
*Inspired by sustainable forestry and natural building materials*

#### Stone Gray - Professional Neutrals  
```css
--stone-gray: #6B7280;
--stone-gray-light: #9CA3AF;
--stone-gray-dark: #4B5563;
```
*Reflecting natural stone construction and architectural permanence*

#### Sky Blue - Accent and Interactive Elements
```css
--sky-blue: #3B82F6;
--sky-blue-light: #60A5FA;
--sky-blue-dark: #1E40AF;
```
*Representing clean air, sustainable futures, and clarity*

### Secondary Palette - Contemporary Contrast

#### Warm White - Background and Content Areas
```css
--warm-white: #FEFEFE;
--cream-white: #FAF9F6;
--off-white: #F8F7F4;
```

#### Charcoal - Text and Strong Contrasts
```css
--charcoal: #1F2937;
--charcoal-light: #374151;
--charcoal-medium: #111827;
```

#### Terracotta - Accent and Call-to-Action
```css
--terracotta: #DC6B4A;
--terracotta-light: #E87B5A;
--terracotta-dark: #B85A3E;
```

### Accessibility Color Guidelines
- **Minimum Contrast Ratio**: 4.5:1 for normal text, 3:1 for large text
- **Color Independence**: All information conveyed through color must also be available through other means
- **Focus Indicators**: High contrast outline for keyboard navigation

## Typography System

### Font Families

#### Primary Typeface - Headers and Navigation
```css
font-family: 'Source Sans Pro', 'Helvetica Neue', 'Arial', sans-serif;
```
**Characteristics**: Clean, modern, highly legible sans-serif
**Use Cases**: Headers (H1-H6), navigation, buttons, UI elements

#### Secondary Typeface - Body Text and Academic Content
```css
font-family: 'Crimson Text', 'Georgia', 'Times New Roman', serif;
```
**Characteristics**: Academic readability, traditional serif elegance
**Use Cases**: Body text, articles, publications, long-form content

#### Monospace - Code and Technical Specifications
```css
font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
```

### Typography Scale - 8-Level Hierarchy

```css
/* H1 - Page Titles */
.h1 { font-size: 2.5rem; line-height: 1.2; font-weight: 700; }

/* H2 - Section Headers */
.h2 { font-size: 2rem; line-height: 1.25; font-weight: 600; }

/* H3 - Subsection Headers */
.h3 { font-size: 1.5rem; line-height: 1.3; font-weight: 600; }

/* H4 - Article Titles */
.h4 { font-size: 1.25rem; line-height: 1.35; font-weight: 500; }

/* H5 - Component Headers */
.h5 { font-size: 1.125rem; line-height: 1.4; font-weight: 500; }

/* H6 - Small Headers */
.h6 { font-size: 1rem; line-height: 1.45; font-weight: 500; }

/* Body Text */
.body { font-size: 1rem; line-height: 1.6; font-weight: 400; }

/* Small Text - Captions, Metadata */
.small { font-size: 0.875rem; line-height: 1.5; font-weight: 400; }
```

## Grid System - Architectural Blueprint Inspiration

### 12-Column Responsive Grid
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
}

/* Responsive breakpoints */
@media (max-width: 768px) {
  .grid { grid-template-columns: 1fr; gap: 1rem; }
}

@media (max-width: 1024px) {
  .grid { grid-template-columns: repeat(6, 1fr); }
}
```

### Baseline Grid - 8px System
```css
:root {
  --baseline: 8px;
  --space-xs: calc(var(--baseline) * 1); /* 8px */
  --space-sm: calc(var(--baseline) * 2); /* 16px */
  --space-md: calc(var(--baseline) * 3); /* 24px */
  --space-lg: calc(var(--baseline) * 4); /* 32px */
  --space-xl: calc(var(--baseline) * 6); /* 48px */
  --space-xxl: calc(var(--baseline) * 8); /* 64px */
}
```

## Component Design Patterns

### Buttons - Sustainable Action Design
```css
.btn-primary {
  background: var(--primary-green);
  color: var(--warm-white);
  padding: var(--space-sm) var(--space-lg);
  border-radius: 4px;
  border: none;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--primary-green-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(45, 90, 61, 0.3);
}
```

### Cards - Content Presentation
```css
.card {
  background: var(--warm-white);
  border: 1px solid rgba(107, 114, 128, 0.2);
  border-radius: 8px;
  padding: var(--space-lg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
```

### Navigation - Architectural Hierarchy
```css
.nav-primary {
  background: var(--charcoal);
  padding: var(--space-md) 0;
}

.nav-link {
  color: var(--warm-white);
  text-decoration: none;
  padding: var(--space-sm) var(--space-md);
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--sky-blue-light);
}
```

## Responsive Design Specifications

### Mobile-First Approach
```css
/* Mobile (default) */
.container { padding: 0 1rem; }

/* Tablet */
@media (min-width: 768px) {
  .container { padding: 0 2rem; }
  .grid { gap: 1.5rem; }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { padding: 0 3rem; }
  .grid { gap: 2rem; }
}

/* Large Desktop */
@media (min-width: 1440px) {
  .container { max-width: 1200px; padding: 0 2rem; }
}
```

### Breakpoint System
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px - 1439px
- **Large Desktop**: 1440px+

## Accessibility Guidelines - WCAG 2.1 AA Compliance

### Color Contrast Requirements
```css
/* Text on backgrounds must meet 4.5:1 ratio */
.text-primary { color: var(--charcoal); } /* 7.2:1 on white */
.text-secondary { color: var(--stone-gray-dark); } /* 4.8:1 on white */

/* Interactive elements focus states */
.focusable:focus {
  outline: 2px solid var(--sky-blue);
  outline-offset: 2px;
}
```

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Focus indicators must be clearly visible
- Tab order must follow logical reading flow

### Screen Reader Support
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
```

## Performance Optimization

### Image Guidelines
- **Format**: WebP with JPEG fallback
- **Compression**: 85% quality for photos, PNG for graphics
- **Responsive Images**: Use srcset for different screen sizes
- **Lazy Loading**: Implement for below-fold content

### CSS Optimization
```css
/* Use CSS custom properties for theming */
:root {
  /* Color variables defined above */
}

/* Minimize reflows with transform/opacity animations */
.animate {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
```

### Loading Performance
- Critical CSS inline in document head
- Non-critical CSS loaded asynchronously
- Font display: swap for web fonts
- Preload key resources (fonts, hero images)

## Implementation Checklist

### Phase 1: Foundation Setup
- [ ] CSS custom properties defined
- [ ] Typography system implemented  
- [ ] Grid system established
- [ ] Color palette applied

### Phase 2: Component Development
- [ ] Button variations created
- [ ] Card components built
- [ ] Navigation system implemented
- [ ] Form elements styled

### Phase 3: Responsive Implementation
- [ ] Mobile layout optimized
- [ ] Tablet breakpoint tested
- [ ] Desktop layout verified
- [ ] Large screen optimization

### Phase 4: Accessibility Compliance
- [ ] Color contrast ratios verified
- [ ] Keyboard navigation tested
- [ ] Screen reader compatibility confirmed
- [ ] Focus indicators implemented

## Maintenance Guidelines

### Regular Updates
- **Color Contrast**: Test with tools like WebAIM Contrast Checker
- **Responsive Testing**: Verify on multiple device sizes
- **Performance Monitoring**: Check loading speeds quarterly
- **Accessibility Auditing**: Annual WCAG compliance review

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Progressive Enhancement**: Graceful degradation for older browsers

This visual design system provides the foundation for a modern, accessible, and maintainable bioarchitettura website that respects the platform's academic heritage while embracing contemporary design principles and sustainability values.