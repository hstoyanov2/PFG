import React from 'react';
import { CarModification } from '../types/types';

const TableRow: React.FC<any> = ({carRow, removeCar, onOpenEditForm}) => {
    // console.log(carRow);

    const editCar = () => {
        // console.log(carRow)
        onOpenEditForm(carRow);
    }

    const deleteCar = () => {
        removeCar(carRow.id)
    }

    return (
        <tr className="border">
            <td className="border">
                {carRow.model?.brand?.name}
            </td>
            <td className="border">
                {carRow.model?.name}
            </td>
            <td className="border">
                {carRow.name}
            </td>
            <td className="border">
                {carRow.horsePower}
            </td>
            <td className="border">
                {carRow.weight}
            </td>
            <td className="border">
                {carRow.coupe}
            </td>
            <td className="border">
                <button className="m-2 p-2.5 rounded bg-yellow-300" onClick={editCar}>Edit</button>
                <button className="m-2 p-2.5 rounded bg-red-700" onClick={deleteCar}>Delete</button>
            </td>
        </tr>
    )
}

export default TableRow;