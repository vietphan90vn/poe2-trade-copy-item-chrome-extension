// Function to parse and return item data as a string for a specific container
function parseItemData(container) {
  let result = '';

  // Parse properties
  const properties = container.querySelectorAll('.property .s[data-field^="stat."]');
  properties.forEach((property) => {
    result += property.textContent.trim() + '\n';
  });

  // Parse separators
  const separators = container.querySelectorAll('.separator');
  separators.forEach(() => {
    result += '-------\n';
  });

  // Parse requirements
  const requirements = container.querySelector('.requirements');
  if (requirements) {
    result += requirements.textContent.trim() + '\n';
  }

  // Parse runeMod
  const runeMods = container.querySelectorAll('.runeMod .s[data-field^="stat."]');
  runeMods.forEach((runeMod) => {
    result += runeMod.textContent.trim() + '\n';
  });

  // Parse explicitMods
  const explicitMods = container.querySelectorAll('.explicitMod .s[data-field^="stat."]');
  explicitMods.forEach((explicitMod) => {
    result += explicitMod.textContent.trim() + '\n';
  });

  // Parse implicitMods (if present)
  const implicitMods = container.querySelectorAll('.implicitMod .s[data-field^="stat."]');
  implicitMods.forEach((implicitMod) => {
    result += implicitMod.textContent.trim() + '\n';
  });

  return result.trim();
}

// Function to copy text to clipboard
function copyToClipboard(text) {
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = text;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextArea);
}

// Add a button to each itemPopupContainer
function addCopyButtons() {
  const containers = document.querySelectorAll('.itemPopupContainer');

  containers.forEach((container, index) => {
    // Create the button
    const button = document.createElement('button');
    button.textContent = '🗐'; // Unicode clipboard icon
    button.title = 'Copy to Clipboard'; // Tooltip for better UX
    button.style.position = 'absolute';
    button.style.top = '0px';
    button.style.right = '55px';
    button.style.zIndex = '9000';
    button.style.padding = '0px 5px';
    button.style.backgroundColor = 'rgba(51, 51, 51, 0.5)';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '3px';
    button.style.cursor = 'pointer';
    button.style.fontSize = '14px';

    // Add click event to copy parsed data to clipboard
    button.addEventListener('click', () => {
      const parsedData = parseItemData(container);
      // Update button state to indicate the data was copied
      button.textContent = '✓';
      copyToClipboard(parsedData);

      // Reset button state after 2 seconds
      setTimeout(() => {
        button.textContent = '🗐'; // Unicode clipboard icon
      }, 2000);
    });

    // Ensure the container is positioned relative for proper button placement
    container.style.position = 'relative';

    // Append the button to the container
    container.appendChild(button);
  });
}

// Run the function to add buttons
addCopyButtons();
