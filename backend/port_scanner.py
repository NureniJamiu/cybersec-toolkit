import flask
from flask import Flask, request, jsonify
from flask_cors import CORS
import socket
import threading
from concurrent.futures import ThreadPoolExecutor
import time

app = Flask(__name__)
CORS(app)

class PortScanner:
    def __init__(self, target, port_range=None, scan_type='tcp'):
        self.target = target
        self.port_range = port_range or range(1, 1025)  # Default to well-known ports
        self.scan_type = scan_type
        self.results = []

    def scan_port(self, port):
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(1)
            
            if self.scan_type == 'tcp':
                result = sock.connect_ex((self.target, port))
                if result == 0:
                    service = self._get_service_name(port)
                    self.results.append({
                        'port': port,
                        'status': 'Open',
                        'service': service
                    })
            
            sock.close()
        except Exception as e:
            pass

    def _get_service_name(self, port):
        # Basic service mapping
        service_map = {
            21: 'FTP',
            22: 'SSH',
            23: 'Telnet',
            25: 'SMTP',
            53: 'DNS',
            80: 'HTTP',
            443: 'HTTPS',
            3306: 'MySQL',
            5432: 'PostgreSQL',
            8080: 'HTTP Proxy'
        }
        return service_map.get(port, 'Unknown')

    def perform_scan(self):
        start_time = time.time()
        with ThreadPoolExecutor(max_workers=100) as executor:
            list(executor.map(self.scan_port, self.port_range))
        
        scan_duration = time.time() - start_time
        return {
            'target': self.target,
            'scan_type': self.scan_type,
            'total_ports_scanned': len(self.port_range),
            'open_ports': self.results,
            'scan_duration': round(scan_duration, 2)
        }

@app.route('/scan', methods=['POST'])
def scan_ports():
    data = request.json
    target = data.get('target')
    port_range = data.get('port_range', None)
    scan_type = data.get('scan_type', 'tcp')

    if not target:
        return jsonify({'error': 'Target IP is required'}), 400

    try:
        # Convert port range if provided
        if port_range:
            start, end = map(int, port_range.split('-'))
            port_range = range(start, end + 1)

        scanner = PortScanner(target, port_range, scan_type)
        scan_results = scanner.perform_scan()
        return jsonify(scan_results)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)