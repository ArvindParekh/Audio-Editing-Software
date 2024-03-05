import { useState } from "react";
import { useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

// eslint-disable-next-line react/prop-types
const Track = ({ audioFile, play, onTrackFinish }) => {
   const waveformRef = useRef(null);
   const [waveSurfer, setWaveSurfer] = useState(null);

   useEffect(() => {
      const wavesurfer = WaveSurfer.create({
         container: waveformRef.current,
         waveColor: "white",
         progressColor: "violet",
         cursorWidth: 1,
         height: 200,
         url: audioFile,
         interact: play ? true : false,
         // responsive: true,
      });

      if (play) {
         wavesurfer.on("ready", () => {
            // wavesurfer.load(audioFile);
            wavesurfer.play();
         });
      }
      else{
         wavesurfer.pause();
      }

      wavesurfer.on("finish", onTrackFinish);

      return () => {
         wavesurfer.destroy();
      };
   }, [play, audioFile, onTrackFinish]);

   return (
      <div
         ref={waveformRef}
         className='w-96 h-50 border-4 bg-white shadow-lg rounded-md overflow-hidden'
      ></div>
   );
};

export default Track;
