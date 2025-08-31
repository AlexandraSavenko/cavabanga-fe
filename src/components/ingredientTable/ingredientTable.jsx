import React from 'react'

const IngredientTable = ({list}) => {
  return (
    <div>
      <table>
        <thead>
            <th>
                ingredient
            </th>
            <th>
                amount
            </th>
        </thead>
        <tbody>
        {
            list.map((el, index) => <tr key={index}>
<td>{el.ingredient}</td>
<td>{el.amount}</td>
            </tr> )
        }</tbody>
      </table>
    </div>
  )
}

export default IngredientTable
