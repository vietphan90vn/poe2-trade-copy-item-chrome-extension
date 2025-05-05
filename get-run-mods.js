const runMod = document.querySelectorAll('.runeMod .s[data-field^="stat."]');

const explicitMod = document.querySelectorAll('.explicitMod .s[data-field^="stat."]');

explicitMod.forEach((element) => {
      console.log(element.textContent);
  });
