import { LuCircleUser } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { SiVirustotal } from "react-icons/si";
import  ChangingRoute  from "./change-routes";
import { Toaster , toast } from "react-hot-toast";
import ApiRoute from "@/lib/api-route";
import Cookies from "js-cookie"
import LoadingAnimation from "./loading-anime";
import { useEffect } from "react";
export default function SideNavigation() {
  const passProp = (route:string) => {
      ChangingRoute(route) 
  }

  const LogOut = (prop:string) => {
    if (confirm("are you sure ?")) {
      if (prop === "/logout") {
        Cookies.remove("access-token")
        Cookies.remove("refresh-token")
        window.location.href="/admin/admin-login"
     }
    } else {
      toast.success("process cancel")
    }
  }

  useEffect(() => {
      const LoadingElement = document.querySelector(".loading-container") as HTMLElement
      LoadingElement.style.display = "flex"
      const CheckUser = async (): Promise<void> => {
      const accessToken = Cookies.get("access-token")
      const refreshToken = Cookies.get("refresh-token")

      if (!accessToken || !refreshToken) {
        LoadingElement.style.display = "flex"
        window.location.href = "/"
      } else {
        LoadingElement.style.display = "flex"
        const ServerResponse = await fetch(ApiRoute + "authenticate-user", {
          method: "post",
          headers: {
            "Content-Type":"application/json",
          },
          body: JSON.stringify({
            accessToken: accessToken,
            refreshToken:refreshToken
          })
        })
        const changeServerResponse = await ServerResponse.json()
        if (changeServerResponse.status == 200) {
          console.log("legitimate request")
            LoadingElement.style.display = "none"
        } else if (changeServerResponse.status == 400) {
          LoadingElement.style.display = "flex"
          toast.error("login again")
          window.location.href = "/"
        } else {
          LoadingElement.style.display = "flex"
          window.location.href="/"
        }
      }
    }
    CheckUser()
  },[])
 
  return (<>
    <LoadingAnimation/>
        <Toaster/>
            <div className="side-navigation-bar w-[300px] h-[55%] mt-[200px] rounded-[10px] ml-[20px] overflow-hidden border-1 border-[#00ffd5] fixed z-40 bg-[#14917149]">
        <div className="logo pt-[50px]">
          <h1 className="text-[25px] cursor-default text-center">
            <center>
              <LuCircleUser size={40} />
            </center>
            Admin <span className="text-[#00ffaa]">Dashboard</span>
          </h1>
        </div>
        <div className="buttons-nav-bar mt-[40px]">
          <div onClick={()=>passProp("/dashboard")} className="each-button-hover flex items-center transition duration-300 hover:bg-[#17ffcd8a] gap-5 pl-[20px] cursor-pointer h-[50px] w-[100%]">
            <MdDashboard /> Dashboard
          </div>
          <div onClick={()=>passProp("/add-post")} className="each-button-hover flex items-center transition duration-300 hover:bg-[#17ffcd8a] gap-5 pl-[20px] cursor-pointer h-[50px] w-[100%]">
            <IoAddCircle /> Add Post
          </div>
            <div onClick={()=>passProp("/manage-post")} className="each-button-hover flex items-center transition duration-300 hover:bg-[#17ffcd8a] gap-5 pl-[20px] cursor-pointer h-[50px] w-[100%]">
            <SiVirustotal />Manage Post
          </div>
          <div onClick={()=>LogOut("/logout")} className="each-button-hover mt-[150px] flex items-center bg-red-400 gap-5 pl-[20px] cursor-pointer h-[50px] w-[100%]">
            <IoLogOutOutline /> Logout
          </div>
        </div>
      </div>
      </>)
}