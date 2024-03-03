import { useRef, useState, useEffect } from "react";
import AudioPlayer from "./components/AudioPlayer";
import Track from "./components/Track";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
   const inputRef = useRef(null);
   const [audioArr, setAudioArr] = useState([]);
   const [isPlaying, setIsPlaying] = useState(false);
   const [currentTrack, setCurrentTrack] = useState(0);

   function getFileFromDevice() {
      inputRef.current.click();
   }

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

   const handleTrackFinish = () => {
      setCurrentTrack((prev) => prev + 1);
   };

   const handlePlay = () => {
      setIsPlaying(true);
   };

   return (
      <main className='w-screen h-screen flex flex-col items-center justify-center bg-gray-200'>
         {audioArr.length !== 0 && (
            <h1 className='text-4xl font-bold text-slate-800 mb-6 bg-transparent'>
               Alright! Let&apos;s get rolling!
            </h1>
         )}
         <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='droppable' direction='horizontal'>
               {(provided) => (
                  <div
                     {...provided.droppableProps}
                     ref={provided.innerRef}
                     className='flex flex-row p-4 bg-gray-300 rounded-md'
                  >
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

         <AudioPlayer onPlay={handlePlay} />

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
            Select File
         </button>
      </main>
   );
}

export default App;
