const ViewConfigInterface = ({ rSelected, rSelectedValues, setRSelected }) => {
  const { CATEGORIES, DESCRIPTIONS } = rSelectedValues;
  return (
    <section>
      <ul style={{ listStyle: 'none', marginBottom: '0', textAlign: 'right' }}>
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
        .radio-input {
          margin-left: 5px;
          position: relative;
          top: 1px;
        }
      `}</style>
    </section>
  );
};

export default ViewConfigInterface;
