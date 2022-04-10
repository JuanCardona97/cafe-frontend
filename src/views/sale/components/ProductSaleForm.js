import React, { useState, useContext, useEffect } from 'react';
import { Formik } from 'formik';
import { Button, TextField, Grid, Typography, InputAdornment, Card, CardContent } from '@mui/material'
import { Box } from '@mui/system';
import * as Yup from 'yup';
import StoreContext from '../../../context/store/StoreContext'
import Product from '../../../middleware/product';
import Sale from '../../../middleware/sale';
import AlertContext from '../../../context/alert/AlertContext';


const ProductSaleForm = ({ selectPro, }) => {

    const { openAlert } = useContext(AlertContext);
    const { addProduct, updateProduct } = useContext(StoreContext);

    const initialValues = {
        product_name: '',
        qty: '',
    };

    const [initial, setInitial] = useState(initialValues);

    const schema = Yup.object().shape({
        product_name:
            Yup.string().max(255).required('El nombre es requerido'),

        qty:
            Yup.number().required('La cantidad es requerido'),
    });

    useEffect(() => {
        setInitial(selectPro);
    }, [selectPro]);


    const handlerSubmit = async (input, { resetForm }) => {
        try {
            const res = await Sale.create({
                "product_id": input.id,
                "qty": input.qty,
                "total": input.qty * input.price
            });
            if (res == 207) {
                openAlert({
                    message: "No hay Stock para tal venta",
                    variant: 'filled',
                    severity: 'warning',
                });
                resetForm();
            } else {
                updateProduct(res);
                openAlert({
                    message: "Producto vendido con exito",
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
        <Box pb={2}>
            <Card>
                <CardContent>
                    <Typography variant='h6'>Registrar Venta</Typography>
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

                                    <Grid item sm={12} xs={12}>
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
                                            disabled
                                        />
                                    </Grid>

                                    <Grid item sm={12} xs={12}>
                                        <TextField
                                            error={Boolean(touched.qty && errors.qty)}
                                            helperText={touched.qty && errors.qty}
                                            fullWidth
                                            label="Cantidad"
                                            margin="normal"
                                            name="qty"
                                            onBlur={(event) => {
                                                setFieldValue(event.target.name, event.target.value.trim());
                                                handleBlur(event);
                                            }}
                                            onChange={handleChange}
                                            value={values.qty}
                                            variant="standard"
                                            size="small"
                                        />
                                    </Grid>

                                    <Grid item sm={12} xs={12}>
                                        <Typography variant="h6">
                                            Resumen
                                        </Typography>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2">Referencia :</Typography>
                                            <Typography variant="body2">{selectPro.ref}</Typography>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2">Producto:</Typography>
                                            <Typography variant="body2">{selectPro.product_name}</Typography>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2">Peso:</Typography>
                                            <Typography variant="body2">{selectPro.weight} gr</Typography>
                                        </div>


                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="subtitle1">
                                                Total
                                            </Typography>
                                            <Typography variant="body1">$ {selectPro.length !== 0 ? selectPro.price * values.qty : 0}</Typography>
                                        </div>



                                    </Grid>


                                    <Grid item sm={12} xs={12}>
                                        <Button fullWidth variant="contained" color="success" type="submit" disabled={isSubmitting}>
                                            Registrar
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

export default ProductSaleForm;