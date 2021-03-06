import React from 'react';
import Select from 'react-select';

export default ({ type, options, input, label, meta: { error, touched } }) => {
  let field = <input {...input} type={type} style={{ marginBottom: "5px" }} />;
  if (type === 'select') field = <Select {...input} placeholder={input.value || 'Select...'} onChange={({ value }) => input.onChange(value)} onBlur={() => input.onBlur(input.value)} options={options} />
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