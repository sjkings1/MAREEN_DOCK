import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

// const rows = [
//   {
//     id: 1,
//     username: '@MUI',
//     age: 20,
//   },
// ];

export default function ColumnFluidWidthGrid(props) {

    // let rowData = props.data.map((e)=>{
    //     return { id : e.firstname, username : e.lastname, age : e.gender }
    // })

    // const rows = rowData;

    const rows = props.data.map((e)=> [
        {
          id: e.firstname,
          username: '@MUI',
          age: 20,
        },
      ]);






  return (
    <div style={{ height: 250, width: '100%' }}>
      <DataGrid
        columns={[
          {
            field: 'id',
            flex: 1,
            minWidth: 150,
          },
          {
            field: 'username',
            width: 200,
          },
          {
            field: 'age',
            flex: 0.3,
            minWidth: 50,
          },
        ]}
        rows={rows}
      />
    </div>
  );
}
