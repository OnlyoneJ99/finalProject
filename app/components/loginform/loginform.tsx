"use client"
import TextInput from "../../components/textinput/textinput";
import {FcGoogle,} from "react-icons/fc";
import {FaFacebookSquare} from "react-icons/fa";
import Button from "../../components/button/button";
import {signIn } from "next-auth/react";
import {useRouter } from "next/navigation";
import Form from "@/app/components/form/form";
import Link from "next/link";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import FormHeader from "../formheader/formheader";
import ErrorDisplay from "../error/errordisplay";

const LoginForm = ()=>{
    const router = useRouter();
    const[error,setError] = useState("");
    const[loading,setLoading] = useState(false);

    async function handleSubmit(e:React.FormEvent){
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const data = new FormData(form);
        const username = data.get("username") as string;
        const password = data.get("password") as string;
        setLoading(true);
        try{
            const response = await signIn("credentials",{
                username,
                password,
                redirect:false,
            });
            if(response && !response.error){
                router.push("/dashboard",{scroll:false});
            }else{
                setError("Invalid credentials");
            }
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }
    return (
        <>
            <FormHeader title="Login into your account" />
            <Form className="w-[80%]" onsubmit={handleSubmit} >
                <TextInput isSignup={false} label="username" type="text" />
                <TextInput isSignup={false} label="password" type="password" />
                {error !== "" && <ErrorDisplay message={error} />}
                <Button type="submit" onSubmit={handleSubmit} className={`flex justify-center items-center bg-blue-600/80 w-full p-2 rounded-[4px] ${loading && ` cursor-not-allowed `}`}>
                    {loading ? 
                        <>
                            <RotatingLines strokeColor="white" 
                                strokeWidth="4"
                                animationDuration="0.8"
                                width="25"
                                visible={true}
                            /> 
                            <span className="ml-2">signing in</span>
                        </>:
                        "Login"
                    } 
                </Button>
                <div className="
                    flex items-center w-full
                    before:content-[''] after:content-['']
                    before:block after:block
                    before:w-full after:w-full
                    before:h-[1px] before:bg-slate-300
                    after:h-[1px] after:bg-slate-300
                    text-slate-500 before:mr-2 after:ml-2"
                >OR</div>
                <Link href="/signup"><div className="text-slate-600 text-[14px]">Don't have an account?<span className="text-blue-600">Sign Up</span></div></Link>
                <Button type="button" onClick={()=>signIn("google")} authbutton  className="w-full flex items-center justify-center">
                    <span className=""><FcGoogle size={24}/></span>
                    <span className="text-[14px] ml-4">Continue with Google</span>
                </Button>
                <Button type="button" onClick={()=>signIn("facebook")} authbutton className="w-full flex items-center justify-center">
                    <span className=""><FaFacebookSquare size={24}/></span>
                    <span className="text-[14px] ml-4">Continue with Facebook</span>
                </Button>
            </Form>
        </>
    )
}

export default LoginForm;