import {
    Route, Routes, Navigate,
} from 'react-router-dom';
import ProductView from '../src/views/product/index';
import SaleView from '../src/views/sale/index'
import ReportView from '../src/views/report/index'
import Layout from './layouts/index'

//import Program from './views/program';

const PublicRoutes = () => (

    <Layout >
        <Routes>
            <Route exath path="/" element={<Navigate to="/productos" />} />
            <Route path="/productos" element={<ProductView />} />
            <Route path="/ventas" element={<SaleView />} />
            <Route path="/reportes" element={<ReportView />} />
        </Routes>
    </Layout>



);

export default function Router() {

    return (
        <PublicRoutes />
    );


}