import Category from './Category';

const AllowedCategoriesContainer = ({ allowedCategories }) => {
  return (
    <section>
      <ul style={{ margin: '0', padding: '0' }}>
        {allowedCategories.map(({ id, name }) => <Category key={id} name={name} />)}
      </ul>
    </section>
  );
};

export default AllowedCategoriesContainer;
