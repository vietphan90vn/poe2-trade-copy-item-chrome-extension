function getRarityFromClassName(container) {
  const classes = container.className.split(" ");
  if (classes.includes("rarePopup")) return "Rare";
  if (classes.includes("magicPopup")) return "Magic";
  if (classes.includes("uniquePopup")) return "Unique";
  if (classes.includes("normalPopup")) return "Normal";
  return "Unknown";
}

const container = document.querySelector(".itemPopupContainer");
const itemBox = container.querySelector(".itemBoxContent");

const getText = (selector) => itemBox.querySelector(selector)?.textContent.trim() || "";

const blocks = [];

const rarity = getRarityFromClassName(container);
const itemClass = itemBox.querySelector(".property span")?.textContent.trim() || "???";
const itemName = getText(".itemName > span");
const itemBase = getText(".itemName.typeLine > span");
const quality = itemBox.querySelector("[data-field='quality']")?.textContent.trim();
const spiritVal = itemBox.querySelector("[data-field='spirit'] span.colourAugmented")?.textContent.trim();
const spirit = spiritVal ? `Spirit: ${spiritVal} (augmented)` : null;
const ilvlVal = itemBox.querySelector("[data-field='ilvl'] span.colourDefault")?.textContent.trim();
const ilvl = ilvlVal ? `Item Level: ${ilvlVal}` : null;
const reqs = itemBox.querySelector(".requirements span.lc")?.textContent.trim();

const runeModEl = Array.from(itemBox.querySelectorAll(".explicitMod span[data-field]"))
  .find(el => el.textContent.includes("Allies in your Presence deal") && el.textContent.includes("increased Damage"));
const runeMod = runeModEl?.textContent.trim();

const skill = itemBox.querySelector(".skills [data-field]")?.textContent.trim();

const mods = Array.from(itemBox.querySelectorAll(".explicitMod span[data-field]"))
  .filter(el => el !== runeModEl)
  .map(el => el.textContent.trim());

// --- First Block: Basic info in one block ---
const firstBlock = [];
if (itemClass) firstBlock.push(`Item Class: ${itemClass}`);
if (rarity) firstBlock.push(`Rarity: ${rarity}`);
if (itemName) firstBlock.push(itemName);
if (itemBase) firstBlock.push(itemBase);
blocks.push(firstBlock);

// --- Add rest of the blocks ---
const qualityBlock = [];
if (quality)
  qualityBlock.push(`${quality} (augmented)`)
else
  qualityBlock.push("Quality: +0% (augmented)");
if (spirit) qualityBlock.push(spirit);
if (qualityBlock.length) blocks.push(qualityBlock);

if (reqs) blocks.push([reqs.replace('Requires', 'Requires:')]);

if (runeMod) blocks.push(["Sockets:", "s"]);

if (ilvl) blocks.push([ilvl]);

if (runeMod) blocks.push([`${runeMod} (rune)`]);

if (skill) blocks.push([skill]);

if (mods.length) blocks.push(mods);

// Join non-empty blocks with --------
const result = blocks
  .map(block => block.join("\n"))
  .join("\n--------\n");

console.log(result);
