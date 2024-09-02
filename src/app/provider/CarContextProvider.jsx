'use client'

import { useState, useEffect } from 'react';
import { CarContext } from '../context/CarContext';
import { GraphQLBackend } from '@lib/api/graphql';
import { deleteCar } from '../services/carService';
import { CarModification } from '../types/types';

export default function CarProvider({children}) {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const data = await GraphQLBackend.GetModification();
            const allCars = data.allCarModifications
            // console.log('fetched data', data);
            setLoading(false)
            setCars(allCars)
            // return allCars
        }
        setCars(fetchData())
    }, [])

    const addCar = (carData) => {
        setCars([...cars, carData])
    }

    const updateCar = (id, carData) => {
        setCars([...cars.filter((car) => car.id !== id), carData])
    }

    const removeCar = (id) => {
        console.log(id)
        setCars([...cars.filter((car) => car.id !== id)]);
        deleteCar(id);
    }

    const sort = (e) => {
        const value = e.target instanceof HTMLButtonElement ? e.target.value : null
        const textContent = e.target instanceof HTMLButtonElement ? e.target.textContent : null
        console.log(123, value, textContent);
        let sorted = []
        if (value && textContent) {
            localStorage.setItem('sortBy', `${value}-${textContent}`)
            if (value === 'horsepower' && textContent === 'asc') {
                sorted = cars.sort((a, b) => Number(a.horsePower) - Number(b.horsePower));
            } else if (value === 'horsepower' && textContent === 'desc') {
                sorted = cars.sort((a, b) => Number(b.horsePower) - Number(a.horsePower));
            } else if (value === 'weight' && textContent === 'asc') {
                sorted = cars.sort((a, b) => Number(a.weight) - Number(b.weight));
            } else if (value === 'weight' && textContent === 'desc') {
                sorted = cars.sort((a, b) => Number(b.weight) - Number(a.weight));
            }
            console.log(sorted)
            setCars([...sorted]);
            // setNewCarData(sorted)
        }
        // sortTable()
        // console.log(sorted)
        // setCars(sorted);
    }

    return (
        <CarContext.Provider value={{cars, setCars, loading, addCar, updateCar, removeCar, sort}}>
            {children}
        </CarContext.Provider>
    )
}