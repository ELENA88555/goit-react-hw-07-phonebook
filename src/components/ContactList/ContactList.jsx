import css from './ContactList.module.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { deleteContact, getContacts, getFilter } from 'redux/slice';
// import { nanoid } from '@reduxjs/toolkit';
import {
  selectVisibleContacts,
  selectError,
  selectIsLoading,
} from 'redux/selectors';
import { deleteContactThunk, fetchContactsThunk } from 'redux/operations';

// const contactId = nanoid();

export const ContactList = () => {
  const dispatch = useDispatch();
  const contactsList = useSelector(selectVisibleContacts);
  // const filter = useSelector(selectFilter);
  const error = useSelector(selectError);
  const loading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContactsThunk());
    
  }, [dispatch]);

  // const getVisibleContacts = () => {
  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(filter.toLowerCase().trim())
  //   );
  // };

  // const tasks = useSelector(selectVisibleTasks)

  const btnDeleteHandler = (id)=> {
    dispatch(deleteContactThunk(id));
    // dispatch(fetchContactsThunk());
  };

  // const contactsList = getVisibleContacts();

  return (
    <ul className={css.list}>
      {loading && <p>loading ...</p>}

      {contactsList.length > 0 ? (
        contactsList.map(({ id, name, phone }) => (
          <li className={css.item} key={id} id={id}>
            <p className={css.text}>{name}</p>
            <p className={css.text}>{phone}</p>
            <button
              type="button"
              className={css.btnDelete}
              onClick={() => btnDeleteHandler(id)}
            >
              Delete
            </button>
          </li>
        ))
      ) : (
        <p>{error}</p>
      )}
    </ul>
  );
};
