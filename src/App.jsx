import {useEffect, useState} from 'react'
import {TranscriptArea} from "./components/TranscriptArea.jsx";
import {PreviewArea} from "./components/PreviewArea.jsx";
import {UploadVideo} from "./components/UploadVideo.jsx";
import {apiRequest} from "../api/video.js";

function App() {
    const [videoSrc, setVideoSrc] = useState("")
    const [contents, setContents] = useState([])
    const [highlights, setHighlights] = useState([])
    const [isGenerateScript, setIsGenerateScript] = useState(false)

    useEffect(()=>{
        if(videoSrc && !isGenerateScript){

            apiRequest("/api/videoInfo", "GET")
              .then(response => {
                  if(response.status === 200){
                      setContents(response.data)
                  }
              })
              .catch(error => {
                  console.log("錯誤:", error);
              });
        }
    }, [videoSrc, isGenerateScript])

    return (
        <div className="md:flex w-full h-100dvh">
            {
                !videoSrc ? <UploadVideo setVideoSrc={setVideoSrc}/>:<>
                    <TranscriptArea contents={contents} highlights={highlights} setHighlights={setHighlights} isGenerateScript={isGenerateScript} />
                    <PreviewArea videoSrc={videoSrc} setIsGenerateScript={setIsGenerateScript} highlights={highlights} contents={contents} />
                </>
            }
        </div>
    )
}

export default App