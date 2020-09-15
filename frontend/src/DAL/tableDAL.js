import {api} from "../helpers";
import {authenticationService} from "../service";

export const editingProps = (tableDataUrl, postUrl) => {
   return {
       getData: (setRows, setError) => api.get(tableDataUrl
       ).then(
           response => {
               setRows(response.data)
           },
           error => {
               setError(error)
           }
       ),
       addRow: (transferData) => api.post(postUrl, {...transferData}),
       deleteRow: (rowId) => api.delete(postUrl + `/${rowId}`),
       editRow: (transferData, rowId) => api.put(postUrl + `/${rowId}`, {...transferData}),
   }
};