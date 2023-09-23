"use client"
import TextInput from "../../components/textinput/textinput";
import { RotatingLines } from "react-loader-spinner";
import Button from "../../components/button/button";
import Form from "@/app/components/form/form";
import {registerUser} from "@/app/actions/register";
import FormHeader from "../formheader/formheader";
import TelephoneInput from "../telephoneInput/telephoneinput";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

const passwordpattern = "/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$/";
export default function SignupForm(){

    const [loading,setLoading] = useState(false);
    function checkFormFields(data:FormData){
        const username = data.get("username") as string;
        const password = data.get("password") as string;
        const phonenumber = data.get("phonenumber") as string;
        const firstname = data.get("firstname") as string;
        const lastname = data.get("lastname") as string;
        const country = data.get("country") as string
        return (username !== "" && firstname !== "" && lastname !== "" &&country !== "" && password !== "" && phonenumber !== "")
    }

    async function submitForm(data:FormData){
        if(checkFormFields(data)){   
            setLoading(true);
            try{
                let response = await registerUser(data);
                if(response.registered){
                    toast.success(response?.message as string);
                }else{
                    toast.error(response?.message as string);
                }
            }catch(error){
                console.log(error);
            }
            finally{
                setLoading(false)
            }
            return;
        }
        toast.warn("Please Fill all fields");
    }
    return(
        <>
            <ToastContainer  className="text-slate-500" position={toast.POSITION.TOP_RIGHT} autoClose={6000}/>
            <FormHeader title="Create an account" />
            <Form name="register" action={submitForm} className="w-[80%] mt-8 mb-3">
                <TextInput required={true} isSignup={true} label="username" type="text" />
                <TextInput passwordpattern={passwordpattern} required={true} isSignup={true} label="password" type="password" />
                <TelephoneInput currency="GHS" />
                <div className="w-full flex flex-col text-[14px] text-slate-600">
                    <label htmlFor="country" className="after:content-['*'] after:text-red-600 after:ml-[2px]">country</label>
                    <select defaultValue={"Ghana"} id="country" name="country" className="cursor-pointer py-3 px-4
                        rounded-[5px]
                        border border-gray-300 
                      focus-visible:outline-blue-500 
                        focus-visible:outline-2"
                    >
                        <option value="USA">USA</option>
                        <option defaultValue="GHANA" value="Ghana">Ghana</option>
                    </select>
                </div>
                <TextInput required={true} isSignup={true} label="first name" type="text" />
                <TextInput required={true} isSignup={true} label="last name" type="text"/>
                <Button type="submit" disabled={loading} className={`bg-blue-600/80 w-full text-white p-2 rounded-[4px] flex justify-center items-center ${loading && `cursor-not-allowed`}`} >
                {
                    loading ? 
                        <>
                            <RotatingLines strokeColor="white" 
                                strokeWidth="4"
                                animationDuration="0.8"
                                width="25"
                                visible={true}
                            /> 
                            <span className="ml-2">Registering...</span>
                        </>:
                        "Register"
                }
                </Button>
            </Form>
        </>
    )
}