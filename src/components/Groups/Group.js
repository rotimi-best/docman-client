import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import DocumentList from '../Document/List';
import AddDocToGroup from '../AddDocToGroup';
import config from '../../config';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    margin: '20px auto'
  },
  button: {
    margin: '40px 0',
    width: 'fit-content'
  },
}));

export default function Group({ match }) {
  const user = JSON.parse(localStorage.getItem('user'))
  const classes = useStyles();
  const [addNewDoc, setAddNewDoc] = React.useState(false);
  const [group, setGroup] = React.useState({ documents: [] });
  const { params } = match;

  React.useEffect(() => {
    const fetchGroup = () => {
      fetch(`${config.apiUrl}/group/${params.groupId}?userId=${user._id}`)
        .then(res => res.json())
        .then(result => {
          if (result && result.group) {
            setGroup(result.group);
          }
        });
    }
    if (!addNewDoc) {
      fetchGroup();
    }
  }, [addNewDoc]);

  const toggleAddNewDoc = () => {
    setAddNewDoc(!addNewDoc);
  }
  const groupDocs = [
    ...group.documents,
    {
      _id: 1,
      name: 'Amount',
      total: group.documents
        .reduce((acc, curr) =>  (acc = parseInt(acc) + parseInt(curr.cost)), '0')
    }
  ];

  return (
    <div className={classes.root}>
      <Typography variant="h5">
        {group.name}
      </Typography>
      {addNewDoc
        ? <AddDocToGroup user={user} group={group} toggleAddNewDoc={toggleAddNewDoc} />
        : (
          <DocumentList
            showAmount
            groupDocs={groupDocs}
            handleNewDoc={toggleAddNewDoc}
          />
      )}
    </div>
  );
}
