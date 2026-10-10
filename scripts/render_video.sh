#!/usr/bin/env bash
set -euo pipefail

# render_video.sh
# Renders a Remotion composition with preset quality and format options

COMPOSITION="${1:-MainVideo}"
OUTPUT_PATH="${2:-out/video.mp4}"
FORMAT="${3:-1080p}" # options: 1080p, 4k, gif, webm-transparent

mkdir -p "$(dirname "$OUTPUT_PATH")"

echo "=========================================================="
echo "🎥 Rendering Composition: $COMPOSITION"
echo "📁 Output: $OUTPUT_PATH"
echo "⚙️  Preset: $FORMAT"
echo "=========================================================="

case "$FORMAT" in
  "1080p")
    npx remotion render "$COMPOSITION" "$OUTPUT_PATH" \
      --codec=h264 \
      --crf=18 \
      --pixel-format=yuv420p
    ;;

  "4k")
    npx remotion render "$COMPOSITION" "$OUTPUT_PATH" \
      --codec=h264 \
      --scale=2 \
      --crf=16 \
      --pixel-format=yuv420p
    ;;

  "gif")
    npx remotion render "$COMPOSITION" "$OUTPUT_PATH" \
      --scale=0.5 \
      --fps=24
    ;;

  "webm-transparent")
    npx remotion render "$COMPOSITION" "$OUTPUT_PATH" \
      --codec=vp8
    ;;

  *)
    echo "Unknown preset '$FORMAT'. Using default 1080p render."
    npx remotion render "$COMPOSITION" "$OUTPUT_PATH"
    ;;
esac

echo ""
echo "✅ Render complete! Output saved to: $OUTPUT_PATH"
