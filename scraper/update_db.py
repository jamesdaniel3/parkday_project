import json
import requests
import os
from dotenv import load_dotenv

def update_db(restaurant_data):
    API_BASE_URL = os.getenv("BASE_URL")
    
    # 1. Add restaurant    
    restaurant_response = requests.post(f"{API_BASE_URL}/api/data/add-restaurant", json=restaurant_data)
    restaurant_response.raise_for_status()
    restaurant_id = restaurant_response.json()['data']['id']
    
    # 2. Add menu
    menu_add_response = requests.post(f"{API_BASE_URL}/api/data/add-menu", json={"restaurant_id": restaurant_id})
    menu_add_response.raise_for_status()
    menu_id = menu_add_response.json()['data']['id']

    # 3. Add menu items
    with open("./menu.json", 'r') as f:
        menu_items = json.load(f)

    for menu_item_data in menu_items:
        menu_item_data['menu_id'] = menu_id
        item_response = requests.post(f"{API_BASE_URL}/api/data/add-menu-item", json=menu_item_data)
        item_response.raise_for_status()
