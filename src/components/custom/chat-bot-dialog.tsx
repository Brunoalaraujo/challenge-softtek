import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogContent,
  Dialog,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ChatBotFab } from './chat-bot-fab';
import { ChatbotText } from './chat-bot-text';

const chatTexts = [
  {
    text: 'Olá! Como posso ajudá-lo hoje?',
    sender: 'AI',
  },
  {
    text: 'Eu gostaria de ajuda para solucionar um problema de lentidão no Sistema Y',
    sender: 'User',
  },
];

export function ChatBotDialog() {
  const [chatTextsState, setChatTextsState] = useState(chatTexts);
  const [text, setText] = useState('');

  function handleSendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setChatTextsState([
      ...chatTextsState,
      {
        text,
        sender: 'User',
      },
    ]);
    setText('');
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="fixed bottom-4 right-4 z-50">
            <ChatBotFab />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assitente Virtual</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col h-[400px] gap-4 p-4">
            <div className="flex-1 overflow-auto">
              <div className="space-y-4">
                {chatTextsState.map((chatText, index) => (
                  <ChatbotText key={index} chatText={chatText} />
                ))}
              </div>
            </div>
            <div className="border-t pt-4">
              <form className="flex space-x-2" onSubmit={handleSendMessage}>
                <Input
                  className="flex-1"
                  placeholder="Type your message..."
                  type="text"
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                />
                <Button type="submit">Enviar</Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
