import React, { useState } from "react";
import { nanoid } from 'nanoid';
import styles from './styles.module.css';

const ContactForm = ({onSubmitForm}) => {
    const [name, setName] = useState('');
    const [number, setNumber ] = useState('');

    const nameInputId = nanoid();
    const numberInputId = nanoid();

    const handleChange = (event) => {
        const { name, value } = event.currentTarget;

        switch (name) {
            case 'name':
            setName(value);
            break;

        case 'number':
            setNumber(value);
            break;

        default:
            return;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmitForm(name, number)
        reset();
    };

    const reset = () => {
        setName('');
        setNumber('');
    };

    return (
        <form className={styles.form} onSubmit={event => handleSubmit(event)}>
        <label htmlFor={nameInputId} className={styles.label}>Name
            <input className={styles.input}
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                value={name}
                onChange={handleChange}
                id={nameInputId}
            />
        </label>
        <label htmlFor={numberInputId} className={styles.label}>Number
            <input className={styles.input}
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                value={number}
                onChange={handleChange}
                id={numberInputId}
            />
        </label>
        <button type="submit" className={styles.button}>Add contact</button>
    </form>
    )
};

export default ContactForm;