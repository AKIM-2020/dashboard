export const treeData = {
    id: 0,
    parentId: null,
    type: 'sa',
    data: {login: 'Parent', email: 'test@gmail.com', cash: '5000', test: ''},
    children: [
        {
            id: 1,
            parentId: 0,
            type: 'admin',
            data: {login: 'Child - 1', email: 'czxvcxv1@gmail.com', cash: '1', test: ''},
        },
        {
            id: 2,
            parentId: 0,
            type: 'admin',
            data: {login: 'Child - 3', email: 'dds@gmail.com', cash: '0', test: ''},
            children: [
                {
                    id: 3,
                    parentId: 2,
                    type: 'cashier',
                    data: {login: 'Child - 4', email: 'fasdf@gmail.com', cash: '2222    ', test: ''},
                },
            ],
        },
    ],
};