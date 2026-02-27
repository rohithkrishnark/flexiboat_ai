import React, { useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { Box } from '@mui/joy'

const MasterTable = ({ columnDefs, rowData }) => {

  const defaultColDef = useMemo(() => ({
    flex: 1,
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true
  }), [])

  return (
    <Box
      className="ag-theme-alpine"
      sx={{
        height: 400,
        width: '100%',
        mt: 2
      }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination
        paginationPageSize={10}
      />
    </Box>
  )
}

export default MasterTable