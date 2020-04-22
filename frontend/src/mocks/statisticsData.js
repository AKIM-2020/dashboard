export const statisticsData = {
    title: "Admin Statistics",
    columns: [
        { title: 'Id', field: 'id' },
        { title: 'Admin\'s Id', field: 'admin_id' },
        { title: 'Super Admin\'s Id', field: 'super_admin_id' },
        { title: 'Admin Name', field: 'admin_name' },
        { title: 'Super Admin -> Admin', field: 'sa_to_admin' },
        { title: 'Admin -> Super Admin', field: 'admin_to_sa' },
        { title: 'Total', field: 'total' },
    ],
    data : [
        { id: 0, admin_id: 'anykey', super_admin_id: '', admin_name: '', sa_to_admin: '', admin_to_sa: '001', total: 'ADMIN' },
        { id: 0, admin_id: 'anykey', super_admin_id: '', admin_name: '', sa_to_admin: '', admin_to_sa: '001', total: 'ADMIN' },
        { id: 0, admin_id: 'anykey', super_admin_id: '', admin_name: '', sa_to_admin: '', admin_to_sa: '001', total: 'ADMIN' },
        { id: 0, admin_id: 'anykey', super_admin_id: '', admin_name: '', sa_to_admin: '', admin_to_sa: '001', total: 'ADMIN' },
    ]
}