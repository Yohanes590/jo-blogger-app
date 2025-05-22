import NavigationBar from "../_disabled-routes/nav-bar"
import { MdOutlineEmail } from "react-icons/md";
import { CiTimer } from "react-icons/ci";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import ApiRoute from "../admin/api-route";
import { useEffect, useState } from "react";
type post = {
      DateTime: string,
      ImagePath: string,
      PostTitle: string,
      visibility: string,
      postDescription:string
      __v: number,
      _id:string,
}
export default function Blog() {
      const [ MapObj , setMapObj ] = useState<post[]>([])
      useEffect(() => {
            const fetchPost = async():Promise<void> => {
                  const ServerResponse = await fetch(ApiRoute + "public-post", {
                        method: "post",
                        headers: {
                              "Content-Type":"application/json"
                        },
                  })
                  const serverChangedResponse = await ServerResponse.json()
                  console.log(serverChangedResponse)
                  setMapObj(serverChangedResponse)
            }
            fetchPost()
      }, [])
      return (<>
            <NavigationBar />
            <div className="blog-section pt-[200px] w-full h-auto flex justify-center flex-wrap  items-center">

                  {
                        MapObj.map(items => {
                              return (
                                    <div key={items._id} className="blog-card overflow-hidden bg-[#07aa0715] flex gap-5 flex-wrap border-[#00ff95] rounded-[20px] border-1 w-[80%] h-auto ">
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
                                          <div className="contact-info mt-[20px] text-[#00ffbf] flex justify-center gap-10 ">
                                                <a href="mailto:jplussince34@gmail.com"><MdOutlineEmail className="cursor-pointer" size={30} /></a>
                                               <a href="http://github.com/yohanes590/"><FaGithub className="cursor-pointer" size={30} /></a>
                                               <a href="https://t.me/Mrx_Man21"><FaInstagram className="cursor-pointer" size={30}/></a>
                                               <a href="https://www.linkedin.com/in/yohanes-mulugeta-12010532b/"> <FaLinkedin className="cursor-pointer" size={30}/></a>
                                          </div>
                                    </div>   
                              </div>
                            )  
                        })
                       
            }
                  

            </div>
      </>)
}