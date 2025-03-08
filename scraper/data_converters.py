import pytesseract
from PIL import Image
import PyPDF2
from pdf2image import convert_from_path

def extract_text_from_image(image_path):
    try:
        image = Image.open(image_path)
        text = pytesseract.image_to_string(image)
        
        return text
    except Exception as e:
        print(f"Error extracting text from image: {e}")
        return ""

def extract_text_from_pdf(pdf_path):
    extracted_text = ""
    
    # First, try to extract text directly (works for text-based PDFs)
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            direct_text = ""
            
            for page_num in range(len(reader.pages)):
                page = reader.pages[page_num]
                direct_text += page.extract_text() or ""
            
            # If we got meaningful text, return it
            if direct_text.strip():
                return direct_text
    except Exception as e:
        print(f"Error extracting text directly from PDF: {e}")
    
    # If direct extraction failed or returned no text, use OCR
    try:
        print("Attempting to extract text from PDF using OCR (this may take a while)...")
        
        # Create a temporary directory to store the images
        with tempfile.TemporaryDirectory() as temp_dir:
            # Convert PDF to images
            images = convert_from_path(pdf_path)
            
            # Extract text from each image
            for i, image in enumerate(images):
                print(f"Processing page {i+1}/{len(images)}...")
                
                # Extract text from the image
                text = pytesseract.image_to_string(image)
                extracted_text += text + "\n\n"
        
        return extracted_text
    except Exception as e:
        print(f"Error extracting text from PDF using OCR: {e}")
        return ""