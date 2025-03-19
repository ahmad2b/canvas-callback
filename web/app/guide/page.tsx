"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	ArrowLeft,
	BookOpen,
	BrainCircuit,
	Code,
	FileText,
	GitFork,
	Info,
	Layers,
	Lightbulb,
	PanelRight,
	Users,
} from "lucide-react";
import Link from "next/link";

export default function CanvasHiloopGuidePage() {
	return (
		<div className="container py-10 px-6 max-w-6xl mx-auto animate-fade-in">
			{/* Magazine Header */}
			<div className="mb-16 relative">
				{/* Back Button */}
				<div className="absolute left-0 top-0 z-20">
					<Button
						variant="ghost"
						size="sm"
						asChild
						className="glass-panel border border-black/20 rounded-lg hover:bg-black/5 hover:scale-105 transition-all duration-300"
					>
						<Link
							href="/"
							className="flex items-center gap-2"
						>
							<ArrowLeft className="size-4" />
							Back
						</Link>
					</Button>
				</div>

				{/* Magazine Title Banner */}
				<div className="text-center relative mb-8">
					<div className="absolute -left-8 -right-8 h-24 top-1/2 -translate-y-1/2 bg-gradient-to-r from-black/5 via-black/20 to-black/5 -rotate-1 backdrop-blur-sm rounded-md"></div>
					<h1 className="font-retro text-5xl md:text-7xl tracking-tight text-black relative z-10 drop-shadow-md bg-clip-text text-transparent bg-gradient-to-b from-black to-black/80">
						CANVAS
						<span className="text-sm ml-2 align-text-top font-mono text-primary">
							HIL
						</span>
					</h1>
					<p className="text-md md:text-lg font-medium text-foreground/80 relative z-10 mt-2">
						HUMAN-IN-THE-LOOP • CANVAS • IMPLEMENTATION • AI UIs
					</p>
				</div>

				{/* Magazine Subtitle */}
				<div className="flex items-center justify-center space-x-4 mb-6">
					<div className="h-px bg-black/30 flex-1"></div>
					<h2 className="text-xl md:text-2xl font-retro text-black px-4">
						INTERACTIVE AI EXPERIENCES
					</h2>
					<div className="h-px bg-black/30 flex-1"></div>
				</div>

				{/* Magazine Intro */}
				<div className="flex flex-col md:flex-row gap-8 items-center">
					<div className="max-w-xl">
						<p className="text-lg first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:text-primary mb-4">
							In today&apos;s conversational AI landscape, the most powerful
							applications go beyond simple text exchanges. They create rich,
							interactive experiences that blend AI capabilities with human
							input and visual components. This guide introduces you to the
							Canvas pattern - a powerful approach for building dynamic,
							interactive spaces within chat-based AI applications.
						</p>
						<p className="text-foreground/80">
							The Canvas approach transforms conversational interfaces from
							linear exchanges into rich workspaces where users and AI Agents
							can solve problems together.
						</p>
					</div>
					<div className="relative w-64 h-64">
						<div className="absolute inset-0 bg-black/10 rounded-full animate-pulse-slow"></div>
						<div className="absolute inset-4 border-2 border-dashed border-black/40 rounded-full animate-spin-reverse"></div>
						<div className="absolute inset-0 flex items-center justify-center">
							<PanelRight className="h-20 w-20 text-primary" />
						</div>
					</div>
				</div>
			</div>

			{/* What is Canvas Section */}
			<section className="mb-20">
				<div className="glass-panel border border-black/30 rounded-xl p-8 shadow-md relative overflow-hidden">
					<div className="absolute -right-8 -top-8 w-32 h-32 bg-black/10 rounded-full filter blur-xl"></div>

					<h2 className="text-3xl font-bold text-black mb-6 font-retro flex items-center">
						<Info className="mr-2 h-7 w-7 text-primary" />
						WHAT IS CANVAS IN AI UIs
					</h2>

					<div className="grid md:grid-cols-2 gap-8">
						<div>
							<p className="mb-4">
								Canvas is a specialized UI component that provides a dedicated
								workspace alongside your chat interface. Unlike the standard
								back-and-forth of chat, a Canvas creates a persistent,
								interactive space for complex visualizations, user inputs, and
								dynamic content.
							</p>

							<p className="mb-4">Live examples:</p>

							<ul className="space-y-2 mb-6 pl-5">
								{[
									"ChatGPT's Canvas - Interactive workspace to write & code with GPT",
									"Gemini's Canvas - Interactive space to collaborate with Gemini",
									"Claude's Artifacts - Standalone content display alongside conversation",
									"LangChain's OpenCanvas - Open-source implementation of OpenAI Canvas",
								].map((item, i) => (
									<li
										key={i}
										className={`flex items-start gap-3 animate-slide-in opacity-0 animation-delay-${
											i * 100
										} `}
									>
										<div className="h-5 w-5 rounded-full bg-black/10 flex items-center justify-center mt-0.5 text-primary text-xs font-bold">
											{i + 1}
										</div>
										<span>{item}</span>
									</li>
								))}
							</ul>

							<div className="glass-panel border border-black/20 p-4 rounded-lg mt-6">
								<h3 className="text-lg font-bold mb-2 text-black">
									This Guide Covers
								</h3>
								<ul className="space-y-1 pl-5 list-disc">
									<li>Canvas UI pattern implementation</li>
									<li>
										Human-in-the-Loop with LangGraph <i>interrupt</i>
									</li>
									<li>Practical examples across domains</li>
									<li>Design patterns for interactive experiences</li>
								</ul>
							</div>
						</div>

						<div>
							<div className="rounded-xl overflow-hidden shadow-md border border-black/20 mb-6 h-80 relative">
								<div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/20 pointer-events-none"></div>
								<div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
									<PanelRight className="h-16 w-16 text-primary mb-4" />
									<h3 className="text-xl font-bold mb-2">Why Canvas Matters</h3>
									<p className="text-sm">
										The Canvas UI pattern enables entirely new kinds of AI
										applications with richer information display, structured
										input collection, collaborative workflows, and context
										preservation throughout conversations.
									</p>
									<div className="mt-4 grid grid-cols-2 gap-2 w-full max-w-sm">
										<div className="bg-black/10 p-3 rounded-lg text-center">
											<p className="text-xs font-medium">Visualizations</p>
										</div>
										<div className="bg-black/10 p-3 rounded-lg text-center">
											<p className="text-xs font-medium">User Controls</p>
										</div>
										<div className="bg-black/10 p-3 rounded-lg text-center">
											<p className="text-xs font-medium">Structured Data</p>
										</div>
										<div className="bg-black/10 p-3 rounded-lg text-center">
											<p className="text-xs font-medium">Interactive Media</p>
										</div>
									</div>
								</div>
							</div>

							<div className="glass-panel border border-black/20 p-4 rounded-lg">
								<h3 className="text-lg font-bold mb-2 text-black flex items-center">
									<Users className="h-4 w-4 mr-2 text-primary" />
									Pull Quote
								</h3>
								<blockquote className="pl-4 border-l-2 border-primary italic">
									&quot;The combination of Canvas UI and LangGraph&apos;s
									interrupt capabilities enables entirely new kinds of
									applications where humans and AI can truly collaborate.&quot;
								</blockquote>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Core Concepts Section */}
			<section className="mb-20">
				<div className="text-center mb-10">
					<div className="inline-block glass-panel border border-black/20 px-8 py-2 rounded-full mb-2">
						<h2 className="text-2xl font-retro text-black">CORE CONCEPTS</h2>
					</div>
					<div className="h-px bg-black/30 max-w-xl mx-auto"></div>
				</div>

				<div className="grid md:grid-cols-2 gap-8">
					{/* Canvas Pattern */}
					<div className="glass-panel border border-black/20 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
						<h3 className="text-xl font-bold mb-4 text-black flex items-center">
							<Layers className="h-5 w-5 mr-2 text-primary" />
							Canvas Pattern
						</h3>

						<p className="mb-4">
							The Canvas pattern represents a complementary workspace alongside
							a chat interface. Key characteristics include:
						</p>

						<ul className="space-y-2 mb-4">
							{[
								"Persistent Display: Unlike chat messages, canvas content remains visible and can be updated",
								"Rich Content: Supports visualizations, forms, interactive elements, and media",
								"Complementary to Chat: Works alongside rather than replacing the conversation",
								"Stateful: Maintains its state independent of the chat history",
							].map((item, i) => (
								<li
									key={i}
									className="flex items-start gap-2"
								>
									<div className="min-w-5 text-primary font-bold">•</div>
									<span className="text-sm">{item}</span>
								</li>
							))}
						</ul>

						<p className="text-sm text-foreground/80">
							Canvas implementations typically feature toggle controls to
							show/hide the canvas and can be updated by either user actions or
							agent responses.
						</p>
					</div>

					{/* Human in the Loop */}
					<div className="glass-panel border border-black/20 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
						<h3 className="text-xl font-bold mb-4 text-black flex items-center">
							<GitFork className="h-5 w-5 mr-2 text-primary" />
							Human-in-the-Loop & LangGraph
						</h3>

						<p className="mb-4">
							LangGraph&apos;s interrupt mechanism creates a collaborative
							approach beyond traditional LLM applications:
						</p>

						<ul className="space-y-2 mb-4">
							{[
								"Agent-Initiated Requests: The agent can proactively request specific user input during execution",
								"Structured Input Gathering: Request specific data formats or choices rather than free-text responses",
								"Workflow Continuation: Resume processing exactly where it left off after receiving user input",
							].map((item, i) => (
								<li
									key={i}
									className="flex items-start gap-2"
								>
									<div className="min-w-5 text-primary font-bold">•</div>
									<span className="text-sm">{item}</span>
								</li>
							))}
						</ul>

						<div className="bg-black/5 p-3 rounded-lg text-xs font-mono overflow-x-auto">
							<pre>{`
┌─────────────┐     ┌───────────────┐     ┌────────────────────┐
│ User Request│────▶│ Agent Process │────▶│ Generate Response  │
└─────────────┘     └───────────────┘     └────────────────────┘
                           │                         ▲
                           ▼                         │
                    ┌────────────┐          ┌────────────────┐
                    │  Interrupt │─────────▶│ Human Response │
                    └────────────┘          └────────────────┘
                            `}</pre>
						</div>
					</div>
				</div>

				{/* Combined Approach */}
				<div className="glass-panel border border-black/20 p-6 rounded-xl shadow-md mt-8 bg-gradient-to-br from-black/5 to-transparent">
					<h3 className="text-xl font-bold mb-4 text-black flex items-center">
						<BrainCircuit className="h-5 w-5 mr-2 text-primary" />
						Combining Canvas & Interrupts
					</h3>

					<p className="mb-4">
						The real power comes from combining these approaches:
					</p>

					<ol className="space-y-2 mb-4 pl-5">
						<li className="list-decimal">
							Agent identifies a need for specific user input
						</li>
						<li className="list-decimal">
							Interrupts its process and requests input via a specialized UI in
							the canvas
						</li>
						<li className="list-decimal">
							User provides structured input through the canvas interface
						</li>
						<li className="list-decimal">
							Agent resumes processing with the exact data it needs
						</li>
					</ol>

					<p className="text-foreground/80 italic text-center mt-4">
						This creates a structured, collaborative workflow between human and
						AI Agents.
					</p>
				</div>
			</section>

			{/* Use Cases Section */}
			<section className="mb-20">
				<div className="glass-panel border border-black/30 p-8 rounded-xl shadow-md">
					<h2 className="text-3xl font-bold text-black mb-8 font-retro flex items-center">
						<FileText className="mr-2 h-7 w-7 text-primary" />
						USE CASES
					</h2>

					<p className="mb-6">
						The Canvas + Interrupt pattern enables diverse applications across
						domains:
					</p>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
						{[
							{
								title: "Travel Planning",
								icon: <span className="text-2xl">✈️</span>,
								desc: "Interactive destination selection and itinerary building",
								canvas: "Maps, hotel comparisons, activity scheduling",
								interrupts:
									"Destination selection, date picking, preference collection",
								value:
									"Visual planning, immediate feedback, personalized recommendations",
							},
							{
								title: "Fashion & E-commerce",
								icon: <span className="text-2xl">👗</span>,
								desc: "Virtual try-on and styling sessions",
								canvas: "Virtual avatar, clothing options, style boards",
								interrupts:
									"Style preference collection, size selection, outfit feedback",
								value:
									"Visual outfit previews, immediate style feedback, personalized recommendations",
							},
							{
								title: "Education & Learning",
								icon: <span className="text-2xl">🎓</span>,
								desc: "Interactive tutoring with shared workspace",
								canvas: "Math problems, diagrams, coding environment, notebook",
								interrupts:
									"Problem-solving steps, concept understanding checks, practice exercises",
								value:
									"Step-by-step guidance, visual explanations, hands-on practice",
							},
							{
								title: "Data Analysis",
								icon: <span className="text-2xl">📊</span>,
								desc: "Collaborative data exploration",
								canvas: "Charts, data tables, filtering controls",
								interrupts:
									"Data source selection, visualization preferences, analysis focus",
								value:
									"Visual data exploration, iterative analysis, insight generation",
							},
							{
								title: "Healthcare & Diagnostics",
								icon: <span className="text-2xl">🏥</span>,
								desc: "Symptom assessment and health monitoring",
								canvas: "Body diagrams, symptom trackers, medical visuals",
								interrupts:
									"Symptom location selection, severity assessment, history collection",
								value:
									"Precise symptom localization, visual health tracking, educational diagrams",
							},
							{
								title: "Product Design",
								icon: <span className="text-2xl">🎨</span>,
								desc: "Collaborative design sessions",
								canvas: "Product mockups, design tools, feedback mechanisms",
								interrupts:
									"Design preference selection, feature prioritization, feedback collection",
								value:
									"Visual design iteration, collaborative creation, structured feedback",
							},
						].map((useCase, i) => (
							<div
								key={i}
								className={`glass-panel border border-black/20 p-5 rounded-lg hover:shadow-md transition-all duration-300 animate-slide-up opacity-0 `}
							>
								<div className="mb-3 flex items-center justify-between">
									<h3 className="text-lg font-bold">{useCase.title}</h3>
									<div className="h-10 w-10 rounded-full bg-black/5 flex items-center justify-center">
										{useCase.icon}
									</div>
								</div>
								<p className="text-sm mb-3 text-foreground/80">
									{useCase.desc}
								</p>
								<div className="space-y-2">
									<div>
										<div className="text-xs font-semibold text-primary">
											CANVAS CONTENT
										</div>
										<p className="text-xs">{useCase.canvas}</p>
									</div>
									<div>
										<div className="text-xs font-semibold text-primary">
											INTERRUPT FOR
										</div>
										<p className="text-xs">{useCase.interrupts}</p>
									</div>
									<div>
										<div className="text-xs font-semibold text-primary">
											VALUE
										</div>
										<p className="text-xs">{useCase.value}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Simple CTA - After Use Cases */}
				<div className="mt-8 glass-panel border border-black/20 p-5 rounded-lg text-center">
					<h3 className="text-lg font-bold mb-3">
						Building something cool? Let&apos;s chat about your implementation.
					</h3>
					<div className="flex flex-wrap gap-3 justify-center items-center">
						<Link
							href="https://cal.com/mahmad2b/15min"
							target="_blank"
							rel="noopener noreferrer"
							className="glass-panel border border-primary/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-black/5 transition-colors flex items-center justify-center gap-2"
						>
							<span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-xs">
								✦
							</span>
							Schedule a 15-min chat
						</Link>
					</div>
				</div>
			</section>

			{/* Architecture Overview */}
			<section className="mb-20">
				<div className="text-center mb-10">
					<div className="inline-block glass-panel border border-black/20 px-8 py-2 rounded-full mb-2">
						<h2 className="text-2xl font-retro text-black">
							ARCHITECTURE OVERVIEW
						</h2>
					</div>
					<div className="h-px bg-black/30 max-w-xl mx-auto"></div>
				</div>

				<div className="glass-panel border border-black/20 p-6 rounded-xl shadow-md">
					<h3 className="text-xl font-bold mb-4 text-black">
						System Architecture
					</h3>

					<div className="bg-black/5 p-4 rounded-lg text-xs font-mono overflow-x-auto mb-6">
						<pre>{`
┌────────────────────────────────────────┐
│ UI Layer                               │
│  ┌──────────┐          ┌─────────────┐ │
│  │   Chat   │◄────────►│   Canvas    │ │
│  └──────────┘          └─────────────┘ │
└────────────┬───────────────┬───────────┘
             │               │
             ▼               ▼
┌────────────────┐   ┌──────────────────┐
│ Message Handler│   │ Interrupt Handler│
└────────┬───────┘   └────────┬─────────┘
         │                    │
         ▼                    ▼
┌────────────────────────────────────────┐
│ LangGraph Runtime                      │
│                                        │
│  ┌───────────┐      ┌───────────────┐  │
│  │   Agent   │◄────►│  Interrupts   │  │
│  └───────────┘      └───────────────┘  │
└────────────────────────────────────────┘
                        `}</pre>
					</div>

					<div className="grid md:grid-cols-2 gap-6">
						<div>
							<h4 className="font-bold mb-2">Key Components</h4>
							<ul className="space-y-2">
								{[
									"Thread.tsx: Manages the chat interface and message display",
									"Canvas.tsx: Implements the canvas UI component",
									"InterruptHandler.tsx: Routes different interrupt types",
									"Specific Interrupt Components: Specialized UIs for different interrupt types",
									"LangGraph SDK: Communicates with the LangGraph server",
								].map((item, i) => (
									<li
										key={i}
										className="flex items-start gap-2 text-sm"
									>
										<div className="min-w-5 text-primary font-bold">•</div>
										<span>{item}</span>
									</li>
								))}
							</ul>
						</div>

						<div>
							<h4 className="font-bold mb-2">Data Flow</h4>
							<ol className="space-y-1 pl-5">
								{[
									"User sends a message through the chat interface",
									"Message is sent to the LangGraph server",
									"Agent processes the message and may interrupt for user input",
									"Frontend detects the interrupt and renders the canvas",
									"User interacts with the canvas, providing input",
									"Input is sent back to the agent",
									"Agent continues processing and completes the task",
								].map((item, i) => (
									<li
										key={i}
										className="flex items-start gap-2 text-sm"
									>
										<div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
											{i + 1}
										</div>
										<span>{item}</span>
									</li>
								))}
							</ol>
						</div>
					</div>
				</div>
			</section>

			{/* Implementation Section - Modified to be more high-level */}
			<section className="mb-20">
				<div className="glass-panel border border-black/30 p-8 rounded-xl shadow-md">
					<h2 className="text-3xl font-bold text-black mb-8 font-retro flex items-center">
						<Code className="mr-2 h-7 w-7 text-primary" />
						IMPLEMENTATION HIGHLIGHTS
					</h2>

					<div className="mb-6">
						<h3 className="text-xl font-bold mb-4 text-black">
							Key Implementation Concepts
						</h3>

						<div className="grid md:grid-cols-2 gap-6">
							<div className="glass-panel border border-black/20 p-5 rounded-lg">
								<h4 className="font-bold mb-2 text-black">
									Canvas Component Approach
								</h4>
								<p className="text-sm">
									The Canvas implementation uses a compound component pattern
									with distinct parts (Root, Header, Content, Footer) that work
									together. This provides flexibility and consistent structure
									across different canvas uses.
								</p>
								<div className="mt-3 text-xs text-primary">
									<span className="font-medium">Reference:</span> See{" "}
									<code>components/ui/canvas.tsx</code> in the source code
								</div>
							</div>

							<div className="glass-panel border border-black/20 p-5 rounded-lg">
								<h4 className="font-bold mb-2 text-black">
									Interrupt Handler Pattern
								</h4>
								<p className="text-sm">
									The interrupt handler uses a type-based routing pattern to
									direct different interrupt types to specialized components.
									This keeps the code modular and makes adding new interrupt
									types straightforward.
								</p>
								<div className="mt-3 text-xs text-primary">
									<span className="font-medium">Reference:</span> See{" "}
									<code>components/interrupt-handler.tsx</code> in the source
									code
								</div>
							</div>
							<div className="glass-panel border border-black/20 p-5 rounded-lg mb-6">
								<h4 className="font-bold mb-2 text-black">
									State Management Approach
								</h4>
								<p className="text-sm mb-3">
									Canvas state is managed through a dedicated context provider
									and hook system, making it available throughout the
									application while keeping the implementation details
									abstracted away from consumer components.
								</p>
								<div className="text-xs text-primary">
									<span className="font-medium">Reference:</span> See{" "}
									<code>context/canvas-context.tsx</code> and{" "}
									<code>hooks/use-canvas.tsx</code> in the source code
								</div>
							</div>
							<div className="glass-panel border border-black/20 p-5 rounded-lg mb-6">
								<h4 className="font-bold mb-2 text-black">Chat UI</h4>
								<p className="text-sm mb-3">
									For handling chat-specific features like streaming,
									auto-scrolling, and markdown rendering, libraries such as{" "}
									<Link
										href="https://github.com/assistant-ui/assistant-ui"
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary hover:underline"
									>
										Assistant UI
									</Link>{" "}
									are great at managing the chat while integrating with canvas
									implementations.
								</p>
								<div className="text-xs text-primary">
									<span className="font-medium">Reference:</span>{" "}
									<Link
										href="https://github.com/assistant-ui/assistant-ui"
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary hover:underline"
									>
										https://github.com/assistant-ui/assistant-ui
									</Link>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-black/5 p-5 rounded-lg text-center">
						<p className="text-sm text-foreground/80">
							All implementation code for Canvas and Human-in-the-Loop
							integration is available in the open-source repository. I
							encourage you to explore the code for detailed implementation
							approaches.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
							<Link
								href="https://github.com/ahmad2b/canvas-callback"
								target="_blank"
								rel="noopener noreferrer"
								className="glass-panel border border-black/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-black/5 transition-colors"
							>
								View Full Source Code
							</Link>
							<Link
								href="/n"
								className="glass-panel border border-primary/30 bg-black/5 px-4 py-2 rounded-lg text-sm font-medium hover:bg-black/10 transition-colors flex items-center justify-center gap-2"
							>
								<PanelRight className="h-4 w-4 text-primary" />
								Try the Live Demo
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Design Patterns and Pro Tips */}
			<section className="mb-10">
				<div className="bg-black/5 border border-black/20 rounded-xl p-8 relative overflow-hidden">
					<div className="absolute -left-10 -bottom-10 w-40 h-40 bg-black/10 rounded-full filter blur-xl"></div>
					<div className="relative z-10">
						<h2 className="text-3xl font-retro text-black mb-6 flex items-center">
							<Lightbulb className="mr-2 h-8 w-8 text-primary" />
							PRO TIPS
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="glass-panel border border-black/30 p-6 rounded-lg">
								<h3 className="text-xl font-bold mb-2 text-black">
									Progressive Disclosure
								</h3>
								<p className="text-sm mb-2">
									Start simple and progressively reveal more options as needed
									to avoid overwhelming users with too many options or complex
									interfaces.
								</p>
								<div className="text-xs text-foreground/70">
									<span className="font-semibold">Pattern:</span> Show a
									simplified interface first, with an option to expand for
									advanced features.
								</div>
							</div>

							<div className="glass-panel border border-black/30 p-6 rounded-lg">
								<h3 className="text-xl font-bold mb-2 text-black">
									Contextual Canvas
								</h3>
								<p className="text-sm mb-2">
									Adapt canvas content to the conversation context by using the
									agent state to determine what to show in the canvas.
								</p>
								<div className="text-xs text-foreground/70">
									<span className="font-semibold">Pattern:</span> Switch between
									different canvas views based on the current topic or agent
									state.
								</div>
							</div>

							<div className="glass-panel border border-black/30 p-6 rounded-lg">
								<h3 className="text-xl font-bold mb-2 text-black">
									Interrupt Chaining
								</h3>
								<p className="text-sm mb-2">
									Chain interrupts together to collect multiple pieces of
									information sequentially, with each interrupt triggering the
									next.
								</p>
								<div className="text-xs text-foreground/70">
									<span className="font-semibold">Pattern:</span> Use state in
									the agent to track what information is still needed and
									interrupt accordingly.
								</div>
							</div>

							<div className="glass-panel border border-black/30 p-6 rounded-lg">
								<h3 className="text-xl font-bold mb-2 text-black">
									Two-Way Visualization
								</h3>
								<p className="text-sm mb-2">
									Create visualizations that can be updated by both user inputs
									and AI outputs to visually represent the collaborative work.
								</p>
								<div className="text-xs text-foreground/70">
									<span className="font-semibold">Pattern:</span> Implement
									clear visual distinctions between user and AI contributions in
									shared visualizations.
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Conclusion */}
			<section className="mb-16">
				<div className="glass-panel border border-black/30 p-8 rounded-xl shadow-md">
					<h2 className="text-3xl font-bold text-black mb-6 font-retro">
						CONCLUSION
					</h2>

					<p className="mb-4">
						The combination of Canvas UI and LangGraph interrupts creates
						powerful new possibilities for collaborative AI applications. By
						implementing these patterns, you can build experiences where:
					</p>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
						{[
							{
								title: "Collaboration",
								desc: "Users and AI truly work together rather than just exchanging messages",
							},
							{
								title: "Visualization",
								desc: "Complex information is visualized in dedicated spaces",
							},
							{
								title: "Structure",
								desc: "Input collection is structured and context-aware",
							},
							{
								title: "Flow Control",
								desc: "Workflows seamlessly transition between AI and human control",
							},
						].map((item, i) => (
							<div
								key={i}
								className="glass-panel border border-black/20 p-4 rounded-lg text-center"
							>
								<h3 className="text-sm font-bold mb-1">{item.title}</h3>
								<p className="text-xs">{item.desc}</p>
							</div>
						))}
					</div>

					<p className="text-foreground/80">
						This guide has provided the tools, patterns, and examples needed to
						implement these capabilities in your own applications. As you build
						with these techniques, you&apos;ll discover even more ways to
						enhance human-AI collaboration and create truly interactive
						experiences.
					</p>
				</div>
			</section>

			{/* CTA Section - Simplified */}
			<section className="mb-16">
				<div className="glass-panel border border-black/30 p-8 rounded-xl shadow-md bg-grid-small-black/5 relative overflow-hidden">
					<div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl"></div>
					<div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full blur-2xl"></div>

					<div className="max-w-2xl mx-auto relative z-10">
						<div className="glass-panel p-6 rounded-lg border border-black/20">
							<h3 className="text-xl font-bold mb-2 font-retro text-center">
								Have questions about your implementation?
							</h3>
							<p className="mb-4 text-center">
								I&apos;m available to help you working with Canvas, AI UIs and
								Agents.
							</p>
							<div className="flex flex-wrap gap-4 items-center justify-center">
								<Link
									href="https://cal.com/mahmad2b/15min"
									target="_blank"
									rel="noopener noreferrer"
									className="retro-button px-4 py-2"
								>
									Schedule a 15-min chat
								</Link>
								<span className="text-sm text-foreground/70">
									or email{" "}
									<Link
										href="mailto:ahmadshaukat_4@outlook.com"
										className="text-primary hover:underline"
									>
										ahmadshaukat_4@outlook.com
									</Link>
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Resources and Footer - Updated with actual links */}
			<section className="mb-10">
				<div className="glass-panel border border-black/20 p-6 rounded-xl">
					<h2 className="text-xl font-bold mb-4 text-black flex items-center">
						<BookOpen className="h-5 w-5 mr-2 text-primary" />
						Resources & References
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h3 className="text-sm font-bold mb-2">
								LangGraph Documentation
							</h3>
							<ul className="-space-y-2 text-sm">
								<li>
									<Link
										href="https://langchain-ai.github.io/langgraph/concepts/human_in_the_loop/"
										target="_blank"
										rel="noopener noreferrer"
										className={cn(
											buttonVariants({
												variant: "link",
												className: "font-normal",
											})
										)}
									>
										<div className="min-w-5 font-bold">•</div>
										<span>LangGraph Interrupt API Guide</span>
									</Link>
								</li>
								<li>
									<Link
										href="https://blog.langchain.dev/making-it-easier-to-build-human-in-the-loop-agents-with-interrupt/"
										target="_blank"
										rel="noopener noreferrer"
										className={cn(
											buttonVariants({
												variant: "link",
												className: "font-normal",
											})
										)}
									>
										<div className="min-w-5 font-bold">•</div>
										<span>Human-in-the-Loop Patterns</span>
									</Link>
								</li>
								<li>
									<Link
										href="https://langchain-ai.github.io/langgraph/concepts/langgraph_server/"
										target="_blank"
										rel="noopener noreferrer"
										className={cn(
											buttonVariants({
												variant: "link",
												className: "font-normal",
											})
										)}
									>
										<div className="min-w-5 font-bold">•</div>
										<span>LangGraph Server Documentation</span>
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="text-sm font-bold mb-2">UI Design Resources</h3>
							<ul className="-space-y-2 text-sm">
								<li>
									<Link
										href="https://github.com/assistant-ui/assistant-ui"
										target="_blank"
										rel="noopener noreferrer"
										className={cn(
											buttonVariants({
												variant: "link",
												className: "font-normal",
											})
										)}
									>
										<div className="min-w-5 font-bold">•</div>
										<span>Assistant UI for AI Chat Interfaces</span>
									</Link>
								</li>
								<li>
									<Link
										href="https://github.com/langchain-ai/open-canvas"
										target="_blank"
										rel="noopener noreferrer"
										className={cn(
											buttonVariants({
												variant: "link",
												className: "font-normal",
											})
										)}
									>
										<div className="min-w-5 font-bold">•</div>
										<span>LangChain&apos;s OpenCanvas Implementation</span>
									</Link>
								</li>
							</ul>
						</div>
					</div>

					<div className="mt-6">
						<h3 className="text-sm font-bold mb-2">About Me</h3>
						<ul className="-space-y-2 text-sm">
							<li>
								<Link
									href="https://www.linkedin.com/in/ahmad2b"
									target="_blank"
									rel="noopener noreferrer"
									className={cn(
										buttonVariants({
											variant: "link",
											className: "font-normal",
										})
									)}
								>
									<div className="min-w-5 font-bold">•</div>
									<span>LinkedIn</span>
								</Link>
							</li>
							<li>
								<Link
									href="https://github.com/ahmad2b"
									target="_blank"
									rel="noopener noreferrer"
									className={cn(
										buttonVariants({
											variant: "link",
											className: "font-normal",
										})
									)}
								>
									<div className="min-w-5 font-bold">•</div>
									<span>GitHub</span>
								</Link>
							</li>
							<li>
								<Link
									href="https://x.com/mahmad2b"
									target="_blank"
									rel="noopener noreferrer"
									className={cn(
										buttonVariants({
											variant: "link",
											className: "font-normal",
										})
									)}
								>
									<div className="min-w-5 font-bold">•</div>
									<span>X</span>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</section>

			{/* Magazine Footer */}
			<footer className="text-center text-sm text-foreground/60 border-t border-black/10 pt-6">
				<p>CANVAS & HUMAN-IN-THE-LOOP GUIDE • VOLUME 1 • ISSUE 1</p>
				<p className="mt-2">
					© 2025 - All examples and code provided under MIT License
				</p>
			</footer>
		</div>
	);
}
