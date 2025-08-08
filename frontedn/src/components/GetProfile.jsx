import React , {useState}from 'react'

const GetProfile = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState(null);

    const getProfile = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/auth/github/profile', {
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }
            console.log(data);
            const data = await response.json();
            setProfile(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
  return (
    <div>
      
        <button onClick={getProfile}>Get GitHub Profile</button>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {profile && (
            <div>
                <p>Profile:</p>
                <pre>{JSON.stringify(profile, null, 2)}</pre>
            </div>
        )}

    </div>
  )
}

export default GetProfile