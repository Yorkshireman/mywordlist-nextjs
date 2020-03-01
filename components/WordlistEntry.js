const WordlistEntry = ({ description, name}) => {
  return (
    <>
      <div>
        <section style={{ paddingRight: '1em' }}>
          <strong>{name}</strong>
        </section>
        <section>{description}</section>
      </div>
      <style jsx>{`
        div {
          display: flex;
          margin-bottom: 0.5em;
        }

        section {
          font-size: 0.85em;
        }
      `}</style>
    </>
  );
};

export default WordlistEntry;
