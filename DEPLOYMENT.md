# GitHub Pages Deployment Documentation

## Overview

This document describes how the Bioarchitettura® website has been configured for deployment on GitHub Pages using Jekyll.

## Deployment Setup

### 1. Jekyll Site Structure

The website is built using Jekyll, a static site generator that's natively supported by GitHub Pages. The following structure has been implemented:

```
bioarchittetura/
├── _config.yml                 # Jekyll configuration
├── _layouts/                   # Page templates
│   ├── default.html            # Base template
│   ├── master.html             # Course pages
│   ├── news.html               # News articles
│   └── rivista.html            # Magazine articles
├── _master/                    # Master courses collection
├── _news/                      # News articles collection
├── _rivista/                   # Magazine articles collection
├── assets/
│   ├── css/style.css           # Main stylesheet
│   └── js/main.js              # JavaScript functionality
├── .github/workflows/
│   └── jekyll-gh-pages.yml     # GitHub Actions workflow
├── index.html                  # Homepage
├── master.html                 # Courses listing page
├── news.html                   # News listing page
├── rivista.html                # Magazine listing page
├── shop.html                   # Shop page
├── Gemfile                     # Ruby dependencies
└── README.md                   # Project documentation
```

### 2. GitHub Pages Configuration

The website is configured to deploy from the current branch (`copilot/fix-d9f2ef7d-0ac9-4d0a-abb7-5fed1b48d6ac`) using GitHub Actions.

#### Repository Settings Required:
1. **Source**: GitHub Actions (configured in repository settings)
2. **Branch**: `copilot/fix-d9f2ef7d-0ac9-4d0a-abb7-5fed1b48d6ac`
3. **Permissions**: Read and Write permissions for GitHub Actions

#### Access URL:
The website will be available at:
```
https://hannesmitterer.github.io/bioarchittetura/
```

### 3. GitHub Actions Workflow

The deployment is automated using GitHub Actions with the workflow file `.github/workflows/jekyll-gh-pages.yml`:

**Workflow Features:**
- **Triggers**: Automatically runs on push to the main branches
- **Manual Deployment**: Can be triggered manually from the Actions tab
- **Ruby Setup**: Uses Ruby 3.2 with automatic bundle caching
- **Jekyll Build**: Builds the site with production environment
- **Deployment**: Automatically deploys to GitHub Pages

**Deployment Process:**
1. Code is pushed to the repository
2. GitHub Actions workflow triggers automatically
3. Ruby environment is set up with bundler
4. Jekyll builds the static site
5. Built site is deployed to GitHub Pages
6. Site is available at the configured URL

### 4. Jekyll Configuration

Key configuration in `_config.yml`:

```yaml
title: "Bioarchitettura® - Abitare la Terra"
description: "La prima rivista italiana di bioarchitettura"
baseurl: "/bioarchittetura"
url: "https://hannesmitterer.github.io"

# Collections for content management
collections:
  rivista:    # Magazine articles
    output: true
  master:     # Training courses
    output: true  
  news:       # News and updates
    output: true
```

### 5. Content Management

The site uses Jekyll collections for organized content management:

#### Magazine Articles (`_rivista/`)
- Individual articles with frontmatter metadata
- Categories, tags, and author information
- Automatic listing on the rivista page

#### Master Courses (`_master/`)
- Course descriptions with duration, level, and pricing
- Detailed program information
- Call-to-action for enrollment

#### News (`_news/`)
- Date-based news articles
- Category and tag organization
- Automatic chronological ordering

### 6. Design System

The website implements a professional design system with:

- **Color Palette**: Verde Primario (#2D5A3D), Grigio Pietra (#6B7280), Azzurro Cielo (#3B82F6)
- **Typography**: Source Sans Pro for headings, Crimson Text for body text
- **Responsive Design**: Mobile-first approach with CSS Grid
- **Accessibility**: WCAG 2.1 AA compliant structure

## Manual Deployment Steps

If manual configuration is needed:

### 1. Repository Settings
1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Ensure branch contains Jekyll site files

### 2. GitHub Actions Permissions
1. Go to repository Settings → Actions → General
2. Set "Workflow permissions" to "Read and write permissions"
3. Allow GitHub Actions to create and approve pull requests

### 3. Custom Domain (Optional)
If using a custom domain:
1. Add CNAME file with domain name
2. Configure DNS settings
3. Update `url` in `_config.yml`

## Monitoring and Maintenance

### Build Status
- Monitor GitHub Actions for build success/failure
- Check repository Actions tab for deployment logs
- Build time typically 2-3 minutes

### Content Updates
- Add new articles to respective collection folders
- Follow frontmatter format for metadata
- Content automatically appears after next deployment

### Troubleshooting
Common issues and solutions:
1. **Build Failures**: Check Jekyll syntax and frontmatter
2. **Missing Content**: Verify collection configuration in `_config.yml`
3. **CSS Issues**: Ensure SCSS frontmatter in CSS files
4. **404 Errors**: Check `baseurl` configuration and relative links

## Security and Performance

### Security Measures
- All user inputs are sanitized by Jekyll
- No server-side code execution
- Static files only - minimal attack surface

### Performance Optimization
- Minimal JavaScript dependencies
- Optimized CSS with CSS variables
- Lazy loading for images (when implemented)
- CDN delivery through GitHub Pages

## Backup and Recovery

### Backup Strategy
- All content is version-controlled in Git
- GitHub provides automatic backups
- Easy restoration from any commit

### Recovery Process
1. Identify last working commit
2. Create new branch from working state
3. Update Pages settings if needed
4. Redeploy using GitHub Actions

---

**Last Updated**: August 18, 2024  
**Deployment Status**: ✅ Configured and Ready  
**Website URL**: https://hannesmitterer.github.io/bioarchittetura/