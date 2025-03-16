import {useEffect, useState} from 'react'
import {TranscriptArea} from "./components/TranscriptArea.jsx";
import {PreviewArea} from "./components/PreviewArea.jsx";
import {UploadVideo} from "./components/UploadVideo.jsx";

function App() {
    const [videoSrc, setVideoSrc] = useState("")
    const [contents, setContents] = useState([])
    const [highlights, setHighlights] = useState([])
    const [isGenerateScript, setIsGenerateScript] = useState(false)

    useEffect(()=>{
        if(videoSrc && !isGenerateScript){
            fetch('/mock-api/api/videoInfo?mockFile=video')
                .then(res => {
                    res.text().then(rs=>{
                        const {scriptList} = JSON.parse(rs)
                        setContents(JSON.parse(scriptList))
                    })
                })

        }
    }, [videoSrc, isGenerateScript])

    return (
        <div className="md:flex w-full h-100dvh">
            {
                !videoSrc ? <UploadVideo setVideoSrc={setVideoSrc}/>:<>
                    <TranscriptArea contents={contents} highlights={highlights} setHighlights={setHighlights} />
                    <PreviewArea videoSrc={videoSrc} setIsGenerateScript={setIsGenerateScript} highlights={highlights} contents={contents} />
                </>
            }
        </div>
    )
}

export default App