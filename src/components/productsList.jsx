import React, { useEffect, useState, useRef } from "react";
import { initialProducts } from "../data/initialData";
import { header } from "../data/header";
import uid from "uid";
import CheckBox from "./utility/checkbox";
import NumberInput from "./utility/numberInput";
import history from "../routing/history";
import Pagination from "./utility/pagination";
import { getDate } from "../utility/getDate";
import { maxPrice, maxQuantity } from "../data/limits";

const ProductsList = () => {
  const allProducts = useRef(
    localStorage["products"]
      ? JSON.parse(localStorage["products"])
      : initialProducts
  );
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState(
    allProducts.current.filter(
      (x, i) => i >= productsPerPage * page && i < productsPerPage * (page + 1)
    )
  );

  useEffect(() => {
    let pageProducts = allProducts.current.filter(
      (x, i) => i >= productsPerPage * page && i < productsPerPage * (page + 1)
    );
    setProducts(pageProducts);
  }, [page]);

  useEffect(() => {
    let pageProducts = allProducts.current.filter(
      (x, i) => i >= productsPerPage * page && i < productsPerPage * (page + 1)
    );
    setProducts(pageProducts);
  }, [productsPerPage]);

  useEffect(() => {
    products.forEach((x, i) => {
      allProducts.current[page * productsPerPage + i] = x;
    });
    localStorage["products"] = JSON.stringify(allProducts.current);
  }, [products]);

  return (
    <div
      className="px-3"
      style={{ maxWidth: "1300px", minHeight: "100%", margin: "auto" }}
    >
      <h1 className="py-4">Products List</h1>
      <table className="table border">
        <thead>
          <tr>
            {header.map((fieldName) => (
              <th key={uid()}>{fieldName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => {
            return (
              <tr key={uid()}>
                {header.slice(0, header.length - 3).map((fieldName) => (
                  <td key={uid()}>
                    {fieldName === "Active" ? (
                      <CheckBox
                        checked={product[fieldName]}
                        onSet={(checked) =>
                          setProducts((products) => {
                            let arr = [...products];
                            arr[i].Active = checked;
                            return arr;
                          })
                        }
                      ></CheckBox>
                    ) : fieldName === "Price" ? (
                      <NumberInput
                        min={0}
                        max={maxPrice}
                        val={
                          product[fieldName][product[fieldName].length - 1]
                            .price
                        }
                        onSet={(val) => {
                          let date = getDate();
                          setProducts((products) => {
                            let arr = [...products];
                            arr[i].Price.push({ price: +val, date: date });
                            return arr;
                          });
                        }}
                      ></NumberInput>
                    ) : fieldName === "Quantity" ? (
                      <NumberInput
                        min={0}
                        max={maxQuantity}
                        step={1}
                        val={
                          product[fieldName][product[fieldName].length - 1]
                            .quantity
                        }
                        onSet={(val) => {
                          let date = getDate();
                          setProducts((products) => {
                            let arr = [...products];
                            arr[i].Quantity.push({
                              quantity: +val,
                              date: date,
                            });
                            return arr;
                          });
                        }}
                      ></NumberInput>
                    ) : (
                      product[fieldName]
                    )}
                  </td>
                ))}
                <td>
                  <div
                    className="btn-primary btn"
                    onClick={() =>
                      history.push({
                        pathname: `/products/${productsPerPage * page + i}`,
                      })
                    }
                  >
                    View
                  </div>
                </td>
                <td>
                  <div
                    className="btn-secondary btn"
                    onClick={() =>
                      history.push({
                        pathname: `/products/${
                          productsPerPage * page + i
                        }/edit`,
                      })
                    }
                  >
                    Edit
                  </div>
                </td>
                <td>
                  <div
                    className="btn-danger btn"
                    onClick={() => {
                      let index = productsPerPage * page + i;
                      allProducts.current.splice(index, 1);
                      setProducts((products) => {
                        let arr = [...products];
                        arr.splice(i, 1);
                        return arr;
                      });
                    }}
                  >
                    Delete
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <Pagination
          current={page}
          pagesAmount={Math.ceil(allProducts.current.length / productsPerPage)}
          setCurrent={setPage}
        ></Pagination>

        <NumberInput
          val={productsPerPage}
          onSet={(val) => setProductsPerPage(val)}
          step={5}
          min={5}
          max={20}
          prepend="Products per page"
        ></NumberInput>
      </div>
    </div>
  );
};

export default ProductsList;
