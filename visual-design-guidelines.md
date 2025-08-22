# Visual Design Guidelines - Bioarchitettura® Design System

## Design Philosophy

The **Bioarchitettura® Design System** embodies the principles of sustainable architecture through digital design. Our visual language reflects the harmony between built environment and natural world, emphasizing clarity, accessibility, and timeless elegance.

### Core Principles

#### 1. Architectural Precision
- **Grid-based layouts** inspired by architectural drawing standards
- **Golden ratio proportions** for harmonious visual relationships
- **Modular typography** scale reflecting architectural measurement systems
- **Spatial rhythm** consistent with sustainable design principles

#### 2. Natural Materials Aesthetic
- **Organic color palette** derived from sustainable building materials
- **Texture references** to natural materials (wood, stone, earth)
- **Breathing room** through generous white space and thoughtful spacing
- **Authentic photography** showcasing real sustainable architecture projects

#### 3. Universal Accessibility
- **WCAG 2.1 AA compliance** ensuring inclusive design for all users
- **High contrast ratios** for optimal readability
- **Scalable interface elements** for various viewing conditions
- **Keyboard navigation** support throughout the platform

## Color System

### Primary Palette

#### 🌲 Verde Primario (Primary Green)
- **HEX**: `#2D5016`
- **RGB**: `45, 80, 22`
- **HSL**: `99°, 57%, 20%`
- **Usage**: Headers, primary buttons, key branding elements
- **Symbolism**: Growth, sustainability, natural building materials

#### 🍃 Verde Chiaro (Light Green)  
- **HEX**: `#7FB069`
- **RGB**: `127, 176, 105`
- **HSL**: `101°, 32%, 55%`
- **Usage**: Accents, hover states, secondary elements
- **Symbolism**: Harmony with nature, fresh growth

#### 🏔️ Terra (Earth)
- **HEX**: `#A0785A`
- **RGB**: `160, 120, 90`
- **HSL**: `26°, 30%, 49%`
- **Usage**: Warm accents, secondary branding, earth materials
- **Symbolism**: Natural clay, sustainable earth construction

### Neutral Palette

#### ☁️ Neutro Chiaro (Light Neutral)
- **HEX**: `#F8F6F0`
- **RGB**: `248, 246, 240`
- **HSL**: `45°, 40%, 96%`
- **Usage**: Background, content areas, light sections
- **Symbolism**: Natural lime plaster, breathability

#### 🌑 Neutro Scuro (Dark Neutral)
- **HEX**: `#2C3E26`
- **RGB**: `44, 62, 38`
- **HSL**: `99°, 24%, 20%`
- **Usage**: Dark headers, contrast elements
- **Symbolism**: Deep forest, grounding, stability

#### 📝 Testo Primario (Primary Text)
- **HEX**: `#333333`
- **RGB**: `51, 51, 51`
- **Usage**: Body text, headings, high-contrast content

#### 📖 Testo Secondario (Secondary Text)
- **HEX**: `#666666`
- **RGB**: `102, 102, 102`
- **Usage**: Secondary information, captions, meta data

### Functional Colors

#### ✅ Successo (Success)
- **HEX**: `#28A745`
- **Usage**: Confirmations, positive feedback, completed states

#### ⚠️ Attenzione (Warning)
- **HEX**: `#FFC107`
- **Usage**: Alerts, important notices, pending states

#### ❌ Errore (Error)
- **HEX**: `#DC3545`
- **Usage**: Error messages, critical alerts, invalid states

#### ℹ️ Informazione (Information)
- **HEX**: `#17A2B8`
- **Usage**: Informational content, links, navigation aids

## Typography System

### Font Families

#### Primary: Source Sans Pro
```css
font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, sans-serif;
```
- **Usage**: Headers, navigation, UI elements, modern content
- **Weights Available**: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Characteristics**: Clean, modern, highly legible, professional

#### Accent: Crimson Text
```css
font-family: 'Crimson Text', Georgia, serif;
```
- **Usage**: Body text, articles, editorial content, traditional elements
- **Weights Available**: 400 (Regular), 600 (SemiBold), 700 (Bold)
- **Characteristics**: Academic, readable, authoritative, classic

### Typography Scale (8-point baseline)

#### Display Typography
- **h1**: 3.5rem (56px) - Hero titles, main page headers
- **h2**: 2.5rem (40px) - Section headers, major divisions
- **h3**: 2rem (32px) - Subsection headers, article titles
- **h4**: 1.5rem (24px) - Component headers, card titles
- **h5**: 1.25rem (20px) - Small headers, metadata
- **h6**: 1rem (16px) - Inline headers, labels

#### Body Typography
- **Lead**: 1.25rem (20px) - Introduction paragraphs, emphasis
- **Body**: 1rem (16px) - Standard body text, content
- **Small**: 0.875rem (14px) - Captions, secondary text
- **Caption**: 0.75rem (12px) - Fine print, legal text

### Line Height Standards
- **Headers**: 1.2 (tight spacing for impact)
- **Body Text**: 1.6 (comfortable reading experience)
- **UI Elements**: 1.4 (balanced for interface clarity)

## Spacing System

### Baseline Grid: 8px
All spacing measurements follow an 8-pixel baseline grid for visual consistency and rhythm.

#### Spacing Variables
```css
:root {
  --space-xs: 0.5rem;   /* 8px  - Minimal spacing */
  --space-sm: 1rem;     /* 16px - Small spacing */
  --space-md: 1.5rem;   /* 24px - Medium spacing */
  --space-lg: 2rem;     /* 32px - Large spacing */
  --space-xl: 3rem;     /* 48px - Extra large spacing */
  --space-xxl: 4rem;    /* 64px - Section spacing */
  --space-xxxl: 6rem;   /* 96px - Page spacing */
}
```

