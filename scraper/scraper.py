import os
import sys
from dotenv import load_dotenv
from data_converters import extract_text_from_image, extract_text_from_pdf
from prompts import MENU_PARSING_PROMPT
from claude_functions import call_claude_api

load_dotenv()
api_key = os.getenv("CLAUDE_API_KEY")

if not api_key:
    print("Error: CLAUDE_API_KEY not found in environment variables")
    sys.exit(1)

FILE_PATH =  "./test_menus/BlueDoorFarmStand.pdf" # input("Enter the path to your image: ")
# extracted_text = extract_text_from_image(FILE_PATH)
extracted_text = ""
if FILE_PATH.endswith(".pdf"):
    extracted_text = extract_text_from_pdf(FILE_PATH)
if FILE_PATH.endswith(".png") or FILE_PATH.endswith(".jpg") or FILE_PATH.endswith("jpeg"):
    extracted_text = extract_text_from_image(FILE_PATH)


if not extracted_text:
    print("Failed to extract text")
    sys.exit(1)

print("Text extracted, calling API...")

prompt = extracted_text + MENU_PARSING_PROMPT

response = call_claude_api(prompt, api_key)

if not response: 
    print("Failed to get response from Claude API")
    sys.exit(1)



print("Response Received, writing data to menu.json...")
claude_response = response['content'][0]['text']
response_lines = claude_response.strip().split('\n')

if len(response_lines) > 2:
    json_content = '\n'.join(response_lines[1:-1])
else:
    json_content = claude_response  

# Save to menu.json
try:
    with open("menu.json", "w") as f:
        f.write(json_content)
    print("JSON content saved to menu.json")
except Exception as e:
    print(f"Error saving to menu.json: {e}")


print("Process complete. Data can be found in menu.json")

