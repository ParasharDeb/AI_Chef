import {navLinks} from '../constants'
export default function Navbara(){
    return(
        <nav>
            <div className="font-mono flex items-center gap-2 p-5">
                <p>luscious</p>
            <div className='mx-200'>
            <ul className='flex items-center gap-8'>
                {navLinks.map((link)=>(
                    <li key={link.id}>
                        <a href={`${link.id}`}>{link.title}</a>
                    </li>
                ))}
                <button className='bg-paper rounded-4xl border-2 border-color-black py-1 px-4'>
                    Login
                </button>
            </ul>
            </div>
            </div>
        </nav>
    )
}