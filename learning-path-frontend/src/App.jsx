
import { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [result, setResult] = useState('');
  const [resourceLinks, setResourceLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    setResourceLinks([]);

    try {
      const response = await fetch('http://localhost:7071/api/generatePath', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          skills: skills.split(',').map(s => s.trim()),
          interests: interests.split(',').map(i => i.trim())
        })
      });

      const data = await response.json();
      console.log("💬 Backend returned:", response.status, data);
      setResult(data.learningPath || 'No result returned.');
      setResourceLinks(data.resources || []);
    } catch (err) {
      setResult('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Learning Path Generator</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Your Skills (comma-separated)" value={skills} onChange={e => setSkills(e.target.value)} required />
        <input placeholder="Your Interests (comma-separated)" value={interests} onChange={e => setInterests(e.target.value)} required />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Learning Path'}
        </button>
      </form>

      {result && (
        <div className="result">
          <h2>Your Personalized Learning Path:</h2>
          <pre>{result}</pre>

          {resourceLinks.length > 0 && (
            <div>
              <h3 >📚 Suggested Resources:</h3>
              <ul>
                {resourceLinks.map((res, index) => (
                  <li key={index}>
                    <strong>{res.title}</strong><br />
                    🔗 <a href={res.link} target="_blank" rel="noreferrer">Official Resource</a><br />
                    ▶️ <a href={res.youtube} target="_blank" rel="noreferrer">YouTube Playlist</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
