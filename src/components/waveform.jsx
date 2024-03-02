// Waveform.js

import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Waveform = () => {
  const waveformRef = useRef(null);

  useEffect(() => {
    // Initialize Wavesurfer
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'violet',
      progressColor: 'purple',
      cursorWidth: 1,
      height: 100,
    });

    // Load audio file (replace 'audiofile.mp3' with your actual file name)
    wavesurfer.load('/audiofile.mp3');

    // Clean up on component unmount
    return () => wavesurfer.destroy();
  }, []);

  return <div ref={waveformRef}></div>;
};

export default Waveform;
