import SideNavigation from "./_disabled-routes/side-navigation";
import { CiTimer } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaEye ,FaRegEyeSlash} from "react-icons/fa";
import ApiRoute from "./api-route";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import DialogDemo from "./_disabled-routes/dialog-box";
import { Toaster ,toast } from "react-hot-toast";
export default function ManagePost() {
      type post = {
            DateTime: string,
            ImagePath: string,
            PostTitle: string,
            visibility: string,
            postDescription:string
            __v: number,
            _id:string,
      }
      const [mapPost, setMapPost] = useState<post[]>([])
      useEffect(() => {
            const LoadingPost = toast.loading("fetching post...")
            async function FetchPostAdminSide(): Promise<void> {

                  const accessToken = Cookies.get("access-token")
                  const refreshToken = Cookies.get("refresh-token")
                  const RequestServer = await fetch(ApiRoute + "post-fetching", {
                        method: "post",
                        headers: {
                              "Content-Type":"application/json"
                        },
                        body: JSON.stringify({
                              accessToken: accessToken,
                              refreshToken:refreshToken
                        })
                  })
                  const JsonResponse = await RequestServer.json()
                  toast.dismiss(LoadingPost)
                  setMapPost(JsonResponse)
            }
            FetchPostAdminSide()
      }, [])
      const [ idGetter , setId ] = useState<string>('')
      const deleteDialog = (id:string) => {
            const postElement = document.querySelector(".dialog-box") as HTMLElement 
            postElement.classList.remove("hidden")
            postElement.classList.add("flex")
            setId(id)
      }
      return (<>
            <Toaster />
            <DialogDemo postId={idGetter} />
            <SideNavigation />

                        <div className="blog-section ml-[20px] pt-[200px] w-full h-auto flex justify-center flex-wrap  items-center">
                  {  
                        mapPost.map(items => {
                              return (
                                    
                                    <div key={items._id} className="blog-card mt-[20px] overflow-hidden bg-[#07aa0715] flex gap-5 border-[#00ff95] rounded-[20px] border-1 w-[70%] ml-[100px] h-[auto] ">
                                    <div className="image-section">
                                    <img className="w-[500px] h-[100%] object-cover" src={items.ImagePath} />
                                    </div>
            
                                    <div className="post-dis w-[600px] mt-[30px]"><br/>
                                                <h1 className="font-bold text-[35px] cursor-default">{items.PostTitle.slice(0,12)}<span className="text-[#00ff95]">{items.PostTitle.slice(12)}</span> </h1><br/>
                                                <p>{items.postDescription}</p>
                                          <div className="date-time mt-[10px] flex items-center gap-5 text-[#00ff95] ">
                                              <CiTimer size={20}/>  <p>{items.DateTime}</p>
                                          </div>
                                          <hr className="mt-[20px] border-[#949393]" />
                                          <div className="contact-info mt-[30px] text-[#00ffbf] flex justify-center gap-10 ">
                                                      <MdDelete onClick={()=>deleteDialog(items._id)} className="cursor-pointer" size={30} />
                                    <p className="flex items-center gap-5">{items.visibility == "public" ? <FaEye/>:<FaRegEyeSlash/> }</p>
                                          </div>
                                    </div>   
                  </div>
                              )
                        })

                        }

                  </div>
      </>)
}