import React, { useEffect, useContext, useState } from 'react'
import Box from '@mui/material/Box';
import ProductTable from './components/ProductTable';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

import Typography from '@mui/material/Typography';
import Product from '../../middleware/product/index'
import ProductForm from './components/ProductForm';
import StoreContext from '../../context/store/StoreContext';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';


function ProductView() {
    const { addProducts } = useContext(StoreContext);
    const [updatePro, setUpdatePro] = useState([]);
    const [typeForm, setTypeForm] = useState(true);


    useEffect(() => {
        async function fetchData() {
            try {
                const res = await Product.getAll();
                addProducts(res);
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, []);

    return (
        <Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', }}>
                <Typography variant="h5" >Productos</Typography>
                <Button size="large" variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setTypeForm(true)}>
                    Añadir
                </Button>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={7}>
                    <ProductTable setUpdatePro={setUpdatePro} setTypeForm={setTypeForm} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <ProductForm updatePro={updatePro} typeForm={typeForm} setTypeForm={setTypeForm} />
                </Grid>

            </Grid>

        </Box>
    )
}

export default ProductView