import React, { useEffect, useContext, useState } from 'react'
import Box from '@mui/material/Box';
import ReportTable from './components/ReportTable';
import Grid from '@mui/material/Grid';
import { Button, CardContent, Card, } from '@mui/material';

import Typography from '@mui/material/Typography';
import Sale from '../../middleware/sale/index'
import StoreContext from '../../context/store/StoreContext';



function ReportView() {
    const { addSales } = useContext(StoreContext);
    const [selectPro, setSelectPro] = useState([]);


    useEffect(() => {
        async function fetchData() {
            try {
                const res = await Sale.getAll();
                addSales(res);
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
                <Typography variant="h5" >Reporte</Typography>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={8}>
                    <ReportTable setSelectPro={setSelectPro} />
                </Grid>
                {/* <Grid item xs={12} sm={4}>
                    <Grid pb={3} item xs={12} sm={12}>
                        <Card>
                            <CardContent>
                                holaa
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <Card>
                            <CardContent>
                                holaa
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid> */}
            </Grid>

        </Box>
    )
}

export default ReportView