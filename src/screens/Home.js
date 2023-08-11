import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import { Row, Col } from "react-bootstrap";

function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [searchKey, setSearch] = useState("");

  const handleValueChange = (newValue) => {
    setSearch(newValue);
  };
  console.log("Value", searchKey);
  const fetchData = async () => {
    let res = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    res = await res.json();
    console.log(res.data);
    setFoodItem(res.data);
    setFoodCat(res.catdata);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div>
        <Header onValueChange={handleValueChange} />
      </div>
      <div style={{ marginTop: "70px" }}>
        {foodCat !== []
          ? foodCat.map((data) => {
              return (
                <div className="container mt-4 mb-5">
                  <div
                    style={{ color: "white" }}
                    className="fs-2 ms-2"
                    key={data._id}
                  >
                    {data.CategoryName}
                  </div>
                  <Row
                    xs={1}
                    sm={1}
                    lg={3}
                    xxl={4}
                    className="border border-2 border-start-0 border-end-0"
                  >
                    {foodItem !== []
                      ? foodItem
                          .filter(
                            (item) =>
                              item.CategoryName === data.CategoryName &&
                              item.name
                                .toLowerCase()
                                .includes(searchKey.toLocaleLowerCase())
                          )
                          .map((res) => {
                            return (
                              <Col className="" key={res._id}>
                                <Cards item={res} />
                              </Col>
                            );
                          })
                      : ""}
                  </Row>
                </div>
              );
            })
          : ""}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
