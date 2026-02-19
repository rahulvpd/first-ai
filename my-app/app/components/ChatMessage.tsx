import type { UIMessage } from 'ai';
import dynamic from 'next/dynamic';

const MarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
);

export default function ChatMessage({ message }: { message: UIMessage }) {
  const isUser = message.role === 'user';
  const text = message.parts
    .filter((p): p is Extract<typeof p, { type: 'text' }> => p.type === 'text')
    .map(p => p.text)
    .join('');

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isUser
            ? 'bg-foreground text-background rounded-br-md'
            : 'bg-zinc-100 dark:bg-zinc-800 rounded-bl-md'
          }`}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap">{text}</div>
        ) : (
          <div data-color-mode="light" className="markdown-content">
            <MarkdownPreview
              source={text}
              style={{
                backgroundColor: 'transparent',
                color: 'inherit',
                fontSize: 'inherit',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
