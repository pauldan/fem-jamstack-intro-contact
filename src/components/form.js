import React, { useReducer } from 'react';
import styles from './form.module.css';

const INITIAL_STATE = {
  name: '',
  email: '',
  subject: '',
  body: '',
  status: 'IDLE',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateFieldValue':
      console.log({ state, action });
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'updateStatus':
      return {
        ...state,
        status: action.status,
      };
    case 'resetFields':
      return INITIAL_STATE;
    default:
      return state;
  }
};

const Form = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const handleChange = e => {
    const { name, value } = e.target;
    console.log({ name, value });
    dispatch({ type: 'updateFieldValue', name, value });
  };

  const handleReset = () => {
    dispatch({ type: 'resetFields' });
  };

  const setStatus = status => dispatch({ type: 'updateStatus', status });

  const handleSubmit = e => {
    e.preventDefault();
    setStatus('PENDING');
    fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(state),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setStatus('SUCCESS');
      })
      .catch(err => {
        console.error(err);
        setStatus('ERROR');
      });
    // send the message
  };

  if (state.status === 'SUCCESS') {
    return (
      <p className={styles.success}>
        Message sent!
        <button
          type='reset'
          onClick={handleReset}
          className={`${styles.button} ${styles.centered}`}
        >
          Reset
        </button>
      </p>
    );
  }
  return (
    <>
      {state.status === 'ERROR' && (
        <p className={styles.error}>Something went wrong. Please try again.</p>
      )}
      <form
        className={`${styles.form} ${
          state.status === 'PENDING' && styles.pending
        }`}
        onSubmit={handleSubmit}
      >
        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            type='text'
            name='name'
            value={state.name}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type='text'
            name='email'
            value={state.email}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Subject
          <input
            className={styles.input}
            type='text'
            name='subject'
            value={state.subject}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Body
          <textarea
            className={styles.input}
            name='body'
            value={state.body}
            onChange={handleChange}
          />
        </label>
        <button className={styles.button} type='submit'>
          {state.status === 'PENDING' ? 'Sending ...' : 'Send'}
        </button>
      </form>
    </>
  );
};

export default Form;
