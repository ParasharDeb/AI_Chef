'use client'
import {Button} from "@repo/ui/button"
import { Inputbox } from "@repo/ui/input"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
export default function Signup(){
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const Router = useRouter()
    function Singin(){
        axios.post("http://localhost:8080/api/v1/user/signin",{
            email,password
        }).then(
            Response=>{
                Router.push("/")
                console.log(Response)
            }
        ).catch(error=>{
            console.log(error)
        })
    }
    return(
        <div className="bg-paper flex w-screen h-screen justify-center items-center">
            <div className="isolate aspect-video w-96 h-fit rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5 px-5 py-10">
                <div className="text-[#ff7a29] font-bold text-4xl font-mono ml-25">Signin</div>
                <Inputbox Changehandler={(e)=>{setpassword(e.target.value)}} type="text" placeholder="Email" Title="Email"/>
                <Inputbox Changehandler={(e)=>{setemail(e.target.value)}} type="text" placeholder="password" Title="Password"/>
                <Button children="Signin" clickhandler={Singin}/>
                {/* SHould have a footer  */}
                <div>

                </div>
            </div>
        </div>
    )
}