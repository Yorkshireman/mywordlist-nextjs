import RefreshIcon from './RefreshIcon';
import ResourcesService from '../services/resources-service';
import { setAuthToken } from './helpers/setAuthToken';

const WordlistEntry = ({ description, name, setAlertVisible, setWordlistEntryUploadErrors, showDescriptions, uploadError, wordlistEntryUploadErrors }) => {
  const reSubmitWordlistEntry = async () => {
    try {
      const currentToken = window.localStorage.getItem('myWordlistAuthToken');
      setAlertVisible(false);
      const response = await ResourcesService.createWordlistEntry({ description, token: currentToken, name });
      setWordlistEntryUploadErrors(wordlistEntryUploadErrors.filter(el => el.wordName !== name));
      // hydrate wordlistEntry
      const { data: { token: newToken } } = await response.json();
      await setAuthToken(newToken);
    } catch (e) {
      setAlertVisible(true);
    }
  };

  const renderRefreshIcon = () => {
    return (
      <div onClick={reSubmitWordlistEntry} style={{ paddingRight: '0.5em' }}>
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
