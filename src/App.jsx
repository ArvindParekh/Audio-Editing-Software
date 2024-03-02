import { useRef, useState, useEffect } from "react";
import AudioPlayer from "./components/AudioPlayer";
import Track from "./components/Track";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
   const inputRef = useRef(null);
   const [audioArr, setAudioArr] = useState([]);

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

   useEffect(() => {
      console.log(audioArr);
   }, [audioArr]);

   const handleOnDragEnd = (result) => {
      if (!result.destination) return;

      const items = Array.from(audioArr);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      setAudioArr(items);
   };

   return (
      <main className='w-screen h-screen flex items-center justify-center border'>
         <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='droppableId' direction='horizontal'>
               {(provided) => (
                  <div
                     {...provided.droppableProps}
                     ref={provided.innerRef}
                     className='flex flex-row relative' // Apply the CSS class here
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
                                 className=''
                              >
                                 <Track audioFile={audioFile} />
                              </div>
                           )}
                        </Draggable>
                     ))}
                     {provided.placeholder}
                  </div>
               )}
            </Droppable>
         </DragDropContext>

         <AudioPlayer />
         <input
            type='file'
            accept='audio/*'
            style={{ display: "none" }}
            ref={inputRef}
            onChange={handleChange}
            multiple
         />
         <button
            className='mt-5 rounded-md border-none bg-black p-2 text-base font-medium text-white'
            onClick={getFileFromDevice}
         >
            Select File
         </button>
      </main>
   );
}

export default App;
