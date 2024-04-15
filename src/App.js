import { useEffect, useState } from "react";
import "./App.css";
import Col from "./components/Col";

const URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

function App() {
  const [data, setData] = useState({
    loading: false,
    error: false,
    errMsg: "",
    data: [],
  });

  async function fetchData() {
    setData((pre) => {
      return {
        ...pre,
        loading: true,
        error: false,
      };
    });
    try {
      let res = await fetch(URL);
      let result = await res.json();
      if (result) {
        setData((pre) => {
          return {
            ...pre,
            loading: false,
            data: result,
          };
        });
      } else {
        setData((pre) => {
          return {
            ...pre,
            loading: false,
            data: [],
          };
        });
      }
    } catch (error) {
      setData((pre) => {
        return {
          ...pre,
          loading: false,
          errMsg: error.message,
          error: true,
        };
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>ID</th>
            <th>Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody className="body-cell">
          {data?.error ? (
            <p className="error">{data?.errMsg ?? "something went wrong"}</p>
          ) : data?.data?.length === 0 ? (
            <p>No Data Availabel</p>
          ) : (
            data?.data?.map((val, i) => {
              return <Col key={i} obj={val} />;
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
