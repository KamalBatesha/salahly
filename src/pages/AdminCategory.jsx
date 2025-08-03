import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function AdminCategory() {
    const [category, setCategory] = useState([])

    function getCategories() {
                axios.get('http://localhost:3000/category').then(res => {
            setCategory(res.data)
            console.log(res.data);
            
        }).catch(err => {
            console.log(err)
            toast.error("هناك مشكله جرب في وقت اخر")
        })
    }

    useEffect(() => {
        getCategories()
    }, [])
  return (
    <div>AdminCategory</div>
  )
}

export default AdminCategory