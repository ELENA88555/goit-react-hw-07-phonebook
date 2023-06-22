import React, { useEffect } from 'react';
import { ContactList } from './ContactList/ContactList';
import { AddContactForm } from './AddContactForm/AddContactForm';
import { Filter } from './Filter/Filter';
import css from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
// import { getContacts } from 'redux/slice';
import { fetchContactsThunk } from 'redux/operations';
import { selectContacts } from 'redux/selectors';

export const App = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  return (
    <div>
      <div className={css.thumble}>
        <h1 className={css.title}>Phonebook</h1>

        <AddContactForm></AddContactForm>
        <h2 className={css.titleText}> Contacts</h2>

        {contacts.length < 1 ? (
          <p className={css.textApp}> You have no contacts saved</p>
        ) : (
          <>
            <Filter></Filter>
            <div className={css.containerWrapper}>
              <ContactList></ContactList>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// export const App = () => {
//   const contacts = useSelector(getContacts);
//   // const [ contacts, setContacts] = useState(()=> JSON.parse(window.localStorage.getItem('contacts'))?? [])
//   // const [filter, setFilter] = useState('')

//   useEffect(() => {
//     window.localStorage.setItem('contacts', JSON.stringify(contacts));
//   }, [contacts]);

//   // useEffect(()=> {
//   //   window.localStorage.setItem('NewContacts', JSON.stringify(contacts))
//   //   },[contacts])

//   // useEffect(()=>{
//   //   const contactsSave = localStorage.getItem('NewContacts');
//   //   const parsedContacts = JSON.parse(contactsSave);
//   //   parsedContacts && setContacts(parsedContacts)
//   //   }, []);

//   //  const loginInputId = nanoid();

//   //  const addNewContact = ({id, name, number }) => {
//   //     const contact = {
//   //       id: nanoid(),
//   //       name,
//   //       number,
//   //     };
//   //     contacts.find(contact => contact.name === name)
//   //       ? alert(`${name} is alredy in contact`)
//   //       : setContacts(
//   //         prevContacts => [contact, ...prevContacts])
//   //   };

//   //  const filtrChangeHandler = ({target:{value}}) => {
//   //   setFilter(value);
//   //   };

//   //  const getVisibleContacts = () => {
//   //      return contacts.filter(contact =>
//   //       contact.name.toLowerCase().includes(filter.toLowerCase().trim())
//   //     );
//   //   };

//   //  const btnDeleteHandler = contactId => {
//   //   setContacts(prevState =>
//   //      prevState.filter(contact => contact.id !== contactId),
//   //     );
//   //     setFilter('')
//   //   };

//   return (
//     <div>
//       <div className={css.thumble}>
//         <h1 className={css.title}>Phonebook</h1>

//         <AddContactForm></AddContactForm>
//         <h2 className={css.titleText}> Contacts</h2>

//         {contacts.length < 1 ? (
//           <p className={css.textApp}> You have no contacts saved</p>
//         ) : (
//           <>
//             <Filter
//             // value={filter}
//             // changeFilter={filtrChangeHandler}
//             ></Filter>
//             <div className={css.containerWrapper}>
//               <ContactList
//               // title="Contacts"
//               // contacts={getVisibleContacts()}
//               // id={loginInputId}
//               // onDeleteBtn={btnDeleteHandler}
//               ></ContactList>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };
