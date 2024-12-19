import { Button } from "./ui/button";
import { useState, useRef } from "react";

const agentId = "MVPeters-584IGQ9sTDnGyEhLAwbko";
const apiKey = "ak-273fef8169fe4001a94d0dfc7e1b2b48";

class AudioStreamPlayer {
  audioContext: AudioContext;
  queue: Float32Array[];
  isPlaying: boolean;
  sampleRate: number;
  nextStartTime: number;

  constructor(sampleRate = 24000) {
    this.audioContext = new (window.AudioContext)();
      this.queue = [];
      this.isPlaying = false;
      this.sampleRate = sampleRate;
      this.nextStartTime = 0;
    }
  
    addToQueue(base64Data: string) {
      console.log("Received base64 length:", base64Data.length);
      console.log("First 100 chars:", base64Data.substring(0, 100));
      
      // Remove any data URL prefix if present
      const cleanData = base64Data.replace(/^data:audio\/wav;base64,/, '');
      
      // Convert base64 to ArrayBuffer
      const binaryString = atob(cleanData);
      const audioData = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        audioData[i] = binaryString.charCodeAt(i);
      }
      
      // For WAV format, we need to skip the header (44 bytes) and read as 16-bit PCM
      const dataView = new DataView(audioData.buffer);
      const float32Array = new Float32Array((audioData.length - 44) / 2);
      
      for (let i = 0; i < float32Array.length; i++) {
        // Read 16-bit PCM values and convert to float32 (-1 to 1)
        const int16Value = dataView.getInt16(44 + i * 2, true); // true for little-endian
        float32Array[i] = int16Value / 32768.0; // Normalize to -1 to 1
      }
      
      this.queue.push(float32Array);
      
      if (!this.isPlaying) {
        this.isPlaying = true;
        this.nextStartTime = this.audioContext.currentTime;
        this.playNext();
      }
    }
  
    playNext() {
      if (this.queue.length === 0) {
        this.isPlaying = false;
        return;
      }
      
      const audioData = this.queue.shift()!;
      const audioBuffer = this.audioContext.createBuffer(1, audioData.length, this.sampleRate);
      audioBuffer.getChannelData(0).set(audioData);
      
      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.audioContext.destination);
      
      // Schedule the next chunk
      const currentTime = this.audioContext.currentTime;
      const startTime = Math.max(currentTime, this.nextStartTime);
      source.start(startTime);
      
      // Calculate the next start time based on the buffer duration
      const bufferDuration = audioBuffer.duration;
      this.nextStartTime = startTime + bufferDuration;
      
      source.onended = () => {
        // Only play the next chunk if there are items in the queue
        if (this.queue.length > 0) {
          this.playNext();
        } else {
          this.isPlaying = false;
        }
      };
    }
}

const audioStreamQueue = new AudioStreamPlayer();

export function PlayAIButton() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const setupWebSocket = () => {
    const ws = new WebSocket("wss://api.play.ai/v1/talk/" + agentId);

    ws.onopen = () => {
      console.log("Connected to Play.ai");
      ws.send(
        JSON.stringify({
          type: "setup",
          apiKey: apiKey,
          outputFormat: "wav",
          outputSampleRate: 24000,
        })
      );
      startRecording();
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "audioStream") {
        console.log("Received audio data:", {
          length: message.data.length,
          preview: message.data.substring(0, 100),
        });

        audioStreamQueue.addToQueue(message.data);
        
       // playAudioFromBase64(message.data);
      }
    };

    setSocket(ws);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: true,
          autoGainControl: true,
          noiseSuppression: true,
        },
      });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = async (event) => {
        const base64Data = await blobToBase64(event.data);
        socket?.send(
          JSON.stringify({
            type: "audioIn",
            data: base64Data,
          })
        );
      };

      mediaRecorder.start(100);
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    socket?.close();
    setSocket(null);
    setIsRecording(false);
  };

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      setupWebSocket();
    }
  };

  return (
    <Button
      variant="outline-flamingo"
      className="text-4xl py-5 mr-1 align-baseline"
      onClick={handleClick}
    >
      {isRecording ? "Stop" : "believer"}
    </Button>
  );
}

async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64Data = reader.result?.toString().split(",")[1];
      resolve(base64Data || "");
    };
  });
}
