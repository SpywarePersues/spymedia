import Link from "next/link";
import { SiFacebook, SiInstagram, SiTwitter} from 'react-icons/si'

export default function Footer(){
    return(
        <div className="text-gray-300 mx-auto glassmorph py-10 text-sm font-light font-Koho">
            <div className="bg-gray-500 w-11/12 mx-auto h-[2px] my-3"></div>
            <div className="w-11/12 lg:w-10/12 flex flex-wrap justify-around mx-auto">
                <div className="font-Koho  font-bold">
                    <p className="text-2xl">SpyMedia</p>
                    <p className="lg:pt-10">©SpyMedia 2022</p>
                    <p>Created by <Link href="https://spypercy.ml">SpywarePerseus.</Link> All Rights Reserved.</p>
                </div>
                <div>
                    <p className="font-Koho text-2xl font-bold">Pages</p>
                    <ul>
                    <Link href={{pathname: '/'}}><li className="hover:text-gray-400 transition-all duration-300 cursor-pointer">Home</li></Link>
                    <Link href={{pathname: '/feedback'}}><li className="hover:text-gray-400 transition-all duration-300 cursor-pointer">Feedback</li></Link>
                    <Link href={{pathname: '/upload'}}><li className="hover:text-gray-400 transition-all duration-300 cursor-pointer">Upload</li></Link>
                    <Link href={{pathname: '/login'}}><li className="hover:text-gray-400 transition-all duration-300 cursor-pointer">Login/Profile</li></Link>
                    </ul>
                </div>
                <div>
                <p className="font-Koho text-2xl font-bold">Socials</p>
                    <ul>
                        <Link href={{pathname: '/kids'}}><li className="hover:text-gray-100 cursor-pointer flex"><SiFacebook/> <span className="px-3">Facebook</span></li></Link>
                        <Link href={{pathname: '/kids'}}><li className="hover:text-gray-100 cursor-pointer flex"><SiTwitter /><span className="px-3">Twitter</span></li></Link>
                        <Link href={{pathname: '/kids'}}><li className="hover:text-gray-100 cursor-pointer flex"><SiInstagram /><span className="px-3">Instagram</span></li></Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}