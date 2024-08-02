from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [135.5, 82.5]
                },
                'properties': {
                    'name': 'Example Point',
                    'link': 'https://example.com'
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [
                        [
                            [90.0, 82.0],
                            [140.0, 82.0],
                            [140.0, 50.0],
                            [90.0, 50.0],
                            [90.0, 82.0]
                        ]
                    ]
                },
                'properties': {
                    'name': 'Example Polygon',
                    'link': 'https://example.com/polygon'
                }
            }
        ]
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
