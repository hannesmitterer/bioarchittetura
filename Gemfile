# Gemfile for Bioarchitettura® Jekyll Site
source "https://rubygems.org"

# Jekyll version
gem "jekyll", "~> 4.3.2"

# Jekyll plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-sitemap", "~> 1.4"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-paginate", "~> 1.1"
end

# Windows and JRuby specific gems
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions fail
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# GitHub Pages compatibility (uncomment if deploying to GitHub Pages)
# gem "github-pages", group: :jekyll_plugins

# Sass support
gem "sassc", "~> 2.4"

# Image processing (optional, for future use)
# gem "jekyll_picture_tag", "~> 2.0"

# Development tools
group :development do
  gem "bundler", "~> 2.0"
end