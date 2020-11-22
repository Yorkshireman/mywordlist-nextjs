const ViewConfigInterface = ({ rSelected, rSelectedValues, setRSelected }) => {
  const { CATEGORIES, DESCRIPTIONS } = rSelectedValues;
  return (
    <section>
      <ul>
        <li>
          <label>
            Categories
            <input
              className='radio-input'
              type='radio'
              checked={rSelected === CATEGORIES}
              onChange={() => setRSelected(CATEGORIES)}
            />
          </label>
        </li>
        <li>
          <label>
            Descriptions
            <input
              className='radio-input'
              type='radio'
              checked={rSelected === DESCRIPTIONS}
              onChange={() => setRSelected(DESCRIPTIONS)}
            />
          </label>
        </li>
      </ul>
      <style jsx>{`
        label {
          display: flex;
          justify-content: flex-end;
        }

        .radio-input {
          margin-left: 5px;
          position: relative;
          top: 5px;
        }

        section {
          margin-left: auto;
          padding-left: 5px;
        }

        ul {
          list-style: none;
          margin-bottom: 0;
          padding: 0;
        }
      `}</style>
    </section>
  );
};

export default ViewConfigInterface;
