import { CLOSE_ALERT, OPEN_ALERT } from '../types'


const openAlert = ({ message, variant, severity, }, state) => {
    return {
        ...state, open: true, message, variant, severity,
    };
};

const closeAlert = (alertOpen, state) => {
    return { ...state, open: alertOpen };
};

export default (state, action) => {
    const { payload, type } = action;
    switch (type) {
        case OPEN_ALERT:
            return openAlert(payload, state);
        case CLOSE_ALERT:
            return closeAlert(payload, state);
        default:
            return state;
    }
};