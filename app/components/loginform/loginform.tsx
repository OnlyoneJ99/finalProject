"use client"
import TextInput from "../../components/textinput/textinput";
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
                console.log("Success")
                router.push("/dashboard",{scroll:false});
            }else{
                setLoading(false);
                setError("Invalid credentials");
            }
        }catch(err){
            console.log(err)
        }
    }
    return (
        <>
            <FormHeader title="Login into your account" />
            <Form className="w-[80%] px-10 h-fit sm:shadow-md sm:py-10 rounded-md sm:shadow-slate-500/20" onsubmit={handleSubmit} >
                <TextInput isSignup={false}  label="username" type="text" />
                <TextInput isSignup={false} label="password" type="password" />
                {error !== "" && <ErrorDisplay message={error} />}
                <Button type="submit" disabled={loading} onSubmit={handleSubmit} className={`flex justify-center items-center bg-blue-600/80 w-full p-2 rounded-[4px] ${loading && ` cursor-not-allowed `}`}>
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
                <Link href="/signup"><div className=" text-slate-500 text-[14px]"><span>{`Don't have an account? `}</span><span className="text-blue-600">Sign Up</span></div></Link>
            </Form>
        </>
    )
}

export default LoginForm;