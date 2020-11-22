import Category from './Category';
import ValidationError from '../errors/validation-error';

const AllowedCategoriesContainer = ({ allowedCategories, setAllowedCategories }) => {
  const removeFromAllowedCategories = ({ target }) => {
    const categoryId = target.getAttribute('id');
    if (!categoryId) {
      throw new ValidationError('category id null/undefined');
    }

    setAllowedCategories(allowedCategories.filter(e => e.id !== categoryId));
  };

  return (
    <section>
      <ul style={{ margin: '0', padding: '0' }}>
        {allowedCategories.map(({ id, name }) =>
          <Category
            key={id}
            id={id}
            name={name}
            onClick={removeFromAllowedCategories}
            showDeleteIcon={true}
          />
        )}
      </ul>
    </section>
  );
};

export default AllowedCategoriesContainer;
