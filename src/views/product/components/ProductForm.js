import React, { useState, useContext, useEffect } from 'react';
import { Formik } from 'formik';
import { Button, TextField, Grid, Typography, InputAdornment, Card, CardContent } from '@mui/material'
import { Box } from '@mui/system';
import * as Yup from 'yup';
import StoreContext from '../../../context/store/StoreContext'
import Product from '../../../middleware/product';
import AlertContext from '../../../context/alert/AlertContext';


const ProductForm = ({ updatePro, typeForm, setTypeForm }) => {

    const { openAlert } = useContext(AlertContext);
    const { addProduct, updateProduct } = useContext(StoreContext);

    const initialValues = {
        product_name: '',
        ref: '',
        price: '',
        weight: '',
        stock: '',
        category_id: '',
    };

    const [initial, setInitial] = useState(initialValues);

    const schema = Yup.object().shape({
        product_name:
            Yup.string().max(255).required('El nombre es requerido'),
        ref:
            Yup.number().required('La referencia es requerida').transform((value, originalValue) => (/\s/.test(originalValue) ? NaN : value)),
        price:
            Yup.number().required('El precio es requerido'),
        weight:
            Yup.number().required('El peso es requerido'),
        stock:
            Yup.number().required('El stock es requerido'),
        category_id:
            Yup.number().max(255).required('La categoria es requerida'),
    });

    useEffect(() => {
        console.log(typeForm)
        if (typeForm) {
            setInitial(initialValues);
        } else {
            setInitial(updatePro);
        }

    }, [updatePro, typeForm]);


    const handlerSubmit = async (input, { resetForm }) => {


        try {
            if (typeForm) {
                const res = await Product.create(input);
                addProduct(res);
                openAlert({
                    message: "Producto agregado con exito",
                    variant: 'filled',
                    severity: 'success',
                });
                resetForm();

            } else {
                const res = await Product.update(input);
                console.log(res)
                updateProduct(res);
                setTypeForm(true)
                openAlert({
                    message: "Producto editado con exito",
                    variant: 'filled',
                    severity: 'success',
                });
                resetForm();
            }

        }
        catch (error) {
            console.log(error)
        }

    }

    return (
        <Box>
            <Card>
                <CardContent>


                    <Typography variant='h6'>{typeForm ? <>Registrar producto</> : <>Modificar producto</>}</Typography>
                    <Formik
                        initialValues={initial}
                        validationSchema={schema}
                        onSubmit={handlerSubmit}
                        enableReinitialize
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            setFieldValue,
                            resetForm
                            /* and other goodies */
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={1}>
                                    <Grid item sm={6} xs={12}>
                                        <TextField
                                            error={Boolean(touched.product_name && errors.product_name)}
                                            helperText={touched.product_name && errors.product_name}
                                            fullWidth
                                            label="Nombre del producto"
                                            margin="normal"
                                            name="product_name"
                                            onBlur={(event) => {
                                                setFieldValue(event.target.name, event.target.value.trim());
                                                handleBlur(event);
                                            }}
                                            onChange={handleChange}
                                            value={values.product_name}
                                            variant="standard"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <TextField
                                            error={Boolean(touched.ref && errors.ref)}
                                            helperText={touched.ref && errors.ref}
                                            fullWidth
                                            label="# referencia"
                                            margin="normal"
                                            name="ref"
                                            onBlur={(event) => {
                                                setFieldValue(event.target.name, event.target.value.trim());
                                                handleBlur(event);
                                            }}
                                            onChange={handleChange}
                                            value={values.ref}
                                            variant="standard"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <TextField
                                            error={Boolean(touched.price && errors.price)}
                                            helperText={touched.price && errors.price}
                                            fullWidth
                                            label="Precio"
                                            margin="normal"
                                            name="price"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                            onBlur={(event) => {
                                                setFieldValue(event.target.name, event.target.value.trim());
                                                handleBlur(event);
                                            }}
                                            onChange={handleChange}
                                            value={values.price}
                                            variant="standard"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item sm={4} xs={12}>
                                        <TextField
                                            error={Boolean(touched.weight && errors.weight)}
                                            helperText={touched.weight && errors.weight}
                                            fullWidth
                                            label="Peso"
                                            margin="normal"
                                            name="weight"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">gr</InputAdornment>,
                                            }}

                                            onBlur={(event) => {
                                                setFieldValue(event.target.name, event.target.value.trim());
                                                handleBlur(event);
                                            }}
                                            onChange={handleChange}
                                            value={values.weight}
                                            variant="standard"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <TextField
                                            error={Boolean(touched.stock && errors.stock)}
                                            helperText={touched.stock && errors.stock}
                                            fullWidth
                                            label="Stock"
                                            margin="normal"
                                            name="stock"
                                            onBlur={(event) => {
                                                setFieldValue(event.target.name, event.target.value.trim());
                                                handleBlur(event);
                                            }}
                                            onChange={handleChange}
                                            value={values.stock}
                                            variant="standard"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <TextField
                                            error={Boolean(touched.category_id && errors.category_id)}
                                            fullWidth
                                            helperText={touched.category_id && errors.category_id}
                                            select
                                            value={values.category_id}
                                            onBlur={(event) => {
                                                setFieldValue(event.target.name, event.target.value.trim());
                                                handleBlur(event);
                                            }}
                                            onChange={handleChange}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            label="Categoria"
                                            name="category_id"
                                            margin="normal"
                                            variant="standard"
                                        >
                                            <option value="" />
                                            <option value="1">
                                                Aliñado
                                            </option>
                                            <option value="2">
                                                Molido
                                            </option>
                                            <option value="3">
                                                Añejo
                                            </option>
                                            {/* {
                                        Object.keys(countriesJson[business.country.name]).sort().map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))
                                    } */}
                                        </TextField>
                                    </Grid>
                                    <Grid item sm={12} xs={12}>
                                        <Button fullWidth variant="contained" color="success" type="submit" disabled={isSubmitting}>
                                            {typeForm ? <>Registrar</> : <>Modificar</>}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </CardContent>

            </Card>
        </Box >
    )
};

export default ProductForm;