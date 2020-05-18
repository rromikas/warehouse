import React from "react";

const Test = (props) => {
  const id = props.match.params.id;
  return <div>{id}</div>;
};

export default Test;
