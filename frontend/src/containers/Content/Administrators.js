import React from "react";
import { api } from "../../helpers";
import AdminsTable from "./Tables/AdminsTable";
import {authenticationService} from "../../service";
import StatisticsTable from "./Tables/StatisticsTable";

const Administrators = () => {
    const tableDataUrl = "/api/v1/owner/ADMIN/user-list";
    const postUrl = '/api/v1/owner/user';

    const editingProps = {
        getData: (setRows, setError) => api.get(tableDataUrl).then(
            response => { setRows(response.data) },
            error => { setError(error) }
        ),
        addRow: (transferData) => api.post(postUrl, {...transferData}, {
            headers: {
                'Authorization': `${authenticationService.currentToken}`
            }
        }),
        deleteRow: (rowId) => api.delete(postUrl + `/${rowId}`, {
            headers: {
                'Authorization': `${authenticationService.currentToken}`
            }
        }),
        editRow: (transferData, rowId) => api.put(postUrl + `/${rowId}`, {...transferData}, {
            headers: {
                'Authorization': `${authenticationService.currentToken}`
            }
        }),
    }

    return <StatisticsTable columns={ columns } getFunc={ editingProps }/>
};

const columns = [
    { title: 'ID', name: 'id' },
    { title: 'LOGIN', name: 'login' },
    { title: 'NAME', name: 'name' },
    { title: 'SURNAME', name: 'surname' },
    { title: 'CITY', name: 'city' },
    { title: 'ROLE', name: 'role' },
    { title: 'BALANCE', name: 'balance' },
];

export default Administrators;