import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`Alert Alert--${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapSateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapSateToProps)(Alert);
