import React, { useEffect, useContext, useState } from 'react'
import Box from '@mui/material/Box';
import ProductPanel from './components/ProductPanel';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

import Typography from '@mui/material/Typography';
import Product from '../../middleware/product/index'
import ProductSaleForm from './components/ProductSaleForm';
import StoreContext from '../../context/store/StoreContext';



function SaleView() {
    const { addProducts } = useContext(StoreContext);
    const [selectPro, setSelectPro] = useState([]);


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
                <Typography variant="h5" >Facturación</Typography>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={7}>
                    <ProductPanel setSelectPro={setSelectPro} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <ProductSaleForm selectPro={selectPro} />
                </Grid>

            </Grid>

        </Box>
    )
}

export default SaleView