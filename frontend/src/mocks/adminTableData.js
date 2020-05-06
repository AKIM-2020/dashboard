export const adminData = {
    title: "Administrators",
    columns: [
        { title: 'ID', name: 'id' },
        { title: 'LOGIN', name: 'login' },
        { title: 'NAME', name: 'name' },
        { title: 'SURNAME', name: 'surname' },
        { title: 'SUPERADMIN', name: 'superadmin_id' },
        { title: 'CITY', name: 'city' },
        { title: 'ADMIN ROLE', name: 'role' },
        { title: 'BALANCE', name: 'balance' },
    ],
    data : [
        { id: 0, login: 'anykey', name: '', surname: '', superadmin_id: '001', city: 'Gotham', role: 'ADMIN', balance: '900' },
        { id: 1, login: 'kaka', name: '', surname: '', superadmin_id: '002', city: 'Perm', role: 'SUPERADMIN', balance: '1900' },
        { id: 2, login: 'dudud', name: '', surname: '', superadmin_id: '003', city: 'Saran', role: 'ADMIN', balance: '90' },
        { id: 3, login: 'hoho', name: '', surname: '', superadmin_id: '004', city: 'Tomsk', role: 'ADMIN', balance: '800' },
    ]
};
