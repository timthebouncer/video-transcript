import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import {useEffect, useRef, useState} from "react";
import { CiPlay1 } from "react-icons/ci";
import { IoPlaySkipBackOutline } from "react-icons/io5";
import { IoPlaySkipForwardOutline } from "react-icons/io5";
import { CiPause1 } from "react-icons/ci";


export const PreviewArea=({videoSrc, setIsGenerateScript, highlights=[], contents})=>{
    const [player, setPlayer] = useState(null);
    const [playing, setIsPlay] = useState(false)
    const playerRef = useRef(null)
    const videoRef = useRef(null)
    const [remainingTime, setRemainingTime] = useState('00:00')
    const [currentSubtitle, setCurrentSubtitle] = useState(null);
    const [activeHighlight, setActiveHighlight] = useState(null);
    const [progressPercent, setProgressPercent] = useState(0);
    const subtitleIntervalRef = useRef(null);

    useEffect(() => {
        if (videoRef.current && !playerRef.current && videoSrc) {
            playerRef.current = videojs(videoRef.current, {
                controls: false,
                autoplay: false,
                fluid: true,
                preload: 'auto',
            })
            playerRef.current.on('loadedmetadata', () => {
                const duration = playerRef.current.duration()

                setIsGenerateScript(true)
                fetch('/mock-api/api/generateScript?mockFile=video', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        duration: duration
                    })
                }).then(response => response.json())
                    .then(data => {
                        if(data.code === 200){
                            setIsGenerateScript(false)
                        }
                    });


                updateRemainingTime()
            });

            playerRef.current.on('timeupdate', () => {
                updateRemainingTime();
            });
            playerRef.current?.src({ src: videoSrc, type: 'video/mp4' })
        }

        setPlayer(playerRef.current);
    }, [videoSrc])



    useEffect(() => {
        if (subtitleIntervalRef.current) {
            clearInterval(subtitleIntervalRef.current);
        }

        subtitleIntervalRef.current = setInterval(() => {
            if (!playerRef.current) return;

            const currentTime = playerRef.current.currentTime();

            const currentHighlight = highlights.find(
                item => currentTime >= item.start && currentTime <= item.end
            );

            if (currentHighlight) {
                setCurrentSubtitle(currentHighlight.text);
                setActiveHighlight(currentHighlight);

                const highlightDuration = currentHighlight.end - currentHighlight.start;
                const elapsedTime = currentTime - currentHighlight.start;
                const percent = Math.min(100, (elapsedTime / highlightDuration) * 100);
                setProgressPercent(percent);
            } else {
                setCurrentSubtitle(null);
                setActiveHighlight(null);
                setProgressPercent(0);
            }

        }, 200);

        return () => clearInterval(subtitleIntervalRef.current);
    }, [highlights]);


    const updateRemainingTime = () => {
        if (playerRef.current) {
            const currentTime = playerRef.current.currentTime()
            const duration = playerRef.current.duration()
            const timeLeft = duration - currentTime

            const minutes = Math.floor(timeLeft / 60)
            const seconds = Math.floor(timeLeft % 60)
            setRemainingTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`)

        }
    }

    const handlePlayPause = () => {
        if (playerRef.current) {
            if (playerRef.current.paused()) {
                setIsPlay(true)
                playerRef.current.play()
            } else {
                setIsPlay(false)
                playerRef.current.pause()
            }
        }
    }

    const handleRewind = () => {
        if (playerRef.current) {
            playerRef.current.currentTime(playerRef.current.currentTime() - 10) // 快退 10 秒
        }
    }

    const handleForward = () => {
        if (playerRef.current) {
            playerRef.current.currentTime(playerRef.current.currentTime() + 10) // 快進 10 秒
        }
    }

    const jumpToHighlight = (item) => {
        if (player) player.currentTime(item.start);
    };
    const isHighlight=(start)=>{
        const findHighlight = highlights.find(item=> item.start === start)
        return findHighlight
    }

    const isActiveHighlight = (id) => {
        return activeHighlight && activeHighlight.id === id;
    };

    return(
        <div className="flex-1 bg-#1F2937 color-white py-4 px-4">
            <h1 className="font-bold text-lg">
                Preview
            </h1>
            <div className="mt-4">
                <div className="relative">
                    <video ref={videoRef} className="video-js vjs-default-skin w-full"/>
                    <div className="absolute bottom-0 p-4">
                        {currentSubtitle}
                    </div>
                </div>


                <div className="mt-4 text-center">
                <div className="flex justify-between items-center">
                        <button
                            onClick={handleRewind}
                            className="border-none bg-transparent leading-1"
                        >
                            <IoPlaySkipBackOutline color={'white'} size={24}/>
                        </button>
                        <button
                            onClick={handlePlayPause}
                            className="border-none bg-transparent leading-1"
                        >
                            {
                                playing ? <CiPause1 color={'white'} size={24}/> : <CiPlay1 color={'white'} size={24}/>
                            }
                        </button>
                        <button
                            onClick={handleForward}
                            className="border-none bg-transparent leading-1"
                        >
                            <IoPlaySkipForwardOutline color={'white'} size={24}/>
                        </button>
                        <div className="text-lg">
                            {remainingTime}
                        </div>
                    </div>
                    <div
                        className="flex justify-between w-full bg-#374151 mt-4"
                    >
                        {contents.flatMap((section) => section.chapters).map((item) => {
                            const active = isActiveHighlight(item.id);
                            const highlighted = isHighlight(item.start);

                            return (
                                <div className="relative">
                                    <button
                                        className={`h-full w-full rounded p-3 cursor-pointer transition border-none ${
                                            highlighted ? 'bg-blue-500' : 'invisible'
                                        }`}
                                        onClick={() => jumpToHighlight(item)}
                                    >
                                    </button>
                                    {active && (
                                        <div
                                            className="absolute top-0 bottom-0 left-0 transition-all duration-200 ease-linear bg-red"
                                            style={{
                                                left: `${progressPercent}%`,
                                                width: '2px',
                                            }}
                                        >
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}