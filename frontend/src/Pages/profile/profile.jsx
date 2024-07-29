
import { useState, useEffect } from 'react';
import './profile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [userDetails, setUserDetails] = useState({});
  const [savedPoses, setSavedPoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/SignIn');
      return;
    }

    const fetchData = async () => {
      setLoading(true); // Set loading before starting to fetch
      setError(null); // Reset error before fetching new data
      try {
        const [userResponse, posesResponse] = await Promise.all([
          axios.get(`http://localhost:8001/get_user.php?user_id=${user.id}`),
          axios.get(`http://localhost:8001/get_saved_poses.php?user_id=${user.id}`)
        ]);

        setUserDetails(userResponse.data);
        setSavedPoses(posesResponse.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error); // Log the actual error
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      try {
        await logout();
        navigate('/SignIn');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  };

  const handleViewAllPoses = () => {
    navigate('/saved-poses');
  };

  const handleReadMore = (poseName) => {
    navigate(`/pose/${poseName}`);
  };

  if (loading) {
    return <div className="loading-spinner"><div className="spinner"></div></div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="user-details">
        <h2>User Details</h2>
        <p>Username: {userDetails.username}</p> {/* Ensure userDetails is used */}
        <button className="button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="saved-poses">
        <h2>Saved Poses</h2>
        {savedPoses.map((pose, index) => (
          <div key={index} className="pose-item" onClick={() => handleReadMore(pose.name)}>
            <p>{pose.name}</p>
            <img src={pose.image_url || 'https://via.placeholder.com/150'} alt={pose.name} />
          </div>
        ))}
        <button className="button" onClick={handleViewAllPoses}>View All</button>
      </div>
    </div>
  );
};

export default Profile;
