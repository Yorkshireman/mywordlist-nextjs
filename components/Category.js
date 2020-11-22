import ValidationError from '../errors/validation-error';

const Category = ({ id, name, onClick }) => {
  if (!name) throw new ValidationError('name cannot be empty');

  return (
    <>
      <li className='category' id={id} onClick={onClick}>
        {name}
      </li>
      <style jsx>{`
        .category {
          background-color: #22252A;
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

export default Category;
