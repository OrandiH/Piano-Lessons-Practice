import React, { useState, useEffect, useRef } from 'react';
import './Piano.css';

const notes = [
  { note: 'C4', frequency: 261.63, color: 'white' },
  { note: 'C#4', frequency: 277.18, color: 'black' },
  { note: 'D4', frequency: 293.66, color: 'white' },
  { note: 'D#4', frequency: 311.13, color: 'black' },
  { note: 'E4', frequency: 329.63, color: 'white' },
  { note: 'F4', frequency: 349.23, color: 'white' },
  { note: 'F#4', frequency: 369.99, color: 'black' },
  { note: 'G4', frequency: 392.00, color: 'white' },
  { note: 'G#4', frequency: 415.30, color: 'black' },
  { note: 'A4', frequency: 440.00, color: 'white' },
  { note: 'A#4', frequency: 466.16, color: 'black' },
  { note: 'B4', frequency: 493.88, color: 'white' },
  { note: 'C5', frequency: 523.25, color: 'white' },
];

function Piano() {
  const [activeNote, setActiveNote] = useState(null); //store single active note
  const audioContext = useRef(null);
  const audioNodes = useRef(null);

  useEffect(() => {
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);

  const playNote = (frequency) => {
    if (!audioContext.current) return;

    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.current.currentTime);
    gainNode.gain.setValueAtTime(0.5, audioContext.current.currentTime);

    oscillator.start();
    return { oscillator, gainNode };
  };

  const stopNote = () => {
    if (audioNodes.current) {
      audioNodes.current.oscillator.stop();
      audioNodes.current.oscillator.disconnect();
      audioNodes.current.gainNode.disconnect();
      audioNodes.current = null;
    }
  };

  const handleKeyDown = (note) => {
    if (activeNote) {
      stopNote();
    }
    audioNodes.current = playNote(note.frequency);
    setActiveNote(note);
  };

  const handleKeyUp = () => {
    stopNote();
    setActiveNote(null);
  };

  return (
    <div className='piano-container'>
        <div className="piano">
      {notes.map((note) => (
        <div
          key={note.note}
          className={`key ${note.color}`}
          onMouseDown={() => handleKeyDown(note)}
          onMouseUp={handleKeyUp}
          onMouseLeave={handleKeyUp}
        >
          {note.note}
        </div>
      ))}
    </div>
    </div>
    
  );
}

export default Piano;