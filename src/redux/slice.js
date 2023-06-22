import { createSlice } from '@reduxjs/toolkit';
import {
  addContactThunk,
  deleteContactThunk,
  fetchContactsThunk,
} from './operations';

const handlePending = state => {
  state.contacts.isLoading = true;
  state.contacts.error = '';
};

const handleFulfilled = (state, { payload }) => {
  state.contacts.isLoading = false;
  state.contacts.items = payload;
};

const handleRejected = (state, { payload }) => {
  state.contacts.isLoading = false;
  state.contacts.error = payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: { items: [], isLoading: false, error: null },

    filter: '',
  },

  reducers: {
    changeFilter(state, { payload }) {
      state.filter = payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContactsThunk.pending, handlePending)
      .addCase(fetchContactsThunk.fulfilled, handleFulfilled)
      .addCase(fetchContactsThunk.rejected, handleRejected)
      .addCase(addContactThunk.pending, handlePending)
      .addCase(addContactThunk.rejected, handleRejected)
      .addCase(addContactThunk.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.error = '';
        state.contacts.items.push(payload);
      })
      .addCase(deleteContactThunk.pending, handlePending)
      .addCase(deleteContactThunk.rejected, handleRejected)
      .addCase(deleteContactThunk.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.error = '';
        state.contacts.items = state.contacts.items.filter(
          contact => contact.id !== payload.id
        );
      });
  },
});

export const reducer = contactsSlice.reducer;

export const { changeFilter } = contactsSlice.actions;
