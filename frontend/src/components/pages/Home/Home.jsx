import React, { useState } from 'react'
import ListItems from '../../partials/ListItems/ListItems'
import axios from 'axios'
import { TASK_URI } from '../../../api';

const Home = () => {
    const [title,setTitle] = useState("");
    const [list, setList ] = useState([])
    useState(()=>{
        const fetchTask = async() =>{
            try {
               await axios.get(TASK_URI).then((res)=>{
                setList(res.data.data)
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchTask()
    })

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
        const data = { title: title}
           await axios.post(TASK_URI,data).then((res)=>{
            setList((preList)=>[...preList,res.data.data])
            })
        } catch (error) {
            console.log(error)
        }
}
const handleDelete =async(id)=>{
    try {
        console.log("clicked")
           await axios.delete(`${TASK_URI}/${id}`).then((res)=>{
            setList(list.filter((data)=> data._id!==id ))
            })
        } catch (error) {
            console.log(error)
        }
}
  return (
    <div className='flex items-center justify-center'>      
    <div className='max-w-md my-10 m-3 border border-white flex flex-col items-center justify-center'>
        <h1 className='text-center font-bold text-2xl my-3'>TODO</h1>
        <form action="" className='flex m-2 p-3 gap-2 max-w-sm'>
        <input type="text" className='bg-white text-black px-2 rounded-md' onChange={(e)=>setTitle(e.target.value)} />
        <button className='border border-white w-20 p-1 hover:bg-[#444] rounded-md' onClick={handleSubmit}>Add</button>
        </form>
        <ListItems list={list} handleDelete={handleDelete} />
    </div>
    </div>
  )
}

export default Home
