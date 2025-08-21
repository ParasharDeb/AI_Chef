'use client'
import Buttoncustom from "@/ui/button";
import InputBox from "@/ui/inputbox";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"
export default function Signup(){
    const [username,setusername]=useState("")
    const [password,setpassword]=useState("")
    const [email,setemail]=useState("")
    const Router=useRouter();
    return(
        <div className="bg-gray-200 w-screen h-screen flex items-center justify-center">
            <div className="bg-white h-105 w-80 rounded-2xl px-10 py-10 shadow-lg">
                <h1 className="text-bold px-20 pb-5">Sign Up</h1>
                <InputBox value={username} inputtype="text" inputplaceholder="enter your username" onchangehandler={(e)=>{setusername(e.target.value)}}/>
                <InputBox value={password} inputtype="password" inputplaceholder="enter your password" onchangehandler={(e)=>{setpassword(e.target.value)}}/>
                <InputBox value={email} inputplaceholder="enter your email" inputtype="text" onchangehandler={(e)=>{setemail(e.target.value)}}/>
                <Buttoncustom name="Signup" onClickhandler={
                        async() => {
                        await axios.post("http://localhost:3001/api/v1/user/signup", {
                            email,
                            password,
                            username
                        }).then((response) => {
                            Router.push("/signin")
                        })
                    }}/>
                <h6 className="py-4 px-2">Already have an accout? <Link href="/signin" className="text-blue-600 cursor-pointer hover:text-blue-800">Sign in</Link></h6>
            </div>
        </div>
    )
}