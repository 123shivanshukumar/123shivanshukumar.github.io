#!/bin/bash

# Update the base_url in config.toml for production
# Replace 'https://your-domain.com' with your actual domain
sed -i 's|base_url = "http://127.0.0.1:1111"|base_url = "https://your-domain.com"|g' config.toml

echo "Building site for production..."
zola build

echo "Site built successfully. The contents of the 'public' directory are ready for deployment."
echo "Deploy these files to your hosting provider of choice (GitHub Pages, Netlify, Vercel, etc.)"
