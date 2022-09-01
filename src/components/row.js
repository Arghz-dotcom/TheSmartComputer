import React from "react"

const Row = ({ row, play }) => {
    return (
        <tr>
            {row.map((cell, i) => (
                <Cell key={i} value={cell} columnIndex={i} play={play} />
            ))}
         </tr>
    )
  }

  const Cell = ({ value, columnIndex, play }) => {
    return (
        <td>
            a
        </td>
    )
  }
  
  export default Row