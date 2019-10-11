import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';

export default props => <DropdownList {...props} />;
// export default ({ input, label, options, meta }) => {
//   const selectMenu = options.map(opt => <option key={opt} value={opt}>{opt}</option>);
//   console.log(input, label, options, meta);
//   return (
//     <>
//       <label>{label}</label>
//       <select {...input} style={{ marginBottom: "5px" }}>
//         <option key="empty" value={null}></option>
//         {selectMenu}       
//       </select>
//       <div className="red-text" style={{ marginBottom: "20px" }}>
//         {meta.touched && meta.error}
//       </div>
//     </>
//   );
// }