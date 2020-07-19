import { Input, Form, FormGroup } from 'reactstrap';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ResourcesService from '../services/resources-service';
import Category from '../components/Category';

const CategoriesContainer = ({ categories: _categories, wordlistEntryId }) => {
  const [showAddCategoriesInput, setShowAddCategoriesInput] = useState(false);
  const [categories, setCategories] = useState(_categories);
  const [newCategoryNames, setNewCategoryNames] = useState();

  useEffect(() => {
    if (!showAddCategoriesInput) return;

    const input = document.getElementById('categories-input');
    input.addEventListener('blur', () => setShowAddCategoriesInput(false));
    input.addEventListener('keydown', ({ key }) => {
      if (key === 'Escape') setShowAddCategoriesInput(false);
    });
  }, [showAddCategoriesInput]);

  const handleChange = ({ target: { value: name }}) => setNewCategoryNames(name.trim());
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNames = newCategoryNames.split(',').map(i => i.trim().toLowerCase()).filter(i => i.length);
    if (categories.map(i => i.name).some(name => newNames.includes(name))) return; // need to display some sort of warning message instead of just returning

    setShowAddCategoriesInput(false);
    const newCategories = newNames.map(name => {
      return {
        id: uuidv4(),
        name
      };
    });

    setCategories(categories.concat(newCategories));
    document.getElementById('categories-submission-form').reset();
    setNewCategoryNames(null);
    const currentToken = window.localStorage.getItem('myWordlistAuthToken');
    await ResourcesService.addCategories({ categories: newCategories, token: currentToken, wordlistEntryId });
  };

  const toggleAddCategoriesInput = async () => {
    await setShowAddCategoriesInput(!showAddCategoriesInput);
    document.getElementById('categories-input').focus();
  };

  return (
    <>
      <ul style={{ listStyle: 'none', padding: 'none' }}>
        {categories.map(({ id, name }) => <Category key={id} name={name} />)}
        <li className='add-categories' onClick={toggleAddCategoriesInput}>add +</li>
      </ul>
      {showAddCategoriesInput &&
      <Form id='categories-submission-form' onSubmit={handleSubmit}>
        <FormGroup style={{ marginBottom: '0' }}>
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
      <style jsx>{`
        .add-categories {
          background-color: #505763;
          border: none;
          color: white;
          font-size: 0.8em;
          padding: 0.35em 0.9em;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          margin: 4px 2px;
          cursor: pointer;
          border-radius: 16px;
        }
      `}</style>
    </>
  );
};

export default CategoriesContainer;
