import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Table from '../Table';
import routes from '../../constants/routes';
import config from '../../config';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
}));

export default function DocumentList({ groupDocs, user, handleNewDoc, showAmount }) {
  const classes = useStyles();
  const [documents, setDocuments] = React.useState([]);
  if (!user) {
    user = JSON.parse(localStorage.getItem('user'));
  }

  React.useEffect(() => {
    const fetchDocs = () => {
      fetch(`${config.apiUrl}/documents?userId=${user._id}`).then(res => res.json())
      .then(result => {
        if (result && result.documents) {
          setDocuments(result.documents);
        }
      });
    }

    if (!groupDocs) {
      fetchDocs();
    }
  }, []);

  return (
    <div className={classes.root}>
      <Table
        data={groupDocs || documents}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleNewDoc}
        href={!handleNewDoc ? routes.DOCUMENT_NEW: null}
      >
        ADD NEW DOC
      </Button>
    </div>
  )
}
