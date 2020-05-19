import React from "react";
import Cube from "../images/cube.png";
import history from "../routing/history";
import { FaGithub } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <FaGithub
        onClick={() => window.open("https://github.com/rromikas/warehouse")}
        fontSize="48px"
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          cursor: "pointer",
        }}
      ></FaGithub>

      <div className="container-fluid">
        <div className="row justify-content-center align-items-center">
          <div className="col-auto">
            <img src={Cube} className="m-2 mx-auto"></img>
          </div>
          <div className="col-auto">
            <div
              className="row no-gutter"
              style={{ fontWeight: 500, fontSize: `calc(5vw + 2em)` }}
            >
              Warehouse
            </div>
            <div
              style={{
                fontSize: `calc(2vw + 0.9em)`,
                cursor: "pointer",
              }}
              className="row no-gutters mb-2 lead"
              onClick={() => history.push({ pathname: "/products" })}
            >
              Products List
            </div>
            <div
              style={{
                fontSize: `calc(2vw + 0.9em)`,
                cursor: "pointer",
              }}
              className="row no-gutters lead"
              onClick={() => history.push({ pathname: "/products/create" })}
            >
              Create Product
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
