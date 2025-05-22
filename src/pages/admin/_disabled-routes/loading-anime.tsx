import ClipLoader from "react-spinners/ClipLoader";
export default function LoadingAnimation() {
      return (<>
            <div className="loading-container z-50 fixed backdrop-blur-2xl w-full h-screen hidden justify-center items-center">
                  <div className="loading-item">
                        <ClipLoader color="white" size={60} />
                  </div>
            </div>
      </>)
}