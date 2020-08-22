const initialState = { balance: null };

export const balanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGED":
            return {...state, balance: action.balance};
        default:
            return state
    }
};

export const changeBalance = (balance) => ({type: "CHANGED", balance});
