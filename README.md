# LevTech — The Intelligent Living Edit

This is the final 24-page landscape magazine project built around 24 individually generated, crisp 16:9 images. The image files are each standalone files in `assets/images/`; they are not crops of the previous collage.

## Open locally
1. Extract the ZIP.
2. Open the folder in Visual Studio Code.
3. Open `index.html` with the Live Server extension.

## Presentation controls
- Left / Right arrow: previous / next page
- Page Up / Page Down: previous / next page
- Home / End: first / last page
- `O`: open contents
- `T`: toggle light / dark chrome
- Fullscreen control: presentation mode
- On touch displays, swipe left/right

## Publish using GitHub Pages
Create a GitHub repository, then from this folder run:
```bash
git init
git add .
git commit -m "Publish LevTech Intelligent Living Edit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/levtech-intelligent-living-final.git
git push -u origin main
```
Then open repository Settings → Pages and choose GitHub Actions (the workflow is included in `.github/workflows/pages.yml`).

## Important review notes
- The real LevTech logo is included under `assets/brand/levtech-logo.png`.
- Images are generated editorial visuals, not photographs of exact purchasable SKUs. Use approved product photos for model-specific catalogue listings.
- Before public use, verify email/phone/address, product capabilities, compatibility, warranties and service terms.
- The contact button currently uses `info@levtech.ug`; change it if this is not the preferred address.


The magazine advances horizontally from page to page in a landscape presentation format. The Light/Dark control changes the page reading panel and interface colors and remembers the selected theme in this browser.
