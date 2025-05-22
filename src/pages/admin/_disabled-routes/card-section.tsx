import { BsFilePostFill } from "react-icons/bs";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { FcAdvertising } from "react-icons/fc";
import { ChangingRoute } from "./change-routes";
import { useEffect } from "react";
import ApiRoute from "../api-route";
import Cookies from "js-cookie";
import { Toaster , toast } from "react-hot-toast";
export default function Card() {
  useEffect(() => {
    async function CountPost(): Promise<void>{
      const refreshToken = Cookies.get("refresh-token")
      const accessToken = Cookies.get("access-token")
      const loadData = toast.loading("loading-data...")
      const ServerRequest = await fetch(ApiRoute + "counting-post", {
        method: "post",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
          accessToken:accessToken,
        })
      })
      const changeTOJson = await ServerRequest.json()
      toast.dismiss(loadData)
      if (changeTOJson.status == 200) {
        const addForAll = document.querySelector(".allpost") as HTMLElement
      addForAll.innerText = changeTOJson.allPost
      const publicPost = document.querySelector(".public-post") as HTMLElement
      publicPost.innerHTML = changeTOJson.public
      const privatePost = document.querySelector(".private-post") as HTMLElement
      privatePost.innerHTML = changeTOJson.private
      } else {
        toast.error("can't fetch data properly")
     }
    }
    CountPost()
  },[])
  return (<>
        <Toaster/>
        <div className="card-section relative w-full h-screen flex justify-center items-center gap-5">
        {/* Card start Here*/}
        <div className="card cursor-default w-[350px] h-[200px] rounded-[10px] bg-[#0c6d5860] border-1 border-[#00ffbf]">
          <div className="data-center pt-[20px]">
            <h1 className="allpost text-[50px] font-bold flex items-center justify-around">
              <div className="icon bg-[#0cff793a] w-[60px] h-[60px] flex justify-center rounded-[10px] items-center">
                <BsFilePostFill size={40} />
              </div>
            </h1>
            <h2 className="text-[25px] text-center">Total Post</h2>
            <center>
              <button onClick={()=>ChangingRoute('/manage-post')} className="mt-[10px] h-[40px] w-[300px] text-[#00ffc8] rounded-[10px] cursor-pointer bg-[#00ffaa77]">
                Show all posts
              </button>
            </center>
          </div>
        </div>
        {/* Card end Here */}

        {/* Card start Here*/}
        <div className="card cursor-default w-[350px] h-[200px] rounded-[10px] bg-[#0c6d5860] border-1 border-[#00ffbf]">
          <div className="data-center pt-[20px]">
            <h1 className="public-post text-[50px] font-bold flex items-center justify-around">
              <div className="icon bg-[#0cff793a] w-[60px] h-[60px] flex justify-center rounded-[10px] items-center">
                <FcAdvertising size={40} />
              </div>
            </h1>
            <h2 className="text-[25px] text-center">Public post</h2>
            <center>
              <button onClick={()=>ChangingRoute('/manage-post')} className="mt-[10px] h-[40px] w-[300px] text-[#00ffc8] rounded-[10px] cursor-pointer bg-[#00ffaa77]">
                Show public posts
              </button>
            </center>
          </div>
        </div>
        {/* Card end Here */}

        {/* Card start Here*/}
        <div className="card cursor-default w-[350px] h-[200px] rounded-[10px] bg-[#0c6d5860] border-1 border-[#00ffbf]">
          <div className="data-center pt-[20px]">
            <h1 className="private-post text-[50px] font-bold flex items-center justify-around">
              <div className="icon bg-[#0cff793a] w-[60px] h-[60px] flex justify-center rounded-[10px] items-center">
                <RiGitRepositoryPrivateLine size={40} />
              </div>
            </h1>
            <h2 className="text-[25px] text-center">Private Post</h2>
            <center>
              <button onClick={()=>ChangingRoute('/manage-post')} className="mt-[10px] h-[40px] w-[300px] text-[#00ffc8] rounded-[10px] cursor-pointer bg-[#00ffaa77]">
                Show private posts
              </button>
            </center>
          </div>
        </div>
        {/* Card end Here */}
      </div>
      </>)
}