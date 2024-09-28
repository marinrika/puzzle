import levelSelection from '../data/levels/level-selection';

function soundPlay(
  selectedLevel: number,
  selectedRound: number,
  selectedLine: number
) {
  const sound = new Audio();
  sound.src = `https://raw.githubusercontent.com/marinrika/puzzle-data/main/${
    levelSelection(selectedLevel + 1).rounds[selectedRound].words[selectedLine]
      .audioExample
  }`;

  return sound;
}

export default soundPlay;
