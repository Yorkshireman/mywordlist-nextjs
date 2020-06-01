import { Spinner } from 'reactstrap';
import { useState } from 'react';

import RefreshIcon from './RefreshIcon';
import ResourcesService from '../services/resources-service';
import { setAuthToken } from './helpers/setAuthToken';

const WordlistEntry = ({
  description,
  hydrateWordlistEntry,
  name,
  setAlertVisible,
  setWordlistEntryUploadErrors,
  showDescriptions,
  uploadError,
  wordlistEntryUploadErrors
}) => {
  const [uploading, setUploading] = useState(false);

  const removeUploadErrorFromWordlistEntry = name => {
    setWordlistEntryUploadErrors(wordlistEntryUploadErrors.filter(el => el.wordName !== name));
  };

  const reSubmitWordlistEntry = async () => {
    removeUploadErrorFromWordlistEntry(name);
    setUploading(true);
    try {
      const currentToken = window.localStorage.getItem('myWordlistAuthToken');
      setAlertVisible(false);
      const response = await ResourcesService.createWordlistEntry({ description, token: currentToken, name });
      setUploading(false);
      const body = await response.json();
      hydrateWordlistEntry(body);
      await setAuthToken(body.data.token);
    } catch (e) {
      setAlertVisible(true);
      setUploading(false);
      setWordlistEntryUploadErrors([
        { wordName: name },
        ...wordlistEntryUploadErrors
      ]);
    }
  };

  const renderRefreshIcon = () => {
    return (
      <div onClick={reSubmitWordlistEntry} style={{ paddingRight: '0.5em' }}>
        <RefreshIcon bottom='0.2em' height='0.85em' />
      </div>
    );
  };

  const renderSpinner = () => {
    return (
      <div style={{
        paddingRight: '0.5em',
        position: 'relative',
        bottom: '0.2em'
      }}>
        <Spinner color='primary' style={{ height: '0.85em', width: '0.85em' }} />
      </div>
    );
  };

  return (
    <>
      <li>
        {uploadError ? renderRefreshIcon() : null}
        {uploading ? renderSpinner() : null}
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
