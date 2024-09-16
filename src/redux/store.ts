import { configureStore } from '@reduxjs/toolkit';
import selectReducer from './slices/select-slice';
import playFieldReducer from './slices/play-field-slice';

const store = configureStore({
  reducer: {
    select: selectReducer,
    playField: playFieldReducer,
  },
});

export default store;
