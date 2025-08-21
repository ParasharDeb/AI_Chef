'use client'
import Buttoncustom from "@/ui/button";
import InputBox from "@/ui/inputbox";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"
export default function Signup(){
    const [password,setpassword]=useState("")
    const [email,setemail]=useState("")
    const Router=useRouter();
    return(
        <div className="bg-gray-200 w-screen h-screen flex items-center justify-center">
            <div className="bg-white h-100 w-80 rounded-2xl px-10 py-10 shadow-lg">
                <h1 className="text-bold px-20 pb-5">Sign In</h1>
                <InputBox value={password} inputtype="password" inputplaceholder="enter your password" onchangehandler={(e)=>{setpassword(e.target.value)}}/>
                <InputBox value={email} inputplaceholder="enter your email" inputtype="text" onchangehandler={(e)=>{setemail(e.target.value)}}/>
                <Buttoncustom name="Signin" onClickhandler={
                        async() => {
                        await axios.post("http://localhost:3001/api/v1/user/signin", {
                            email,
                            password,
                        }).then((response) => {
                            Router.push("/")
                            localStorage.setItem("token",response.data.token)
                        })
                    }}/>
            </div>
        </div>
    )
}