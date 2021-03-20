import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { act } from 'react-dom/test-utils';

import Login from './Login';
import { render, fireEvent, screen } from 'test-utils';

const validInput = {
  email: 'example@gmail.com',
  password: 'randomPw1',
};

const fillForm = async ({ email, password }) => {
  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password');
  await act(async () => {
    await fireEvent.change(emailInput, {
      target: { value: `${email}` },
    });
    await fireEvent.change(passwordInput, {
      target: { value: `${password}` },
    });
  });
};

const submitForm = async () => {
  const btn = screen.getByRole('button');
  await act(async () => {
    await fireEvent.click(btn);
  });
};

describe('Login.js', () => {
  let mockAxios;
  beforeEach(() => {
    render(<Login />);
    mockAxios = new MockAdapter(axios);
    mockAxios.onPost().replyOnce(200, {});
  });

  describe('Renders basic components', () => {
    it('Render input fileds for email and password and a submit button', () => {
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('When user input', () => {
    it('shows email in textbox', async () => {
      await fillForm(validInput);
      expect(screen.getByPlaceholderText('Email').value).toBe(validInput.email);
    });
    it('does not show password', async () => {
      await fillForm(validInput);
      const passwordInput = screen.getByPlaceholderText('Password');
      expect(passwordInput.value).toBe(validInput.password);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  describe('Form validation', () => {
    describe('Invalid input', () => {
      describe('Missing email', () => {
        it('renders message to require email', async () => {
          await fillForm({ ...validInput, email: '' });
          await submitForm();
          expect(screen.getByText(/email is required/i)).toBeInTheDocument();
          expect(() => screen.getByText(/password is required/i)).toThrow();
        });
      });

      describe('Missing password', () => {
        it('renders message to require password', async () => {
          await fillForm({ ...validInput, password: '' });
          await submitForm();
          expect(screen.getByText(/password is required/i)).toBeInTheDocument();
          expect(() => screen.getByText(/email is required/i)).toThrow();
        });
      });

      describe('Missing email and password', () => {
        it('renders message to require email and password', async () => {
          await fillForm({ email: '', password: '' });
          await submitForm();
          expect(screen.getByText(/email is required/i)).toBeInTheDocument();
          expect(screen.getByText(/password is required/i)).toBeInTheDocument();
        });
      });
    });

    describe('Valid input', () => {
      it('does not render any error message', async () => {
        await fillForm(validInput);
        await submitForm();
        expect(() => screen.getByText(/email is required/i)).toThrow();
        expect(() => screen.getByText(/password is required/i)).toThrow();
      });
    });
  });
});
