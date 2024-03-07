//@ts-nocheck
import {
  ReactBaseProps,
  ReactMarkdownProps,
} from 'react-markdown/src/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps extends ReactBaseProps, ReactMarkdownProps {
  inline?: boolean;
  className?: string;
  children?: string;
}

const transparentBackground = Object.keys(nightOwl).reduce(
  (style: any, key) => {
    style[key] = { ...nightOwl[key], backgroundColor: 'rgba(0,0,0,0)' };
    return style;
  },
  {},
);

const CodeBlock: React.FC<CodeBlockProps> = ({
  inline,
  className,
  children,
}) => {
  const match = /language-(\w+)/.exec(className || '');
  return !inline && match ? (
    <SyntaxHighlighter
      style={transparentBackground}
      language={match[1]}
      PreTag="div"
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className}>{children}</code>
  );
};

export default CodeBlock;
