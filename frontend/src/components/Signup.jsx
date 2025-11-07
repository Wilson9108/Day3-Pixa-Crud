import { useState, useEffect } from "react"
import FetchEmployees from "./FetchEmployees";
export default function () {
    const [employeData, setEmployeData] = useState([])
    const [inputValues, setInputValues] = useState({
        name: "",
        email: "",
        mobile: ""
    })
    const [inputValuesError, setInputValuesError] = useState({
        nameError: "",
        emailError: "",
        mobileError: ""
    })

    //input change
    function inputChange(e) {
        // console.log(e.target.name)
        let { name, value } = e.target
        const modifyValues = name === 'mobile' ? value.replace(/\D/g, "").replace(/^[0-5]/, "") : value;
        setInputValues((prev) => { return { ...prev, [name]: modifyValues } })
    }
    //handle Validation 
    function handleValidation(e) {
        e.preventDefault()
        if (!inputValues.name) {
            setInputValuesError(prev => ({ ...prev, nameError: "Enter Name" }))
        } else {
            setInputValuesError(prev => ({ ...prev, nameError: "" }))
        }
        if (!inputValues.email) {
            setInputValuesError(prev => ({ ...prev, emailError: "Enter Email" }))
        } else {
            setInputValuesError(prev => ({ ...prev, emailError: "" }))
        }
        if (!inputValues.mobile) {
            setInputValuesError(prev => ({ ...prev, mobileError: "Enter mobile number" }))
            return
        }
        else {
            setInputValuesError(prev => ({ ...prev, mobileError: "" }))
        }
        handleSignup()
    }

    //handle signup 
    async function handleSignup() {
        try {
            let response = await fetch('http://localhost:2025/employe/api/insert', {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(inputValues)
            })
            console.log(response)
            let data = await response.json()
            if (response.status === 200) {
                alert(data.message)
                setInputValues({ name: "", email: "", mobile: "" })
                fetchEmployees()
            } else if (response.status === 409) {
                alert(data.message)
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    //get employees data
    async function fetchEmployees() {
        try {
            let response = await fetch('http://localhost:2025/employe')
            let data = await response.json()
            setEmployeData(data)

        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        fetchEmployees()
    }, [])

    return (
        <>
           

            <div className=" flex justify-center mt-20">
                
                <form onSubmit={handleValidation} className="w-[450px] p-4 bg-amber-50 shadow-xl rounded-2xl" style={{ backdropFilter: '20px' }}>
                     <h1 className="text-3xl text-center mb-3 tracking-widest font-bold">SIGNUP</h1>
                    <div>
                        <input type="text" value={inputValues.name} name="name" placeholder="FullName" onChange={inputChange} className="border-2 w-full mt-2 px-1 py-2 border-pink-400 rounded outline-indigo-500" />
                        <p className="text-red-600">{inputValuesError.nameError}</p>
                    </div>
                    <div>
                        <input type="email" value={inputValues.email} onChange={inputChange} placeholder="Email" className="border-2 px-1 py-2 rounded w-full outline-indigo-500 border-pink-400 mt-2" name="email" />
                        <p className="text-red-600">{inputValuesError.emailError}</p>
                    </div>
                    <div>
                        <input type="text" value={inputValues.mobile} onChange={inputChange} placeholder="Mobile Number" maxLength={10} className="border-2 outline-indigo-500 border-pink-400 w-full mt-2 px-1 py-2 rounded" name="mobile" />
                        <p className="text-red-600">{inputValuesError.mobileError}</p>
                    </div>
                    <button className="border-2 px-1 py-2 rounded bg-indigo-300 mx-auto w-full my-2 border-indigo-400 cursor-pointer active:scale-95 transition-transform duration-75">Submit</button>
                </form>
            </div>

            <FetchEmployees employeData={employeData} fetchEmployees={fetchEmployees} />
        </>
    )
}