import _ from 'lodash';
import React from 'react';
import formFields from './formFields';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/';

const itemFormReview = ({ onCancel, formValues, submitItem, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => (
    <div key={name}>
      <label>{label}</label>
      <div>
        {formValues[name]}
      </div>
    </div>
  ));
  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button className="amber accent-4 white-text right" onClick={onCancel}>
        Back
      </button>
      <button
        onClick={() => submitItem(formValues, history)}
        className = "#00e676 green accent-3 btn-flat white-text right">
        Submit Item
      </button>
    </div>
  );
}

function mapStateToProps({ form }) {
  return { formValues: form.itemForm.values }
}

export default connect(mapStateToProps, actions)(withRouter(itemFormReview));