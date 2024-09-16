import { useEffect, useRef } from 'react';
import { StatePuzzle } from '../../../../interfaces/interfaces';
import styles from './puzzle.module.css';

const Puzzle = ({
  item,
  index,
  commonArrLength,
  length,
  imageWidthNew,
  imageHeightNew,
  src,
  isColor,
  selectedLine,
  arrForCommonLength,
  onClick,
}: StatePuzzle) => {
  const heightPuzzle: number = imageHeightNew / 10;
  const commonLength: number = imageWidthNew;

  const pi: number = Math.PI;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const draw = (ctx: CanvasRenderingContext2D, widthPuzzle: number) => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(widthPuzzle, 0);
      if (index === 0) {
        ctx.lineTo(widthPuzzle, heightPuzzle / 2 - heightPuzzle / 14);
        ctx.arc(
          widthPuzzle + (Math.sqrt(3) * heightPuzzle) / 14,
          heightPuzzle / 2,
          heightPuzzle / 7,
          (-pi * 5) / 6,
          (pi * 5) / 6,
          false
        );
        ctx.lineTo(widthPuzzle, heightPuzzle);
        ctx.lineTo(0, heightPuzzle);
      } else if (index === length - 1) {
        ctx.lineTo(widthPuzzle, heightPuzzle);
        ctx.lineTo(0, heightPuzzle);
        ctx.lineTo(0, heightPuzzle / 2 - heightPuzzle / 14);
        ctx.arc(
          (Math.sqrt(3) * heightPuzzle) / 14,
          heightPuzzle / 2,
          heightPuzzle / 7,
          (pi * 5) / 6,
          (-pi * 5) / 6,
          true
        );
      } else {
        ctx.lineTo(widthPuzzle, heightPuzzle / 2 - heightPuzzle / 14);
        ctx.arc(
          widthPuzzle + (Math.sqrt(3) * heightPuzzle) / 14,
          heightPuzzle / 2,
          heightPuzzle / 7,
          (-pi * 5) / 6,
          (pi * 5) / 6,
          false
        );
        ctx.lineTo(widthPuzzle, heightPuzzle);
        ctx.lineTo(0, heightPuzzle);
        ctx.lineTo(0, heightPuzzle / 2 - heightPuzzle / 14);
        ctx.arc(
          (Math.sqrt(3) * heightPuzzle) / 14,
          heightPuzzle / 2,
          heightPuzzle / 7,
          (pi * 5) / 6,
          (-pi * 5) / 6,
          true
        );
      }
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(
        image,
        (commonLength / commonArrLength) * arrForCommonLength[index],
        selectedLine * heightPuzzle,
        widthPuzzle + (heightPuzzle * 3) / 14 + 2,
        heightPuzzle,
        1,
        1,
        widthPuzzle + (heightPuzzle * 3) / 14 + 2,
        heightPuzzle
      );

      if (isColor) {
        ctx.fillStyle = 'rgb(201, 201, 201)';
        ctx.fill();
      }
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.font = 'bold 18px Arial';
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#41015e';
      ctx.lineWidth = 0.8;
      ctx.fillText(item, 10, 17);
      ctx.strokeText(item, 10, 17);
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const widthPuzzle = (commonLength / commonArrLength) * item.length;
    canvas.height = heightPuzzle;
    canvas.width = widthPuzzle + (heightPuzzle * (Math.sqrt(3) + 2)) / 14 + 2;
    canvas.style.marginLeft = `-${
      (heightPuzzle * (Math.sqrt(3) + 2)) / 14 + 2
    }px`;
    const context = canvas.getContext('2d');
    if (context === null) return;
    draw(context, widthPuzzle);
  }, [commonArrLength, commonLength, draw, heightPuzzle, item.length, src]);

  return (
    <canvas
      id={index.toString()}
      className={styles.puzzle}
      onClick={onClick}
      ref={canvasRef}></canvas>
  );
};

export default Puzzle;
