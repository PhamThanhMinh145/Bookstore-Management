//temporary data
export const  employeeColums = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: "username", headerName: "Name", width:240, renderCell: (params)=> {
        return (
            <div className="cellWithImg">
                <img className="img" src={params.row.img} alt="avatar" />
                {params.row.username}
            </div>
        )
        }
    },
    {
        field: "email" , headerName: "Email", width: 240
    },
    {
        field: "age" , headerName: "Age", width: 100
    },

    {
        field: "status" , headerName: "Status", width: 160,
        renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.status}`}>{params.row.status}</div>
            )
        }
    },

];


export const employeeRows = [
    {
      id: 1,
      username: "Snow",
      img: "http://www.upviet.com.vn/uploaded/tailieu/Sach-hay/khong-gia-dinh.png",
      status: "active",
      email: "1snow@gmail.com",
      age: 35,
    },
    {
      id: 2,
      username: "Jamie Lannister",
      img: "http://www.upviet.com.vn/uploaded/tailieu/Sach-hay/khong-gia-dinh.png",
      email: "2snow@gmail.com",
      status: "passive",
      age: 42,
    },
    {
      id: 3,
      username: "Lannister",
      img: "http://www.upviet.com.vn/uploaded/tailieu/Sach-hay/khong-gia-dinh.png",
      email: "3snow@gmail.com",
      status: "active",
      age: 45,
    },
    {
      id: 4,
      username: "Stark",
      img: "http://www.upviet.com.vn/uploaded/tailieu/Sach-hay/khong-gia-dinh.png",
      email: "4snow@gmail.com",
      status: "active",
      age: 16,
    },
    {
      id: 5,
      username: "Targaryen",
      img: "http://www.upviet.com.vn/uploaded/tailieu/Sach-hay/khong-gia-dinh.png",
      email: "5snow@gmail.com",
      status: "passive",
      age: 22,
    },
    {
      id: 6,
      username: "Melisandre",
      img: "http://www.upviet.com.vn/uploaded/tailieu/Sach-hay/khong-gia-dinh.png",
      email: "6snow@gmail.com",
      status: "active",
      age: 15,
    },
    {
      id: 7,
      username: "Clifford",
      img: "http://www.upviet.com.vn/uploaded/tailieu/Sach-hay/khong-gia-dinh.png",
      email: "7snow@gmail.com",
      status: "passive",
      age: 44,
    },
    {
      id: 8,
      username: "Frances",
      img: "http://www.upviet.com.vn/uploaded/tailieu/Sach-hay/khong-gia-dinh.png",
      email: "8snow@gmail.com",
      status: "active",
      age: 36,
    },
    {
      id: 9,
      username: "Roxie",
      img: "http://www.upviet.com.vn/uploaded/tailieu/Sach-hay/khong-gia-dinh.png",
      email: "snow@gmail.com",
      status: "passive",
      age: 65,
    },
    {
      id: 10,
      username: "Roxie",
      img: "http://www.upviet.com.vn/uploaded/tailieu/Sach-hay/khong-gia-dinh.png",
      email: "snow@gmail.com",
      status: "active",
      age: 65,
    },
  ];


  export const  bookColums = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: "bookname", headerName: "Book name", width:250, renderCell: (params)=> {
        return (
            <div className="cellWithImg">
                <img className="cellImg" src={params.row.img} alt="avatar" />
                {params.row.bookname}
            </div>
        )
        }
    },

    {
      field: "field" , headerName: "Field", width: 200
  },
    {
        field: "quantity" , headerName: "Quantity", width: 240
    },
   

    {
      field: "price" , headerName: "Price", width: 200
    },

];

export const bookRows = [
  {
    id: 1,
    bookname: "Khong gia dinh",
    img: "http://www.upviet.com.vn/uploaded/tailieu/Sach-hay/khong-gia-dinh.png",
    field: "Tam Ly",
    quantity: 200,
    price: 99000,
  },
  {
    id: 2,
    bookname: "Khong gia dinh",
    img: "http://www.upviet.com.vn/uploaded/tailieu/Sach-hay/khong-gia-dinh.png",
    field: "Tam Ly",
    quantity: 200,
    price: 99000,
  },
  {
    id: 3,
    bookname: "Khong gia dinh",
    img: "http://www.upviet.com.vn/uploaded/tailieu/Sach-hay/khong-gia-dinh.png",
    field: "Tam Ly",
    quantity: 200,
    price: 99000,
  },
  {
    id: 4,
    bookname: "Khong gia dinh",
    img: "http://www.upviet.com.vn/uploaded/tailieu/Sach-hay/khong-gia-dinh.png",
    field: "Tam Ly",
    quantity: 200,
    price: 99000,
  },
  {
    id: 5,
    bookname: "Khong gia dinh",
    img: "http://www.upviet.com.vn/uploaded/tailieu/Sach-hay/khong-gia-dinh.png",
    field: "Tam Ly",
    quantity: 200,
    price: 99000,
  },
  {
    id: 6,
    bookname: "Khong gia dinh",
    img: "http://www.upviet.com.vn/uploaded/tailieu/Sach-hay/khong-gia-dinh.png",
    field: "Tam Ly",
    quantity: 200,
    price: 99000,
  },
  {
    id: 6,
    bookname: "Khong gia dinh",
    img: "http://www.upviet.com.vn/uploaded/tailieu/Sach-hay/khong-gia-dinh.png",
    field: "Tam Ly",
    quantity: 200,
    price: 99000,
  }, 
]

export const  authorColums = [
  { field: 'id', headerName: 'Author ID', width: 125, renderCell: (params) => {
    return (
      <div className="cellId">
          <span>
        {params.row.id}
      </span>
      </div>
      
    )
  } },
  { field: "authorName", headerName: "Author Name", width:300},
];


export const authorRows = [
  {
    id: 1,
    authorName: "Snow",
  },
  {
    id: 2,
    authorName: "Jamie Lannister",
    
    
  },
  {
    id: 3,
    authorName: "Lannister",
    
  },
  {
    id: 4,
    authorName: "Stark",
    
  },
  {
    id: 5,
    authorName: "Targaryen",
    
    
  },
  {
    id: 6,
    authorName: "Melisandre",
    
  },
  {
    id: 7,
    authorName: "Clifford",
    
    
  },
  {
    id: 8,
    authorName: "Frances",
    
  },
  {
    id: 9,
    authorName: "Roxie",
    
     
  },
  {
    id: 10,
    authorName: "Roxie",
    
  },
];

//temporary data
export const  publisherColums = [
{ field: 'id', headerName: 'Publisher ID', width: 125, renderCell: (params) => {
  return (
    <div className="cellId">
        <span>
      {params.row.id}
    </span>
    </div>
    
  )
} },
{ field: "publisherName", headerName: "Publisher Name", width:400, renderCell: (params)=> {
    return (
        <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            <span>
            {params.row.publisherName}
            </span>
            
        </div>
    )
    }
},


];


export const publisherRows = [
{
  id: 1,
  publisherName: "Kim Đồng",
  
},
{
  id: 2,
  publisherName: "Nhà Xuất Bản Trẻ",
  
},
{
  id: 3,
  publisherName: "Hội Nhà Văn",
  
},
{
  id: 4,
  publisherName: "Lao Động",
  
},
{
  id: 5,
  publisherName: "Wiley",
  
  
},
{
  id: 6,
  publisherName: "Springer Nature",
  
},
{
  id: 7,
  publisherName: "Cambridge",
  
  
},
{
  id: 8,
  publisherName: "Frances",
  
},
{
  id: 9,
  publisherName: "Pearson",
  
   
},
{
  id: 10,
  publisherName: "Bertelsmann",
  
},
];

export const  fieldColums = [
{ field: 'id', headerName: 'Field ID', width: 125, renderCell: (params) => {
  return (
    <div className="cellId">
        <span>
      {params.row.id}
    </span>
    </div>
    
  )
} 
},
{ field: "fieldName", headerName: "Field Name", width:400, renderCell: (params)=> {
    return (
        <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            <span>
            {params.row.fieldName}
            </span>
            
        </div>
    )
    }
},
{
  field: "description" , headerName: "Field Description", width: 240, renderCell: (params) => {
    return (
      <div className="cellDes">
          <span>
        {params.row.description}
      </span>
      </div>
      
    )
  }
},


];


export const fieldRows = [
{
  id: 1,
  fieldName: "Kim Đồng",
  
  description: "Cools",

},
{
  id: 2,
  fieldName: "Nhà Xuất Bản Trẻ",
  
  description: "Cools",
},
{
  id: 3,
  fieldName: "Hội Nhà Văn",
  
  description: "Cools",
},
{
  id: 4,
  fieldName: "Lao Động",
  
  description: "Cools",
},
{
  id: 5,
  fieldName: "Wiley",
  
  description: "Cools",
  
},
{
  id: 6,
  fieldName: "Springer Nature",
  
  description: "Cools",
},
{
  id: 7,
  fieldName: "Cambridge",
  
  description: "Cools",
  
},
{
  id: 8,
  fieldName: "Frances",
  
  description: "Cools",
},
{
  id: 9,
  fieldName: "Pearson",
  
  description: "Cools",
   
},
{
  id: 10,
  fieldName: "Bertelsmann",
  
  description: "Cools",
},
];

export const  orderColums = [
  { field: 'id', headerName: 'Order ID', width: 80 },
  { field: "username", headerName: "Customer Name", width:240},
  
  {
      field: "dateorder" , headerName: "Date Of Order", width: 240
  },
  {
      field: "totalprice" , headerName: "Total Price", width: 100
  },

  {
      field: "status" , headerName: "Status", width: 160,
      renderCell: (params) => {
          return (
              <div className={`cellWithStatus ${params.row.status}`}>{params.row.status}</div>
          )
      }
  },

];


export const orderRows = [
  {
    id: 1,
    username: "Snow",
    dateorder: "14/10/2022",
    totalprice: 35,
    status: "active",


  },
  {
    id: 2,
    username: "Jamie Lannister",
    dateorder: "14/10/2022",
    totalprice: 35,
    status: "pending",
  },
  {
    id: 3,
    username: "Lannister",
    dateorder: "14/10/2022",
    totalprice: 35,
    status: "active",
  },
  {
    id: 4,
    username: "Stark",
    dateorder: "14/10/2022",
    totalprice: 35,
    status: "pending",
  },
  {
    id: 5,
    username: "Targaryen",
    dateorder: "14/10/2022",
    totalprice: 35,
    status: "active",
  },
  {
    id: 6,
    username: "Melisandre",
    dateorder: "14/10/2022",
    totalprice: 35,
    status: "active",
  },
  {
    id: 7,
    username: "Clifford",
    dateorder: "14/10/2022",
    totalprice: 35,
    status: "deny",
  },
  {
    id: 8,
    username: "Frances",
    dateorder: "14/10/2022",
    totalprice: 35,
    status: "active",
  },
  {
    id: 9,
    username: "Roxie",
    dateorder: "14/10/2022",
    totalprice: 35,
    status: "active",
  },
  {
    id: 10,
    username: "Roxie",
    dateorder: "14/10/2022",
    totalprice: 35,
    status: "deny",
  },
];
