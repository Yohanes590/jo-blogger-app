"use client"
import { Toaster, toast } from "react-hot-toast"
import Cookies from "js-cookie"
import ApiRoute from "../../../lib/api-route"
type PropType = {
      postId:string
}
export default function DialogDemo(Id:PropType) {
      const cancelPost = () => {
            const postElement = document.querySelector(".dialog-box") as HTMLElement 
            postElement.classList.remove("flex")
            postElement.classList.add("hidden")
      }
      
      const deletePost = async (): Promise<void> => {
            const PostId = Id.postId
            const accessToken = Cookies.get("access-token")
            const refreshToken = Cookies.get("refresh-token")
           const LoadingDelete= toast.loading("deleting post...")
            const ServerResponse = await fetch(ApiRoute+"deleting-post",{
                  method: "post",
                  headers: {
                        "Content-Type":"application/json"
                  },
                  body: JSON.stringify({
                        Id: PostId,
                        accessToken: accessToken,
                        refreshToken:refreshToken
                  })
            })
            const changeResponse = await ServerResponse.json()
            if (changeResponse.status == 200) {
                  toast.dismiss(LoadingDelete)
                  toast.success(changeResponse.message)
                  setTimeout(() => {
                        window.location.reload()
                  }, 1000);
            } else {
                  toast.dismiss(LoadingDelete)
                  toast.success(changeResponse.message) 
                  setTimeout(() => {
                        window.location.href="/"
                  }, 1000);
            }
      }
  return (
      
        <>
              <Toaster/>
              <div className="dialog-box hidden cursor-default justify-center items-center w-[100%] h-screen backdrop-blur-2xl bg-[#0000006c] fixed z-40">
                    <div className="flex-box text-center  h-[230px] w-[600px] border-1 border-[#00ffbf] rounded-[10px] bg-[#00ff6a28]">
                          <h1 className="text-[30px] pt-[50px] font-bold">Are you sure to delete?</h1>
                          <p>Make sure to delete this post no undo  </p>
                          <div className="flex-button mt-[15px] flex gap-5  items-center justify-center">
                          <button onClick={deletePost} className="w-[200px] h-[50px] cursor-pointer bg-[#ff6600] rounded-[10px]">Delete</button>
                          <button onClick={cancelPost} className="w-[200px] h-[50px] cursor-pointer bg-[#009b27] rounded-[10px]">Cancel</button>
                              </div>
                              
                    </div>
      </div>
        </>
  )
}
