import { Spinner } from 'reactstrap';
import { useState, useEffect } from 'react';

import CategoriesContainer from '../containers/CategoriesContainer';
import RefreshIcon from './RefreshIcon';
import ResourcesService from '../services/resources-service';
import { setAuthToken } from './helpers/setAuthToken';

const WordlistEntry = ({
  categories,
  createdAt,
  description,
  id,
  setAlertVisible,
  showDescriptions,
  wordData: {
    name
  }
}) => {
  const [reUploading, setReUploading] = useState(false);
  const [uploaded, setUploaded] = useState(Boolean(createdAt));
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  useEffect(() => {
    const upload = async () => {
      if (!uploaded) {
        try {
          const currentToken = window.localStorage.getItem('myWordlistAuthToken');
          const response = await ResourcesService.createWordlistEntry({ description, id, token: currentToken, name });
          const body = await response.json();
          await setAuthToken(body.data.token);
          setAlertVisible(false);
          setUploadError(false);
          setUploaded(true);
          setUploading(false);
          setReUploading(false);
        } catch (e) {
          setAlertVisible(true);
          setUploadError(true);
          setUploading(false);
          setReUploading(false);
        }
      }
    };

    upload();
  }, [reUploading, uploaded]);

  const renderRefreshIcon = () => {
    return (
      <div onClick={() => setReUploading(true)} style={{ paddingRight: '0.5em' }}>
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
        {uploadError && !reUploading ? renderRefreshIcon() : null}
        {uploading || reUploading ? renderSpinner() : null}
        <section style={ uploadError ? { opacity: '50%' } : null }>
          <strong>{name}</strong>
        </section>
        {showDescriptions &&
        <section style={ uploadError ? { opacity: '50%' } : null }>
          {description}
        </section>}
        <section style={{ padding: '0' }}>
          <CategoriesContainer categories={categories} />
        </section>
      </li>
      <style jsx>{`
        li {
          display: flex;
          margin-bottom: 0.5em;
        }

        section {
          font-size: 1em;
          padding-right: 1em;
        }
      `}</style>
    </>
  );
};

export default WordlistEntry;
