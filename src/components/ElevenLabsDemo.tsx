"use client";

import { useState, useEffect } from "react";
import { useConversation } from "@11labs/react";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
  isPartial?: boolean;
};

type ElevenLabsMessage = {
  type: string;
  text: string;
  is_final?: boolean;
};

export function ElevenLabsDemo() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(false);
  const [volumeEnabled, setVolumeEnabled] = useState(true);

  // Initialize the ElevenLabs conversation
  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to ElevenLabs AI");
      // Add a welcome message
      setMessages([
        {
          id: "welcome",
          text: "Hello! I'm your AI assistant. How can I help you today?",
          sender: "ai",
        },
      ]);
    },
    onDisconnect: () => {
      console.log("Disconnected from ElevenLabs AI");
      setMicrophoneEnabled(false);
    },
    onMessage: (message: ElevenLabsMessage) => {
      if (message.type === "transcript") {
        // Handle user transcript
        if (message.is_final) {
          setMessages((prev) => {
            // Find and update the partial message
            const filtered = prev.filter((m) => !m.isPartial);
            return [
              ...filtered,
              {
                id: Date.now().toString(),
                text: message.text,
                sender: "user",
              },
            ];
          });
        } else {
          // Handle partial transcript
          setMessages((prev) => {
            const filtered = prev.filter((m) => !m.isPartial);
            return [
              ...filtered,
              {
                id: "partial",
                text: message.text,
                sender: "user",
                isPartial: true,
              },
            ];
          });
        }
      } else if (message.type === "text") {
        // Handle AI response
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text: message.text,
            sender: "ai",
          },
        ]);
      }
    },
    onError: (error: unknown) => {
      console.error("ElevenLabs AI error:", error);
    },
  });

  const { status, isSpeaking } = conversation;

  // Start conversation when the modal is opened
  useEffect(() => {
    if (open) {
      requestMicrophonePermission();
    } else {
      if (status === "connected") {
        handleEndConversation();
      }
    }
  }, [open, status]);

  const requestMicrophonePermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicrophoneEnabled(true);
    } catch (error) {
      console.error("Microphone permission denied:", error);
      setMicrophoneEnabled(false);
    }
  };

  const handleStartConversation = async () => {
    try {
      // Replace with your actual agent ID or public agent ID
      // For private agents, you would use the signed URL from your backend
      await conversation.startSession({
        agentId: "your-public-agent-id",
      });
      setMicrophoneEnabled(true);
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  };

  const handleEndConversation = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error("Failed to end conversation:", error);
    }
  };

  const toggleMicrophone = () => {
    if (status === "connected") {
      handleEndConversation();
      setMicrophoneEnabled(false);
    } else {
      handleStartConversation();
    }
  };

  const toggleVolume = async () => {
    try {
      await conversation.setVolume({ volume: volumeEnabled ? 0 : 1 });
      setVolumeEnabled(!volumeEnabled);
    } catch (error: unknown) {
      console.error("Failed to toggle volume:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full py-6 rounded-lg mb-6 bg-slate-950 hover:bg-slate-900 text-white">
          Try the demo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>ElevenLabs AI Demo</DialogTitle>
          <DialogDescription>
            {microphoneEnabled
              ? "Your microphone is enabled. Speak to interact with the AI."
              : "Click the microphone button to start the conversation."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col h-[400px]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 rounded-md">
            {messages.map((message, index) => (
              <div
                key={message.isPartial ? `partial-${index}` : message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-white border border-slate-200"
                  } ${message.isPartial ? "opacity-70" : ""}`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isSpeaking && (
              <div className="flex justify-start">
                <div className="rounded-lg px-4 py-2 bg-white border border-slate-200">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center mt-4 gap-4">
            <Button
              onClick={toggleMicrophone}
              variant="outline"
              size="icon"
              className={`rounded-full ${
                status === "connected" ? "bg-red-100 hover:bg-red-200" : ""
              }`}
            >
              {status === "connected" ? (
                <MicOff className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>
            <Button
              onClick={toggleVolume}
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              {volumeEnabled ? (
                <Volume2 className="h-5 w-5" />
              ) : (
                <VolumeX className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="text-center mt-4 text-sm text-slate-500">
            {status === "connected"
              ? "Listening... Click the microphone to stop."
              : "Click the microphone to start the conversation."}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
