import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const MyAlert = ({ alerts }) => {
  const classes = useStyles();

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={classes.root}>
        <Alert severity={alert.alertType}> {alert.msg}</Alert>
      </div>
    ))
  );
};

MyAlert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapSateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapSateToProps)(MyAlert);
