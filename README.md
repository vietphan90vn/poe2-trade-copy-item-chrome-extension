# PoE2 Trade Item Copy Chrome/Firefox Extension

This Extension allows users to copy item details from the Path of Exile 2 trade page to the clipboard. The copied item data can then be pasted into Path of Building.

## Note
- The source code in this project was generated with the assistance of GitHub Copilot - GPT-4 under my instruction.
- For the final bug fixes and parsing improvements, I made manual adjustments myself as it was more efficient than instructing Copilot.

## How to Run

### Chrome

1. Clone this repository to your local machine:
   ```bash
   git clone <repository-url>
   ```

2. Open Google Chrome and navigate to `chrome://extensions/`.

3. Enable **Developer mode** by toggling the switch in the top-right corner.

4. Click on the **Load unpacked** button.

5. Select the folder where this repository is located.

6. The extension will now be loaded and visible in the extensions bar.

7. Navigate to the Path of Exile 2 trade page, and the extension will automatically add copy buttons to the items.

### Firefox

1. Clone this repository to your local machine:
   ```bash
   git clone <repository-url>
   ```

2. Open Firefox and go to `about:debugging#/runtime/this-firefox`.

3. Click **Load Temporary Add-on...**.

4. Select the `manifest.json` file from the folder where this repository is located.

5. The extension will now be loaded and visible in the extensions menu.

6. Navigate to the Path of Exile 2 trade page, and the extension will automatically add copy buttons to the items.

## Features

- Adds a copy button to the left side of items on the Path of Exile 2 trade page.
- Clicking the copy button copies the item's details to the clipboard.
- The copied data is formatted for compatibility with Path of Building.
