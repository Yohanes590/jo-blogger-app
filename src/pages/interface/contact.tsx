import NavigationBar from "../_disabled-routes/nav-bar"
import { IoMdContact } from "react-icons/io";
import { IoSend } from "react-icons/io5";
export default function Contact() {
      return (<>
            <NavigationBar />
            <div className="contact-section flex items-center w-full h-screen justify-center">
                  <div className="box-section bg-[#07aa0715] rounded-[20px] border-[#00ff95] border-1 w-[40%] h-[56%]">
                        <div className="heder text-center pt-[30px] text-[25px] font-bold">
                              <h1 className="flex justify-center items-center gap-5 cursor-default">Contact <IoMdContact/> </h1>
                        </div>
                        <div className="input-box flex justify-center  text-center pt-[30px]">
                              <div className="input-container grid">
                              <input type="text" className="outline-none mt-[20px] rounded-[5px] h-[50px] w-[500px] pl-[20px] bg-[#0a490a] " placeholder="Full Name" />
                              <input type="email" className="outline-none mt-[20px] rounded-[5px] h-[50px] w-[500px] pl-[20px] bg-[#0a490a] " placeholder="Email" />
                              <textarea className="outline-none pt-[20px] mt-[20px] rounded-[5px] h-[150px] w-[500px] pl-[20px] bg-[#0a490a] " placeholder="your message" /><br/>
                              <button className="flex justify-center items-center gap-4 w-[500px] rounded-[5px] cursor-pointer bg-[#00ff95ab] h-[50px]">Send <IoSend/></button>
                              </div>                   
                        </div>
                  </div>      
            </div>
      </>)
}