import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Table from './Table';
import config from '../../config';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
}));

export default function AddDocToGroup({ user, group, toggleAddNewDoc }) {
  const classes = useStyles();
  const [documents, setDocuments] = React.useState([]);
  const [selectedDocs, setSelectedDocs] = React.useState([
    ...(!!group && group.documents
        ? group.documents.map(d => d._id)
        : []
      )
  ]);

  React.useEffect(() => {
    const fetchDocs = () => {
      fetch(`${config.apiUrl}/documents?userId=${user._id}`)
        .then(res => res.json())
        .then(result => {
          if (result && result.documents) {
            setDocuments(result.documents);
          }
        });
    }

    fetchDocs();
  }, []);

  const handleDoc = (documentId) => {
    if (selectedDocs.includes(documentId)) {
      setSelectedDocs(selectedDocs.filter(id => id !== documentId));
    } else {
      setSelectedDocs([
        ...selectedDocs,
        documentId
      ]);
    }
  }

  const handleFinish = () => {
    fetch(`${config.apiUrl}/group/${group._id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: user._id,
        documents: selectedDocs
      })
    }).then(res => res.json())
    .then(data => {
      toggleAddNewDoc();
    });
  }

  console.log('selectedDocs', selectedDocs)
  return (
    <div className={classes.root}>
      <Table
        data={documents}
        selectedDocs={selectedDocs}
        handleDoc={handleDoc}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleFinish}
      >
        Finish
      </Button>
    </div>
  )
}
