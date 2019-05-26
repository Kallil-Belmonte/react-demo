import React from 'react';

import { Field } from 'redux-form';

// INPUT
export const renderInput = (field) => {
  let classes = field.className;
  let invalidFeedback;

  if (field.meta.touched && field.meta.error) {
    classes += ' is-invalid';
    invalidFeedback = <div className="d-block invalid-feedback">{field.meta.error}</div>;
  }

  return (
    <React.Fragment>
      <input id={field.id} className={classes} {...field.input} type={field.type} placeholder={field.placeholder} />
      {invalidFeedback}
    </React.Fragment>
  );
};


// TEXTAREA
export const renderTextarea = (field) => {
  let classes = field.className;
  let invalidFeedback;

  if (field.meta.touched && field.meta.error) {
    classes += ' is-invalid';
    invalidFeedback = <div className="d-block invalid-feedback">{field.meta.error}</div>;
  }

  return (
    <React.Fragment>
      <textarea id={field.id} className={classes} {...field.input} placeholder={field.placeholder} rows={field.rows} cols={field.cols}></textarea>
      {invalidFeedback}
    </React.Fragment>
  );
}


// SELECT
export const renderSelect = (field) => {
  let classes = field.className;
  let invalidFeedback;

  if (field.meta.touched && field.meta.error) {
    classes += ' is-invalid';
    invalidFeedback = <div className="d-block invalid-feedback">{field.meta.error}</div>;
  }

  return (
    <React.Fragment>
      <select id={field.id} className={classes} {...field.input}>
        <option />
        {field.options.map((item, index) =>
          <option value={item} key={index}>{item}</option>
        )}
      </select>
      {invalidFeedback}
    </React.Fragment>
  );
};


// CHECKBOX
export const renderCheckbox = (field) => {
  let invalidFeedback;

  if (field.meta.touched && field.meta.error) {
    invalidFeedback = <div className="d-block invalid-feedback">{field.meta.error}</div>;
  }

  return (
    <React.Fragment>
      <div className="pretty p-svg p-curve">
        <input type="checkbox" {...field.input} />
        <div className={`state ${field.className}`}>
          <svg className="svg svg-icon" viewBox="0 0 20 20">
            <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style={{stroke: '#FFF', fill: '#FFF'}}></path>
          </svg>
          <label>{field.label}</label>
        </div>
      </div>
      {invalidFeedback}
    </React.Fragment>
  );
};


// RADIO BUTTON
export const renderRadioButton = (field) => {
  return (
    <div className="pretty p-default p-round">
      <Field {...field.input} component="input" type="radio" value={field.radioValue} />
      <div className={`state ${field.className}`}>
        <label>{field.label}</label>
      </div>
    </div>
  );
};
