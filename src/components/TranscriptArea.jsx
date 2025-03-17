import {ClipBar} from "./ClipBar.jsx";

export const TranscriptArea=({contents, highlights, setHighlights, isGenerateScript})=>{
    return(
        <div className="flex-1 bg-#F3F4F6 py-4 px-4">
          {
            isGenerateScript ? <div className="flex justify-center items-center h-screen">
               Loading...
            </div> : <>
              <h1 className="font-bold text-lg">
                Transcript
              </h1>
              <div className='mt-4'>
                {
                  contents.map((item, index)=>{
                    return <div className="h-1/4" key={index}>
                      <div className="mb-6">
                        <h1 className="text-md font-bold my-2">{item.sectionTitle}</h1>
                        <ClipBar chapters={item.chapters} highlights={highlights} setHighlights={setHighlights}/>
                      </div>
                    </div>
                  })
                }
              </div>
            </>
          }
        </div>
    )
}
