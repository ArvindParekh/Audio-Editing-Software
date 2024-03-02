import { useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

const Track = ({ audioFile }) => {
   const waveformRef = useRef(null);

   useEffect(() => {
      console.log(audioFile);
      const wavesurfer = WaveSurfer.create({
         container: waveformRef.current,
         waveColor: "violet",
         progressColor: "purple",
         cursorWidth: 1,
         height: 100,
         url: audioFile,
      });

      wavesurfer.on("interaction", () => {
         wavesurfer.play();
      });

      return () => {
         wavesurfer.destroy();
      };
   }, [audioFile]);

   return <div ref={waveformRef} className='w-96 h-96 border-4 bg-white'></div>;
};

export default Track;
