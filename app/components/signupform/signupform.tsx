"use client"
import TextInput from "../../components/textinput/textinput";
import {FcGoogle,} from "react-icons/fc";
import {FaFacebookSquare} from "react-icons/fa";
import Button from "../../components/button/button";
import Form from "@/app/components/form/form";
import {register} from "@/app/actions/register";
import FormHeader from "../formheader/formheader";
import TelephoneInput from "../telephoneInput/telephoneinput";

export default function SignupForm()
{
    return(
        <>
            <FormHeader title="Create an account"/>
            <Form action={register} className="w-[80%] mb-3">
                <TextInput isSignup={true} label="username" type="text" />
                <TextInput isSignup={true} label="password" type="password" />
                <TelephoneInput currency="GHS" />
                <TextInput isSignup={true} label="first name" type="text" />
                <TextInput isSignup={true} label="last name" type="text" />
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