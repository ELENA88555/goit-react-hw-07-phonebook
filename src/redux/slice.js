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
    changeFilter (state, { payload }) {
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
      .addCase(addContactThunk.fulfilled, (state, {payload})=> { 
         state.contacts.isLoading = false;
         state.contacts.error = ''; 
         state.contacts.items.push(payload);})
         .addCase(deleteContactThunk.pending, handlePending)
         .addCase(deleteContactThunk.rejected, handleRejected)
         .addCase(deleteContactThunk.fulfilled, (state, { payload }) => {
          state.contacts.isLoading = false;
          state.contacts.error = '';
          const index = state.contacts.items.findIndex(item => item.id === payload);
      state.contacts.items.splice(index, 1);
        })


      // .addMatcher(action => {
      //   action.type.endsWith('/pending');
      // }, handlePending)
      // .addMatcher(action => {
      //   action.type.endsWith('/rejected');
      // }, handleRejected)
      // .addMatcher(
      //   (isAnyOf([
      //     fetchContactsThunk.pending,
      //     addContactThunk.pending,
      //     deleteContactThunk.pending,
      //   ]),
      //   handlePending)
      // );

    // fetching: (state) => {state.contacts.isLoading = true},
    // fetchSuccess: (state, {payload}) =>
    //  {state.contacts.isLoading = false
    //   state.contacts.items = payload
    //   state.contacts.error = ""},
    // fetchError: (state, {payload})=> {
    //   state.contacts.isLoading = false
    //   state.contacts.error = payload
    // },

    //   // addContact: (state, action)=> {
    //   //   state.contacts.push(action.payload);
    //   // },
    //   // deleteContact: (state, action)=> {
    //   //  state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    //   //   },
    //   changeFilter: (state, {payload})=> {
    //     state.filter = payload;
  },
});



export const reducer = contactsSlice.reducer;

export const { changeFilter } =
  contactsSlice.actions;

// export const getContacts = state => state.contacts.contacts;
// export const getFilter = state => state.contacts.filter;

// export const selectSortedContacts = (state) => {return state.contacts.contacts.toSorted((a,b)=> { return a.prise - b.prise})}
// export const selectContacts = (state) =>  state.contacts
