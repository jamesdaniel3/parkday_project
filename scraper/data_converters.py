import pytesseract
from PIL import Image

def extract_text_from_image(image_path):
    try:
        # Open the image
        image = Image.open(image_path)
        
        # Extract text using pytesseract
        text = pytesseract.image_to_string(image)
        
        return text
    except Exception as e:
        print(f"Error extracting text from image: {e}")
        return ""