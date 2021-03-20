import axios from 'axios';
import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  spacing: 8,
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Upload = ({ alert }) => {
  const history = useHistory();
  const classes = useStyles();

  const [selectedImg, setSelectedImg] = useState(null);

  const handleFileChange = (e) => {
    setSelectedImg(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('myfile', selectedImg);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    axios
      .post('/pictures/upload', formData, config)
      .then((response) => {
        history.push({
          pathname: '/pictures',
        });
        // alert('The file is successfully uploaded');
      })
      .catch((error) => {});
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Upload your favorite picture 📸
        </Typography>
        <Box m={2} />

        <form
        // action="localhost:3001/pictures/upload"
        // method="post"
        // encType="multipart/form-data"
        >
          <input type="file" name="myImage" onChange={handleFileChange} />
          <Box m={2} />
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            component="span"
          >
            Upload Picture
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Upload;
