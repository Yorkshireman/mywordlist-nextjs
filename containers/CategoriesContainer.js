import { Input, Form, FormGroup } from 'reactstrap';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Category from '../components/Category';

const CategoriesContainer = ({ categories: _categories }) => {
  const [showAddCategoriesInput, setShowAddCategoriesInput] = useState(false);
  const [categories, setCategories] = useState(_categories);
  const [newCategoryNames, setNewCategoryNames] = useState();

  useEffect(() => {
    if (!showAddCategoriesInput) return;

    const input = document.getElementById('categories-input');
    input.addEventListener('blur', () => setShowAddCategoriesInput(false));
  }, [showAddCategoriesInput]);

  const handleChange = ({ target: { value: name }}) => setNewCategoryNames(name.trim());
  const handleSubmit = e => {
    e.preventDefault();
    const newNames = newCategoryNames.split(',').map(i => i.trim().toLowerCase()).filter(i => i.length);
    if (categories.map(i => i.name).some(name => newNames.includes(name))) return; // need to display some sort of warning message instead of just returning

    const newCategories = newNames.map(name => {
      return {
        id: uuidv4(),
        name
      };
    });

    setCategories(categories.concat(newCategories));
    document.getElementById('categories-submission-form').reset();
    setNewCategoryNames(null);
  };

  const toggleAddCategoriesInput = async () => {
    await setShowAddCategoriesInput(!showAddCategoriesInput);
    document.getElementById('categories-input').focus();
  };

  return (
    <>
      <ul style={{ listStyle: 'none', padding: 'none' }}>
        {categories.map(({ id, name }) => <Category key={id} name={name} />)}
      </ul>
      <button onClick={toggleAddCategoriesInput}>add +</button>
      {showAddCategoriesInput &&
      <Form id='categories-submission-form' onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            aria-label='categories-input'
            autoComplete='off'
            id='categories-input'
            minLength='1'
            maxLength='24'
            name='category'
            onChange={handleChange}
            style={{ textTransform: 'lowercase' }}
            type='text'
          />
        </FormGroup>
      </Form>}
    </>
  );
};

export default CategoriesContainer;
