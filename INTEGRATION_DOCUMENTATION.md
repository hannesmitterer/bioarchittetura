# Automated Content Integration Documentation

## Overview

This documentation describes the automated deployment workflow that integrates and syncs content from both bioarchitettura.org and www.bioarchitettura-fondazione, ensuring all magazine editions are properly displayed with covers, titles, pricing, and catalog visibility.

## System Architecture

### 1. Content Synchronization
- **Source Integration**: Automatic fetching from bioarchitettura.org and www.bioarchitettura-fondazione
- **Content Types**: Magazine editions, news articles, course information
- **Image Optimization**: Automatic cover image download and optimization
- **Scheduling**: Daily synchronization at 6 AM UTC

### 2. Jekyll Collections Structure
```
_rivista/          # Magazine editions
_news/             # News and updates  
_master/           # Training courses
```

### 3. Automated Deployment Pipeline
- **Trigger**: Push to main branch, manual dispatch, or scheduled
- **Steps**: Content sync → Image optimization → Jekyll build → GitHub Pages deploy

## Implementation Details

### Content Synchronization Script
Location: `.github/scripts/sync-content.js`

**Features:**
- Fetches external content from partner websites
- Creates Jekyll collection entries with proper frontmatter
- Downloads and processes cover images
- Generates site statistics
- Handles incremental updates

**Configuration:**
```javascript
const CONFIG = {
  sources: [
    {
      name: 'bioarchitettura.org',
      url: 'https://www.bioarchitettura.org',
      type: 'magazine'
    },
    {
      name: 'bioarchitettura-fondazione',
      url: 'https://www.bioarchitettura-fondazione.org', 
      type: 'foundation'
    }
  ],
  collections: {
    rivista: '_rivista',
    news: '_news', 
    master: '_master'
  }
};
```

### Image Optimization Script
Location: `.github/scripts/optimize-images.js`

**Features:**
- Multi-format generation (WebP, JPEG)
- Responsive sizing (thumbnail, medium, large)
- Performance optimization with configurable quality
- Automatic metadata generation

**Size Configuration:**
```javascript
sizes: [
  { name: 'thumbnail', width: 200, height: 300 },
  { name: 'medium', width: 400, height: 600 },
  { name: 'large', width: 800, height: 1200 }
]
```

### Catalog Page Implementation
Location: `catalogo.html`

**Features:**
- **Complete Magazine Catalog**: All editions with covers, titles, and pricing
- **University Access**: Special integration for Dipartimento di Architettura dell'Università di Bologna
- **Filter & Search**: Year-based filtering and content search
- **Responsive Design**: Mobile-first, accessible interface
- **Performance Optimized**: Lazy loading, efficient grid layout

**Key Sections:**
1. **Hero Section**: Statistics and introduction
2. **Filter Controls**: Year filtering and search functionality
3. **Edition Grid**: Card-based display with covers and metadata
4. **University Access**: Dedicated section for academic access

### Edition Display Features
Each magazine edition includes:
- **Cover Image**: Optimized SVG/image display
- **Edition Number**: Clear identification (e.g., "152-153", "154")
- **Title**: Full article title
- **Pricing**: Original and discounted prices with discount percentage
- **Tags**: Topic categorization
- **Authors**: Article contributors
- **Season/Year**: Publication timing
- **Special Badges**: Featured and special edition indicators

## GitHub Actions Workflow

### Workflow File
Location: `.github/workflows/content-sync-deploy.yml`

### Workflow Steps:
1. **Content Sync Job**
   - Checkout repository
   - Setup Node.js environment
   - Install dependencies (axios, cheerio, sharp, fs-extra, js-yaml)
   - Run content synchronization script
   - Optimize images if content updated
   - Commit and push changes

2. **Build Job**
   - Checkout repository
   - Setup Ruby environment with bundler cache
   - Install Jekyll gems
   - Build static site
   - Upload Pages artifact

3. **Deploy Job**
   - Deploy to GitHub Pages
   - Update live site

### Environment Variables
- `FORCE_SYNC`: Force complete content synchronization
- `JEKYLL_ENV`: Set to 'production' for builds

