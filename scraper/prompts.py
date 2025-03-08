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
Please only output the JSON Object. 
"""