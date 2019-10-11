import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';

export default ({ data, type, input, label, meta: { error, touched } }) => {
  let field = <input {...input} style={{ marginBottom: "5px" }} />;
  // if (type === 'select') field = <DropdownList {...data} {...input} />

  return (
    <>
      <label>{label}</label>
      {field}
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </>
  );
}