MENU_PARSING_PROMPT = """ The above is text extracted from a menu. Please take the text a generate a JSON object with the following structure: 
{
    {
        name: some string value,
        description: some string value,
        is_vegetarian: True/False,
        is_vegan: True/False,
        is_keto: True/False,
        is_dairy_free: True/False,
        is_paleo: True/False,
        price_usd: some float value
        ingredients: comma seperated string of ingredients
    },
        {
        name: some string value,
        description: some string value,
        is_vegetarian: True/False,
        is_vegan: True/False,
        is_keto: True/False,
        is_dairy_free: True/False,
        is_paleo: True/False,
        price_usd: some float value
        ingredients: comma seperated string of ingredients
    },
    ...
}

If you cannot find a value for description, price_usd, or ingredients, use null. The fields is_vegan, is_vegetarian, is_keto, is_dairy_free, and is_paleo must be filled and must have a boolean value. 
If you cannot determine whether or not a meal meets the requirements to be in one of those fields based off the text available, use False. 
Please only output the JSON Object. Don't include anything around the object like ```json, start from [
"""

WEBSITE_PARSING_PROMPT = """
I need you to extract the menu information from the above restaurant website and organize it into a structured JSON format.
Please follow these guidelines:

Visit the website and thoroughly analyze the menu content
Extract all menu categories (e.g., Appetizers, Main Courses, Desserts)
For each menu item, capture:

Name of the item
Description (if available)
Price (if available)
Any dietary information (vegetarian, vegan, gluten-free, etc.)
Ingredients

If you cannot find a value for description, price_usd, or ingredients, use null. The fields is_vegan, is_vegetarian, is_keto, is_dairy_free, and is_paleo must be filled and must have a boolean value. 
If you cannot determine whether or not a meal meets the requirements to be in one of those fields based off the text available, use False. 
Please only output the JSON Object. Don't include anything around the object like ```json, start from [

Structure the JSON as follows

{
    {
        name: some string value,
        description: some string value,
        is_vegetarian: True/False,
        is_vegan: True/False,
        is_keto: True/False,
        is_dairy_free: True/False,
        is_paleo: True/False,
        price_usd: some float value
        ingredients: comma seperated string of ingredients
    },
        {
        name: some string value,
        description: some string value,
        is_vegetarian: True/False,
        is_vegan: True/False,
        is_keto: True/False,
        is_dairy_free: True/False,
        is_paleo: True/False,
        price_usd: some float value
        ingredients: comma seperated string of ingredients
    },
    ...
}
"""