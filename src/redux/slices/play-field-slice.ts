import { createSlice } from '@reduxjs/toolkit';
import { StatePlayField } from '../../interfaces/interfaces';

const initialState: StatePlayField = {
  imageWidthOld: 0,
  imageHeigthOld: 0,
  imageHeightNew: 0,
  imageWidthNew: 0,
  isRound: true,
  isColor: false,
  isTranslate: false,
  isSound: false,
  isCheck: true,
  isContinue: false,
  isTranslateHidden: false,
  isSoundHidden: false,
  isLineHintHidden: false,
  newImage: '',
  canvasLine: '',
  hintLine: '',
};

const playFieldSlice = createSlice({
  name: 'playField',
  initialState,
  reducers: {
    setImageWidthOld: (state, action: { payload: number; type: string }) => {
      state.imageWidthOld = action.payload;
    },
    setImageHeigthOld: (state, action: { payload: number; type: string }) => {
      state.imageHeigthOld = action.payload;
    },
    setImageHeigthNew: (state, action: { payload: number; type: string }) => {
      state.imageHeightNew = action.payload;
    },
    setImageWidthhNew: (state, action: { payload: number; type: string }) => {
      state.imageWidthNew = action.payload;
    },
    setNewImage: (state, action: { payload: string; type: string }) => {
      state.newImage = action.payload;
    },
    setIsRound: (state, action: { payload: boolean; type: string }) => {
      state.isRound = action.payload;
    },
    setIsColor: (state) => {
      state.isColor = !state.isColor;
    },
    setIsTranslate: (state) => {
      state.isTranslate = !state.isTranslate;
    },
    setIsSound: (state) => {
      state.isSound = !state.isSound;
    },
    setIsCheck: (state, action: { payload: boolean; type: string }) => {
      state.isCheck = action.payload;
    },
    setIsContinue: (state, action: { payload: boolean; type: string }) => {
      state.isContinue = action.payload;
    },
    setIsTranslateHidden: (state) => {
      state.isTranslateHidden = !state.isTranslateHidden;
    },
    setIsSoundHidden: (state) => {
      state.isSoundHidden = !state.isSoundHidden;
    },
    setIsLineHintHidden: (state) => {
      state.isLineHintHidden = !state.isLineHintHidden;
    },
    setCanvasLine: (state, action: { payload: string; type: string }) => {
      state.canvasLine = action.payload;
    },
    setHintLine: (state, action: { payload: string; type: string }) => {
      state.hintLine = action.payload;
    },
    clearPlayField: () => {
      return initialState;
    },
  },
});

export const {
  setImageHeigthNew,
  setImageWidthOld,
  setImageHeigthOld,
  setImageWidthhNew,
  setNewImage,
  setIsRound,
  setIsColor,
  setIsTranslate,
  setIsSound,
  setIsCheck,
  setIsContinue,
  setIsTranslateHidden,
  setIsSoundHidden,
  setIsLineHintHidden,
  setCanvasLine,
  setHintLine,
  clearPlayField,
} = playFieldSlice.actions;

export const selectImageWidthOld = (state: {
  playField: { imageWidthOld: number };
}) => state.playField.imageWidthOld;
export const selectImageHeigthOld = (state: {
  playField: { imageHeigthOld: number };
}) => state.playField.imageHeigthOld;
export const selectImageHeigthNew = (state: {
  playField: { imageHeightNew: number };
}) => state.playField.imageHeightNew;
export const selectImageWidthNew = (state: {
  playField: { imageWidthNew: number };
}) => state.playField.imageWidthNew;
export const selectIsRound = (state: { playField: { isRound: boolean } }) =>
  state.playField.isRound;
export const selectIsColor = (state: { playField: { isColor: boolean } }) =>
  state.playField.isColor;
export const selectIsTranslate = (state: {
  playField: { isTranslate: boolean };
}) => state.playField.isTranslate;
export const selectIsLineHintHidden = (state: {
  playField: { isLineHintHidden: boolean };
}) => state.playField.isLineHintHidden;
export const selectIsCheck = (state: { playField: { isCheck: boolean } }) =>
  state.playField.isCheck;
export const selectIsContinue = (state: {
  playField: { isContinue: boolean };
}) => state.playField.isContinue;
export const selectIsTranslateHidden = (state: {
  playField: { isTranslateHidden: boolean };
}) => state.playField.isTranslateHidden;
export const selectIsSoundHidden = (state: {
  playField: { isSoundHidden: boolean };
}) => state.playField.isSoundHidden;
export const selectIsSound = (state: { playField: { isSound: boolean } }) =>
  state.playField.isSound;
export const selectNewImage = (state: { playField: { newImage: string } }) =>
  state.playField.newImage;
export const selectCanvasLine = (state: {
  playField: { canvasLine: string };
}) => state.playField.canvasLine;
export const selectHintLine = (state: { playField: { hintLine: string } }) =>
  state.playField.hintLine;

export default playFieldSlice.reducer;
