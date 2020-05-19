import React from "react";
import uid from "uid";

const CheckBox = ({ checked, onSet }) => {
  const id = uid();
  return (
    <div className="custom-control custom-checkbox">
      <input
        onChange={() => {
          onSet(!checked);
        }}
        checked={checked}
        type="checkbox"
        className="custom-control-input"
        id={id}
      />
      <label className="custom-control-label" htmlFor={id}></label>
    </div>
  );
};

export default CheckBox;
