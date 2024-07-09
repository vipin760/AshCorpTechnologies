import React, { useState } from 'react'
import ListItems from '../../partials/ListItems/ListItems'
import axios from 'axios'
import { TASK_URI } from '../../../api';
import { toast } from 'react-toastify';

const Home = () => {
    const [title,setTitle] = useState("");
    const [list, setList ] = useState([])
    const [error,setError] = useState("")
    const [showEdit,setShowEdit] = useState(false)
    const [formData, setFormData] = useState()

    useState(()=>{
        const fetchTask = async() =>{
            try {
               await axios.get(TASK_URI).then((res)=>{
                setList(res.data.data)
                })
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
        fetchTask()
    },[])

    useState(()=>{
        if(list.length<=0){
            setTitle('')
        }
    },[list])
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
        const data = { title: title}
        if(!title.trim()){
            setError("please enter task")
        }else{
            await axios.post(TASK_URI,data).then((res)=>{
                setTitle("")
                setList((preList)=>[...preList,res.data.data])
                })
        }
        } catch (error) {
            setTitle("")
            toast.error(error.response.data.message)
        }
}
const handleDelete =async(id)=>{
    try {
           await axios.delete(`${TASK_URI}/${id}`).then((res)=>{
            setList(list.filter((data)=> data._id!==id ))
            })
        } catch (error) {
            toast.error(error.response.data.message)
        }
}

const handleEdit =async(data)=>{
    try {
        setShowEdit(true)
        setFormData(data)
        setTitle(data.title)
        } catch (error) {
            toast.error(error.response.data.message)
        }
}

const handleUpdate=async(e)=>{
    e.preventDefault()
    try {
    const data = formData
    data.title = title
    if(!title.trim()){
        setError("please enter task")
    }else{
        await axios.put(TASK_URI,data).then((res)=>{
            setShowEdit(false)
            setTitle("")
            setList(preList=> preList.map(items=>{
                if(items._id===data._id){
                    return { ...items,items:res.data.data }
                }
                return items
            }) )
            })
    }
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

const handleLineThrough =async(data) =>{
    try {
        await axios.patch(TASK_URI,data).then((res)=>{
            setList(preList=> preList.map(items=>{
                if(items._id===data._id){
                    return {...items, completed:res.data.data.completed }
                }
                return items
            }) )
            })
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
const handleSelect = async(e) =>{
    try {
        await axios.get(`${TASK_URI}/select?key=${e.target.value}`).then((res)=>{
            setList(res.data.data)
            })
    } catch (error) {
        toast.error(error.response.data.message)
    }

}

  return (
    <div className='flex items-center justify-center'>      
    <div className='max-w-md my-10 m-3 pb-4 border border-white flex flex-col items-center justify-center'>
        <h1 className='text-center font-bold text-2xl my-3'>TODO</h1>
        <form action="" className='flex p-3 gap-2 max-w-sm'>
            <select name="category" id="" className='w-16 border border-white' onChange={handleSelect}>
            <option value="all">all</option>
                <option value="completed">completed</option>
                <option value="pending">pending</option>
            </select>
        <input type="text" className='bg-white text-black px-2 rounded-md' value={title} onChange={(e)=>{ setError(""),   setTitle(e.target.value)}} />
        {
            showEdit ?(
                <button className='border border-white w-20 p-1 hover:bg-[#444] rounded-md' onClick={handleUpdate}>update</button>
            ):(
                <button className='border border-white w-20 p-1 hover:bg-[#444] rounded-md' onClick={handleSubmit}>Add</button>
            )
        }
        
        </form>
        {
            error.length>3&&(
                <p className='text-center mb-2'>*{error}</p>
            )
        }
        <ListItems list={list} handleDelete={handleDelete} handleEdit={handleEdit} handleLineThrough={handleLineThrough} />
    </div>
    </div>
  )
}

export default Home
