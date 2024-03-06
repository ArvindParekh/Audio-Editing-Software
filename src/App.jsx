import { useRef, useState, useEffect } from "react";
import AudioPlayer from "./components/AudioPlayer";
import Track from "./components/Track";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
   const inputRef = useRef(null);
   const [audioArr, setAudioArr] = useState([]);
   const [isPlaying, setIsPlaying] = useState(false);
   const [currentTrack, setCurrentTrack] = useState(0);

   useEffect(() => {
      // Event listeners for drag and drop
      const handleDragOver = (e) => {
         e.preventDefault();
      };

      const handleDrop = (e) => {
         e.preventDefault();
         const files = e.dataTransfer.files;
         const newAudioArr = Array.from(files).map((file) =>
            URL.createObjectURL(file)
         );
         setAudioArr((prevArr) => [...prevArr, ...newAudioArr]);
      };

      window.addEventListener("dragover", handleDragOver);
      window.addEventListener("drop", handleDrop);

      // Cleaning up the event listeners on component unmount
      return () => {
         window.removeEventListener("dragover", handleDragOver);
         window.removeEventListener("drop", handleDrop);
      };
   }, []);

   // Opens up the file manager
   function getFileFromDevice() {
      inputRef.current.click();
   }

   // Updates the AudioArr array with the files you select
   function handleChange(e) {
      const files = e.target.files;
      const newAudioArr = Array.from(files).map((file) =>
         URL.createObjectURL(file)
      );
      setAudioArr((prevArr) => [...prevArr, ...newAudioArr]);
   }

   const handleOnDragEnd = (result) => {
      if (!result.destination) return;

      const items = Array.from(audioArr);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      setAudioArr(items);
   };

   // When a wavesurfer track finishes, it calls the handleTrackFinish function to play the next track on the timeline
   const handleTrackFinish = () => {
      console.log(currentTrack, audioArr.length);
      if (currentTrack == audioArr.length - 1) {
         setCurrentTrack(0);
         setIsPlaying(false);
      } else {
         setCurrentTrack((prev) => prev + 1);
      }
   };

   // Toggles the play/pause functionality
   const handlePlay = () => {
      setIsPlaying((prev) => !prev);
   };

   return (
      <main className='w-screen h-screen flex flex-col items-center justify-center bg-gray-200'>
         {audioArr.length !== 0 && (
            <h1 className='text-4xl font-bold text-slate-800 mb-6 bg-transparent'>
               Alright! Let&apos;s get rolling!
            </h1>
         )}

         {/* Setting up a global drag-drop context here - using react-beautiful-dnd */}
         <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='droppable' direction='horizontal'>
               {(provided) => (
                  <div
                     {...provided.droppableProps}
                     ref={provided.innerRef}
                     className='flex flex-row p-4 bg-gray-300 rounded-md'
                  >
                     {/* Mapping over the audioArr and listing out all the tracks onto the timeline */}
                     {audioArr.map((audioFile, index) => (
                        <Draggable
                           key={audioFile}
                           draggableId={audioFile}
                           index={index}
                        >
                           {(provided) => (
                              <div
                                 ref={provided.innerRef}
                                 {...provided.draggableProps}
                                 {...provided.dragHandleProps}
                                 className='mx-2'
                              >
                                 <Track
                                    audioFile={audioFile}
                                    play={isPlaying && currentTrack === index}
                                    onTrackFinish={handleTrackFinish}
                                    playingStatus={currentTrack === index}
                                 />
                              </div>
                           )}
                        </Draggable>
                     ))}

                     {provided.placeholder}
                  </div>
               )}
            </Droppable>
         </DragDropContext>

         <input
            type='file'
            accept='audio/*'
            style={{ display: "none" }}
            ref={inputRef}
            onChange={handleChange}
            multiple
         />
         <button
            className='mt-5 rounded-md bg-gray-800 p-2 text-base font-medium text-white hover:bg-white hover:text-gray-800 transition-all hover:border hover:border-gray-800'
            onClick={getFileFromDevice}
         >
            Select a file or drop it here
         </button>

         <AudioPlayer onPlay={handlePlay} />
      </main>
   );
}

export default App;
