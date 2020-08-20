export const columns = {
    admin: [
        {title: 'ID', name: 'id'},
        {title: 'LOGIN', name: 'login'},
        {title: 'NAME', name: 'name'},
        {title: 'SURNAME', name: 'surname'},
        {title: 'CITY', name: 'city'},
        {title: 'ROLE', name: 'role'},
        {title: 'BALANCE', name: 'balance'},
    ],
    superAdmin: [
        {title: 'ID', name: 'id'},
        {title: 'LOGIN', name: 'login'},
        {title: 'NAME', name: 'name'},
        {title: 'SURNAME', name: 'surname'},
        {title: 'SUPERADMIN', name: 'superadmin_id'},
        {title: 'CITY', name: 'city'},
        {title: 'ADMIN ROLE', name: 'role'},
        {title: 'BALANCE', name: 'balance'},
    ],
    cashiers: [
        { title: 'ID', name: 'id' },
        { title: 'LOGIN', name: 'login' },
        { title: 'CASHIER ADDRESS', name: 'address' },
        { title: 'NAME', name: 'name' },
        { title: 'SURNAME', name: 'surname' },
        { title: 'BALANCE', name: 'balance' },
    ],
    users: [
        { title: 'Id', name: 'id' },
        { title: 'Remote Email', name: 'email' },
        { title: 'Login', name: 'login' },
        { title: 'Name', name: 'name' },
        { title: 'Surname', name: 'surname' },
        { title: 'Currency', name: 'currency' },
        { title: 'Balance', name: 'balance' }
    ],
    transactions: [
        {title: 'PAYMENT SENDER', name: 'senderName'},
        {title: 'PAYMENT RECEIVER', name: 'receiverName'},
        {title: 'AMOUNT', name: 'amount'},
        {title: 'OLD BALANCE', name: 'oldBalance'},
        {title: 'NEW BALANCE', name: 'newBalance'},
        {title: 'DATA', name: 'created'}
    ]
};