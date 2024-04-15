import React from "react";

function Col({ obj }) {
  return (
    <tr key={obj?.id ?? ""}>
      <td>{obj.name}</td>
      <td>
        <img className="img" src={obj.image} alt="logo" />
      </td>
      <td>{obj.symbol}</td>
      <td>{obj.current_price}</td>
      <td>{obj.total_volume}</td>
    </tr>
  );
}

export default Col;
