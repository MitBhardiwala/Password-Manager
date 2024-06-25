import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
const BASE_URL=import.meta.env.VITE_BASE_URL;
const Manager = () => {
    const ref = useRef();
    const passRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const [deleteState, setDeleteState] = useState(false);
    const editIdRef = useRef("");

    const getpasswords = async () => {
        let response = await fetch(`${BASE_URL}/`);
        const passwords = await response.json();
        if (passwords) {
            setpasswordArray(passwords);
        }

    }

    useEffect(() => {
        getpasswords();

    }, [])

    
    


    const showPassword = () => {

        if(passRef.current.type==="password"){
            passRef.current.type="text";
        }
        else{
            passRef.current.type="password";
        }
        if (ref.current.src.includes("icons/eye.png")) {
            ref.current.src = "icons/eyecross.png"
        }
        else {
            ref.current.src = "icons/eye.png"
        }

    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })

    }

    const savePassword = async() => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            console.log(editIdRef);
           
            //if any such id exits delete it
            await fetch(`${BASE_URL}/`, {
            method: "DELETE",
            body: JSON.stringify({id:editIdRef.current}),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
            
          });
         
          
            
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch(`${BASE_URL}/`, {
                method: "POST",
                body: JSON.stringify({...form,id:uuidv4()}),
                headers: {
                  "Content-type": "application/json; charset=UTF-8"
                }
              });
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form])
            setForm({ site: "", username: "", password: "" })
            toast('Password Saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        }

        else {
            toast('Error : Password not Saved')
        }
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast('Copied To Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });

    };

    const editPassword =async  (id) => {
        setForm(passwordArray.filter(item => item.id === id)[0]);
        
        setpasswordArray(passwordArray.filter(item => item.id != id));
        editIdRef.current=id;
        
       
        // console.log(passwordArray[0].id)
        // await fetch(`${BASE_URL}/`, {
        //     method: "DELETE",
        //     body: JSON.stringify({id}),
        //     headers: {
        //       "Content-type": "application/json; charset=UTF-8"
        //     }
        //   });
        
        // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id != id)))
    }
    const deletePassword = async (id,item) => {
        if (confirm("Do you want to proceed?")) {

            console.log("User clicked Yes");
           
            editIdRef.current=id;
            console.log(typeof editIdRef.current)
            console.log(typeof id)
            
            setpasswordArray(passwordArray.filter(item => item.id != id));

            // console.log(item);
            await fetch(`${BASE_URL}/`, {
                method: "DELETE",
                body: JSON.stringify({id:editIdRef.current}),
                headers: {
                  "Content-type": "application/json; charset=UTF-8"
                }
              });
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id != id)))
            toast('Password deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
        } else {

            console.log("User clicked No");
        }

    }


    return (

        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />
            {/* Same as */}
            <ToastContainer />


            <div className='p-2 md_px-0 md:mycontainer'>
                <h1 className='text-3xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own password manager</p>



                <div className=" flex flex-col  p-4 text-black gap-8">
                    <input placeholder='Enter Website URL' value={form.site} onChange={handleChange} name="site" className="rounded-full w-full border border-green-500 px-4 py-1" type="text" />
                    <div className="flex flex-col md:flex-row justify-around gap-8">
                        <input placeholder='Enter Username' value={form.username} onChange={handleChange} name="username" className="rounded-full w-full border border-green-500 px-4 py-1" type="text" />
                        <div className="relative">

                            <input placeholder='Enter Password' ref={passRef} value={form.password} onChange={handleChange} name="password" className="rounded-full w-full border border-green-500 px-4 py-1" type="password" />
                            <span className='absolute right-3 top-1 cursor-pointer'>
                                <img className="h-6" ref={ref} src="public/icons/eye.png" onClick={showPassword} alt="" />
                            </span>
                        </div>

                    </div>
                </div>

                <button onClick={savePassword} className='flex justify-center items-center rounded-full px-8 py-2 gap-2 w-fit border border-green-900 bg-green-600 hover:bg-green-500 mx-auto ' >
                    <lord-icon

                        src="https://cdn.lordicon.com/ftndcppj.json"
                        trigger="click"
                    >

                    </lord-icon>Add Password
                </button>


                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length !== 0 && <table className="table-auto w-full rounded-md overflow-hidden ">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>

                            {passwordArray.map(item => {
                                return (<tr key={item.id}>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex justify-center items-center '>
                                            <a href={item.site} target='_black'>{item.site}</a>
                                            <div className='hover:cursor-pointer size-7' onClick={() => copyText(item.site)}>

                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>

                                        <div className='flex justify-center items-center '>

                                            {item.username}

                                            <div className='hover:cursor-pointer size-7' onClick={() => copyText(item.username)}>

                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center '>
                                        <div className='flex justify-center items-center '>

                                            {"*".repeat(item.password.length)}

                                            <div className='hover:cursor-pointer size-7' onClick={() => copyText(item.password)}>

                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center '>
                                        <div className='flex justify-center items-center '>


                                            <span className='cursor-pointer mx-1' onClick={() => editPassword(item.id)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>

                                            <span className='cursor-pointer mx-1' onClick={() => deletePassword(item.id,item)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                )
                            })}

                        </tbody>
                    </table>}
                </div>


            </div>


        </>

    )
}

export default Manager
