import Link from 'next/link'
export default function NavigationBar() {
      return (<>
      <div className="navigation-bar flex justify-around items-center h-[60px] fixed z-50 w-full backdrop-blur-2xl">
        <div className="logo font-bold text-[30px] text-[#08BC7D]">
          <h1 className="cursor-pointer"><Link href="/">JO</Link></h1>
        </div>
        <div className="buttons-links gap-5 flex font-bold">
          <Link className="hover:text-[#00FFE1] transition-all duration-500" href="/">Home</Link>
          <Link className="hover:text-[#00FFE1] transition-all duration-500" href="/interface/blog">Blog</Link>
          <Link className="hover:text-[#00FFE1] transition-all duration-500" href="/interface/contact">Contact</Link>
        </div>
    </div>
      </>)
}
