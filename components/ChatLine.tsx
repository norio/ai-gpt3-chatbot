import clsx from 'clsx'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
// import {Prism as SyntaxHighlighter, SyntaxHighlighterProps} from 'react-syntax-highlighter'
// import okaidia from 'react-syntax-highlighter/dist/cjs/styles/prism/okaidia';
// import {
//   CodeComponent,
//   ReactMarkdownNames,
// } from 'react-markdown/lib/ast-to-react';

type ChatGPTAgent = 'user' | 'system' | 'assistant'

export interface ChatGPTMessage {
  role: ChatGPTAgent
  content: string
}

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div className="flex min-w-full animate-pulse px-4 py-5 sm:px-6">
    <div className="flex flex-grow space-x-3">
      <div className="min-w-0 flex-1">
        <p className="font-large text-xxl text-gray-900">
          <a href="#" className="hover:underline">
            AI
          </a>
        </p>
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-zinc-500"></div>
            <div className="col-span-1 h-2 rounded bg-zinc-500"></div>
          </div>
          <div className="h-2 rounded bg-zinc-500"></div>
        </div>
      </div>
    </div>
  </div>
)

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

export function ChatLine({ role = 'assistant', content }: ChatGPTMessage) {
  if (!content) {
    return null
  }

  // const components = {
  //   code: CodeBlock,
  // };

  return (
    <div
      className={
        // role != 'assistant' ? 'float-right clear-both' : 'float-left clear-both'
        role != 'assistant' ? '' : ''
      }
    >
      <div>
        <div className="mb-5 rounded-lg bg-white px-4 py-5 shadow-lg ring-1 ring-zinc-100 sm:px-6">
          <div className="space-x-3">
            <div className="gap-4">
              <p className="font-large text-xxl text-gray-900">
                <a href="#" className="hover:underline">
                  {role == 'assistant' ? 'AI' : 'You'}
                </a>
              </p>
              <div
                className={clsx(
                  'text ',
                  role == 'assistant' ? '' : 'text-gray-400'
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
  )
}
