import React from 'react'

const ListItems = ({list,handleDelete}) => {
  return (
    <div className='flex flex-col items-center'>
      <ul className='flex flex-wrap max-w-sm'>
       {
        list.map(items=>(
          <li className='px-3 border border-white p-2 m-1 overflow-auto flex justify-between' key={items._id}><p>{items.title}</p> <i className="fa-solid fa-pen-to-square w-8 mx-2 text-end"></i> <i className="fa-solid fa-trash w-8 mx-2 text-end" onClick={()=>handleDelete(items._id)}></i>  </li>
        ))
       }
      </ul>
    </div>
  )
}

export default ListItems
