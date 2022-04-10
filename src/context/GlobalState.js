import react, { useEffect, useReducer, useState, useRef } from 'react'
import AlertReducer from './alert/alertReducer'
import AlertContext from './alert/AlertContext'
import storeReducer from './store/storeReducer'
import StoreContext from './store/StoreContext'
import { alertInitialState } from './alert/alertInitialState'
import { storeInitialState } from './store/storeInitialState'
import { ADD_SALES, OPEN_ALERT, CLOSE_ALERT, ADD_PRODUCTS, DELETE_PRODUCT, ADD_PRODUCT, UPDATE_PRODUCT } from './types'


const GlobalState = (props) => {

    const [alertState, alertDispatch] = useReducer(AlertReducer, alertInitialState);
    const [storeState, storeDispatch] = useReducer(storeReducer, storeInitialState);

    //Products
    const addProducts = (products) => {
        storeDispatch({ type: ADD_PRODUCTS, payload: products });
    };
    const addProduct = (product) => {
        storeDispatch({ type: ADD_PRODUCT, payload: product });
    };
    const deleteProduct = (productId) => {
        storeDispatch({ type: DELETE_PRODUCT, payload: productId });
    };
    const updateProduct = (product) => {
        storeDispatch({ type: UPDATE_PRODUCT, payload: product });
    };

    //Sales

    const addSales = (sales) => {
        storeDispatch({ type: ADD_SALES, payload: sales });
    };

    //Alert
    const openAlert = ({ message, variant, severity }) => {
        alertDispatch({ type: OPEN_ALERT, payload: { message, variant, severity } });
    };
    const closeAlert = () => {
        alertDispatch({ type: CLOSE_ALERT, payload: false });
    };




    return (
        <AlertContext.Provider
            value={{
                open: alertState.open,
                message: alertState.message,
                variant: alertState.variant,
                severity: alertState.severity,
                closeAlert,
                openAlert,
            }}>
            <StoreContext.Provider value={{
                products: storeState.products,
                sales: storeState.sales,
                addSales,
                addProducts,
                addProduct,
                deleteProduct,
                updateProduct
            }}>
                {props.children}
            </StoreContext.Provider>
        </AlertContext.Provider>
    )
}

export default GlobalState;