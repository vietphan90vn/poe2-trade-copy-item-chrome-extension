// Function to parse the item data from a specific itemPopupContainer
function parseItemData(container) {
  let result = [];

  // Parse item class
  const itemClass = container.querySelector(".property .lc span");
  if (itemClass) {
    result.push(`Item Class: ${itemClass.textContent}`);
  }

  // Parse rarity
  if (container.classList.contains("uniquePopup")) {
    result.push("Rarity: Unique");
  } else if (container.classList.contains("rarePopup")) {
    result.push("Rarity: Rare");
  } else if (container.classList.contains("magicPopup")) {
    result.push("Rarity: Magic");
  } else if (container.classList.contains("normalPopup")) {
    result.push("Rarity: Normal");
  }

  // Parse item name and type
  const itemName = container.querySelector(".itemName .lc");
  const itemType = container.querySelector(".itemName.typeLine .lc");
  if (itemName) result.push(itemName.textContent);
  if (itemType) result.push(itemType.textContent);

  // Parse requirements
  result.push("--------");
  result.push("Requirements:");
  const requirements = container.querySelector(".requirements");
  if (requirements) {
    const levelRequirement = requirements.querySelector('.s[data-field="lvl"]');
    if (levelRequirement) {
      const levelValue = levelRequirement
        .querySelector(".colourDefault")
        .textContent.trim();
      result.push(`Level: ${levelValue}`);
    }

    const otherRequirements = requirements.querySelectorAll(
      '.s[data-field="str"], .s[data-field="dex"]'
    );
    otherRequirements.forEach((req) => {
      const value = req.querySelector(".colourDefault").textContent.trim();
      const label = req.querySelector("span:last-child").textContent.trim();
      result.push(`${label}: ${value}`);
    });
  }

  // Parse item level
  result.push("--------");
  const itemLevel = container.querySelector(".itemLevel .s");
  if (itemLevel) {
    result.push(itemLevel.textContent);
  }

  // Parse rune mods
  result.push("--------");
  const runeMods = container.querySelectorAll(".runeMod .s");
  runeMods.forEach((mod) => {
    result.push(`${mod.textContent.trim()} (rune)`);
  });

  // Parse skills (implicit)
  result.push("--------");
  const skills = container.querySelectorAll(".skills .skill");
  skills.forEach((skill) => {
    result.push(`${skill.textContent.trim()} (implicit)`);
  });

  // Parse explicit mods
  const explicitMods = container.querySelectorAll(".explicitMod .s");
  explicitMods.forEach((mod) => {
    result.push(mod.textContent.trim());
  });

  // Parse corrupted state
  const corrupted = container.querySelector(".unmet .lc");
  if (corrupted && corrupted.textContent === "Corrupted") {
    result.push("--------");
    result.push("Corrupted");
  }

  return result.join("\n");
}

// Function to copy text to clipboard
function copyToClipboard(text) {
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = text;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
}

// Add a button to each itemPopupContainer
function addCopyButtons() {
  const items_data = document.querySelectorAll("div[data-id]");

  items_data.forEach((item, index) => {
    if (item.querySelector("x-button")) {
      return; // Skip if button already exists
    }
    // Create the button
    const button = document.createElement("x-button");
    button.textContent = "🗐"; // Unicode clipboard icon
    button.title = "Copy to Clipboard"; // Tooltip for better UX
    button.style.position = "absolute";
    button.style.left = "35px";
    button.style.bottom = "10px";
    button.style.zIndex = "9000";
    button.style.padding = "0px 5px";
    button.style.backgroundColor = "rgba(0, 0, 0, 0)";
    button.style.color = "#fff";
    button.style.border = "none";
    button.style.borderRadius = "3px";
    button.style.cursor = "pointer";
    button.style.fontSize = "20px";

    // Add click event to copy parsed data to clipboard
    button.addEventListener("click", () => {
      const parsedData = parseItemData(item.querySelector(".itemPopupContainer"));
      // Update button state to indicate the data was copied
      button.textContent = "✓";
      copyToClipboard(parsedData);

      // Reset button state after 2 seconds
      setTimeout(() => {
        button.textContent = "🗐"; // Unicode clipboard icon
      }, 2000);
    });

    // Ensure the container is positioned relative for proper button placement
    const leftPanel = item.querySelector(".left");
    leftPanel.style.position = "relative";
    leftPanel.appendChild(button);
  });
}

window.addEventListener('load', () => {
  console.log("Page fully loaded, injecting buttons...");

  const observer = new MutationObserver((mutationsList, observer) => {
    const myTarget = document.querySelector('.itemPopupContainer');
    if (myTarget) {
      console.log('Target loaded!');
      addCopyButtons(); // Call the function to add buttons
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
