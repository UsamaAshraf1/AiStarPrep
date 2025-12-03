#!/bin/sh

echo "Injecting environment variables into config.js..."

# Replace placeholders in config.js with actual environment variables
cat <<EOF > /usr/share/nginx/html/config.js
window.env = {
  VITE_API_URL: "$VITE_API_URL",
  VITE_PLATFORM_URL: "$VITE_PLATFORM_URL",
  VITE_API_ENGROK: "$VITE_API_ENGROK",
  VITE_STRIPE_PUBLISHABLE_KEY: "$VITE_STRIPE_PUBLISHABLE_KEY"
};
EOF

echo "Starting Nginx..."
nginx -g "daemon off;"