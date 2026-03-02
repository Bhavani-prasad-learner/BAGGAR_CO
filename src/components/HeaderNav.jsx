
import { Menu } from 'lucide-react';
export default function HeaderNav({setIsHeaderActive,renderProfileButton}) {
    return (<nav className="w-full z-50 fixed top-0 ">
        <div style={{backgroundColor:"#171717"}} className="w-[95%] mx-auto mt-2  border border-black/20 shadow-lg px-4 rounded-2xl">

            {/* <div className={`w-[95vw] px-4 mx-auto
             lg:px-8 mt-2 md:mt-4 backdrop-blur transition ease-in-out
             shadow-lg rounded-2xl 
        `} */}

            <div className='flex justify-between items-center h-12'>
                <div className="text-white" onClick={()=>{setIsHeaderActive(true)}}>
                    <Menu className="h-6 w-6" />
                </div>
                <div>
                    <span className='text-white text-xl fugazone-regular'>THE EXOTIC SHAWARMA</span>
                </div>
                <div>
                    <span className='text-white'>{renderProfileButton()}</span>
                </div>
            </div>
        </div>
    </nav>)
}