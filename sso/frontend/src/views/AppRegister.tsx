import React, { useState, FormEvent } from 'react';
import {
  Theme,
  createStyles,
  Button,
  TextField,
  makeStyles,
} from '@material-ui/core';
import { registerApp } from '../services';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: 28,
    },
    subtitle: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: 24,
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: 250,
    },
    textField: {
      width: '100%',
    },
    buttonWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    button: {
      margin: theme.spacing(2),
    },
    credentials: {
      textAlign: 'left',
    },
    topic: {
      fontFamily: 'Roboto, sans-serif',

      fontStyle: 'bold',
    },
    code: {
      fontFamily: 'Consolas, monospace',
    },
  }),
);

export default () => {
  const classes = useStyles();
  const [url, setUrl] = useState('');
  const [id, setId] = useState('');
  const [secret, setSecret] = useState('');
  const [show, setShow] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    registerApp(url).then(({ data }) => {
      setId(data._id);
      setSecret(data.secret);
      setShow(true);
    });
  }

  return (
    <>
      <h1 className={classes.title}>App register</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          className={classes.textField}
          value={url}
          label="URL"
          margin="normal"
          variant="outlined"
          onChange={e => setUrl(e.target.value)}
        />
        {show ? (
          <div className={classes.credentials}>
            <h2 className={classes.subtitle}>Your app credentials</h2>
            <p>
              <h3 className={classes.topic}>ID: </h3>
              <div className={classes.code}>{id}</div>
            </p>
            <p>
              <h3 className={classes.topic}>Secret: </h3>
              <div className={classes.code}>{secret}</div>
            </p>
          </div>
        ) : null}
        <div className={classes.buttonWrapper}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};
