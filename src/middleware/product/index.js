import serverRequests from '../axios-server';

const Product = {

    create: (product) => serverRequests.post('/product/', product),
    getAll: () => serverRequests.get('/product'),
    delete: (id) => serverRequests.del(`/product/${id}`),
    update: (product) => serverRequests.put(`/product/${product.id}`, product),
};

export default Product;
