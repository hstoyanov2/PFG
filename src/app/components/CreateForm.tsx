'use client'
import * as React from 'react';
import { Formik, Field, Form } from 'formik';
import Link from 'next/link';
import { getAllBrands, createBrand, createCarModification, getAllModels, createModel } from '../services/carService';
import {CarContext} from '../context/CarContext';
import {useContext} from 'react';
import EditBrandForm from './EditBrandForm';
import EditModelForm from './EditModelForm';
import { CarProviderContextType, CarBrand, CarModel } from '../types/types';

interface Values {
    model: {
      id: string,
      name: string,
      brand: {
        id: string,
        name: string
      },
    },
    name: string,
    horsePower: number,
    weight: number,
    coupe: string,
    id: string
}

const CreateCarForm = () => {
    const [brands, setBrands] = React.useState([]);
    const [filteredBrands, setFilteredBrands] = React.useState([...brands])
    const [openBrandsList, setOpenBrandsList] = React.useState(false);
    const [selectedBrand, setSelectedBrand] = React.useState({id: '', name: ''})
    const [openEditBrandForm, setOpenEditBrandForm] = React.useState(false)
    const [models, setModels] = React.useState([]);
    const [filteredModels, setFilteredModels] = React.useState([...models])
    const [openModelsList, setOpenModelsList] = React.useState(false);
    const [selectedModel, setSelectedModel] = React.useState({id: '', name: ''})
    const [openEditModelForm, setOpenEditModelForm] = React.useState(false)

    React.useEffect(() => {
        const getBrands = async () => {
            const allBrands = await getAllBrands()
            console.log(allBrands);
            setBrands(allBrands.carBrands);
            setFilteredBrands(allBrands.carBrands)
        }
        getBrands()
    }, [])

    React.useEffect(() => {
        if (selectedBrand.id) {
            const getModels = async () => {
                const allModels = await getAllModels({brandId: selectedBrand.id})
                console.log(allModels);
                setModels(allModels.carModels);
                setFilteredModels(allModels.carModels)
            }
            getModels()
        }
    }, [selectedBrand])
    
    const {cars, setCars} = useContext<CarProviderContextType>(CarContext)
    const brandList = (e) => {
        console.log(e.target.value)
        setSelectedBrand({name: e.target.value})
        setFilteredBrands(brands.filter((brand: CarBrand) => brand.name.includes(e.target.value)))
    }

    const onBrandCreation = async () => {
      await createBrand({name: selectedBrand.name});
      setBrands((await getAllBrands()).carBrands)
    }

    const onBrandEdit = () => setOpenEditBrandForm(true)

    const updateBrandField = (brand: CarBrand) => {
        setSelectedBrand(brand);

    }

    const modelList = (e) => {
        console.log(e.target.value)
        setSelectedModel({name: e.target.value})
        setFilteredModels(models.filter((model: CarModel) => model.name.includes(e.target.value)))
    }

    const onModelCreation = async () => {
        if (selectedBrand.id) {
            await createModel({name: selectedModel.name, brandId: selectedBrand.id});
            setModels((await getAllModels(selectedBrand.id)).carModels)
        }
      }
  
    const onModelEdit = () => setOpenEditModelForm(true)
  
    const updateModelField = (model: CarModel) => setSelectedModel(model)

    return (
    <div className="z-10 bg-gray-300 w-5/6 border border-black rounded-md">
        {openEditBrandForm && (<div className="z-20 bg-gray-200 absolute top-36">
          <EditBrandForm brand={{id: selectedBrand.id, name: selectedBrand.name}} updateField={updateBrandField} closeForm={() => setOpenEditBrandForm(false)} />
        </div>)}
        {openEditModelForm && (<div className="z-20 bg-gray-200 absolute top-36">
          <EditModelForm model={{id: selectedModel.id, name: selectedModel.name, brand: selectedBrand}} updateField={updateModelField} closeForm={() => setOpenEditModelForm(false)} />
        </div>)}
        <h1 align="center">Create Car Form</h1>
        <Formik
            initialValues={{
                model: {
                  id: '',
                  name: '',
                  brand: {
                    id: '',
                    name: ''
                  }
                },
                id: '',
                name: '',
                coupe: '',
                horsePower: 0,
                weight: 0
            }}
            onSubmit={async (
                values: Values,
                { resetForm }
            ) => {
                console.log(values);
                const newCar = {
                    model: {
                        id: selectedModel.id,
                        name: selectedModel.name,
                        brand: {
                            id: selectedBrand.id,
                            name: selectedBrand.name
                        }
                    },
                    name: values.name,
                    coupe: values.coupe,
                    horsePower: values.horsePower,
                    weight: values.weight
                }
                await createCarModification(newCar);
                setCars([...cars.filter((car) => car.id !== values.id), {...newCar, ...values}]);
                // closeForm()
                resetForm()
            }}
        >
            <Form className="flex flex-col p-5">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col w-5/6 cursor-pointer">
                        <label htmlFor="brand">Brand</label>
                        <Field id="brand" name="brand" onClick={() => setOpenBrandsList(!openBrandsList)} onChange={brandList} value={selectedBrand.name} />
                        {openBrandsList && (
                            <div className="max-h-96 overflow-scroll">
                                {filteredBrands.length > 0 ? filteredBrands.map((brand: CarBrand) => <li className="list-none cursor-pointer" key={brand.id} onClick={() => (
                                  setSelectedBrand({id: brand.id, name: brand.name})
                                  )}>{brand.name}</li>) : <button onClick={onBrandCreation}>Create</button>}
                            </div>
                            )}
                    </div>
                    {selectedBrand.id && <button type="button" onClick={onBrandEdit}>Edit</button>}
                </div>
                
                <div className="flex flex-row justify-between cursor-pointer">
                    <div className="flex flex-col w-5/6">
                        <label htmlFor="model.name">Model</label>
                        <Field id="model" name="model" onClick={() => setOpenModelsList(!openModelsList)} onChange={modelList} value={selectedModel.name} />
                            {openModelsList && (
                                <div className="max-h-96 overflow-scroll">
                                    {filteredModels.length > 0 ? filteredModels.map((model: CarModel) => <li className="list-none cursor-pointer" key={model.id} onClick={() => (
                                        setSelectedModel({id: model.id, name: model.name})
                                    )}>{model.name}</li>) : <button onClick={onModelCreation}>Create</button>}
                                </div>
                            )}
                    </div>
                    {selectedModel.id && <button type="button" onClick={onModelEdit}>Edit</button>}
                </div>

                <label htmlFor="modification">Modification</label>
                <Field id="modification" name="modification" />

                <label htmlFor="horsepower">Horsepower</label>
                <Field id="horsepower" name="horsepower" />

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
                {/* <button onClick={closeForm}>Close</button> */}

                
            </Form>
        </Formik>
        <Link className="inline bg-blue-500 w-20 pointer" href="/">To Car List</Link>
    </div>
    )
}

export default CreateCarForm