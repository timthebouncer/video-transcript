import {useDropzone} from 'react-dropzone'
import { IoCloudUploadOutline } from "react-icons/io5";
import {apiRequest} from "../../api/video.js";

export const UploadVideo=({setVideoSrc})=> {
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0]
        if (file) {
            const url = URL.createObjectURL(file)

            apiRequest("/api/uploadVideo", "POST", JSON.stringify(url))
              .then(response => {
                if (response.status === 200) {
                  setVideoSrc(response.videoUrl)
                }
              })
              .catch(error => {
                  console.log("錯誤:", error);
              });
        }
    }
    const {getRootProps, getInputProps} = useDropzone({onDrop})

    return (
            <div {...getRootProps()}
                 className="border-2 border-dashed w-120 h-80 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div>
                    <IoCloudUploadOutline className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' size={40} />
                    <input {...getInputProps()} />
                </div>
            </div>

    )
}