import { useEffect, useRef } from 'react';
import levelSelection from '../../../../data/levels/level-selection';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLevel,
  selectRound,
} from '../../../../redux/slices/select-slice';
import {
  selectImageHeigthNew,
  selectImageHeigthOld,
  selectImageWidthOld,
  setImageHeigthNew,
  setImageHeigthOld,
  setImageWidthhNew,
  setImageWidthOld,
  setNewImage,
} from '../../../../redux/slices/play-field-slice';

let widthResize: number;
if (window.innerWidth >= 1200) {
  widthResize = 1000;
}
if (window.innerWidth < 1200) {
  widthResize = 700;
}

const Canvas = () => {
  const selectedLevel = useSelector(selectLevel);
  const selectedRound = useSelector(selectRound);
  const imageWidthOld = useSelector(selectImageWidthOld);
  const imageHeigthOld = useSelector(selectImageHeigthOld);
  const imageHeightNew = useSelector(selectImageHeigthNew);

  const dispatch = useDispatch();
  const img = new Image();
  img.crossOrigin = '*';
  img.src = `https://raw.githubusercontent.com/marinrika/puzzle-data/main/images/${
    levelSelection(selectedLevel + 1).rounds[selectedRound].levelData.imageSrc
  }`;
  const imageWidthNew = widthResize;

  img.onload = () => {
    const imageHeightNew = (widthResize * img.height) / img.width;
    dispatch(setImageWidthhNew(imageWidthNew));
    dispatch(setImageWidthOld(img.width));
    dispatch(setImageHeigthOld(img.height));
    dispatch(setImageHeigthNew(imageHeightNew));
  };
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const draw = (ctx: CanvasRenderingContext2D | null) => {
    if (ctx === null) return;
    ctx.drawImage(
      img,
      0,
      0,
      imageWidthOld,
      imageHeigthOld,
      0,
      0,
      imageWidthNew,
      imageHeightNew
    );
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) return;
    canvas.width = imageWidthNew;
    canvas.height = imageHeightNew;
    const context = canvas.getContext('2d');
    draw(context);
    const newImage = new Image();
    newImage.src = canvas.toDataURL('image/jpeg');
    dispatch(setNewImage(newImage.src));
  }, [dispatch, draw, imageHeightNew, imageWidthNew]);

  return <canvas ref={canvasRef}></canvas>;
};

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

export default Canvas;
