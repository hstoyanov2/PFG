'use client'
import React from 'react';
import TableRow from './TableRow';
import { CarModification } from '../types/types';
import { CarContext } from '../context/CarContext';
import EditCarForm from './EditCarForm';

type Props = {
    // carData: CarModification[],
    // sortTable: Function,
}

const Table: React.FC<Props> = () => {
    const {cars, setCars, loading, removeCar, sort} = React.useContext<any>(CarContext)
    const [openEditForm, setOpenEditForm] = React.useState(false);
    const [currentCar, setCurrentCar] = React.useState<CarModification>()

    const onOpenEditForm = (carRowData: any) => {
        setOpenEditForm(true);
        setCurrentCar({
            model: {
                name: carRowData.model.name,
                id: carRowData.model.id,
                brand: {
                    name: carRowData.model.brand.name,
                    id: carRowData.model.brand.id
                },
            },
            name: carRowData.name,
            horsePower: carRowData.horsePower,
            weight: carRowData.weight,
            coupe: carRowData.coupe,
            id: carRowData.id
        })
        console.log(carRowData)
    }

    const closeForm = () => setOpenEditForm(false)

    return (
        <>
        {openEditForm && <EditCarForm carData={currentCar!} closeForm={closeForm} />}
        <table className="border">
            <thead>
                <tr className="border">
                    <th className="border">
                        Brand
                    </th>
                    <th className="border">
                        Model
                    </th>
                    <th className="border">
                        Modification
                    </th>
                    <th className="border">
                        Horsepower
                        <div className="flex flex-col">
                            <button onClick={sort} value="horsepower">asc</button>
                            <button onClick={sort} value="horsepower">desc</button>
                        </div>
                    </th>
                    <th className="border">
                        Weight
                        <div className="flex flex-col">
                            <button onClick={sort} value="weight">asc</button>
                            <button onClick={sort} value="weight">desc</button>
                        </div>
                    </th>
                    <th className="border">
                        Coupe
                    </th>
                    <th className="border">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(cars) && cars.map((row: CarModification) => (
                    <TableRow key={row.id} carRow={row} onOpenEditForm={onOpenEditForm} removeCar={removeCar}/>
                ))}
            </tbody>
        </table>
        </>
    )
}

export default Table;