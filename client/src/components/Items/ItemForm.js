import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import ItemField from './ItemField';
import formFields from './formFields';

class ItemForm extends Component {
  renderFields() {
    return formFields.map(({ label, name, type, options }) => <Field key={name} name={name} type={type} component={ItemField} options={options} label={label} />);
  }

  render() {
    return (
      <>
        <form onSubmit={this.props.handleSubmit(this.props.onItemSubmit)}>
          {this.renderFields()}
          <Link to="/items" className="red btn-flat white-text">Cancel</Link>
          <button type="submit" className="#00e676 green accent-3 btn-flat right white-text">
            <i className="material-icons right">done</i>
          </button>
        </form>
      </>
    );
  }
}

function validate(values) {
  const errors = {};
  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = name + " is a required field";
    }
  });
  return errors;
}

export default reduxForm({ validate, form: "itemForm", destroyOnUnmount: false })(ItemForm);