import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import {Prism as SyntaxHighlighter, SyntaxHighlighterProps} from 'react-syntax-highlighter'
// import okaidia from 'react-syntax-highlighter/dist/cjs/styles/prism/okaidia';
// import {
//   CodeComponent,
//   ReactMarkdownNames,
// } from 'react-markdown/lib/ast-to-react';

type ChatGPTAgent = "user" | "system" | "assistant";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div className='flex min-w-full px-4 py-5 animate-pulse sm:px-6'>
    <div className='flex flex-grow space-x-3'>
      <div className='flex-1 min-w-0'>
        <p className='text-gray-900 font-large text-xxl'>
          <a href='#' className='hover:underline'>
            AI
          </a>
        </p>
        <div className='pt-4 space-y-4'>
          <div className='grid grid-cols-3 gap-4'>
            <div className='h-2 col-span-2 rounded bg-zinc-500'></div>
            <div className='h-2 col-span-1 rounded bg-zinc-500'></div>
          </div>
          <div className='h-2 rounded bg-zinc-500'></div>
        </div>
      </div>
    </div>
  </div>
);

// const CodeBlock: CodeComponent | ReactMarkdownNames = ({
//   inline,
//   className,
//   children,
//   ...props
// }) => {
//   const match = /language-(\w+)/.exec(className || '');
//   return !inline && match ? (
//     <SyntaxHighlighter style={okaidia} language={match[1]} PreTag="div" {...props}>
//       {String(children).replace(/\n$/, '')}
//     </SyntaxHighlighter>
//   ) : (
//     <code className={className} {...props}>
//       {children}
//     </code>
//   );
// };

export function ChatLine({ role = "assistant", content }: ChatGPTMessage) {
  if (!content) {
    return null;
  }

  // const components = {
  //   code: CodeBlock,
  // };

  return (
    <div className={role != "assistant" ? "" : ""}>
      <div>
        <div className='px-4 py-5 mb-1 bg-white rounded-lg shadow-lg ring-1 ring-zinc-100 sm:px-6'>
          <div className='space-x-3'>
            <div className='gap-4'>
              <p className='text-gray-900 font-large text-xxl'>
                <a href='#' className='hover:underline'>
                  {role == "assistant" ? "AI" : "You"}
                </a>
              </p>
              <div
                className={clsx(
                  "text ",
                  role == "assistant" ? "" : "text-gray-400"
                )}
              >
                <ReactMarkdown
                  linkTarget={"_blank"}
                  remarkPlugins={[remarkGfm]}
                  // components={components}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
