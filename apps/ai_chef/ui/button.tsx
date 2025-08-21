export default function Buttoncustom({onClickhandler,name}:{onClickhandler:(e:any)=>void,name:string}){
    return(
        <button onClick={onClickhandler} className="bg-black px-25 py-3 text-white rounded-2xl cursor-pointer hover:bg-gray-800">
            {name}
        </button>

    )
}