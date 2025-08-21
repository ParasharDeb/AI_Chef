export default function InputBox({inputtype,inputplaceholder,value,onchangehandler}:{inputtype:string,value:string,inputplaceholder:string,onchangehandler:(e:any)=>void}){
    return(
        <input type={inputtype} placeholder={inputplaceholder} onChange={onchangehandler} className="px-4 py-2 mb-7 bg-gray-100 rounded-lg w-full border-none" value={value}/>
    )
}