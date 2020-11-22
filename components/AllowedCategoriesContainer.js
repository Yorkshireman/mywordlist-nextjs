import Category from './Category';

const AllowedCategoriesContainer = ({ allowedCategories, setAllowedCategories }) => {
  const removeFromAllowedCategories = ({ target }) => {
    const categoryId = target.getAttribute('id');
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
          />
        )}
      </ul>
    </section>
  );
};

export default AllowedCategoriesContainer;
