import requests

def call_claude_api(text, api_key):
    headers = {
        "anthropic-version": "2023-06-01",
        "x-api-key": api_key,
        "content-type": "application/json"
    }
    
    data = {
        "model": "claude-3-7-sonnet-20250219",
        "max_tokens": 10000,
        "messages": [
            {
                "role": "user",
                "content": text
            }
        ]
    }
    
    try:
        response = requests.post(
            "https://api.anthropic.com/v1/messages",
            headers=headers,
            json=data
        )
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error calling Claude API: {e}")
        return None