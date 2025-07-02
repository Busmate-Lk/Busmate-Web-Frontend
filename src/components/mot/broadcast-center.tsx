"use client";

import { MessageSquare } from "lucide-react";

export interface BroadcastMessage {
  title: string;
  type: string;
  time: string;
  description: string;
}

interface BroadcastCenterProps {
  messages: BroadcastMessage[];
}

export function BroadcastCenter({ messages }: BroadcastCenterProps) {
  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="flex flex-row items-center justify-between p-6">
        <h3 className="text-lg font-semibold text-black">Broadcast Center</h3>
        <MessageSquare className="h-5 w-5 text-blue-600" />
      </div>
      <div className="space-y-4 p-6 pt-0">
        {messages.map((message, index) => (
          <div key={index} className="border-l-4 border-orange-400 pl-4">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-sm text-black">
                {message.title}
              </h4>
              <div className="text-xs border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                {message.type}
              </div>
            </div>
            <p className="text-xs text-gray-500">{message.time}</p>
            <p className="text-xs text-gray-600">{message.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
