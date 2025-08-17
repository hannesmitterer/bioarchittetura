# Bioarchitettura® - Modern Website

A modern, responsive website for the Italian bioarchitecture platform, built for GitHub Pages deployment.

## 🌱 About Bioarchitettura®

Bioarchitettura® is Italy's first magazine dedicated to ecological architecture and sustainable building, founded in 1992 by Ugo Sasso and Wittfrida Mitterer. With 30 years of excellence, 152+ editions, 1,699 articles, and 1,254 authors, it represents the leading voice in sustainable architecture.

## ✨ Features

### 🏠 Modern Homepage
- **Hero section** with embedded video placeholder
- **Statistics showcase** (152 editions, 30 years, 1,699 articles, 1,254 authors)
- **Responsive design** optimized for all devices
- **Smooth animations** and interactive elements

### 🎨 Professional Design
- **Sustainable color palette**: Forest Green, Stone Gray, Sky Blue, Terracotta
- **Typography system**: Source Sans Pro + Crimson Text
- **Grid layout** inspired by architectural blueprints
- **Accessibility compliant** (WCAG 2.1 AA standards)

### 📖 Content Management
- **Jekyll-powered** content management system
- **Collections** for Rivista, Master, and News
- **Markdown support** for easy content editing
- **SEO optimized** with structured data

### 🛒 E-commerce Shop
- **Magazine subscriptions** (Annual, Digital, Gift)
- **Ebooks** on specialized topics
- **Books & Publications** catalog
- **Shopping cart** with localStorage persistence
- **Checkout system** with multiple payment options

### 🎓 Educational Sections
- **Master programs** (Casaclima Bioarchitettura®)
- **Course information** and project showcases
- **University partnerships** (Bologna Architecture Department)

### 📱 Interactive Features
- **Newsletter signup** with validation
- **Mobile-responsive** navigation
- **Touch-friendly** interface
- **Progressive enhancement**

## 🚀 Technologies Used

- **HTML5** semantic markup
- **CSS3** with modern features (Grid, Flexbox, Custom Properties)
- **Vanilla JavaScript** for interactions
- **Jekyll** for static site generation
- **Font Awesome** for icons
- **Google Fonts** (Source Sans Pro, Crimson Text)

## 📁 Project Structure

```
bioarchittetura/
├── index.html              # Main homepage
├── shop.html               # E-commerce page
├── _config.yml             # Jekyll configuration
├── assets/
│   ├── css/
│   │   ├── style.css       # Main styles
│   │   └── shop.css        # Shop-specific styles
│   └── js/
│       ├── main.js         # Core functionality
│       └── shop.js         # E-commerce features
├── _rivista/               # Magazine content
├── _master/                # Course content
├── _news/                  # News articles
├── _layouts/               # Jekyll templates
└── _includes/              # Reusable components
```

## 🎯 Key Sections

### 1. Homepage (`index.html`)
- Hero section with video placeholder
- Mission statement and features
- Rivista (Magazine) overview
- Master program information
- Shop preview
- Foundation details
- Newsletter signup
- Contact information

### 2. Shop (`shop.html`)
- Product categories (Subscriptions, Ebooks, Books, Courses)
- Shopping cart functionality
- Checkout system
- Payment integration ready

### 3. Content Collections
- **Rivista**: Magazine editions and articles
- **Master**: Educational programs and projects
- **News**: Latest updates and announcements

## 🌍 Deployment

### GitHub Pages Setup
1. Enable GitHub Pages in repository settings
2. Select source: Deploy from a branch (main)
3. Website will be available at: `https://hannesmitterer.github.io/bioarchittetura/`

### Jekyll Configuration
The site uses Jekyll for static site generation with:
- Collections for dynamic content
- SEO tags and sitemap generation
- Responsive design
- Mobile-first approach

## 📊 Performance Features

- **Optimized images** with lazy loading
- **Minified CSS/JS** for production
- **Semantic HTML** for better SEO
- **Progressive enhancement** for accessibility
- **Reduced motion** support for vestibular disorders

## 🔧 Customization

### Colors (CSS Custom Properties)
```css
:root {
  --forest-green: #2D5A3D;
  --stone-gray: #6B7280;
  --sky-blue: #3B82F6;
  --terracotta: #DC6B4A;
  --warm-white: #FEFEFE;
  --charcoal: #374151;
}
```

### Typography
- **Headers**: Source Sans Pro (modern, clean)
- **Body text**: Crimson Text (readable, academic)
- **Scale**: 8-level hierarchy optimized for web

### Content Management
Edit content in:
- `_rivista/` for magazine articles
- `_master/` for course information
- `_news/` for news updates
- `_config.yml` for site settings

## 🌟 Notable Features

### Accessibility
- Keyboard navigation
- Screen reader support
- High contrast ratios
- Focus management
- ARIA labels and roles

### Mobile Experience
- Touch-friendly interface
- Responsive navigation
- Optimized typography
- Fast loading times

### SEO Optimization
- Structured data (Schema.org)
- Meta tags optimization
- Social media integration
- XML sitemap generation

## 📞 Contact & Support

- **Phone**: +39 0471 973097
- **Email**: info@bioarchitettura.org
- **Foundation**: Fondazione Italiana per la Bioarchitettura® e l'Antropizzazione Sostenibile dell'Ambiente

## 📜 License

This project represents the official website for Bioarchitettura® magazine and the Italian Foundation for Bioarchitecture. All content and branding are protected by copyright.

---

*Built with ❤️ for sustainable architecture and ecological building practices.*