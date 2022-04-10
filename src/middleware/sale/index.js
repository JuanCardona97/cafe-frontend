import serverRequests from '../axios-server';

const Sale = {

    create: (sale) => serverRequests.post('/sale', sale),
    getAll: () => serverRequests.get('/sale'),

};

export default Sale;
