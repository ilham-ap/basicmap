from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Example endpoint to get topographic data
@app.route('/api/data', methods=['GET'])
def get_data():
    # Simulated data for demonstration purposes
    data = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [102.0, 0.5]
                },
                'properties': {
                    'name': 'Example Point'
                }
            }
        ]
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
