import { useState, useEffect } from 'react';

const useMaterials = () => {
  const [materials, setMaterials] = useState({ signs: [], books: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredMaterials, setFilteredMaterials] = useState({ signs: [], books: [] });

  useEffect(() => {
    // Simulated API call - replace with actual API call
    const fetchMaterials = async () => {
      try {
        // Mock data - replace with actual API data
        const mockMaterials = {
          signs: [
            {
              title: 'Warning Signs',
              description: 'Signs that warn drivers of potential hazards ahead. These signs are typically triangular with a red border.',
              imageUrl: '/images/warning-signs.png',
              content: '• Dangerous bend ahead\n• Pedestrian crossing\n• School ahead\n• Road works\n• Slippery road\n• Wild animals\n• Traffic merging\n• Steep hill\n\nWarning signs are designed to alert drivers to upcoming hazards and prepare them to take appropriate action. They are characterized by their distinctive triangular shape and red border.'
            },
            {
              title: 'Guidance Signs',
              description: 'Directional signs that help drivers navigate roads and find destinations.',
              imageUrl: '/images/guidance-signs.png',
              content: '• Direction arrows\n• Distance markers\n• Exit signs\n• Town and city names\n• Tourist destinations\n• Service areas\n• Route numbers\n• Lane guidance\n\nGuidance signs help drivers navigate efficiently and safely to their destinations. They are typically blue or green and contain clear directional information.'
            },
            {
              title: 'Inquiry Signs',
              description: 'Signs providing information about facilities, services, and points of interest.',
              imageUrl: '/images/inquiry-signs.png',
              content: '• Information centers\n• Parking facilities\n• Hospitals\n• Rest areas\n• Fuel stations\n• Restaurants\n• Hotels\n• Emergency services\n\nInquiry signs help drivers locate important services and facilities along their journey. They are usually rectangular with specific symbols or text.'
            },
            {
              title: 'Road Surface Signs',
              description: 'Markings and signs indicating road conditions and lane usage.',
              imageUrl: '/images/road-surface-signs.png',
              content: '• Lane markings\n• Stop lines\n• Pedestrian crossings\n• Cycle lanes\n• Speed bumps\n• Box junctions\n• Arrow markings\n• Bus lanes\n\nRoad surface signs and markings are essential for safe traffic flow and proper lane usage. They are painted directly on the road surface or mounted nearby.'
            },
            {
              title: 'Traffic Lights Signs',
              description: 'Understanding traffic signals and associated signs.',
              imageUrl: '/images/traffic-lights-signs.png',
              content: '• Traffic light sequences\n• Pedestrian signals\n• Bicycle signals\n• Arrow signals\n• Flashing signals\n• Bus priority signals\n• Emergency vehicle signals\n• Railway crossing signals\n\nTraffic light signs control the flow of traffic at intersections and crossings. Understanding these signals is crucial for safe driving.'
            },
            {
              title: 'Helping Signs',
              description: 'Signs that provide assistance and emergency information.',
              imageUrl: '/images/helping-signs.png',
              content: '• Emergency phones\n• First aid points\n• Police stations\n• Breakdown services\n• Emergency exits\n• Assembly points\n• SOS phones\n• Evacuation routes\n\nHelping signs direct drivers to emergency services and assistance when needed. They are designed to be easily visible in all conditions.'
            }
          ],
          books: [
            {
              title: 'Driving Theory',
              description: 'Complete guide to driving theory and regulations',
              progress: 80,
              imageUrl: '/images/theory-book.png',
              content: 'This comprehensive guide covers all aspects of driving theory, including:\n\n• Traffic laws and regulations\n• Right of way rules\n• Safe driving practices\n• Weather conditions driving\n• Emergency procedures\n\nMastering these concepts is essential for becoming a safe and responsible driver.'
            },
            {
              title: 'Road Safety Manual',
              description: 'Essential knowledge for safe driving practices',
              progress: 65,
              imageUrl: '/images/safety-manual.png',
              content: 'The Road Safety Manual provides crucial information about:\n\n• Defensive driving techniques\n• Vehicle safety checks\n• Emergency maneuvers\n• Accident prevention\n• First aid basics\n\nThis knowledge helps ensure your safety and the safety of others on the road.'
            },
            {
              title: 'Vehicle Maintenance',
              description: 'Basic vehicle maintenance and safety checks',
              progress: 40,
              imageUrl: '/images/maintenance-book.png',
              content: 'Learn essential vehicle maintenance including:\n\n• Regular maintenance schedules\n• Basic troubleshooting\n• Fluid checks and replacement\n• Tire maintenance\n• Emergency repair basics\n\nProper vehicle maintenance is crucial for safe and reliable driving.'
            }
          ]
        };

        setMaterials(mockMaterials);
        setFilteredMaterials(mockMaterials);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  const searchMaterials = (searchTerm) => {
    const filtered = {
      signs: materials.signs.filter((material) =>
        material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.description.toLowerCase().includes(searchTerm.toLowerCase())
      ),
      books: materials.books.filter((material) =>
        material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    };
    setFilteredMaterials(filtered);
  };

  return {
    materials: filteredMaterials,
    loading,
    error,
    searchMaterials,
  };
};

export default useMaterials;
