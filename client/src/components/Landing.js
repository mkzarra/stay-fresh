import React from 'react';

export default ({ currentUser }) => {
  const userAgreement = currentUser
    ? <h3>By signing up, you are agreeing to receive a weekly email. To be removed from the mailing list, you can email me at mkzarra@gmail.com and I will remove you from the list.</h3>
    : <h6>Email me at <a href="mailto:mkzarra@gmail.com">mkzarra@gmail.com</a> if you wish to be removed from the mailing list.</h6>
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Stay Fresh!</h1>
      <h6>Reduce waste and increase your savings by keeping track of what's in your kitchen.</h6>
      {userAgreement}
    </div>
  );
}