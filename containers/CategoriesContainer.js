import { Input, Form, FormGroup } from 'reactstrap';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Category from '../components/Category';

const CategoriesContainer = ({ categories: _categories }) => {
  const [showAddCategoriesInput, setShowAddCategoriesInput] = useState(false);
  const [categories, setCategories] = useState(_categories);
  const [newCategoryName, setNewCategoryName] = useState();

  useEffect(() => {
    if (!showAddCategoriesInput) return;

    const input = document.getElementById('categories-input');
    input.addEventListener('blur', () => setShowAddCategoriesInput(false));
  }, [showAddCategoriesInput]);

  const handleChange = ({ target: { value: name }}) => setNewCategoryName(name.trim());
  const handleSubmit = e => {
    e.preventDefault();
    // need to handle multiple comma-separated categories
    if (categories.find(({ name }) => name === newCategoryName)) return; // need to display some sort of warning message
    const id = uuidv4();
    const newList = [
      ...categories,
      {
        id,
        name: newCategoryName
      }
    ];

    setCategories(newList);
    document.getElementById('categories-submission-form').reset();
    setNewCategoryName(null);
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