#### Component Spacing
- **Button padding**: `--space-sm --space-md` (16px 24px)
- **Card padding**: `--space-lg` (32px)
- **Section margins**: `--space-xxl` (64px)
- **Page margins**: `--space-xxxl` (96px)

## Layout System

### Grid Structure
Based on CSS Grid and Flexbox for responsive, accessible layouts.

#### Container Sizes
```css
:root {
  --mobile: 100%;        /* 0-767px */
  --tablet: 768px;       /* 768-1023px */
  --desktop: 1024px;     /* 1024-1199px */
  --large: 1200px;       /* 1200px+ */
}
```

#### Column Grid
- **Mobile**: Single column layout
- **Tablet**: 2-column layout for content
- **Desktop**: 3-column layout for complex content
- **Large**: Up to 12-column system for detailed layouts

### Responsive Breakpoints
```css
/* Mobile First Approach */
@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1200px) { /* Large Desktop */ }
```

## Component Library

### Buttons

#### Primary Button
```css
.btn-primary {
  background-color: var(--primary-green);
  color: white;
  padding: var(--space-sm) var(--space-md);
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: var(--light-green);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(45, 80, 22, 0.3);
}
```

#### Secondary Button
```css
.btn-secondary {
  background-color: transparent;
  color: var(--primary-green);
  border: 2px solid var(--primary-green);
  padding: var(--space-sm) var(--space-md);
  border-radius: 4px;
}
```

### Cards
```css
.card {
  background-color: var(--white);
  border-radius: 8px;
  padding: var(--space-lg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
```

### Form Elements
```css
.form-input {
  width: 100%;
  padding: var(--space-sm);
  border: 2px solid #e1e5e9;
  border-radius: 4px;
  font-family: var(--font-primary);
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--light-green);
  box-shadow: 0 0 0 3px rgba(127, 176, 105, 0.1);
}
```

## Iconography

### Icon Style
- **Outline style**: Consistent 2px stroke weight
- **24x24px grid**: Standard sizing for optimal rendering
- **Material Design inspired**: Familiar, accessible symbols
- **Semantic usage**: Icons supplement, never replace text labels

### Common Icons
- **🏠 Home**: Navigation, homepage links
- **📖 Magazine**: Publication, reading materials  
- **🎓 Education**: Courses, learning, certification
- **🛒 Shopping**: E-commerce, cart, purchasing
- **🔍 Search**: Finding content, filtering
- **📱 Mobile**: Responsive, mobile-specific features

## Photography Guidelines

### Style Characteristics
- **Authentic projects**: Real sustainable architecture examples
- **Natural lighting**: Emphasize connection with environment
- **Human scale**: Include people for relatability and context
- **Material focus**: Highlight sustainable building materials
- **Seasonal variation**: Show buildings throughout the year

### Technical Specifications
- **Aspect Ratios**: 16:9 (hero), 4:3 (content), 1:1 (thumbnails)
- **Resolution**: Minimum 1920x1080 for hero images
- **File Size**: Optimized WebP format, <500KB for web
- **Color Profile**: sRGB for web consistency
- **Brightness**: Well-lit, avoiding excessive contrast

## Animation & Interaction

### Transition Standards
```css
/* Standard transitions */
.transition-fast    { transition: all 0.15s ease; }
.transition-medium  { transition: all 0.3s ease; }
.transition-slow    { transition: all 0.5s ease; }
```

### Hover Effects
- **Subtle elevation**: 2-4px translateY for cards and buttons
- **Color transitions**: 0.3s ease between states
- **Scale effects**: 1.05x for image overlays
- **Opacity changes**: 0.8 opacity for interactive elements

### Loading States
- **Skeleton screens**: Maintain layout during content loading
- **Progress indicators**: Clear feedback for longer operations
- **Micro-animations**: Subtle motion to indicate system response

## Accessibility Standards

### Color Contrast Ratios
- **Normal text**: Minimum 4.5:1 ratio
- **Large text (18pt+)**: Minimum 3:1 ratio
- **UI components**: Minimum 3:1 ratio for interactive elements

### Focus Management
```css
/* Visible focus indicators */
a:focus, button:focus, input:focus {
  outline: 2px solid var(--light-green);
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Motion Preferences
```css
/* Respect user motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Implementation Guidelines

### CSS Custom Properties
```css
:root {
  /* Colors */
  --primary-green: #2d5016;
  --light-green: #7fb069;
  --accent-earth: #a0785a;
  --neutral-light: #f8f6f0;
  --neutral-dark: #2c3e26;
  
  /* Typography */
  --font-primary: 'Source Sans Pro', sans-serif;
  --font-accent: 'Crimson Text', serif;
  
  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
}
```

### Component Organization
```
assets/css/
├── base/
│   ├── reset.css
│   ├── typography.css
│   └── variables.css
├── components/
│   ├── buttons.css
│   ├── cards.css
│   ├── forms.css
│   └── navigation.css
├── layout/
│   ├── grid.css
│   ├── header.css
│   └── footer.css
└── utilities/
    ├── spacing.css
    ├── text.css
    └── display.css
```

## Quality Assurance

### Design Review Checklist
- [ ] Color contrast meets WCAG 2.1 AA standards
- [ ] Typography scale follows 8px baseline grid
- [ ] Spacing uses defined CSS custom properties
- [ ] Interactive elements have appropriate focus states
- [ ] Components work across all breakpoints
- [ ] Motion respects user preferences
- [ ] Icons have appropriate text alternatives

---

**Design System Version**: 1.0  
**Last Updated**: August 2024  
**Maintained by**: Design Team, Bioarchitettura®  
**Next Review**: January 2025