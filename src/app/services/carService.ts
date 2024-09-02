import { GraphQLBackend } from '@lib/api/graphql'
import {
    GetModificationQuery,
    GetBrandsQuery,
    CreateBrandMutation,
    EditBrandsMutation,
    GetModelQuery,
    CreateModelMutation,
    EditModelMutation,
    CreateModificationMutation,
    EditModificatioMutation,
    DeleteModificationDocument
} from '@/lib/_generated/graphql_sdk';

export async function getAllCars(): Promise<GetModificationQuery> {
    // const {cars, setCars} = useContext<CarProviderContextType>(CarContext)
    const response = await GraphQLBackend.GetModification();
    // setCars(response.allCarModifications)
    return response
}

export async function getAllBrands(): Promise<GetBrandsQuery> {
    return await GraphQLBackend.GetBrands();
}

export async function createBrand(data: {name: string}): Promise<CreateBrandMutation> {
    return await GraphQLBackend.CreateBrand({name: data.name})
}

export async function editBrand(data: {id: string, name: string}): Promise<EditBrandsMutation> {
    return await GraphQLBackend.EditBrands({data});
}

export async function getAllModels(data: {brandId: string}): Promise<GetModelQuery> {
    return await GraphQLBackend.GetModel({brandId: data.brandId});
}

export async function createModel(data: {name: string, brandId: string}): Promise<CreateModelMutation> {
    return await GraphQLBackend.CreateModel({name: data.name, brandId: data.brandId})
}

export async function editModel(data: {id: string, name: string}): Promise<EditModelMutation> {
    return await GraphQLBackend.EditModel({data});
}

export async function createCarModification(data: any): Promise<CreateModificationMutation> {
    return await GraphQLBackend.CreateModification({name: data.name, modelId: data.model.id})
}

export async function editCarModification(data: any, id: string): Promise<EditModificatioMutation> {
    return await GraphQLBackend.EditModificatio({data})
}

export async function deleteCar(id: string): Promise<any> {
    await GraphQLBackend.DeleteModification({id})
}