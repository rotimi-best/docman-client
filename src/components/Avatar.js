import React from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import Badge from '@material-ui/core/Badge';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 300,
    width: 300,
    margin: '0 auto',
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
  anchorOriginTopRightCircle: {
    bottom: '-3%',
    right: '46%',
    top: 'unset'
  },
  batchRoot: {
    width: '100%'
  }
}));

export default function CustomAvatar({ avatarUrl, setAvatarURL }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    avatar: '',
    isUploading: false,
    progress: 0,
    avatarURL: avatarUrl
  });

  const handleUploadStart = () => setState({
    ...state,
    isUploading: true,
    progress: 0
  });

  const handleProgress = progress => setState({ ...state, progress });

  const handleUploadError = error => {
    setState({ ...state, isUploading: false });
    console.error(error);
  };

  const handleUploadSuccess = filename => {
    setState({ ...state, avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => {
        if (setAvatarURL) {
          setAvatarURL(url);
        }
        setState({ ...state, avatarURL: url })
      });
  };

  return (
    <Badge
      overlap="circle"
      classes={{
        root: classes.batchRoot,
        anchorOriginTopRightCircle: classes.anchorOriginTopRightCircle
      }}
      badgeContent={
        <CustomUploadButton
          accept="image/*"
          storageRef={firebase.storage().ref('images')}
          onUploadStart={handleUploadStart}
          onUploadError={handleUploadError}
          onUploadSuccess={handleUploadSuccess}
          onProgress={handleProgress}
        >
          <EditIcon className={classes.editIcon} />
        </CustomUploadButton>
      }
    >
      <Avatar className={classes.avatar} src={state.avatarURL} />
    </Badge>
  );
}
