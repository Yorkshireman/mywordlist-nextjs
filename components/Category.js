const Category = ({ name }) => {
  return (
    <>
      <li className='category'>{name}</li>
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
