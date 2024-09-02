'use client';
import * as React from 'react';
import { Formik, Field, Form } from 'formik';
import { editModel } from '../services/carService';
import { CarModel } from '../types/types';

type Props = {
    model: CarModel,
    updateField: Function,
    closeForm: React.MouseEventHandler<HTMLButtonElement>
}

interface Values {
    name: string;
}

const EditModelForm: React.FC<Props> = ({model, updateField, closeForm}) => {
    return (
        <div className="flex flex-col w-56 border border-black rounded-md">
            <h1 align="center">Edit Model Form</h1>
            <Formik
                initialValues={{
                    name: model.name
                }}
                onSubmit={async (
                    values: Values
                ) => {
                    console.log(values);
                    await editModel({
                        id: model.id,
                        name: values.name
                    })
                    updateField({
                        id: model.id,
                        name: values.name
                    });
                    closeForm()
                }}
            >
                <Form>
                    <label htmlFor="name">Model</label>
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

export default EditModelForm