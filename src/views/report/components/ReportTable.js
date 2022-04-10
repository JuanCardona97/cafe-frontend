import React, { useContext, useEffect } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import StoreContext from '../../../context/store/StoreContext'
    ;

export default function ReportTable({ setUpdatePro, setTypeForm }) {

    const { sales } = useContext(StoreContext);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'product_name', headerName: 'Producto', width: 130 },
        { field: 'ref', headerName: 'Referencia', width: 130 },
        { field: 'price', headerName: 'Precio', type: 'number', width: 90 },
        {
            field: 'qty', headerName: 'Cantidad', type: 'number', width: 80,
        },
        {
            field: 'total', headerName: 'Total', type: 'number', width: 80,
        },
        {
            field: 'category_name', headerName: 'Categoria', width: 80,
        },


    ];
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={sales}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </div>
    );
}
