from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import io
from latex import build_pdf

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def compile_latex(latex_content):
    try:
        # Compile the LaTeX content to PDF
        pdf = build_pdf(latex_content)
        pdf_io = io.BytesIO()
        pdf.save_to(pdf_io)
        pdf_io.seek(0)  # Move the cursor to the beginning of the BytesIO object
        print('PDF generated successfully')
        return pdf_io
    except Exception as e:
        print(f'Error compiling LaTeX: {e}')
        return None

@app.route('/compile', methods=['POST'])
def compile_latex_endpoint():
    data = request.get_json()
    latex_content = data.get('latex')
    print(latex_content)

    if not latex_content:
        return jsonify({'error': 'LaTeX content is required'}), 400

    pdf_io = compile_latex(latex_content)
    if pdf_io:
        return send_file(pdf_io, as_attachment=True, download_name='compiled.pdf', mimetype='application/pdf')
    else:
        return jsonify({'error': 'Failed to generate PDF'}), 500

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({'message': 'pong'})

# Start the server
if __name__ == '__main__':
    app.run(host='0.0.0.0')