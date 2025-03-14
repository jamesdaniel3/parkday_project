import os
import sys
from dotenv import load_dotenv
from data_converters import extract_text
from prompts import MENU_PARSING_PROMPT, WEBSITE_PARSING_PROMPT, RESTAURANT_DESCRIPTION_PROMPT
from claude_functions import call_claude_api
from update_db import update_db

load_dotenv()
api_key = os.getenv("CLAUDE_API_KEY")

if not api_key:
    print("Error: CLAUDE_API_KEY not found in environment variables")
    sys.exit(1)

name = input("Enter the name of the restaurant for which you are gathering data: ")
menu_type = input("""If the menu data you are trying to get is on a website, please enter 1. 
If the menu data you are trying to access is in a PDF or image, please enter 2. """)

if menu_type == "1":
    menu_url = input("Enter the url of your restaurant's menu: ")
elif menu_type == "2":
    file_path = input("Download the PDF or screenshot the image and enter the file path: ")
    print("Starting text extraction...")
    extracted_text = extract_text(file_path)
    print("Text extraction completed")
else:
    print("Invalid input, must choose 1 or 2. Please run the file again.")
    sys.exit(1)


if menu_type == "2" and not extracted_text:
    print("Failed to extract text")
    sys.exit(1)

prompt = (menu_url + WEBSITE_PARSING_PROMPT) if menu_type == "1" else (extracted_text + MENU_PARSING_PROMPT)

print("Prompting Claude to retrieve structured data...")
response = call_claude_api(prompt, api_key)

if not response: 
    print("Failed to get response from Claude API")
    sys.exit(1)

print("Response received")
claude_response = response['content'][0]['text']

# Save to menu.json
try:
    with open("menu.json", "w") as f:
        f.write(claude_response)
    print("JSON content saved to menu.json")
except Exception as e:
    print(f"Error saving to menu.json: {e}")


print("Process complete. Data can be found in menu.json")

urls = {
    "instagram_url": "",
    "opentable_url": "",
    "resy_url": "",
    "google_maps_url": "",
    "eater_url": "",
    "infatuation_url": "",
}

print("For each of the following, paste the link if you have it. If you do not, just hit enter:")
for each in urls:
    url = input(each +": ")
    urls[each] = url

print("Generating a description of the restaurant")
description_response = call_claude_api(claude_response + RESTAURANT_DESCRIPTION_PROMPT, api_key)

restaurant_data = urls
restaurant_data["name"] = name
restaurant_data["description"] = description_response['content'][0]['text']


## call APIs to send data in
print("Sending data to database")
update_db(restaurant_data)