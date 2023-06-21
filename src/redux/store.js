import { configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { reducer } from './slice';




export const store = configureStore({

  reducer: {
    contacts: reducer,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});





// Створи сховище з configureStore()
// Використовуй функцію createSlice()
// Створи дії збереження та видалення контакту, а також оновлення фільтра
// Зв'яжи React-компоненти з Redux-логікою за допомогою хуків бібліотеки react-redux.
// Використай бібліотеку Redux Persist для збереження масиву контактів у локальному сховищі