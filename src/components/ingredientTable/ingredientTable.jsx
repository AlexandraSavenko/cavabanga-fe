import React from 'react'

const ingredientTable = ({list}) => {
  return (
    <div>
      <table>
        <tr>
            <th>
                ingredient
            </th>
            <th>
                amount
            </th>
        </tr>
        {
            list.map((el, index) => <tr key={index}>
<td>{el.ingredient}</td>
<td>{el.amount}</td>
            </tr> )
        }
      </table>
    </div>
  )
}

export default ingredientTable
