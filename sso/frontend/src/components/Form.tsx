import React, { useState, FormEvent } from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  TextField,
  Button,
} from '@material-ui/core';
import { Credentials } from '../types';

interface Props {
  title: string;
  onSubmit: (e: FormEvent<HTMLFormElement>, credentials: Credentials) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: 28,
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
  }),
);

export default (props: Props) => {
  const classes = useStyles();
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: '',
  });

  function handleChange(field: keyof Credentials, value: string) {
    setCredentials({ ...credentials, [field]: value });
  }

  return (
    <>
      <h1 className={classes.title}>{props.title}</h1>
      <form
        className={classes.form}
        onSubmit={e => props.onSubmit(e, credentials)}
      >
        <TextField
          className={classes.textField}
          value={credentials.username}
          label="Username"
          margin="normal"
          variant="outlined"
          onChange={e => handleChange('username', e.target.value)}
        />
        <TextField
          className={classes.textField}
          value={credentials.password}
          label="Password"
          type="password"
          margin="normal"
          variant="outlined"
          onChange={e => handleChange('password', e.target.value)}
        />
        <div className={classes.buttonWrapper}>
          <Button variant="contained" color="primary" type="submit">
            {props.title}
          </Button>
        </div>
      </form>
    </>
  );
};
