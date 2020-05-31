import RefreshIcon from './RefreshIcon';

const WordlistEntry = ({ description, name, showDescriptions, uploadError }) => {
  const renderRefreshIcon = () => {
    return (
      <div style={{ paddingRight: '0.5em' }}>
        <RefreshIcon bottom='0.2em' height='0.85em' />
      </div>
    );
  };

  return (
    <>
      <li>
        {uploadError ? renderRefreshIcon() : null}
        <section style={ uploadError ? { opacity: '50%' } : null }>
          <strong>{name}</strong>
        </section>
        {showDescriptions &&
        <section style={ uploadError ? { opacity: '50%' } : null }>
          {description}
        </section>}
      </li>
      <style jsx>{`
        li {
          display: flex;
          margin-bottom: 0.5em;
        }

        section {
          font-size: 0.85em;
          padding-right: 1em;
        }
      `}</style>
    </>
  );
};

export default WordlistEntry;
