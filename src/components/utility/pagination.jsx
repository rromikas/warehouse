import React from "react";
import uid from "uid";
const Pagination = ({ current, setCurrent, pagesAmount }) => {
  const fill = Array(pagesAmount).fill(0);
  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className="page-item">
          <div
            className="page-link"
            onClick={() => setCurrent(current > 0 ? current - 1 : current)}
          >
            Previous
          </div>
        </li>
        {fill.map((x, i) => (
          <li
            key={uid()}
            className={`page-item${current === i ? " active" : ""}`}
            onClick={() => setCurrent(i)}
          >
            <div className="page-link">{i + 1}</div>
          </li>
        ))}

        <li className="page-item">
          <div
            className="page-link"
            onClick={() =>
              setCurrent(current < pagesAmount - 1 ? current + 1 : current)
            }
          >
            Next
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