## Maintenance Instructions

### Daily Operations
The system runs automatically with no daily maintenance required. The workflow:
1. Syncs content at 6 AM UTC daily
2. Only commits changes if new content is found
3. Automatically deploys updates to live site

### Manual Sync Trigger
To manually trigger content synchronization:
1. Go to GitHub Actions tab
2. Select "Content Sync and Deploy" workflow
3. Click "Run workflow"
4. Optionally enable "Force complete content synchronization"

### Adding New Content Sources
To add new external content sources:
1. Edit `.github/scripts/sync-content.js`
2. Add new source to `CONFIG.sources` array
3. Implement content parsing logic
4. Test with manual workflow run

### Content Format Requirements
Magazine editions must include:
```yaml
---
layout: edition
title: "Article Title"
edition: "XXX"  
year: YYYY
season: "Season"
image: "/assets/images/covers/edizione-XXX.svg"
price_original: 18.00
price_discounted: 15.30
description: "Article description"
featured: true/false
tags: [tag1, tag2, tag3]
authors: ["Author 1", "Author 2"]
---
```

### Performance Optimization
- **Image Lazy Loading**: Implemented on catalog page
- **Responsive Images**: Multiple sizes generated automatically  
- **CSS Optimization**: Mobile-first, minimal custom properties
- **JavaScript**: Vanilla JS, no external dependencies
- **Caching**: Leverages GitHub Pages CDN

### Accessibility Features
- **WCAG 2.1 AA Compliance**: Proper contrast, keyboard navigation
- **Semantic HTML**: Proper heading structure, landmarks
- **Screen Reader Support**: Alt texts, ARIA labels
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Respects user preferences

## University of Bologna Integration

### Academic Access Features
- **Institutional Login**: Integration with university authentication
- **Free Digital Access**: Complete archive access for students/faculty
- **Research Tools**: Advanced search and download capabilities
- **Educational Benefits**: Priority access to webinars and events

### Implementation
The university access section provides:
- Login interface for university credentials
- Benefits listing for academic users
- Direct links to institutional resources
- Integration documentation for IT departments

## Troubleshooting

### Common Issues
1. **Sync Failures**: Check external website availability
2. **Image Processing**: Ensure adequate disk space
3. **Build Errors**: Verify YAML frontmatter syntax
4. **Deploy Issues**: Check GitHub Pages settings

### Error Handling
- Sync script includes comprehensive error handling
- Failed syncs don't block deployment of existing content
- Image optimization failures are logged but non-blocking
- Jekyll build errors prevent deployment until resolved

### Monitoring
- GitHub Actions provides build/deploy status
- Console logs capture detailed sync information
- Site statistics track content updates
- Performance metrics available via GitHub Pages

## Future Enhancements

### Planned Features
1. **Real-time Sync**: WebSocket-based instant updates
2. **Advanced Analytics**: Detailed usage statistics
3. **Content Scheduling**: Delayed publication support
4. **Multi-language Support**: Italian/English content
5. **API Integration**: RESTful content management
6. **Search Enhancement**: Full-text search capabilities

### Scalability Considerations
- **Content Volume**: System scales to hundreds of editions
- **Image Storage**: Optimized for GitHub Pages limits
- **Build Performance**: Incremental builds for large catalogs
- **CDN Integration**: Ready for external CDN if needed

## Technical Stack Summary

- **Frontend**: HTML5, CSS3 (Custom Properties), Vanilla JavaScript
- **Backend**: Jekyll Static Site Generator
- **Hosting**: GitHub Pages with CDN
- **CI/CD**: GitHub Actions
- **Content Sync**: Node.js scripts
- **Image Processing**: Sharp.js
- **Dependencies**: Minimal, security-focused
- **Performance**: Mobile-first, optimized delivery

## Contact Information

For technical support or integration questions:
- **Email**: dev@bioarchitettura.org
- **GitHub Issues**: Repository issue tracker
- **Documentation**: This file and inline code comments
- **Updates**: Automatic via GitHub Actions workflow