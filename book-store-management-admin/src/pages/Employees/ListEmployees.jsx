import React from 'react'
import DatatableEmployee from '../../components/datatable/datatableEmployee/DatatableEmployee'


const ListEmployees = () => {
  return (
    <div className='m-2 md:m-5 mt-20 p-2 md:p-8 bg-white rounded-xl h-screen'>   
        <DatatableEmployee/>
    </div>
  )
}

export default ListEmployees