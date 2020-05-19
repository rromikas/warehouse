import React, { useState } from "react";
const NumberInput = ({ val, onSet, step = 0.1, min = 0, max = 0, prepend }) => {
  const [letEdit, setLetEdit] = useState(false);
  const [value, setValue] = useState([val, val]); // old value and new value
  return (
    <div className="d-flex">
      <div className="input-group mb-3">
        {prepend ? (
          <div className="input-group-prepend">
            <span className="input-group-text">{prepend}</span>
          </div>
        ) : (
          ""
        )}
        <input
          disabled={!letEdit}
          min={min}
          max={max}
          pattern="[0-9]*"
          onChange={(e) => {
            e.persist();
            setValue([value[0], e.target.value]);
          }}
          type="number"
          value={value[1]}
          step={step}
          type="number"
          className="form-control"
          aria-describedby="basic-addon2"
        />
        <div className="input-group-append">
          {!letEdit ? (
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={() => {
                setLetEdit(true);
              }}
              style={{ width: "80px", textAlign: "center" }}
            >
              Edit
            </button>
          ) : (
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={() => {
                setLetEdit(false);
                onSet(value[1]);
              }}
              style={{ width: "80px", textAlign: "center" }}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NumberInput;
