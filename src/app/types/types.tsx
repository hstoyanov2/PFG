export type CarBrand = {
    id: string,
    name: string
}

export type CarModel = {
    brand: CarBrand,
    id: string,
    name: string
}

export type CarModification = {
    model: CarModel,
    coupe: CarCoupe,
    horsePower: number,
    id: string,
    name: string,
    weight: number
}

enum CarCoupe {
    Convertible = 'CONVERTIBLE',
    Coupe = 'COUPE',
    Hatchback = 'HATCHBACK',
    Sedan = 'SEDAN',
    Suv = 'SUV',
    Truck = 'TRUCK',
    Van = 'VAN',
    Wagon = 'WAGON'
}

export type CarProviderContextType = {
    cars: CarModification[],
    setCars: Function
}
