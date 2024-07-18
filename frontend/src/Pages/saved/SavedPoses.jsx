import { useState, useEffect } from 'react';
import { CardDefault } from '../../components/card/card';
import axios from 'axios';

const SavedPoses = () => {
    const [savedPoses, setSavedPoses] = useState([]);

    useEffect(() => {
        const fetchSavedPoses = async () => {
            try {
                const response = await axios.get('http://localhost:8001/get_saved_poses.php');
                console.log("Fetched Poses: ", response.data); // Debugging line
                setSavedPoses(response.data); // Assuming the array is directly in data
            } catch (error) {
                console.error('Error fetching saved poses:', error);
            }
        };

        fetchSavedPoses();
    }, []);

    return (
        <div className="flex flex-wrap justify-center gap-6 py-8">
            {savedPoses.map(pose => (
                <CardDefault
                    key={pose.id}
                    name={pose.name}
                    imageUrl={pose.image_url || 'https://via.placeholder.com/150'} // Placeholder if image_url is not available
                    poseDescription={pose.description}
                    onClick={() => console.log(`Clicked on ${pose.name}`)}
                    onSave={() => console.log(`Saved ${pose.name}`)}
                    isSelected={false}
                />
            ))}
        </div>
    );
};

export default SavedPoses;
