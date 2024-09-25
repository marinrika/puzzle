import { createSlice } from '@reduxjs/toolkit';
import { StateStatistic, StatisticWindow } from '../../interfaces/interfaces';

const initialState: StateStatistic = {
  isStatistic: false,
  isModal: false,
  modal: [],
};

const statisticSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {
    setIsStatistic: (state, action: { payload: boolean; type: string }) => {
      state.isStatistic = action.payload;
    },
    setIsModal: (state, action: { payload: boolean; type: string }) => {
      state.isModal = action.payload;
    },
    setModal: (state, action: { payload: StatisticWindow; type: string }) => {
      state.modal.push(action.payload);
    },
    setClearModal: (state) => {
      state.modal = [];
    },
  },
});

export const { setIsStatistic, setIsModal, setModal, setClearModal } =
  statisticSlice.actions;

export const selectIsStatistic = (state: {
  statistic: { isStatistic: boolean };
}) => state.statistic.isStatistic;

export const selectIsModal = (state: { statistic: { isModal: boolean } }) =>
  state.statistic.isModal;

export const selectModal = (state: {
  statistic: { modal: StatisticWindow[] };
}) => state.statistic.modal;

export default statisticSlice.reducer;
