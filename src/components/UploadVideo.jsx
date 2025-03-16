import {useDropzone} from 'react-dropzone'
import { IoCloudUploadOutline } from "react-icons/io5";

export const UploadVideo=({setVideoSrc})=> {
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0]
        if (file) {
            const url = URL.createObjectURL(file)

            const apiUrl = import.meta.env.PROD ? '/api/uploadVideo' : '/mock-api/api/uploadVideo?mockFile=video';

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: url
                })
            })
                .then(response => response.json())
                .then(data => {
                    setVideoSrc(data.url);
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