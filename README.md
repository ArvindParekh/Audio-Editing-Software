# Audio Pill Player 🎶

## Introduction

The Audio Pill Player is a React-based web application designed to simulate the functionality of iMovie but focused on audio editing. The goal of this project was to create a dynamic platform where users can add individual audio files, arrange them on a timeline, and experience real-time playback.

## 🚀 Approach

React was chosen as the primary library for frontend development due to its component-based structure and efficient rendering. The application leverages the `react-beautiful-dnd` library for drag-and-drop functionality, providing users with an intuitive way to arrange audio tracks. It utilizes `WaveSurfer.js` for audio playback and manipulation. Each audio track was represented as a "pill" on a timeline, allowing users to add, upload, and rearrange tracks. The application was designed to dynamically adjust playback based on the arrangement of tracks on the timeline.

## Features and Functionalities

-  **Drag-and-Drop:** Implemented drag-and-drop functionality using `react-beautiful-dnd` to allow users to rearrange audio tracks effortlessly.
-  **Audio Waveform Display:** Utilized the `wavesurfer.js` library to render interactive audio waveforms for each track.
-  **Dynamic Playback:** Integrated real-time playback, ensuring users can experience the audio arrangement as they drag and drop tracks.

## 🛠️ Challenges

### Working with WaveSurfer Instances

One of the initial challenges was ensuring that WaveSurfer instances were fully initialized before attempting to use them. Storing them in state and using events on them proved to be tricky, leading to the exploration of different strategies.

### Handling Multiple Audio Tracks

Managing multiple audio tracks, including adding, uploading, and rearranging tracks, required a robust state management strategy. Implementing drag-and-drop functionality was challenging, as the order of tracks needed to be dynamically adjusted based on user interactions.

### Synchronized Playback

Achieving synchronized playback with rearranged audio tracks presented a significant challenge. Handling the event fired after drag-and-drop ends was crucial for updating the array of audio files and maintaining synchronized playback.

## Project Structure 

- `src/App.jsx`: The main component that renders the entire application. Manages the state, file uploads, and the drag-and-drop functionality.

- `src/components/AudioPlayer.jsx`: A component responsible for rendering the audio player, controlling playback, and handling play/pause functionality.

- `src/components/Track.jsx`: A component representing an individual audio track on the timeline. It utilizes the wavesurfer.js library for audio visualization and playback.
## 🌐 Website Link

[Audio-Pill-Player](https://audio-pill-player.netlify.app)  
[Loom Video](#)

