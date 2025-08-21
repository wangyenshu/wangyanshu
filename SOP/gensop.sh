#!/bin/bash

# This script scans the current directory for files named "_<something>.qmd"
# and creates a new file "<something>.qmd" with specific content for each found file.

# The script will ignore any file that doesn't start with an underscore and end with ".qmd".
for filename in _*.qmd; do
  # Check if the file exists and is not a pattern match failure
  if [[ -e "$filename" ]]; then
    # Extract the base name (e.g., "something" from "_something.qmd")
    base_name="${filename#_}"
    
    # Define the content to be written to the new file
    content="---
navbar: false
format:
  html:
    page-footer: false
    toc: false
  pdf:
    pdf-engine: weasyprint
format-links: [pdf]
---

<div style=\"font-size: 2em; font-weight: bold; text-align: center;\">STATEMENT OF PURPOSE</div>

<p style=\"font-size: 1.5em; font-weight: bold; text-align: center;\">Yanshu Wang</p>

{{< include _general_sop.qmd >}}
{{< include ${filename} >}}
"
    
    # Write the content to the new file, overwriting if it already exists
    echo -e "$content" > "${base_name}"
    
    echo "Created file: ${base_name}"
  fi
done

