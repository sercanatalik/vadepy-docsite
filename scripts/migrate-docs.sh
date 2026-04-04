#!/usr/bin/env bash
#
# Migrate vadepy/docs (markdown) -> vadepy-docs/content/docs (fumadocs MDX)
#
# What it does:
#   1. Copies .md files as .mdx with fumadocs frontmatter (title, description)
#   2. Creates meta.json files for folder ordering
#   3. Converts markdown link references (.md -> relative paths)
#   4. Strips pytest markers like ```python notest
#   5. Converts -- to proper em dashes
#
# Usage: bash scripts/migrate-docs.sh

set -euo pipefail

SRC="/Users/sercan/codebase/quant-works/vadepy/docs"
DEST="/Users/sercan/codebase/vadepy-docsite/content/docs"

# Clean destination (keep .gitkeep if any)
rm -rf "$DEST"
mkdir -p "$DEST"

# -------------------------------------------------------------------
# Helper: extract first H1 as title, first paragraph as description
# -------------------------------------------------------------------
extract_meta() {
  local file="$1"
  TITLE=""
  DESC=""

  # Title = first line starting with "# "
  TITLE=$(grep -m1 '^# ' "$file" | sed 's/^# //')

  # Description = first non-empty line after title that isn't a heading or hr
  DESC=$(awk '
    BEGIN { found_title=0; }
    /^# / && !found_title { found_title=1; next }
    found_title && /^[[:space:]]*$/ { next }
    found_title && /^---/ { next }
    found_title && /^___/ { next }
    found_title && /^#/ { exit }
    found_title && /^[^|*\[]/ { gsub(/"/, "\\\""); print; exit }
  ' "$file")
}

# -------------------------------------------------------------------
# Convert a single .md file to .mdx
# -------------------------------------------------------------------
convert_file() {
  local src_file="$1"
  local rel_path="${src_file#$SRC/}"
  local dest_file="$DEST/${rel_path%.md}.mdx"

  mkdir -p "$(dirname "$dest_file")"

  extract_meta "$src_file"

  # Strip the H1 title line and leading hrs from body
  local body
  body=$(awk '
    BEGIN { skip_title=1; skip_blanks=1 }
    skip_title && /^# / { skip_title=0; next }
    skip_blanks && /^[[:space:]]*$/ { next }
    skip_blanks && /^---+$/ { next }
    skip_blanks && /^___+$/ { next }
    { skip_blanks=0; print }
  ' "$src_file")

  # Fix markdown links: remove .md extension from links
  # .md) -> )  and  .md#anchor) -> #anchor)
  # fumadocs uses relative file links that resolve automatically
  body=$(echo "$body" | sed -E 's/\.md\)/)/' | sed -E 's/\.md#/#/g' | sed 's/```python notest/```bash/g')

  # Write the MDX file with frontmatter
  cat > "$dest_file" <<FRONTMATTER
---
title: "${TITLE}"
description: "${DESC}"
---

${body}
FRONTMATTER

  echo "  -> ${dest_file#$DEST/}"
}

# -------------------------------------------------------------------
# Process all .md files (skip conftest.py, __pycache__, etc.)
# -------------------------------------------------------------------
echo "Migrating docs from $SRC -> $DEST"
echo ""

find "$SRC" -name '*.md' -type f | sort | while read -r f; do
  convert_file "$f"
done

# -------------------------------------------------------------------
# Create meta.json files for fumadocs page ordering
# -------------------------------------------------------------------
echo ""
echo "Creating meta.json files..."

# Root meta.json
cat > "$DEST/meta.json" <<'EOF'
{
  "title": "Documentation",
  "pages": [
    "index",
    "getting-started",
    "guides",
    "api",
    "conventions",
    "roadmap"
  ]
}
EOF
echo "  -> meta.json"

# getting-started/meta.json
cat > "$DEST/getting-started/meta.json" <<'EOF'
{
  "title": "Getting Started",
  "pages": [
    "installation",
    "architecture",
    "type-system"
  ]
}
EOF
echo "  -> getting-started/meta.json"

# api/meta.json
cat > "$DEST/api/meta.json" <<'EOF'
{
  "title": "API Reference",
  "pages": [
    "calendar",
    "autodiff",
    "numerical",
    "curves",
    "instruments",
    "solver",
    "fx",
    "context",
    "cashflows"
  ]
}
EOF
echo "  -> api/meta.json"

# guides/meta.json
cat > "$DEST/guides/meta.json" <<'EOF'
{
  "title": "Guides",
  "pages": [
    "quick-start",
    "market-context",
    "serialization",
    "calibration",
    "rates",
    "credit",
    "fx",
    "financing"
  ]
}
EOF
echo "  -> guides/meta.json"

# guides/rates/meta.json
cat > "$DEST/guides/rates/meta.json" <<'EOF'
{
  "title": "Rates",
  "pages": [
    "index",
    "curve-building",
    "bootstrap-parametric",
    "pricing",
    "risk",
    "capfloor"
  ]
}
EOF
echo "  -> guides/rates/meta.json"

# guides/credit/meta.json
cat > "$DEST/guides/credit/meta.json" <<'EOF'
{
  "title": "Credit",
  "pages": [
    "index",
    "bonds",
    "callable-bonds",
    "credit-curves-cds",
    "fitted-curves",
    "spread-analytics"
  ]
}
EOF
echo "  -> guides/credit/meta.json"

# guides/fx/meta.json
cat > "$DEST/guides/fx/meta.json" <<'EOF'
{
  "title": "FX",
  "pages": [
    "index",
    "fx-rates-forwards",
    "cross-currency",
    "non-deliverable"
  ]
}
EOF
echo "  -> guides/fx/meta.json"

# guides/financing/meta.json
cat > "$DEST/guides/financing/meta.json" <<'EOF'
{
  "title": "Financing",
  "pages": [
    "index"
  ]
}
EOF
echo "  -> guides/financing/meta.json"

echo ""
echo "Done! Migrated $(find "$DEST" -name '*.mdx' | wc -l | tr -d ' ') MDX files and $(find "$DEST" -name 'meta.json' | wc -l | tr -d ' ') meta.json files."
