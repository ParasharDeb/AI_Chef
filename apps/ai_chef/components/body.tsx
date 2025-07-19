'use client'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
export default function Mainbody(){
    useGSAP(()=>{
        gsap.to(boxref.current,{duration:1.5,rotate:180})
    },[])
    const boxref=useRef(null)
    return(
        <div className=' py-10 grid grid-cols-5 gap-4'>
                <div className='rounded-md ml-25 col-span-3 h-20 w-20'><img src="/spoons-2-removebg-preview.png"/></div>
                <div className=" rounded-full h-100 w-100 col-span-2" ref={boxref}>
                    <img src="/momos-removebg-preview.png" alt="" />
                </div>

        </div>
    )
}