
import { Menu } from 'lucide-react';
export default function HeaderNav({setIsHeaderActive,renderProfileButton}) {
    return (<nav className="w-full z-50 fixed top-0">
        <div  className="w-[95%] mx-auto mt-2 bg-brand-mesh-premium  border border-yellow-400 shadow-lg px-4 rounded-2xl">

            {/* <div className={`w-[95vw] px-4 mx-auto
             lg:px-8 mt-2 md:mt-4 backdrop-blur transition ease-in-out
             shadow-lg rounded-2xl 
        `} */}

            <div className='flex justify-between items-center h-12 text-yellow-400 '>
                <div className="text-yellow-400" onClick={()=>{setIsHeaderActive(true)}}>
                    <Menu className="h-6 w-6 text-yellow-400" />
                </div>
                <div className='font-cinzel text-[1.4rem] text-yellow-400'>
                    bagaara & co.
                </div>
                <div className="text-yellow-400" >
                    <span >{renderProfileButton()}</span>
                </div>
            </div>
        </div>
    </nav>)
}