'use client'

import ReactMarkdown from 'react-markdown'

interface MarkdownProps {
  children: string
  className?: string
}

export default function Markdown({ children, className = '' }: MarkdownProps) {
  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      <ReactMarkdown
        components={{
        // Customize heading styles
        h1: ({ children }) => (
          <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-semibold text-gray-900 mt-5 mb-3">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">{children}</h3>
        ),
        // Customize paragraph styles
        p: ({ children }) => <p className="text-gray-700 mb-3 leading-relaxed">{children}</p>,
        // Customize list styles
        ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>
        ),
        li: ({ children }) => <li className="text-gray-700">{children}</li>,
        // Customize link styles
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {children}
          </a>
        ),
        // Customize code styles
        code: ({ children }) => (
          <code className="bg-gray-100 rounded px-1.5 py-0.5 text-sm font-mono text-gray-800">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="bg-gray-100 rounded-lg p-4 overflow-x-auto mb-3">{children}</pre>
        ),
        // Customize blockquote styles
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-3">
            {children}
          </blockquote>
        )
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}

