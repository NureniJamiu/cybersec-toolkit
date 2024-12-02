import axios from "axios";
import { useState } from "react";

function App() {

  const [target, setTarget] = useState('');
  const [portRange, setPortRange] = useState('');
  const [scanType, setScanType] = useState('tcp');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScan = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await axios.post('http://localhost:5000/scan', {
        target,
        port_range: portRange,
        scan_type: scanType
      });

      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Port Scanner</h1>
      
      <div className="mb-4">
        <label className="block mb-2">Target IP/Hostname</label>
        <input
          type="text"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="e.g., scanme.nmap.org"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Port Range (Optional)</label>
        <input
          type="text"
          value={portRange}
          onChange={(e) => setPortRange(e.target.value)}
          placeholder="e.g., 1-1000"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Scan Type</label>
        <select
          value={scanType}
          onChange={(e) => setScanType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="tcp">TCP Connect Scan</option>
        </select>
      </div>

      <button
        onClick={handleScan}
        disabled={!target || loading}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Scanning...' : 'Start Scan'}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {results && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Scan Results</h2>
          <p>Target: {results.target}</p>
          <p>Scan Type: {results.scan_type}</p>
          <p>Total Ports Scanned: {results.total_ports_scanned}</p>
          <p>Scan Duration: {results.scan_duration} seconds</p>

          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Port</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Service</th>
              </tr>
            </thead>
            <tbody>
              {results.open_ports.map((port, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border p-2">{port.port}</td>
                  <td className="border p-2">{port.status}</td>
                  <td className="border p-2">{port.service}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  )
}

export default App
