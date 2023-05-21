import { useState } from 'react';
import { Notify } from 'notiflix';
import { Button, Input } from 'commonStyles/commonStyles.styled';
import StyledForm from './ContactForm.styled';
const Form = ({ check, addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const isNotUnique = (objArr, name) => {
    const isIncludes = objArr.some(
      element => element.name.toLowerCase() === name.toLowerCase()
    );
    return isIncludes ? true : false;
  };
  const formReset = () => {
    setName('');
    setNumber('');
  };
  const onFormSubmit = event => {
    event.preventDefault();

    if (isNotUnique(check, name)) {
      Notify.info(`${name} is already in your contacts`);
      return;
    }
    addContact({
      name: name,
      number: number,
    });

    formReset();
  };
  const onInputChange = event => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;
      case 'number':
        setNumber(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <StyledForm onSubmit={onFormSubmit}>
      <label>
        Name
        <Input
          onChange={onInputChange}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        Phone
        <Input
          onChange={onInputChange}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <Button type="submit">Add contact</Button>
    </StyledForm>
  );
};
export default Form;
