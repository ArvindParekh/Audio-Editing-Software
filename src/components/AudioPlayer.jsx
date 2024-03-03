const AudioPlayer = ({ onPlay }) => {
   return (
      <>
         <div className='fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex items-center justify-center'>
            <button
               onClick={onPlay}
               className='bg-white flex items-center justify-center gap-2 p-3 rounded-full text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300'
            >
               {/* You can use your preferred Play/Pause icon here */}
               {/** Example using Font Awesome icons */}
               <img
                  src='/play-solid.svg'
                  width={20}
                  height={50}
                  className='bg-transparent'
               />
               <img
                  src='/pause-solid.svg'
                  width={20}
                  height={20}
                  className='bg-transparent'
               />
            </button>
         </div>
      </>
   );
};

export default AudioPlayer;
