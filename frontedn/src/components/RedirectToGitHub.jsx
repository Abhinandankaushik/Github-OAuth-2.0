import React, { useState } from 'react'

const GitHubLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const goToLogin = () => {
    setLoading(true);
    window.location.href = 'http://localhost:8000/auth/githublogin';
  }

  return (
    <div>
      <button onClick={goToLogin}>Login With GitHub</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default GitHubLogin
