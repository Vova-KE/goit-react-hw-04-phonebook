import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import Filter from "./Filter";
import ContactList from "./ContactList";
import { nanoid } from 'nanoid'
import styles from './styles.module.css';

const App = () => {
  const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem('contacts')) ?? []);
  const [filter, setFilter] = useState('');


  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  },[contacts])

  const changeFilter = (event) => {
    setFilter(event.currentTarget.value)
  };

  const formSubmitHandler = (name, number) => {
    const contactItem = {
      id: nanoid(),
      name,
      number,
    };

    if (contacts.find(contact =>
      contact.name.toLowerCase().includes(contactItem.name.toLowerCase()))) {
        alert("This contact already exists!")
    } else {
      setContacts(prevState => [...prevState, contactItem])
    };
  };

  const deleteContact = (contactId) => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId))
  };

  const normalizedFilter = filter.toLowerCase();
  const foundContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter));
  
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Phonebook</h1>
      <ContactForm onSubmitForm={formSubmitHandler} />
      <h2 className={styles.header}>Contacts</h2>
      <Filter value={filter} onChange={changeFilter}/>
      <ContactList foundContacts={foundContacts} onDeleteContact={deleteContact} />
    </div>
    );
};

export default App;