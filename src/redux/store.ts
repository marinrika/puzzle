import { configureStore } from '@reduxjs/toolkit';
import selectReducer from './slices/select-slice';
import playFieldReducer from './slices/play-field-slice';
import statisticReduser from './slices/statistic-slice';

const store = configureStore({
  reducer: {
    select: selectReducer,
    playField: playFieldReducer,
    statistic: statisticReduser,
  },
});

export default store;
