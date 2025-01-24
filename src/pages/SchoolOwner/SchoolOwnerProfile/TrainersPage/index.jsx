import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Typography,
} from '@mui/material';
import SearchBar from './components/SearchBar';
import TrainersTable from './components/TrainersTable';
import useTrainers from './hooks/useTrainers';

const TrainersPage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [availabilityFilter, setAvailabilityFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { trainers, loading, error, filterTrainers } = useTrainers();

    const filteredTrainers = filterTrainers(searchQuery, availabilityFilter);
    const totalPages = Math.ceil(filteredTrainers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedTrainers = filteredTrainers.slice(startIndex, startIndex + itemsPerPage);

    const handleViewDetails = (trainer) => {
    const urlFriendlyName = trainer.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/schoolManager/trainers/${urlFriendlyName}`);
};


    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };



    return (
        <div className="h-full overflow-y-auto bg-gray-100">
            <div className="p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    <Typography 
                        variant="h4" 
                        component="h1" 
                        sx={{ 
                            fontWeight: 600,
                            color: '#1a1a1a',
                        }}
                    >
                        School Trainers
                    </Typography>

                    <SearchBar 
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        availabilityFilter={availabilityFilter}
                        setAvailabilityFilter={setAvailabilityFilter}
                    />

                    <TrainersTable 
                        trainers={displayedTrainers}
                        handleViewDetails={handleViewDetails}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default TrainersPage;