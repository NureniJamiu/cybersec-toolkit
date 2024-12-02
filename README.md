# Basic Port Scanner

## Project Overview
A full-stack port scanning application built with Python Flask backend and React frontend, demonstrating cybersecurity and software engineering skills.

## Features
- TCP Connect Scan
- Multithreaded port scanning
- Comprehensive service detection
- Responsive UI with detailed scan results
- Error handling and user-friendly interface

## Prerequisites
- Python 3.8+
- Node.js 14+
- pip
- npm

## Backend Setup
1. Create a virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```

2. Install dependencies
```bash
pip install flask flask-cors
```

3. Run the backend
```bash
python port_scanner_backend.py
```

## Frontend Setup
1. Install dependencies
```bash
npm install axios react-dom react react-scripts
```

2. Run the frontend
```bash
npm start
```

## Security Disclaimer
- Only scan networks and systems you own or have explicit permission to test
- Unauthorized port scanning can be considered a hostile act

## Potential Improvements
- Add more scan types (SYN, UDP)
- Implement more detailed service fingerprinting
- Add network visualization
- Enhance error handling

## Learning Outcomes
- Python backend development
- React frontend design
- Network programming
- Cybersecurity scanning techniques

## Contributing
PRs welcome! Please respect ethical hacking guidelines.