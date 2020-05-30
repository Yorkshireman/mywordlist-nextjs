import SvgIcon from './SvgIcon';

const WordlistEntry = ({ description, name, showDescriptions, uploadError }) => {
  return (
    <>
      <li>
        {uploadError &&
        <div style={{ paddingRight: '0.2em' }}>
          <SvgIcon bottom='0.2em' height='0.85em' />
        </div>}
        <section>
          <strong>{name}</strong>
        </section>
        {showDescriptions &&
          <section>{description}</section>
        }
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
