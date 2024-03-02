

const AudioPlayer = ()=>{


    function togglePlay(){
        // toggle the isPlaying state
    }

    return(
        <>
            <div className="w-96 border p-3 flex items-center justify-center">
                <button onClick={togglePlay} className="border">
                    Play/Pause
                </button>
            </div>
        </>
    )

}

export default AudioPlayer;