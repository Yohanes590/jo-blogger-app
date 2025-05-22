export default function NavigationBar() {
      return (<>
      <div className="navigation-bar flex justify-around items-center h-[60px] fixed z-50 w-full backdrop-blur-2xl">
        <div className="logo font-bold text-[30px] text-[#08BC7D]">
          <h1 className="cursor-pointer"><a href="/">JO</a></h1>
        </div>
        <div className="buttons-links gap-5 flex font-bold">
          <a className="hover:text-[#00FFE1] transition-all duration-500" href="/">Home</a>
          <a className="hover:text-[#00FFE1] transition-all duration-500" href="/interface/blog">Blog</a>
          <a className="hover:text-[#00FFE1] transition-all duration-500" href="/interface/contact">Contact</a>
        </div>
    </div>
      </>)
}
