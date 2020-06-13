import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '../Avatar';

import DocumentList from '../Document/List';
import config from '../../config';
import routes from '../../constants/routes';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: `${theme.spacing(5)}px auto`,
  },
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  name: {
    width: '70%',
    margin: `${theme.spacing(5)}px 0 ${theme.spacing(2)}px`
  },
  paper: {
    height: 650,
    padding: 20
  },
  documents: {
    display: 'flex',
    flexDirection: 'row',
  }
}));

let timerId = null;

export default function Profile() {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('user'));
  const [avatarUrl, setAvatarURL] = React.useState(user.avatarUrl);
  const [name, setName] = React.useState(user.name);
  const mounted = React.useRef();

  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (timerId) {
        clearTimeout(timerId);
      }

      timerId = setTimeout(() => {
        updateUserData();
        clearTimeout(timerId);
      }, 5000);
    }
  }, [name, avatarUrl]);

  const handleName = (event) => {
    setName(event.target.value);
  };

  const updateUserData = () => {
    console.log('fetching')
    fetch(`${config.apiUrl}/profile`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: user._id,
        name,
        avatarUrl
      })
    }).then(res => res.json())
    .then(data => {
      console.log('data', data)
      if (data && data.success) {
        localStorage.setItem('user', JSON.stringify(data.user))
      }
    });
  }

  return (
    <Grid
      container
      className={classes.root}
    >
      <Grid item xs={5}>
        <Avatar avatarUrl={avatarUrl} setAvatarURL={setAvatarURL} />
        <div className={classes.container}>
          <TextField
            variant="outlined"
            type="text"
            value={name}
            onChange={handleName}
            className={classes.name}
          />
          <Button
            variant="contained"
            color="primary"
            href={routes.GROUPS}
          >
            Your groups
          </Button>
        </div>
      </Grid>
      <Grid item xs={6}>
          <Typography
            variant="subtitle2"
            align="center"
          >
            LIST OF RECENT DOCUMENTS
          </Typography>

          <DocumentList user={user} />
      </Grid>
    </Grid>
  )
}
