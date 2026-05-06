import Link from "next/link"
import {LuInstagram, LuLaptop, LuMapPin} from 'react-icons/lu'
import Image from "next/image";
import { Button } from "./button";
import { BsInstagram } from "react-icons/bs";


export default function Footer() {
    const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY || ""
    
    return (
        <div className="w-full grid gap-4 sm:grid-cols-2 bg-indigo p-4 pt-6">
            <div className="flex flex-col gap-2 items-center">
                <Link href="/" className="flex flex-col gap-2 items-center">
                    <div className="w-48">
                        <Image
                        src={"/localPeach.png"}
                        alt="لوگوی کافه لوکال"
                        width={609}
                        height={340}
                        />
                    </div>
                    {/* <h1 className="text-lg text-peach">کافه رستوران ویکـــند</h1> */}
                </Link>
                <Link href="https://www.instagram.com/local.slow.barz?igsh=ZDF4ZjEzcXdjOHA2" target="_blank" rel="noopener noreferrer" className="my-6">
                    <Button variant="secondary">
                        اینستاگرام
                        <LuInstagram className="w-5 h-5"/>
                    </Button>
                </Link>
            </div>
            <div className="flex flex-col gap-2">
                <div className="overflow-hidden h-full max-w-full rounded-md">
                    <div id="canvas-for-googlemap" className="h-full w-full max-w-full">
                        <iframe className="h-full w-full border-0"  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d50254.64089843682!2d46.3272617!3d38.0723593!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x401a190063a7c1fb%3A0xbcc42b60ffb50ff4!2sLocal%20slow%20bar!5e0!3m2!1sen!2s!4v1778100640287!5m2!1sen!2s" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
                <p className="text-white text-sm inline text-center">
                    <span><LuMapPin className="w-4 h-4 inline ml-1 text-peach" /></span>
                    تبریز/ ائل‌گلی/ کوی فردوس/ نرسیده به باغچه‌بان/ خیابان ابرار
                </p>
            </div>
            <div className="flex sm:col-span-2 justify-center items-center gap-2 text-sm text-white bg-purple rounded-full py-2">
                <LuLaptop className="w-4 h-4" />
                <p className="text-base">طراحی و توسعه توسط <Link href="https://www.instagram.com/key.hansa" target="_blank" rel="noopener noreferrer"><span className="border-b font-bold">کیهانزا</span></Link></p>
            </div>
        </div>
    )
}
