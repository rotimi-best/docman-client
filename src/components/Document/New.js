import React from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/storage';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FileUploader from 'react-firebase-file-uploader';

import config from '../../config';
import routes from '../../constants/routes';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
  upload: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '60%',
    '& > .MuiButton-root': {
      height: 150,
      width: 200,
      marginBottom: 10
    }
  },
  button: {
    margin: '40px 0',
    width: 'fit-content'
  },
  cost: {
    marginTop: 20
  }
}));

let fileUploader = null;

export default function NewDocument() {
  const user = JSON.parse(localStorage.getItem('user'))
  const history = useHistory();
  const classes = useStyles();
  const [files, setFiles] = React.useState([])
  const [state, setState] = React.useState({
    name: '',
    type: '',
    isUploading: false,
    progress: 0,
    cost: '',
    url: ''
  });

  React.useEffect(() => {
    if (state.url.length) {
      console.log('update db')
      fetch(`${config.apiUrl}/document`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...state,
          userId: user._id
        })
      }).then(res => res.json())
      .then(data => {
        if (data && data.success) {
          console.log('data', data)
          history.push(routes.PROFILE);
        }
      });
    }
  }, [state.url]);

  const customOnChangeHandler = (event) => {
    const { target: { files } } = event;
    const filesToStore = Array.from(files).map(file => file);
    const {
      type,
      name
    } = filesToStore[0];

    setFiles([ ...filesToStore ]);
    setState({
      ...state,
      type,
      name,
    });
  }

  const handleUploadStart = () => {
    console.log('handleUploadStart')
    setState({
      ...state,
      isUploading: true,
      progress: 0
    });
  }

  const handleProgress = progress => setState({ ...state, progress });

  const handleUploadError = error => {
    console.log('handleUploadError')
    setState({ ...state, isUploading: false });
    console.error(error);
  };

  const handleUploadSuccess = filename => {
    console.log('handleUploadSuccess')
    setState({
      ...state,
      name: filename,
      progress: 100,
      isUploading: false
    });

    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => {
        setState({ ...state, url })
      });
  };

  const handleTextChange = key => e => {
    setState({
      ...state,
      [key]: e.target.value
    })
  }

  const handleSubmit = () => {
    if (!files.length || !state.cost.length) return;

    files.forEach(file => {
      fileUploader.startUpload(file)
    });
  }

  console.log('state', state)
  return (
    <div className={classes.root}>
      <div className={classes.upload}>
        <label
          className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary"
        >
          {state.type.includes('image') ? state.name : 'Choose Image'}
          <FileUploader
            hidden
            accept="image/*"
            storageRef={firebase.storage().ref('images')}
            onChange={customOnChangeHandler}
            onUploadStart={handleUploadStart}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
            onProgress={handleProgress}
            ref={instance => {
                fileUploader = instance;
              }
            }
          />
        </label>
        <Typography variant="subtitle1">
          OR
        </Typography>
        <label
          className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary"
        >
          {state.type.includes('pdf') ? state.name : 'Choose PDF'}
          <FileUploader
            hidden
            accept=".pdf"
            onChange={customOnChangeHandler}
            storageRef={firebase.storage().ref('images')}
            onUploadStart={handleUploadStart}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
            onProgress={handleProgress}
            ref={instance => {
                fileUploader = instance;
              }
            }
          />
        </label>
      </div>
      <TextField
        label="Cost"
        variant="outlined"
        type="text"
        value={state.cost}
        onChange={handleTextChange('cost')}
        className={classes.cost}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSubmit}
      >
        Save
      </Button>
    </div>
  )
}
