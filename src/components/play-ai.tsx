import { connectAgent } from '@play-ai/agent-web-sdk';

const embedKey = "LS5bDA0XSNw77OdlWCzf3";

export function PlayAILink({text}: {text: string}) {
  return <span className="relative inline-block">
    <a 
    role="button"
    className="underline text-flamingo-400 hover:text-flamingo-500 transition-colors"
    >
      {text}
    </a>
  </span>
  
}