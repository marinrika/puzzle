import levelSelection from '../../../../data/levels/level-selection';

let widthResize: number;
if (window.innerWidth >= 1200) {
  widthResize = 1000;
}
if (window.innerWidth < 1200) {
  widthResize = 700;
}

interface imageResize {
  img: string;
  canvasWidth: number;
  canvasHeigth: number;
}

const convertImageSize1 = (
  selectedOptionLevel: number,
  selectedOptionRound: number
): imageResize => {
  const img = new Image();
  img.crossOrigin = '*';
  img.src = `https://raw.githubusercontent.com/marinrika/puzzle-data/main/images/${
    levelSelection(selectedOptionLevel).rounds[selectedOptionRound].levelData
      .imageSrc
  }`;
  const imageWidth = widthResize;
  const imageHeight = (widthResize * img.height) / img.width;
  img.onload = function setResize() {};
  return {
    img: img.src,
    canvasWidth: imageWidth,
    canvasHeigth: imageHeight,
  };
};
async function convertImageSize(
  selectedOptionLevel: number,
  selectedOptionRound: number
): Promise<imageResize> {
  const src = `https://raw.githubusercontent.com/marinrika/puzzle-data/main/images/${
    levelSelection(selectedOptionLevel).rounds[selectedOptionRound].levelData
      .imageSrc
  }`;

  const resp = await fetch(src);
  const img = new Image();
  img.crossOrigin = '*';
  img.src = resp.url;
  const imageWidth = widthResize;
  const imageHeight = (widthResize * img.height) / img.width;
  return {
    img: img.src,
    canvasWidth: imageWidth,
    canvasHeigth: imageHeight,
  };
}

const media = window.matchMedia('(max-width: 1200px)');
function setResize() {
  media.addEventListener('change', (event) => {
    if (!event.matches) {
      widthResize = 1000;
      // localStorage.setItem('line', '0');
      // emitter.emit('line-remove', widthResize);
      // convertImageSize();
    }
    if (event.matches) {
      widthResize = 700;
      // localStorage.setItem('line', '0');
      // emitter.emit('line-remove', widthResize);
      // convertImageSize();
    }
  });
}
setResize();

export default convertImageSize;
