const ViewConfigInterface = ({ rSelected, rSelectedValues, setRSelected }) => {
  const { CATEGORIES, DESCRIPTIONS } = rSelectedValues;
  return (
    <section style={{ marginBottom: '0.5em' }}>
      <label>
        <input type='radio' checked={rSelected === DESCRIPTIONS} onChange={() => setRSelected(DESCRIPTIONS)} />
        Descriptions
      </label>
      <label>
        <input type='radio' checked={rSelected === CATEGORIES} onChange={() => setRSelected(CATEGORIES)} />
        Categories
      </label>
    </section>
  );
};

export default ViewConfigInterface;
