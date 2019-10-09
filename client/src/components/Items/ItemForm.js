import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import ItemField from './ItemField';
import SelectInput from './SelectInput';
import formFields from './formFields';

class ItemForm extends Component {
  // CONSIDER: "Expiration" should be determined by a formula based on "Category" and "Storage".
  // CONSIDER(cont.): "Category and Storage" coverted to inputType: 'select'.
  renderFields() {
    return _.map(formFields, ({ label, name, type, options }) => {
      if (type === 'text') return <Field key={name} component={ItemField} type={type} label={label} name={name} />
      else return <Field key={name} component={SelectInput} label={label} name={name} type={type} options={options}>
        <SelectInput />
      </Field>
    });
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
  _.each(formFields, ({ name }) => {
    if (!values[name] || values[name].trim() === "") {
      errors[name] = name + " is a required field";
    }
  });
  return errors;
}

export default reduxForm({ validate, form: "itemForm", destroyOnUnmount: false })(ItemForm);