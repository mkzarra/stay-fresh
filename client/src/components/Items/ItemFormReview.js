import _ from 'lodash';
import React from 'react';
import formFields from './formFields';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/';

const itemFormReview = ({ onCancel, formValues, createItem, token, history }) => {
  console.log("\n\nitemFormReview:\nhistory = " + history);
  const reviewFields = _.map(formFields, ({ name, label }) => (
    <div key={name}>
      <label>{label}</label>
      <div>
        {formValues[name]}
      </div>
    </div>
  ));
  return (
    <>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button className="amber accent-4 btn-flat white-text" onClick={onCancel}>
        Back
      </button>
      <button
        onClick={() => createItem(formValues, token, history)}
        className = "#00e676 green accent-3 btn-flat white-text right">
        Submit Item
      </button>
    </>
  );
}

function mapStateToProps({ form, auth }) {
  return { formValues: form.itemForm.values, token: auth._id }
}

export default connect(mapStateToProps, actions)(withRouter(itemFormReview));