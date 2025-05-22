import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { BiSolidLogInCircle } from "react-icons/bi";
import { toast, Toaster } from 'react-hot-toast';
import {
      InputOTP,
      InputOTPGroup,
      InputOTPSeparator,
      InputOTPSlot,
} from "@/components/ui/input-otp" 
import ApiRoute from "./api-route";
import React, { useState } from "react";
import Cookies from "js-cookie";
export default function AdminLogin() {

      const [email, setEmail] = useState<string>("")
      const [password , setPassword] = useState<string>("")
      const LoginIntoServer = async ():Promise<void> => {
            if (email == "") {
             toast.error("please insert email")
            } else if (password == "") {
             toast.error("please insert password")
            } else {
                  const LoadingToast = toast.loading("Authenticating..")
                  const LoginIntoServer = await fetch(ApiRoute + "login-admin", {
                        method: "post",
                        headers: {
                              "Content-Type":"application/json"
                        },
                        body: JSON.stringify({
                              userEmail: email,
                              userPassword:password
                        })
                  })
                  const ChangeToJson = await LoginIntoServer.json()
                  if (ChangeToJson.status === 200) {
                        toast.dismiss(LoadingToast)
                        toast.success("check your inbox")
                        setTimeout(() => {
                              openVerWindow()
                              
                        }, 2000);
                  } else if (ChangeToJson.status === 400) {
                        toast.dismiss(LoadingToast)
                        toast.error(ChangeToJson.message)
                  } else if (ChangeToJson.status === 500) {
                        toast.dismiss(LoadingToast)
                        toast.error(ChangeToJson.message)
                  } else {
                        toast.dismiss(LoadingToast)
                        toast.error("wrong request")
                        console.log(ChangeToJson)
                  }
            }
      }

  

      const [ getOtp , setOtp ] = useState<string>('')
      const sendOtp = async (): Promise<void> => {
            console.log(getOtp)
            const loadingRequest = toast.loading("Authenticating OTP...")
            const CheckOtp = await fetch(ApiRoute + "access-otp", {
                  method: "post",
                  headers: {
                        "Content-Type":"application/json"
                  },
                  body: JSON.stringify({
                        otp:getOtp
                  })
            })
            const changingOTP = await CheckOtp.json()
            console.log(changingOTP)
            if (changingOTP.status === 200) {
                  toast.dismiss(loadingRequest)
                  toast.success("Login success")
                  Cookies.set("access-token",changingOTP.AccessToken)
                  Cookies.set("refresh-token", changingOTP.RefreshToken)
                  setTimeout(() => {
                        window.location.href="/admin/admin-dashboard"
                  }, 3000);
            } else {
                  toast.dismiss(loadingRequest)
                  toast.error("Can't authenticate user")
            }
      }

      const [verify, setVerify] = useState<boolean>(true)
      
      const openVerWindow = () => {
            if (verify === true) {
                  setVerify(false)
                  const styleContainer = document.querySelector(".otp-box") as HTMLInputElement  
                  if (styleContainer) {
                        styleContainer.style.display = "flex";
                  }
            } else {
                  setVerify(true)
                  const styleContainer = document.querySelector(".otp-box") as HTMLInputElement  
                  if (styleContainer) {
                        styleContainer.style.display = "none";
                  } 
            }
      }

      return (<>
             <Toaster/>
            <div className="otp-box hidden fixed w-[100%] h-[100%] backdrop-blur-2xl items-center justify-center">
            <div className="box-section bg-[#0d460d15] rounded-[20px] border-[#00ff95] border-1 w-[40%] flex justify-center items-center h-[400px]">
                        <div className="input-otp">
                              <h1 className="font-bold text-[25px]">Insert OTP Verification</h1>
                  <InputOTP value={getOtp} onChange={setOtp} maxLength={6}>
                  <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                  </InputOTPGroup>
                              </InputOTP>
                              <button onClick={sendOtp} className="mt-[20px] w-[250px] h-[40px] rounded-[5px] cursor-pointer bg-[#16b87496]">Verify</button><br/>
                              <button className="mt-[20px] w-[250px] h-[40px] rounded-[5px] cursor-pointer bg-[#ff5555]" onClick={openVerWindow}>Cancel</button>
                        </div>
            </div>     
            </div>

      <div className="contact-section flex items-center w-full h-screen justify-center">
            <div className="box-section bg-[#07aa0715] rounded-[20px] border-[#00ff95] border-1 w-[40%] h-[400px]">
                  <div className="heder text-center pt-[30px] text-[25px] font-bold">
                        <h1 className="flex justify-center items-center gap-5 cursor-default">Admin Login<MdOutlineAdminPanelSettings/> </h1>
                  </div>
                  <div className="input-box flex justify-center  text-center pt-[30px]">
                        <div className="input-container grid">
                        <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)} id="email" type="text" className="outline-none mt-[20px] rounded-[5px] h-[50px] w-[500px] pl-[20px] bg-[#0a490a] " placeholder="Email" />
                        <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} id="password" type="password" className="outline-none mt-[20px] rounded-[5px] h-[50px] w-[500px] pl-[20px] bg-[#0a490a] " placeholder="Password" />
                        <button onClick={LoginIntoServer} className="flex justify-center items-center gap-4 mt-[20px] w-[500px] rounded-[5px] transition duration-200 cursor-pointer hover:bg-[#58d39fab] bg-[#00ff95ab] h-[50px]">Login<BiSolidLogInCircle/></button>
                        </div>                   
                  </div>
            </div>      
            </div>
            
      </>)
}