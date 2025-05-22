import SideNavigation from "./_disabled-routes/side-navigation"
import ApiRoute from "./api-route"
import { useState } from "react"
import { Toaster , toast } from "react-hot-toast"
export default function AddingPost() {
      const [title, setTitle] = useState<string>('')
      const [description, setdescription] = useState<string>('')
      const [dateTime, setDateTime] = useState<string>('')
      const [postedType, setType] = useState<string>('')
      const [image , setImage ] = useState<File>()


      async function creatingPost(): Promise<void> {
            const FORMDATA = new FormData()
            FORMDATA.append("title",title)
            FORMDATA.append("description",description)
            FORMDATA.append("dateTime", dateTime)
            FORMDATA.append("postedType", postedType)
            console.log(postedType)
            if(image){
            FORMDATA.append("image", image)
            }
            
            if (title === "") {
                  toast.error("title required", {
                        style: {
                              background: "#000906",
                              color:"white"
                  }})
            } else if (description === "") {
                  toast.error("description required", {
                        style: {
                              background: "#000906",
                              color:"white"
                  }})
            } else if (dateTime === "") {
                  toast.error("date and time required", {
                        style: {
                              background: "#000906",
                              color:"white"
                  }})
            }else if (!image){
                  toast.error("insert image please ", {
                        style: {
                              background: "#000906",
                              color:"white"
                  }})
            } else if (postedType === "") {
                  toast.error("choose visibility ", {
                        style: {
                              background: "#000906",
                              color:"white"
                  }})
            } else {
               const StopProgress =   toast.loading("post progress...")
                  const serverResponse = await fetch(ApiRoute + 'adding-post-route', {
                        method: "post",
                        body:FORMDATA
                  })
                  const changingData = await serverResponse.json()
                  console.log(changingData)  
                  if (changingData.status === 200) {
                        toast.dismiss(StopProgress)
                        toast.success(changingData.message)
                  } else if(changingData.status === 400) {
                       toast.error(changingData.message)
                 }else if(changingData.status === 500) {
                  toast.error(changingData.message)
                  } else {
                  toast.error(changingData.message)
                 }

            }

            }
      return (<>
            <Toaster/>
            <SideNavigation />
            <div className="post-part flex justify-center items-center w-full h-screen">
                  <div className="posting-container">

                  <div className="header text-[25px]">
                        <h1>Admin / Adding Post</h1>
                        </div>
                        
                        <div className="input-section mt-[30px]">
                              <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setTitle(e.target.value)} type="text" placeholder="post title" className="w-[800px] h-[45px] bg-[#013a228a] outline-none pl-[20px]" /><br/>
                              <textarea onChange={(e)=>setdescription(e.target.value)}  placeholder="post title" className="w-[800px] mt-[20px] pt-[10px] h-[200px] bg-[#013a228a] outline-none pl-[20px]" /><br/>
                               <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setDateTime(e.target.value)}  type="datetime-local" className="w-[800px] h-[45px] outline-none bg-[#013a228a] pl-[20px]" name="" id="" />
                               <br /><br />
                              <label htmlFor="blog-photo" className=" flex items-center justify-center gap-5 w-[800px] h-[45px] cursor-pointer bg-[#d19616d7] absolute">Choose image</label><br /><br />
                              <select onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setType(e.target.value)} className="w-[800px] h-[45px] outline-none bg-[#013a228a] pl-[20px]">
                                    <option value="">Select-visibility</option>
                                    <option value="public">public</option>
                                    <option value="private">private</option>
                              </select>
                              <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setImage(e.target.files?.[0])} type="file" id="blog-photo" className="hidden" />
                              <div className="action-button-for-post flex items-center gap-5 mt-[20px]">
                                    <button onClick={creatingPost} className="w-[300px] h-[40px] bg-[#16d15ed7] cursor-pointer rounded-[5px]">Post</button>
                                    <button className="w-[250px] h-[40px] cursor-pointer rounded-[5px] bg-[#ff5d5dd7]">Cancel</button>
                              </div>
                        </div>

                  </div>
            </div>
      </>)
}

