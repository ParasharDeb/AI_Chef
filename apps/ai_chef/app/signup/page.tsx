'use client'
import {Button} from "@repo/ui/button"
import { Inputbox } from "@repo/ui/input"
export default function Signup(){
    return(
        <div className="bg-paper flex w-screen h-screen justify-center items-center">
            <div className="isolate aspect-video w-96 h-fit rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5 px-5 py-10">
                <div className="text-[#ff7a29] font-bold text-4xl font-mono ml-25">Signup</div>
                <Inputbox Changehandler={(e)=>{console.log(e.target.value)}} type="text" placeholder="username" Title="Username"/>
                <Inputbox Changehandler={(e)=>{console.log(e.target.value)}} type="text" placeholder="password" Title="Password"/>
                <Inputbox Changehandler={(e)=>{console.log(e.target.value)}} type="text" placeholder="Email" Title="Email"/>
                <Button children="Signup" clickhandler={()=>alert("hi")}/>
                {/* SHould have a footer  */}
                <div>

                </div>
            </div>
        </div>
    )
}