import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { register } from 'actions/auth';

const Register = ({ register, isAuthenticated, registerSucceeded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChangeFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { email, password, passwordConfirm } = formData;
    const newErrors = { ...errors };
    for (const field in formData) {
      if (formData[field] === '') {
        newErrors[field] = `${_.capitalize(field)} is required`;
      } else {
        if (field === 'email') {
          const reEmail = /\S+@\S+\.\S+/; //regEx validate email
          newErrors.email = reEmail.test(email) ? '' : 'Invalid email address';
        } else if (field === 'password') {
          newErrors.password =
            password.length < 9 || !/\d/.test(password) //regEx validate contains number
              ? 'Password must contains at least 8 characters and 1 number'
              : '';
        } else if (field === 'passwordConfirm') {
          newErrors.passwordConfirm =
            password !== passwordConfirm ? 'Passwords mismatched' : '';
        } else {
          newErrors[field] = '';
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).every((k) => !newErrors[k]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      register(formData);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  if (registerSucceeded) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="Register">
      <h2>Register</h2>
      <p>Fill the register and be part of our community</p>
      <form onSubmit={handleFormSubmit}>
        <div className="form">
          <div className="form__form-group">
            <label htmlFor="name">Full Name</label>
            <div className="form__form-group__input">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Full Name"
                autoComplete="off"
                value={formData.name}
                onChange={handleChangeFormData}
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>
          </div>
          <div className="form__form-group">
            <label htmlFor="email">Email</label>
            <div className="form__form-group__input">
              <input
                id="email"
                name="email"
                type="input"
                placeholder="Email"
                autoComplete="username"
                value={formData.email}
                onChange={handleChangeFormData}
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
          </div>
          <div className="form__form-group">
            <label htmlFor="password">Password</label>
            <div className="form__form-group__input">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Min. of 8 chars and 1 number"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChangeFormData}
              />
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>
          </div>
          <div className="form__form-group">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <div className="form__form-group__input">
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                placeholder="Retype the password"
                autoComplete="new-password"
                value={formData.passwordConfirm}
                onChange={handleChangeFormData}
              />
              {errors.passwordConfirm && (
                <div className="error">{errors.passwordConfirm}</div>
              )}
            </div>
          </div>
        </div>
        <div className="form-buttons-group">
          <Link to="/">Cancel</Link>
          <button type="submit" className="btn btn--primary">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  registerSucceeded: state.auth.registerSucceeded,
});

export default connect(mapStateToProps, { register })(Register);
