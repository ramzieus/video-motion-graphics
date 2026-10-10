#!/usr/bin/env bash
set -euo pipefail

# init_remotion.sh
# Bootstraps a fresh, production-ready Remotion project configured with TypeScript and Tailwind CSS

PROJECT_NAME="${1:-motion-graphic-project}"

echo "=========================================================="
echo "🎬 Initializing Remotion Motion Graphic Project: $PROJECT_NAME"
echo "=========================================================="

if [ -d "$PROJECT_NAME" ]; then
  echo "⚠️  Directory '$PROJECT_NAME' already exists. Skipping initialization."
  exit 0
fi

# Step 1: Initialize Remotion Blank Template
echo "📦 Scaffolding Remotion..."
npx create-video@latest "$PROJECT_NAME" --template=blank

cd "$PROJECT_NAME"

# Step 2: Install Supporting Motion Graphics Packages
echo "✨ Installing animation utilities and icons..."
npm install lucide-react clsx tailwind-merge @remotion/google-fonts

# Step 3: Install and Configure Tailwind CSS
echo "🎨 Configuring Tailwind CSS..."
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Step 4: Write Tailwind Configuration
cat << 'EOF' > tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          900: '#312e81',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
EOF

# Step 5: Copy Primitives if available in the skill directory
SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
if [ -d "$SKILL_DIR/templates/primitives" ]; then
  echo "📥 Copying animation primitives (KineticText, DeviceMockup, CameraRig)..."
  mkdir -p src/components/primitives
  cp -r "$SKILL_DIR/templates/primitives/"* src/components/primitives/
fi

echo ""
echo "✅ Project successfully initialized at ./$PROJECT_NAME"
echo "👉 To start previewing in Remotion Studio:"
echo "   cd $PROJECT_NAME && npm start"
