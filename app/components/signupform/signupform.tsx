"use client"
import TextInput from "../../components/textinput/textinput";
import {FcGoogle,} from "react-icons/fc";
import {FaFacebookSquare} from "react-icons/fa";
import Button from "../../components/button/button";
import Form from "@/app/components/form/form";
import {registerUser} from "@/app/actions/register";
import FormHeader from "../formheader/formheader";
import TelephoneInput from "../telephoneInput/telephoneinput";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const passwordpattern = "/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$/";
export default function SignupForm(){

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
            let response = await registerUser(data);
            if(response.registered){
                toast.success(response?.message as string);
            }else{
                toast.error(response?.message as string);
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
                <TelephoneInput currency="GHS"  />
                <div  className="w-full flex flex-col text-[14px] text-slate-600">
                    <label htmlFor="country" className="after:content-['*'] after:text-red-600 after:ml-[2px]">country</label>
                    <select id="country" name="country" className="cursor-pointer py-3 px-4
                        rounded-[5px]
                        border border-gray-300 
                      focus-visible:outline-blue-500 
                        focus-visible:outline-2"
                    >
                        <option selected value="USA">USA</option>
                        <option value="Ghana">Ghana</option>
                    </select>
                </div>
                <TextInput required={true} isSignup={true} label="first name" type="text" />
                <TextInput required={true} isSignup={true} label="last name" type="text"/>
                <Button type="submit" className="bg-blue-600/80 w-full text-white p-2 rounded-[4px]" >Sign Up</Button>
                <div className="flex items-center w-full
                    before:content-[''] after:content-['']
                    before:block after:block
                    before:w-full after:w-full
                    before:h-[1px] before:bg-slate-300
                    after:h-[1px] after:bg-slate-300
                    text-slate-500 before:mr-2 after:ml-2"
                >OR</div>
                <Button authbutton className="w-full flex items-center justify-center">
                    <span className=""><FcGoogle size={24}/></span>
                    <span className="text-[14px] ml-4">Continue with Google</span>
                </Button>
                <Button authbutton className="w-full flex items-center justify-center">
                    <span className=""><FaFacebookSquare size={24}/></span>
                    <span className="text-[14px] ml-4">Continue with Facebook</span>
                </Button>
            </Form>
        </>
    )
}