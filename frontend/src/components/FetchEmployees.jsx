import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

function FetchEmployees({ employeData, fetchEmployees }) {
        let url = import.meta.env.VITE_BACKEND_URL
    const [empId, setEmpId] = useState("")
    const [inputValues, setInputValues] = useState({
        name: "",
        email: "",
        mobile: ""
    })
    //handledelte
    async function handleDelete(id) {
        console.log(id)
        try {
            let response = await fetch(`${url}/employe/api/delete/${id}`, {
                method: 'DELETE'
            })
            let data = await response.json()
            if (response.status === 200) {
                alert(data.message)
                fetchEmployees()
            }
        } catch (e) {
            console.error(e.message)
        }
    }

    //handleUpdate
    async function handleUpdate(id) {
        console.log(id)
        try {
            let response = await fetch(`http://localhost:2025/employe/api/update/${id}`,{
                method:'PUT',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(inputValues)
            })
            let data = await response.json()
            console.log(data)
            if(response.status === 200){
                alert(data.message)
                fetchEmployees()
                setEmpId(null)
            }
        } catch (e) {
            console.error(e.message)
        }
    }

    //handleGetId
    function handleGetId(item) {
        try {
            setInputValues(prev => ({ ...prev, name: item.name, email: item.email, mobile: item.mobile }))
            setEmpId(item._id)
        } catch (e) {
            console.log(e.message)
        }
    }
    //handleCancel
    function handleCancel() {
        setEmpId(null)
    }
    //handle input change
    function handleInputChange(e) {
        try {
            let { name, value } = e.target
        const modifyValues = name === 'mobile' ? value.replace(/\D/g, "").replace(/^[0-5]/, "") : value;
        setInputValues((prev) => { return { ...prev, [name]: modifyValues } })

        } catch (e) {
            console.error(e.message)
        }
    }

    return (
        <>
        <h1 className='text-4xl mt-10 text-center font-bold tracking-widest'>Employees Data</h1>
        <div className='flex justify-center my-10'>
            {employeData.length<=0 && <p className='text-3xl'>No Data Available</p>}
            {employeData.length > 0 && 
            <table className='border'>
                <thead>
                    <tr>
                        <th className='border p-3 bg-indigo-300'>name</th>
                        <th className='border p-3 bg-indigo-300'>email</th>
                        <th className='border p-3 bg-indigo-300'>mobile</th>
                        <th className='border p-3 bg-indigo-300'>Update</th>
                        <th className='border p-3 bg-indigo-300'>Delete</th>
                    </tr>
                </thead>
                <tbody>

                    {employeData.map(item => (
                        <tr key={item._id}>
                            <td className='border p-2 bg-amber-50'>{item._id == empId ? <input type='text' name="name" value={inputValues.name} placeholder='Full Name' onChange={handleInputChange} className="border-2 px-1 py-2 rounded w-full outline-indigo-500 border-pink-400 mt-2" /> : item.name}</td>
                            <td className='border p-2 bg-amber-50'>{item._id == empId ? <input type='email' name="email" value={inputValues.email} placeholder='Email' onChange={handleInputChange} className="border-2 px-1 py-2 rounded w-full outline-indigo-500 border-pink-400 mt-2" /> : item.email}</td>
                            <td className='border p-2 bg-amber-50'>{item._id == empId ? <input type='text' name='mobile' value={inputValues.mobile} placeholder='Mobile Number' onChange={handleInputChange} maxLength={10} className="border-2 px-1 py-2 rounded w-full outline-indigo-500 border-pink-400 mt-2" /> : item.mobile}</td>
                            <td className='border p-3 bg-amber-50'>
                                {item._id == empId ?
                                    <div className='flex justify-between'>
                                        <button className='border-2 px-2  py-1 mx-2 bg-indigo-600 border-indigo-400 text-white cursor-pointer active:scale-75 transition-transform duration-75' onClick={() => handleUpdate(item._id)}>save</button>
                                        <button className='border-2 px-2  py-1 mx-2 bg-green-600 border-green-400 text-white cursor-pointer active:scale-75 transition-transform duration-75' onClick={handleCancel} >cancel</button>
                                    </div>
                                    : <button className='border-2 px-2  py-1 mx-2 bg-green-600 border-green-400 text-white cursor-pointer active:scale-75 transition-transform duration-75' onClick={() => handleGetId(item)}>update</button>}
                                    </td>
                                    <td className='border p-3 bg-amber-50'>
                                <button className='border-2 px-2 py-1  mx-2 bg-red-700 text-white cursor-pointer active:scale-75 transition-transform duration-75' onClick={() => handleDelete(item._id)}>delete</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            // :<div className='text-3xl animate-spin border-6 border-gray-500 rounded-full h-[50px] w-[50px] border-t-indigo-800'></div>
}


        </div>
        </>
    )
}

export default FetchEmployees
