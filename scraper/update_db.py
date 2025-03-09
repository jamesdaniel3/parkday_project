import json
import requests

def update_db(restaurant_data):
    API_BASE_URL = 'http://localhost:8080/api/data'
    
    # 1. Add restaurant    
    restaurant_response = requests.post(f"{API_BASE_URL}/add-restaurant", json=restaurant_data)
    restaurant_response.raise_for_status()
    restaurant_id = restaurant_response.json()['data']['id']
    
    # 2. Add menu
    menu_add_response = requests.post(f"{API_BASE_URL}/add-menu", json={"restaurant_id": restaurant_id})
    menu_add_response.raise_for_status()
    menu_id = menu_add_response.json()['data']['id']

    # 3. Add menu items
    with open("./menu.json", 'r') as f:
        menu_items = json.load(f)

    for menu_item_data in menu_items:
        menu_item_data['menu_id'] = menu_id
        item_response = requests.post(f"{API_BASE_URL}/add-menu-item", json=menu_item_data)
        item_response.raise_for_status()
