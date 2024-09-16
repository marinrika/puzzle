import { createSlice } from '@reduxjs/toolkit';
import levelSelection from '../../data/levels/level-selection';
import { StateSelect } from '../../interfaces/interfaces';

export const lengthSelectLevel = Array(6).fill(0);
const optionArray = lengthSelectLevel.map((_select, index) =>
  Array(levelSelection(index + 1).roundsCount).fill(0)
);

if (!localStorage.getItem('level')) localStorage.setItem('level', '0');
if (!localStorage.getItem('round')) localStorage.setItem('round', '0');
localStorage.setItem('line', '0');
if (!localStorage.getItem('selectOptions'))
  localStorage.setItem('selectOptions', JSON.stringify(optionArray));

const initialState: StateSelect = {
  level: Number(localStorage.getItem('level')),
  round: Number(localStorage.getItem('round')),
  line: Number(localStorage.getItem('line')),
  selectOptions: JSON.parse(localStorage.getItem('selectOptions')!),
};

const selectSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    setLevel: (state, action: { payload: number; type: string }) => {
      state.level = action.payload;
      state.line = 0;
    },
    setRound: (state, action: { payload: number; type: string }) => {
      state.round = action.payload;
      state.line = 0;
    },
    setLine: (state, action: { payload: number; type: string }) => {
      state.line = action.payload;
    },
  },
});

export const { setLevel, setRound, setLine } = selectSlice.actions;

export const selectLevel = (state: { select: { level: number } }) =>
  state.select.level;
export const selectRound = (state: { select: { round: number } }) =>
  state.select.round;
export const selectLine = (state: { select: { line: number } }) =>
  state.select.line;
export const selectOptions = (state: {
  select: { selectOptions: number[][] };
}) => state.select.selectOptions;

export default selectSlice.reducer;
