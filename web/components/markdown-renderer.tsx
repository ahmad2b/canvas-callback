import matter from "gray-matter";
import type React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
	content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
	content,
}) => {
	const { content: parsedContent, data: frontmatter } = matter(content);

	const isJson = (str: string) => {
		try {
			JSON.parse(str);
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	};

	const renderContent = () => {
		if (isJson(parsedContent)) {
			return (
				<SyntaxHighlighter
					language="json"
					style={oneDark}
					customStyle={{ maxHeight: "400px", overflowY: "auto" }}
				>
					{JSON.stringify(JSON.parse(parsedContent), null, 2)}
				</SyntaxHighlighter>
			);
		}

		return (
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				components={{
					code({ node, inline, className, children, ...props }: any) {
						console.log(node, inline, className, children, props);
						const match = /language-(\w+)/.exec(className || "");
						return !inline && match ? (
							<SyntaxHighlighter
								language={match[1]}
								PreTag="div"
								style={oneDark}
								customStyle={{ maxHeight: "400px", overflowY: "auto" }}
							>
								{String(children).replace(/\n$/, "")}
							</SyntaxHighlighter>
						) : (
							<code
								className={className}
								{...props}
							>
								{children}
							</code>
						);
					},
				}}
			>
				{parsedContent}
			</ReactMarkdown>
		);
	};

	return (
		<div className="markdown-content prose dark:prose-invert w-full max-w-none">
			{frontmatter.title && (
				<h1 className="mb-4 text-3xl font-bold">{frontmatter.title}</h1>
			)}
			{renderContent()}
		</div>
	);
};
