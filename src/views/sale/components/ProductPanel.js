import React, { useContext, useEffect } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Button, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import StoreContext from '../../../context/store/StoreContext'
import Product from '../../../middleware/product';
import AlertContext from '../../../context/alert/AlertContext';
import ProductCard from './ProductCard';

export default function ProductPanel({ setSelectPro }) {
    const { openAlert } = useContext(AlertContext);
    const { products, deleteProduct } = useContext(StoreContext);

    const deleteProducto = async (id) => {
        try {
            const res = await Product.delete(id);
            console.log(res)
            deleteProduct(id);
            openAlert({
                message: "Producto eliminado con exito",
                variant: 'filled',
                severity: 'success',
            });
        }
        catch (error) {
            console.log(error)
        }

    };

    const updateProducto = async (product) => {
        try {
            setSelectPro(product)

        }
        catch (error) {
            console.log(error)
        }

    };

    return (
        <Grid container spacing={2} >

            {products.map(pro =>
                <Grid item sm={3} xs={12}>
                    <ProductCard key={pro.id} product={pro} setSelectPro={setSelectPro} />
                </Grid>)}
        </Grid >
    );
}
