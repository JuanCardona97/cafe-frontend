import Product from '../../middleware/product';
import { ADD_SALES, ADD_PRODUCTS, ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from '../types'



const addProducts = (products, state) => {
    return {
        ...state, products
    };
};
const addSales = (sales, state) => {
    return {
        ...state, sales
    };
};

const addProduct = (product, state) => {
    return {
        ...state, products: state.products.concat(product)
    };
};

const updateProduct = (product, state) => {
    const updatedProducts = [...state.products];
    const updatedItemIndex = updatedProducts.findIndex(
        item => item.id === product.id
    );
    console.log(product)
    updatedProducts[updatedItemIndex] = product;

    return { ...state, products: updatedProducts };
}


const deleteProduct = (productId, state) => {
    const updatedProducts = [...state.products];
    const updatedItemIndex = updatedProducts.findIndex(item => item.id === productId);
    updatedProducts.splice(updatedItemIndex, 1);
    return { ...state, products: updatedProducts };
}


export default (state, action) => {
    const { payload, type } = action;
    switch (type) {
        case DELETE_PRODUCT:
            return deleteProduct(payload, state);
        case ADD_PRODUCTS:
            return addProducts(payload, state);
        case ADD_PRODUCT:
            return addProduct(payload, state);
        case UPDATE_PRODUCT:
            return updateProduct(payload, state);
        case ADD_SALES:
            return addSales(payload, state);
        default:
            return state;
    }
};