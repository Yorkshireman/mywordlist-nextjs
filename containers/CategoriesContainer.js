import { Input, Form, FormGroup } from 'reactstrap';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ResourcesService from '../services/resources-service';
import Category from '../components/Category';
import ValidationError from '../errors/validation-error';

const CategoriesContainer = ({ addToAllowedCategories, categories, setShowAddWordIcon, setWordlistEntries, wordlistEntries, wordlistEntryId }) => {
  if (!categories) throw new ValidationError('categories should be an Array');

  const [showAddCategoriesInput, setShowAddCategoriesInput] = useState(false);
  const [newCategoryNames, setNewCategoryNames] = useState();

  useEffect(() => {
    if (!showAddCategoriesInput) return;

    const input = document.getElementById('categories-input');

    input.addEventListener('blur', () => {
      setShowAddCategoriesInput(false);
      setShowAddWordIcon(true);
    });

    input.addEventListener('keydown', ({ key }) => {
      if (key !== 'Escape') return;

      setShowAddCategoriesInput(false);
      setShowAddWordIcon(true);
    });
  }, [showAddCategoriesInput]);

  const addCategoriesToWordlistEntry = (categories, wordlistEntryId) => {
    const existingWordlistEntry = wordlistEntries.find(({ id }) => id === wordlistEntryId);
    const newWordlistEntry = {
      ...existingWordlistEntry,
      categories: [
        ...existingWordlistEntry.categories,
        ...categories
      ]
    };

    setWordlistEntries(wordlistEntries.map(i => i.id !== newWordlistEntry.id ? i : newWordlistEntry));
  };

  const handleChange = ({ target: { value: name }}) => setNewCategoryNames(name.trim());
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNames = newCategoryNames.split(',').map(i => i.trim().toLowerCase()).filter(i => i.length);
    const newUniqueNames = newNames.filter(name => !categories.map(cat => cat.name).includes(name));

    setShowAddCategoriesInput(false);

    if (!newUniqueNames.length) return;

    const existingCategories = wordlistEntries.map(({ categories }) => categories);

    const categoriesToAdd = newUniqueNames.map(name => {
      return existingCategories.find(category => category.name === name) || {
        id: uuidv4(),
        name
      };
    });

    addCategoriesToWordlistEntry(categoriesToAdd, wordlistEntryId);

    document.getElementById('categories-submission-form').reset();
    setNewCategoryNames(null);
    const currentToken = window.localStorage.getItem('myWordlistAuthToken');

    await ResourcesService.addCategories({ categories: categoriesToAdd, token: currentToken, wordlistEntryId });
  };

  const toggleAddCategoriesInput = async () => {
    await setShowAddCategoriesInput(!showAddCategoriesInput);
    setShowAddWordIcon(false);
    document.getElementById('categories-input').focus();
  };

  return (
    <>
      <ul style={{ listStyle: 'none', padding: 'none' }}>
        {categories.map(({ id, name }) => <Category key={id} id={id} name={name} onClick={addToAllowedCategories} />)}
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
