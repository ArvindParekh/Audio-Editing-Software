import { useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

// eslint-disable-next-line react/prop-types
const Track = ({ audioFile, play, onTrackFinish, playingStatus }) => {
   const waveformRef = useRef(null);

   useEffect(() => {
      const wavesurfer = WaveSurfer.create({
         container: waveformRef.current,
         waveColor: "white",
         progressColor: "violet",
         cursorWidth: 1,
         height: 200,
         url: audioFile,
         interact: play ? true : false,
      });

      if (play) {
         wavesurfer.on("ready", () => {
            wavesurfer.play();
         });
      } else if (playingStatus) {
         wavesurfer.pause();
      }

      wavesurfer.on("finish", () => {
         // const duration = wavesurfer.getDuration();
         // console.log(duration, wavesurfer.getDuration());
         // wavesurfer.seekTo(duration);
         onTrackFinish();
      });

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
