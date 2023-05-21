import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContact] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = object => {
    setContact([{ id: nanoid(), ...object }, ...contacts]);
  };
  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };
  const filterContactsOnInput = () => {
    const noramalizedContact = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(noramalizedContact)
    );
  };
  const deleteById = id => {
    setContact([...contacts.filter(contact => contact.id !== id)]);
  };

  return (
    <>
      <Section title={'Phonebook'}>
        <ContactForm
          check={contacts}
          addContact={addContact}
          contacts={contacts}
        />
      </Section>
      <Section title={contacts.length !== 0 ? 'Contacts' : 'No Contacts Yet'}>
        {contacts.length > 0 && (
          <>
            <Filter text={filter} changeFilter={changeFilter} />
            <ContactList
              contacts={filterContactsOnInput()}
              deleteById={deleteById}
            />
          </>
        )}
      </Section>
    </>
  );
};

export default App;
