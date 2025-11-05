import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/kpt_logo.jpeg";
import linkedin from "@/images/LinkedIn.png";
import youtube from "@/images/youtube.png";
import facebook from "@/images/facebook.png";
import instagram from "@/images/instagram.png";
import twitter from "@/images/twitter.png";
import Money from "@/images/moniepoint.png";
import Money2 from "@/images/opay.png";
import money4 from "@/images/Paypal.png";

const Footer = () => {
return (
<div className="py-24 relative px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-blue-100 text-sm mt-24">
    {/* top */}
    <div className="flex justify-between gap-24">
    {/* Left */}
    <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
        <Link href="/">
        <Image src={Logo} alt="Logo" width={50} height={50} className="cursor-pointer rounded-3xl" />
        </Link>
        <p>30 Badawa Layout, Behind Crescent International School, Kano</p>
        <span className="font-semibold">hello@kpt-comp.com.ng</span>
        <span className="font-semibold">+234 907 806 1022</span>
        <div className="flex gap-4 flex-wrap mt-2">
        <Image src={facebook} alt="Facebook" width={30} height={30} className="cursor-pointer rounded-md" />
        <Image src={instagram} alt="Instagram" width={30} height={30} className="cursor-pointer rounded-md" />
        <Image src={youtube} alt="YouTube" width={30} height={30} className="cursor-pointer rounded-md" />
        <Image src={linkedin} alt="LinkedIn" width={30} height={30} className="cursor-pointer rounded-md" />
        <Image src={twitter} alt="Twitter" width={30} height={30} className="cursor-pointer rounded-md" />
        </div>
    </div>

    {/* Center */}
    <div className="hidden lg:flex justify-between w-1/2">
        <div className="flex flex-col gap-4">
        <h1 className="text-lg font-medium">COMPANY</h1>
        <Link href="/about" className="hover:text-yellow-600">About Us</Link>
        <Link href="/contact" className="hover:text-yellow-600">Careers</Link>
        <Link href="/privacy" className="hover:text-yellow-600">Blog</Link>
        <Link href="/privacy" className="hover:text-yellow-600">Affiliate</Link>
        <Link href="/terms" className="hover:text-yellow-600">Contact Us</Link>
        </div>
        <div className="flex flex-col gap-4">
        <h1 className="text-lg font-medium">SHOP</h1>
        <Link href="/new-arrivals" className="hover:text-yellow-600">New Arrivals</Link>
        <Link href="/building-materials" className="hover:text-yellow-600">Building Materials</Link>
        <Link href="/furniture-materials" className="hover:text-yellow-600">Furniture Materials</Link>
        <Link href="/plumbing" className="hover:text-yellow-600">Plumbing Materials</Link>
        <Link href="/products" className="hover:text-yellow-600">All Products</Link>
        </div>
        <div className="flex flex-col gap-4">
        <h1 className="text-lg font-medium">HELP</h1>
        <Link href="/support" className="hover:text-yellow-600">Customer Services</Link>
        <Link href="/account" className="hover:text-yellow-600">My Account</Link>
        <Link href="/privacy" className="hover:text-yellow-600">Legal & Privacy</Link>
        <Link href="/terms" className="hover:text-yellow-600">Terms & Conditions</Link>
        <Link href="/gift-card" className="hover:text-yellow-600">Gift Card</Link>
        </div>
    </div>

    {/* Right */}
    <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
        <h1 className="text-lg font-medium">SUBSCRIBE</h1>
        <p>Be the first to get latest news about trends, promotions, and much more!</p>
        <div className="flex gap-2 flex-wrap">
        <input
            type="email"
            placeholder="Enter your email"
            className="w-full md:w-auto flex-1 h-10 px-4 rounded-md border-2 border-yellow-800 focus:outline-none focus:border-yellow-800"
        />
        <button className="bg-yellow-800 text-white px-4 py-2 rounded-md whitespace-nowrap">
            Join
        </button>
        </div>
        <span className="font-semibold">Secure Payments</span>
        <div className="flex gap-4 flex-wrap">
        <Image src={Money} alt="Moniepoint" width={50} height={50} className="cursor-pointer rounded-md" />
        <Image src={Money2} alt="Opay" width={50} height={50} className="cursor-pointer rounded-md" />
        <Image src={money4} alt="Paypal" width={50} height={50} className="cursor-pointer rounded-md" />
        </div>
    </div>
    </div>

    {/* bottom */}
    <div className="mt-12 border-t border-yellow-700 pt-6 text-center text-gray-600 text-xs">
    <p>&copy; {new Date().getFullYear()} KPT Company. All rights reserved.</p>
    <p>Developed with ❤️ in Kano, Nigeria.</p>
    </div>
</div>
);
};

export default Footer;
