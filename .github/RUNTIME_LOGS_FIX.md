# Runtime Logs Fix

## Problem
The GitHub Actions workflows were generating warnings when using `actions/upload-artifact@v4` to upload runtime log files that don't always exist:
- `/home/runner/work/_temp/runtime-logs/blocked.jsonl`
- `/home/runner/work/_temp/runtime-logs/blocked.md`

This caused warnings like:
```
##[warning]No files were found with the provided path: /home/runner/work/_temp/runtime-logs/blocked.jsonl
/home/runner/work/_temp/runtime-logs/blocked.md. No artifacts will be uploaded.
```

## Solution
Created a system to ensure these files always exist with appropriate default content:

### Files Created:
1. **Template files** in `.github/runtime-logs/`:
   - `blocked.jsonl` - JSON template with default security status
   - `blocked.md` - Markdown report template

2. **Utility script** at `.github/scripts/ensure-runtime-logs.sh`:
   - Automatically creates missing runtime log files
   - Uses templates when available
   - Generates default content with timestamps when needed

### Usage:
The script can be called in workflows or locally:
```bash
.github/scripts/ensure-runtime-logs.sh
```

### How it works:
1. Creates `/home/runner/work/_temp/runtime-logs/` directory if needed
2. Checks if `blocked.jsonl` and `blocked.md` exist in the runtime logs directory
3. Copies from templates or creates default content if files are missing
4. Files are now available for artifact upload without warnings

## Benefits:
- ✅ Eliminates upload-artifact warnings
- ✅ Provides meaningful default content for security logs
- ✅ Maintains compatibility with existing workflows
- ✅ Self-contained solution that works across different runners

## Files Modified/Added:
- `.github/runtime-logs/blocked.jsonl` - Template file
- `.github/runtime-logs/blocked.md` - Template file  
- `.github/scripts/ensure-runtime-logs.sh` - Utility script
- `.github/workflows/jekyll-gh-pages.yml` - Jekyll deployment workflow