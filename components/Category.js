import ValidationError from '../errors/validation-error';

const Category = ({ id, name, onClick, showDeleteIcon }) => {
  if (!id) throw new ValidationError('id cannot be empty');
  if (!name) throw new ValidationError('name cannot be empty');

  return (
    <>
      <li className='category' id={id} onClick={onClick}>
        <span id={id}>{name}</span>{ showDeleteIcon ? <span className='delete-icon' id={id}>x</span> : null}
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

        .delete-icon {
          color: grey;
          margin-left: 6px;
        }
      `}</style>
    </>
  );
};

export default Category;
