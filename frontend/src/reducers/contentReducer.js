const initialState = { transactionUrl: "", postUrl: ""}

export const contentType = (state = initialState, action) => {
    switch (action.type) {
        case "OWNER":
            return {...state, transactionUrl: "/api/v1/owner/transaction-list?role=OWNER"};
        case "SUPER_ADMIN":
            return {...state, transactionUrl: "/api/v1/owner/transaction-list?role=SUPER_ADMIN",
                postUrl:'/api/v1/owner/user'};
        case "ADMIN":
            return {...state, transactionUrl: "/api/v1/owner/transaction-list?role=ADMIN",
                postUrl:'/api/v1/super-admin/user'};
        case "CASHIER":
            return {...state, transactionUrl: "/api/v1/owner/transaction-list?role=CASHIER",
                postUrl:'/api/v1/admin/user'};
        case "USER":
            return {...state, transactionUrl: "/api/v1/owner/transaction-list?role=USER",
                postUrl:'/api/v1/cashier/user'};
        default:
            return state
    }
}

export const ownerContentType = () => ({type: "OWNER"});
export const superadminContentType = () => ({type: "SUPER_ADMIN"});
export const adminContentType = () => ({type: "ADMIN"});
export const cashierContentType = () => ({type: "CASHIER"});
export const userContentType = () => ({type: "USER"});