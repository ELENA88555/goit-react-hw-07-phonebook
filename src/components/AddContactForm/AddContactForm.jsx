import React from 'react';
import { nanoid } from 'nanoid';
import css from './AddContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
// import { addContact } from 'redux/slice';
import { selectContacts } from 'redux/selectors';
import { addContactThunk } from 'redux/operations';

const loginInputId = nanoid();

export const AddContactForm = () => {

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  

  // const [name, setName] = useState('');
  // const [number, setNumber] = useState('');

  // const handleChangeForm = event => {
  //   const { value, name } = event.target;
  //   if (name === 'name') setName(value);
  //   if (name === 'number') setNumber(value);
  // };


  // const contact = {
  //   id: nanoid(),
  //   name: event.currentTarget.elements.name.value,
  //   number: event.currentTarget.elements.number.value,
  // };

  const handleSubmitForm = event => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const phone = event.target.elements.phone.value;
    const newContact = {
      id: nanoid(), 
      name,
      phone,

    };
    contacts.find(contact => contact.name === name)
      ? alert(`${name} is alredy in contact`)
      : dispatch(addContactThunk(newContact));
      event.target.reset();
    // reset();
  };

  // const reset = () => {
  //   setName('');
  //   setNumber('');
  // };

  return (
    <form className={css.form} onSubmit={handleSubmitForm}>
      <div className={css.container}>
        <label htmlFor={loginInputId}>
          <span className={css.labelName}>Name</span>{' '}
        </label>
        <input
          // onChange={handleChangeForm}
          id={loginInputId}
          type="text"
          name="name"
          className={css.inputForm}
          // value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>

      <div className={css.container}>
        <label className={css.wrape} htmlFor={loginInputId}>
          {' '}
          <span className={css.labelName}> Number </span>
        </label>

        <input
          className={css.inputForm}
          id={loginInputId}
          // onChange={handleChangeForm}
          type="tel"
          name="phone"
          // value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <button type="submit" className={css.btnForm}
      //  disabled={!contacts.length > 0}
       >
        {' '}
        Add contact
      </button>
    </form>
  );
};
