import React from 'react'
import OrderTable from '../../components/datatable/orderTable/OrderTable'


const ListOrders = () => {
  return (
    <div className='m-2 md:m-5 mt-20 p-2 md:p-8 bg-white rounded-xl h-screen'>
        <OrderTable/>
    </div>
  )
}

export default ListOrders