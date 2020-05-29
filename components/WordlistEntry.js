const WordlistEntry = ({ description, name, showDescriptions, uploadError }) => {
  return (
    <>
      <div>
        <section style={{ paddingRight: '1em' }}>
          <strong>{name}</strong>
        </section>
        {showDescriptions &&
          <section>{description}</section>
        }
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
