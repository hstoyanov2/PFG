'use client';
import * as React from 'react';
import { Formik, Field, Form } from 'formik';
import { editBrand } from '../services/carService';
import { CarBrand } from '../types/types';

type Props = {
    brand: CarBrand,
    updateField: Function,
    closeForm: React.MouseEventHandler<HTMLButtonElement>
}


interface Values {
    name: string;
}

const EditBrandForm: React.FC<Props> = ({brand, updateField, closeForm}) => {
    return (
        <div className="flex flex-col w-56 border border-black rounded-md">
            <h1 align="center">Edit Brand Form</h1>
            <Formik
                initialValues={{
                    name: brand.name
                }}
                onSubmit={async (
                    values: Values
                ) => {
                    console.log(values);
                    await editBrand({
                        id: brand.id,
                        name: values.name
                    })
                    updateField({
                        id: brand.id,
                        name: values.name
                    })
                    closeForm()
                }}
            >
                <Form>
                    <label htmlFor="name">Brand</label>
                    <Field id="name" name="name" />
                    
                    <div className="flex flex-col">
                        <button className="m-2 p-2.5 rounded bg-green-300" type="submit">Submit</button>
                        <button className="m-2 p-2.5 rounded bg-red-700" type="button" onClick={closeForm}>Close</button>
                    </div>
                </Form>

            </Formik>
        </div>
    )
}

export default EditBrandForm