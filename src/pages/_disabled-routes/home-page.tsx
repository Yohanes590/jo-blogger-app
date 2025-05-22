import { FaDotCircle } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
export default function HomePage() {
      return (<>
            <div className="center-container justify-center flex pt-[200px] h-[400px] w-full">
                  <div className="home-page-container">

                        <div className="big-badge cursor-default rounded-[10px] pl-[20px] w-[400px] h-[40px] text-[#00FFE1] flex items-center bg-[#00ffbf5d]">
                              <h1 className="flex items-center gap-4"> <FaDotCircle />Share ideas,blog posts</h1>
                        </div>
                        <div className="introduction  mt-[30px] ">
                              <h1 className="text-[30px]">Yohanes Mulugeta (Jo)</h1>
                              <div className="grad-div">
                                    <h1 className="text-[80px]">DEV BLOGGER</h1>
                                    <p className="mt-[20px] text-[18px] font-bold">I’m junior full stuck developer .
                                          im passionate about solving problem
                                          with a code. i
                                          working launch my own start up and building smart tech solutions</p>
                                    <button className=" flex items-center justify-center gap-4 mt-[30px] w-[300px] h-[55px] cursor-pointer rounded-[10px] bg-[#00ff9d71]">Read Blogs<FaAngleRight/>

                                    </button>
                              </div>
                        </div>

                  </div>
            </div>

      </>)
}