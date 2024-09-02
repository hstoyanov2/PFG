import * as React from 'react';
import { Formik, Field, Form } from 'formik';
import { getAllBrands, editCarModification } from '../services/carService';
import {CarContext} from '../context/CarContext';
import {useContext} from 'react';
import { CarProviderContextType, CarModification } from '../types/types';

type Props = {
    carData: CarModification,
    closeForm: React.MouseEventHandler<HTMLButtonElement>
}

interface Values {
    name: string,
    horsePower: number,
    weight: number,
    coupe: string,
    id: string
}

const EditCarForm: React.FC<Props> = ({carData, closeForm}) => {
    // const [brands, setBrands] = React.useState([]);
    // const [filteredBrands, setFilteredBrands] = React.useState([])
    // const [openBrandsList, setOpenBrandsList] = React.useState(false);
    // const [selectedBrand, setSelectedBrand] = React.useState({
    //     id: carData.model.brand.id,
    //     name: carData.model.brand.name
    // })
    // const [models, setModels] = React.useState([...brands]);

    // React.useEffect(() => {
    //     const getBrands = async () => {
    //         const allBrands = await getAllBrands()
    //         console.log(allBrands);
    //         setBrands(allBrands.carBrands);
    //         setFilteredBrands(allBrands.carBrands)
    //     }
    //     getBrands()
    // //    setBrands(getBrands())
    // }, [])

    
    const {cars, setCars} = useContext<CarProviderContextType>(CarContext)
    const modifiedCar = cars.find((car) => car.id === carData.id);
    // console.log(carData, carData.brand, modifiedCar)

    // const brandList = (e) => {
    //     console.log(e.target.value)
    //     setFilteredBrands(brands.filter((brand) => brand.name.includes(e.target.value)))
    // }

    return (
    <div className="z-10 bg-gray-200 absolute top-48 w-4/12 border border-black rounded-md">
        <h1 align="center">Edit Car Form</h1>
        <Formik
            initialValues={{
                ...carData
            }}
            onSubmit={async (
                values: Values
            ) => {
                console.log(values);
                await editCarModification({
                    id: values.id,
                    name: values.name,
                    coupe: values.coupe,
                    horsePower: values.horsePower,
                    weight: values.weight
                }, values.id);
                setCars([...cars.filter((car) => car.id !== values.id), {...modifiedCar, ...values}]);
                closeForm()
            }}
        >
            <Form className="flex flex-col p-5">
                {/* <div className="flex flex-row justify-between">
                    <div className="flex flex-col w-5/6"> */}
                        <label htmlFor="brand">Brand</label>
                        <Field id="brand" name="brand" value={modifiedCar?.model.brand.name} />
                    {/* </div> */}
                    {/* <button>Edit</button> */}
                {/* </div> */}
                

                <label htmlFor="model">Model</label>
                <Field id="model" name="model" value={modifiedCar?.model.name} />

                <label htmlFor="name">Modification</label>
                <Field id="name" name="name" />

                <label htmlFor="horsePower">Horsepower</label>
                <Field id="horsePower" name="horsePower" />

                <label htmlFor="weight">Weight</label>
                <Field id="weight" name="weight" />

                <label htmlFor="coupe">Coupe</label>
                <Field as="select" id="coupe" name="coupe">
                    <option value="CONVERTIBLE">Convertible</option>
                    <option value="COUPE">Coupe</option>
                    <option value="HATCHBACK">Hatchback</option>
                    <option value="SEDAN">Sedan</option>
                    <option value="SUV">Suv</option>
                    <option value="TRUCK">Truck</option>
                    <option value="VAN">Van</option>
                    <option value="WAGON">Wagon</option>
                </Field>

                <button className="m-2 p-2.5 rounded bg-green-300" type="submit">Submit</button>
                <button className="m-2 p-2.5 rounded bg-red-700" onClick={closeForm}>Close</button>

                
            </Form>
        </Formik>
    </div>
    )
}

export default EditCarForm