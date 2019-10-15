import React from 'react';
import Select from 'react-select';

export default ({ type, options, input, label, meta: { error, touched } }) => {
  console.log('ItemField.js:', input, type);
  let field = <input {...input} type={type} style={{ marginBottom: "5px" }} />;
  if (type === 'select') field = <Select {...input} onChange={({ value }) => input.onChange(value)} onBlur={() => input.onBlur(input.value)} options={options} />
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