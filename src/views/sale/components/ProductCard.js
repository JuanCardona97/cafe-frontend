import React, { useContext, useEffect } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Button, Card, CardContent, Box, Typography, Chip } from '@mui/material';
import StoreContext from '../../../context/store/StoreContext'
import Product from '../../../middleware/product';
import AlertContext from '../../../context/alert/AlertContext';
import cafe from '../../../assets/img/cafe.jpg'

export default function ProductCard({ product, setSelectPro }) {
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

    return (

        <Card>
            <CardContent>
                <img src={cafe} width="100%" />
                <div style={{ textAlign: 'center' }}>
                    <Typography variant="body1">{product.product_name}</Typography>
                    <Typography variant="body2">$ {product.price}</Typography>
                    <div style={{ paddingBottom: '10px' }}>
                        <Chip label={"Disponible " + product.stock} color={product.stock <= 5 ? "warning" : "success"} size="small" />

                    </div>
                    <Button variant="contained" size="small" onClick={() => setSelectPro({ ...product, qty: 1 })}>Añadir</Button>
                </div>

            </CardContent>
        </Card>

    );
}
