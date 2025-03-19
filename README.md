# Canvas Callback

[![Canvas Callback Demo](https://img.youtube.com/vi/589W-9Ojahw/maxresdefault.jpg)](https://www.youtube.com/watch?v=589W-9Ojahw)
_👆 Click to watch the Canvas Callback demo on YouTube_

Canvas Callback is an open-source implementation that demonstrates how to transform AI chat interfaces into interactive visual workspaces using LangGraph's interrupt for human-in-the-loop workflows.

**[Try the Demo](https://canvas-callback.vercel.app/n)** | **[Read the Guide](https://canvas-callback.vercel.app/guide)**

## What is Canvas Callback?

Canvas Callback showcases a powerful pattern for building collaborative AI applications that go beyond typical chat interfaces:

- **Canvas UX Pattern**: A dedicated workspace alongside chat for rich, interactive content
- **Human-in-the-Loop**: LangGraph interrupts for collecting structured user input
- **Joint Problem Solving**: Create experiences where humans and AI can truly collaborate

The project demonstrates how these patterns work together in a travel planning agent that interrupts its workflow to collect specific information through specialized UIs.

## Core Features

- 🖼️ **Canvas UI Component**: A flexible, compound component for creating persistent visual workspaces
- 🔄 **Interrupt Handling**: Type-based routing system for different interrupt types
- 🧩 **Modular Architecture**: Clean separation between UI, state management, and agent logic
- 🌐 **LangGraph Integration**: Full implementation using LangGraph's interrupt
- 🧠 **Interactive Demo**: Practical travel planning agent showcasing the patterns in action

## Architecture Overview

```
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
```

### Key Components

- **Thread.tsx**: Manages the chat interface and message display
- **Canvas.tsx**: Implements the canvas UI component
- **InterruptHandler.tsx**: Routes different interrupt types to specialized UIs
- **Specific Interrupt Components**: Specialized UIs for different interrupt types
- **LangGraph SDK**: Communicates with the LangGraph server

## Use Cases

Canvas Callback's pattern can be applied to diverse domains:

- **Travel Planning**: Interactive destination selection and itinerary building
- **Education**: Shared workspaces for tutoring and problem-solving
- **Data Analysis**: Collaborative data exploration and visualization
- **Healthcare**: Visual symptom assessment and tracking
- **Product Design**: Collaborative design sessions with structured feedback

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- LangGraph CLI

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ahmad2b/canvas-callback.git
cd canvas-callback
```

2. Install frontend dependencies:

```bash
cd web
npm install
# or
pnpm install
```

3. Install LangGraph CLI and backend dependencies:

```bash
cd ../agent

# Install LangGraph CLI
pip install -U "langgraph-cli[inmem]"

# Install project dependencies
poetry install
# or
pip install -r requirements.txt
```

4. Set up environment variables:

```bash
cp web/.env.example web/.env
cp agent/.env.example agent/.env
```

Add your API keys and configuration details to both .env files.

For LangGraph, you'll need a LangSmith API key which can be created from the LangSmith UI (Settings > API Keys). Add it to your agent/.env file:

```
LANGSMITH_API_KEY=your_api_key_here
```

5. Start the development server:

```bash
# Terminal 1 - Frontend
cd web
npm run dev

# Terminal 2 - LangGraph Agent
cd agent
langgraph dev
```

When the LangGraph server starts successfully, you'll see something like:

```
Ready!
* API: http://localhost:2024
* Docs: http://localhost:2024/docs
* LangGraph Studio Web UI: https://smith.langchain.com/studio/?baseUrl=http://127.0.0.1:2024
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Implementation Highlights

- **Canvas Component**: Uses a compound component pattern with distinct parts (Root, Header, Content, Footer)
- **Interrupt Handler**: Type-based routing system for different interrupt types
- **State Management**: Context provider and hooks system for canvas state
- **Agent Design**: LangGraph workflow with interrupts for collecting structured information

## Resources

### LangGraph Documentation

- [LangGraph Interrupt API Guide](https://langchain-ai.github.io/langgraph/concepts/human_in_the_loop/)
- [Human-in-the-Loop Patterns](https://blog.langchain.dev/making-it-easier-to-build-human-in-the-loop-agents-with-interrupt/)
- [LangGraph Server Documentation](https://langchain-ai.github.io/langgraph/concepts/langgraph_server/)
- [Testing LangGraph Apps Locally](https://langchain-ai.github.io/langgraph/cloud/deployment/test_locally/)

### UI Resources

- [Assistant UI for AI Chat Interfaces](https://github.com/assistant-ui/assistant-ui)
- [LangChain's OpenCanvas Implementation](https://github.com/langchain-ai/open-canvas)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Connect

**Join the Canvas Conversation**  
Exploring Canvas patterns or building human-in-the-loop AI interfaces? I'd love to hear about your projects and exchange ideas with the community.

**Share Your Implementation**  
If you build something with these patterns, consider sharing it! Your innovations can help evolve this approach.

- [GitHub](https://github.com/ahmad2b)
- [X](https://x.com/mahmad2b)
- [LinkedIn](https://www.linkedin.com/in/ahmad2b)
- ahmadshaukat_4@outlook.com
- [Connect for a chat](https://cal.com/mahmad2b/15min)
