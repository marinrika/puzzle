import { useEffect, useRef, useState } from 'react';
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
  setImageWidthNew,
  setImageWidthOld,
  setNewImage,
} from '../../../../redux/slices/play-field-slice';

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

  const useDeviceDetect = () => {
    const [isTablet, setIsTablet] = useState(window.innerWidth < 1200);
    useEffect(() => {
      const handleResize = () => setIsTablet(window.innerWidth < 1200);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    return { isTablet };
  };

  const { isTablet } = useDeviceDetect();
  const widthResize = isTablet ? 700 : 1000;

  img.onload = () => {
    const imageHeightNew = (widthResize * img.height) / img.width;
    dispatch(setImageWidthNew(widthResize));
    dispatch(setImageHeigthNew(imageHeightNew));
    dispatch(setImageWidthOld(img.width));
    dispatch(setImageHeigthOld(img.height));
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
      widthResize,
      imageHeightNew
    );
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) return;
    canvas.width = widthResize;
    canvas.height = imageHeightNew;
    const context = canvas.getContext('2d');
    draw(context);
    const newImage = new Image();
    newImage.src = canvas.toDataURL('image/jpeg');
    dispatch(setNewImage(newImage.src));
  }, [dispatch, draw, imageHeightNew, widthResize]);

  return <canvas ref={canvasRef}></canvas>;
};

export default Canvas;
