from PyPDF2 import PdfReader
import sys

pdf_path = r'public/new/محتوى الموقع الإلكتروني لونير مارينا 1 (1).pdf'
output_path = r'pdf_content.txt'

try:
    reader = PdfReader(pdf_path)
    text = ""
    for i, page in enumerate(reader.pages):
        text += f"\n---PAGE {i+1}---\n"
        text += page.extract_text() or ""
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(text)
    
    print(f"Successfully extracted {len(reader.pages)} pages to {output_path}")
except Exception as e:
    print(f"Error: {e}")
