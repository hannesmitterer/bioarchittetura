source "https://rubygems.org"

# Jekyll for GitHub Pages
gem "github-pages", group: :jekyll_plugins

# Jekyll plugins
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end

# Platform specific
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.