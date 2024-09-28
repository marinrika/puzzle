import { ChangeEventHandler, MouseEventHandler } from 'react';

export interface InputLogin {
  placeholder: string;
  length: number;
  isValid: boolean;
  onChangeFirst?: ChangeEventHandler<HTMLInputElement>;
  onChangeLast?: ChangeEventHandler<HTMLInputElement>;
}

export interface CommonButton {
  content: string;
  name?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface SelectOption {
  arrSelect: number[];
  label: string;
  selectedOption: number;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export interface WordCollectionLevel {
  rounds: {
    levelData: {
      id: string;
      name: string;
      imageSrc: string;
      cutSrc: string;
      author: string;
      year: string;
    };
    words: {
      audioExample: string;
      textExample: string;
      textExampleTranslate: string;
      id: number;
      word: string;
      wordTranslate: string;
    }[];
  }[];
  roundsCount: number;
}

export interface StateSelect {
  level: number;
  round: number;
  line: number;
  selectOptions: number[][];
}

export interface StatePlayField {
  imageWidthOld: number;
  imageHeigthOld: number;
  imageHeightNew: number;
  imageWidthNew: number;
  isRound: boolean;
  isColor: boolean;
  isTranslate: boolean;
  isSound: boolean;
  isCheck: boolean;
  isContinue: boolean;
  isTranslateHidden: boolean;
  isSoundHidden: boolean;
  isLineHintHidden: boolean;
  newImage: string;
  canvasLine: string;
  hintLine: string;
}

export interface StatePuzzle {
  item: string;
  index: number;
  commonArrLength: number;
  length: number;
  imageWidthNew: number;
  imageHeightNew: number;
  selectedLine: number;
  isColor: boolean;
  draggable: boolean;
  src: string;
  arrForCommonLength: number[];
  onClick: React.MouseEventHandler<HTMLCanvasElement>;
}

export interface StatisticWindow {
  content: string;
  line: number;
  giveUp: boolean;
}

export interface StateStatistic {
  isStatistic: boolean;
  isModal: boolean;
  modal: StatisticWindow[];
}

export interface ContinueRound {
  onClick: MouseEventHandler<HTMLButtonElement>;
}
