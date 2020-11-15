import Category from './Category';

const AllowedCategoriesContainer = ({ allowedCategories }) => {
  return (
    <section>
      <ul style={{ margin: '0', padding: '0' }}>
        {
          allowedCategories.map(({ id, name }) => {
            return (
              <li style={{ display: 'inline-block', listStyle: 'none' }}>
                <Category key={id} name={name} />
              </li>
            );
          })
        }
      </ul>
    </section>
  );
};

export default AllowedCategoriesContainer;
