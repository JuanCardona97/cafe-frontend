import React, { useContext, useEffect } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import StoreContext from '../../../context/store/StoreContext'
import Product from '../../../middleware/product';
import AlertContext from '../../../context/alert/AlertContext';

export default function ProductTable({ setUpdatePro, setTypeForm }) {
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
            setUpdatePro(product)
            setTypeForm(false)
        }
        catch (error) {
            console.log(error)
        }

    };



    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'product_name', headerName: 'Producto', width: 130 },
        { field: 'ref', headerName: 'Referencia', width: 130 },
        { field: 'price', headerName: 'Precio', type: 'number', width: 90 },
        {
            field: 'weight', headerName: 'Peso gr', type: 'number', width: 80,
        },
        {
            field: 'stock', headerName: 'Stock', type: 'number', width: 80,
        },
        {
            field: 'category_id', headerName: 'Categoria', type: 'number', width: 80,
        },
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Actualizar"
                    onClick={() => updateProducto(params.row)

                    }
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Eliminar"
                    onClick={() => deleteProducto(params.id)}
                />,

            ],
        },

    ];
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={products}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </div>
    );
}
