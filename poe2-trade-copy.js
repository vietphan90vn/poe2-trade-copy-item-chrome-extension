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
    const levelRequirement = requirements.querySelector('[data-field="lvl"]');
    if (levelRequirement) {
      const levelValue = levelRequirement
        .querySelector(".colourDefault")
        .textContent.trim();
      result.push(`Level: ${levelValue}`);
    }

    const otherRequirements = requirements.querySelectorAll(
      '[data-field="str"], [data-field="dex"], [data-field="int"]',
    );
    otherRequirements.forEach((req) => {
      const value = req.querySelector(".colourDefault").textContent.trim();
      const label = req.querySelector("span:last-child").textContent.trim();
      result.push(`${label}: ${value}`);
    });
  }

  // Parse item level
  result.push("--------");
  const itemLevel = container.querySelector('.itemLevel [data-field="ilvl"]');
  if (itemLevel) {
    result.push(itemLevel.textContent);
  }

  // Parse rune mods
  const runeMods = container.querySelectorAll('.runeMod .lc');
  if (runeMods.length > 0) {
    result.push("--------");
    runeMods.forEach((mod) => {
      if (mod.textContent.trim() !== ""){
        result.push(`${mod.textContent.trim()} (rune)`);
      }
    });
  }

  // Parse Grand skills
  const skills = container.querySelectorAll(".skills .skill");
  if (skills.length > 0) {
    result.push("--------");
    skills.forEach((skill) => {
      result.push(`${skill.textContent.trim()} (implicit)`);
    });
  }

  // Parse enchantMod
  const enchantMod = container.querySelector(".enchantMod .s");
  if (enchantMod) {
    result.push("--------");
    result.push(`${enchantMod.textContent.trim()} (enchant)`);
  }
  // Parse implicits
  const implicts = container.querySelectorAll(".implicitMod .s");
  if (implicts.length > 0) {
    result.push("--------");
    implicts.forEach((implicit) => {
      result.push(`${implicit.textContent.trim()} (implicit)`);
    });
  }

  // Parse fracturedMod
  const explicits = [];

  const fracturedMod = container.querySelector(".fracturedMod .s");
  if (fracturedMod) {
    explicits.push(`${fracturedMod.textContent.trim()} (fractured)`);
  }

  // Parse explicit mods
  const explicitMods = container.querySelectorAll(".explicitMod .s");
  if (explicitMods.length > 0) {
    explicitMods.forEach((mod) => {
      explicits.push(mod.textContent.trim());
    });
  }

  if (explicits.length > 0) {
    result.push("--------");
    explicits.forEach((explicit) => {
      result.push(explicit);
    });
  }

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
    leftPanel.appendChild(button);
  });
}

window.addEventListener('load', () => {
  const observer = new MutationObserver((mutationsList, observer) => {
    const myTarget = document.querySelector('.itemPopupContainer');
    if (myTarget) {
      addCopyButtons(); // Call the function to add buttons
      // observer.disconnect(); // Stop observing after the target is found
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
