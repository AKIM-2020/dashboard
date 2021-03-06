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
        { title: 'ID', name: 'id' },
        { title: 'LOGIN', name: 'login' },
        { title: 'NAME', name: 'name' },
        { title: 'SURNAME', name: 'surname' },
        { title: 'CURRENCY', name: 'currency' },
        { title: 'BALANCE', name: 'balance' }
    ],
    transactions: [
        {title: 'PAYMENT SENDER', name: 'senderName'},
        {title: 'SENDER ID', name: 'senderId'},
        {title: 'PAYMENT RECEIVER', name: 'receiverName'},
        {title: 'RECEIVER ID', name: 'receiverId'},
        {title: 'AMOUNT', name: 'amount'},
        {title: 'OLD BALANCE', name: 'oldBalance'},
        {title: 'NEW BALANCE', name: 'newBalance'},
        {title: 'DATA', name: 'created'}
    ]
};