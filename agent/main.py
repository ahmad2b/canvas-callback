from dotenv import load_dotenv

from langgraph.graph import StateGraph, START, END
from langgraph.types import interrupt
from langchain_openai import ChatOpenAI
from langgraph_supervisor import create_supervisor

from langgraph.prebuilt.chat_agent_executor import AgentState


load_dotenv()

class TravelState(AgentState):
    destination:str
    dates:str
    activities:list[str]
    trips:str
        
def ask_destination(state: TravelState):
    
    state["destination"] = interrupt(
        {
            "type":"destination",
            "data":"Where do you want to go?"
        }
    )
    return state

def ask_dates(state: TravelState):

    state["dates"] = interrupt(
        {   
            "type":"dates",
            "data":"When do you want to go?"
        }
    )
    return state

def ask_activities(state: TravelState):

    state["activities"] = interrupt(
        {
            "type":"activities",
            "data":"What activities are you interested in?"
        }
    )
    return state

def find_trips(state: TravelState):
    
    dates_data = state['dates']
    dates_obj = None
    
    # Handle different possible date formats
    if isinstance(dates_data, dict) and 'dates' in dates_data:
        # Handle nested dates object
        dates_obj = dates_data['dates']
    elif isinstance(dates_data, str):
        # Try to parse JSON-like string if it contains startDate/endDate
        if "startDate" in dates_data and "endDate" in dates_data:
            try:
                # Clean up the string and convert to proper dictionary
                cleaned_str = dates_data.replace("'", "\"")
                import json
                dates_obj = json.loads(cleaned_str)
            except:
                # Fallback to simple object if parsing fails
                dates_obj = {"startDate": dates_data, "endDate": dates_data}
        else:
            # Use date string as both start and end if no structured data
            dates_obj = {"startDate": dates_data, "endDate": dates_data}
    else:
        # Default fallback
        dates_obj = {"startDate": str(dates_data), "endDate": str(dates_data)}
    
    # Structure the trips data to match frontend expectations
    state["trips"] = {
        "destination": state['destination'],
        "dates": dates_obj,
        "activities": state['activities']
    }
    
    # Create a human-readable trip description for the message
    trip_description = (
        f"Here are some trips to {state['destination']} around {dates_obj.get('startDate', '')} "
        f"to {dates_obj.get('endDate', '')} with activities like {', '.join(state['activities'])}. "
    )

    
    return {
        "messages": [
            {
                "role": "assistant",
                "content": [
                    {
                        "type": "text",
                        "text": trip_description
                    },
                    {
                        "type": "text",
                        "text": "Here's a trip card you can save and share with your friends and family!"
                    }
                ]
            },
        ],
        "trips": state["trips"]
    }
    
model = ChatOpenAI(model="gpt-4o-mini")
    
builder = StateGraph(TravelState)

builder.add_node("ask_destination", ask_destination)
builder.add_node("ask_dates", ask_dates)
builder.add_node("ask_activities", ask_activities)
builder.add_node("find_trips", find_trips)

builder.add_edge(START, "ask_destination")
builder.add_edge("ask_destination", "ask_dates")
builder.add_edge("ask_dates", "ask_activities")
builder.add_edge("ask_activities", "find_trips")
builder.add_edge("find_trips", END)

travel_agent = builder.compile(name="travel_agent")

workflow = create_supervisor(
    [travel_agent],
    model=model,
    prompt=(
        "You are a supervisor AI that coordinates with specialized agents. "
        "IMPORTANT: For ANY travel-related questions or requests, ALWAYS delegate to the travel agent without exception. "
        "This includes anything about destinations, trips, vacations, flights, hotels, activities, or tourism. "
        "The travel agent is designed to collect information in a specific sequence about destination, dates, and activities. "
        "Only respond directly to questions that are completely unrelated to travel. "
        "If there's even a slight connection to travel, delegate to the travel agent."
        "After recieving the data from the travel agent, share the trip data with the user."
    ),
    state_schema=TravelState
    
)

graph = workflow.compile(name="supervisor_agent")
