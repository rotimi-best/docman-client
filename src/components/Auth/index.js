import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '../Avatar';

import config from '../../config';
import routes from '../../constants/routes';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      width: '80%',
      margin: `${theme.spacing(1)}px auto`,
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '25px 0',
    '& > *': {
      margin: theme.spacing(1),
    }
  },
  policy: {
    textDecoration: 'underline'
  },
  editIcon: {
    width: 50,
    height: 50,
    border: `2px solid ${theme.palette.primary.main}`,
    position: 'absolute',
    bottom: -25,
    right: 0,
    borderRadius: 50,
    padding: 5,
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  error: {
    color: 'red',
    fontStyle: 'italic'
  }
}));

export default function Auth() {
  const classes = useStyles();
  const history = useHistory();
  const [avatarUrl, setAvatarURL] = React.useState('');
  const [loginState, setLoginState] = React.useState({
    email: '',
    password: '',
    error: '',
  });
  const [signUpState, setSignUpState] = React.useState({
    name: '',
    email: '',
    password: '',
    error: '',
    confirmPassword: ''
  });

  const handleLoginState = key => event => {
    setLoginState({
      ...loginState,
      [key]: event.target.value
    })
  };

  const handleSignUpState = key => event => {
    setSignUpState({
      ...signUpState,
      [key]: event.target.value
    })
  };

  const handleSignUp = () => {
    delete signUpState.error;
    const anEmptyField = Object.values(signUpState).some(value => !value);
    if (anEmptyField) return;

    fetch(`${config.apiUrl}/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...signUpState,
        avatarUrl
      })
    }).then(res => res.json())
    .then(data => {
      if (data && data.success) {
        localStorage.setItem('user', JSON.stringify(data.user))
        history.push(routes.PROFILE);
      } else if (data.message) {
        setSignUpState({
          ...signUpState,
          error: data.message
        });
      }
    });
  }

  const handleLogin = () => {
    console.log('login')
    delete loginState.error;
    const anEmptyField = Object.values(loginState).some(value => !value);
    if (anEmptyField) return;

    fetch(`${config.apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...loginState,
      })
    }).then(res => res.json())
    .then(data => {
      if (data && data.success) {
        localStorage.setItem('user', JSON.stringify(data.user))
        history.push(routes.PROFILE);
      } else if (data.message) {
        setLoginState({
          ...loginState,
          error: data.message
        });
      }
    });
  }

  return (
    <div className={classes.root}>
      <Grid
        spacing={3}
        alignItems="center"
        container
      >
        <Grid item xs={6}>
          <Typography variant="h5" align="center">
            FIRST TIME HERE?
          </Typography>
          <Avatar setAvatarURL={setAvatarURL} />

          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              label="Name"
              variant="outlined"
              type="text"
              value={signUpState.name}
              onChange={handleSignUpState('name')}
            />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              value={signUpState.email}
              onChange={handleSignUpState('email')}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={signUpState.password}
              onChange={handleSignUpState('password')}
            />
            <TextField
              label="Confirm password"
              variant="outlined"
              type="password"
              value={signUpState.confirmPassword}
              onChange={handleSignUpState('confirmPassword')}
            />

            <Typography
              variant="subtitle2"
              className={classes.policy}
              align="center"
            >
              PRIVATE POLICY AND SECURE
            </Typography>
            {signUpState.error.length > 0 && (
              <Typography
                variant="body2"
                className={classes.error}
                align="center"
              >
                {signUpState.error}
              </Typography>
            )}
            <Button variant="contained" color="primary" onClick={handleSignUp}>
              SIGN UP
            </Button>
          </form>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h6" align="center" gutterBottom>
            WELCOME BACK
          </Typography>

          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              value={loginState.email}
              onChange={handleLoginState('email')}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={loginState.password}
              onChange={handleLoginState('password')}
            />

            {loginState.error.length > 0 && (
              <Typography
                variant="body2"
                className={classes.error}
                align="center"
              >
                {loginState.error}
              </Typography>
            )}
            <Button variant="contained" color="primary" onClick={handleLogin}>
              SIGN IN
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
