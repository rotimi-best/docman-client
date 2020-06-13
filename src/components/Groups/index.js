import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import DocumentList from '../Document/List';
import config from '../../config';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: `${theme.spacing(5)}px auto`,
    alignItems: 'center'
  },
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  group: {
    display: 'flex',
    width: '80%',
    justifyContent: 'space-between',
    '& > .MuiButton-root': {
      height: 150,
      width: 200,
      marginBottom: 10
    }
  },
  documents: {
    display: 'flex',
    flexDirection: 'row',
  }
}));

const formatGroup = groups => {
  return groups.reduce((acc, cur, i ) => {
    const lastEl = acc[acc.length - 1];

    switch(lastEl.groups.length) {
      case 0:
      case 1:
        acc[acc.length - 1].groups.push({
          label: cur.name,
          documents: cur.documents,
          link: `/group/${cur._id}`,
        });
        break;
      case 2:
        acc.push({ id: i, groups: [{
          label: cur.name,
          documents: cur.documents,
          link: `/group/${cur._id}`,
        }] })
        break;
    }

    return acc;
  }, [{ id: 1, groups: [] }]);
}

export default function Groups() {
  const classes = useStyles();
  const [groups, setGroups] = React.useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const formattedGroup = formatGroup(groups);

  React.useEffect(() => {
    const fetchGroups = () => {
      console.log('fetching...')
      fetch(`${config.apiUrl}/group?userId=${user._id}`).then(res => res.json())
      .then(result => {
        console.log('result', result)
        if (result && result.groups) {
          setGroups(result.groups);
        }
      });
    }
    fetchGroups();
  }, []);

  return (
    <Grid
      // alignItems="center"
      container
      className={classes.root}
    >
      <Grid item xs={5}>
        <div className={classes.container}>
          {formattedGroup.map((group, key) => (
            <div key={key} className={classes.group}>
              {group.groups.map((g, key) => (
                <Button
                  key={key}
                  variant="outlined"
                  color="primary"
                  href={g.link}
                >
                  {g.label} ({g.documents.length})
                </Button>
              ))}
            </div>
          ))}
        </div>
      </Grid>
      <Grid item xs={6}>
          <Typography
            variant="subtitle2"
            align="center"
          >
            LIST OF RECENT DOCUMENTS
          </Typography>

          <DocumentList />
      </Grid>
    </Grid>
  )
}
