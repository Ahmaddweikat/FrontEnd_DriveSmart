import React, { useState } from 'react';
import {
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import SearchBar from './components/SearchBar';
import CarsTable from './components/CarsTable';

const CarsPage = () => {
    const [cars, setCars] = useState([
        {
            id: 1,
            model: 'Toyota Corolla',
            year: '2020',
            transmission: 'Automatic',
            owner: 'school',
            status: 'Available',
            image: 'https://example.com/toyota-corolla.jpg', // Replace with actual image URL
            ownerType: 'school',
        },
        {
            id: 2,
            model: 'Honda Civic',
            year: '2021',
            transmission: 'Manual',
            owner: 'school',
            status: 'In Use',
            image: 'https://example.com/honda-civic.jpg', // Replace with actual image URL
            ownerType: 'school',
        },
    ]);

    const [openDialog, setOpenDialog] = useState(false);
    const [editingCar, setEditingCar] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [ownerType, setOwnerType] = useState('school');
    const itemsPerPage = 10;

    const [trainers] = useState([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Mike Johnson' },
    ]);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    const selectedOwnerType = watch('ownerType', 'school');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const filteredCars = cars.filter(car => {
        const matchesSearch = 
            car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.year.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.transmission.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.owner.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = 
            statusFilter === 'all' || 
            car.status.toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedCars = filteredCars.slice(startIndex, startIndex + itemsPerPage);

    const handleOpenDialog = (car = null) => {
        setEditingCar(car);
        setOpenDialog(true);
        if (car) {
            reset(car);
            setSelectedImage(car.image);
            setOwnerType(car.ownerType || 'school');
        } else {
            reset();
            setSelectedImage(null);
            setOwnerType('school');
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingCar(null);
        setSelectedImage(null);
        setOwnerType('school');
        reset();
    };

    const onSubmit = (data) => {
        const finalData = {
            ...data,
            owner: data.ownerType === 'school' ? 'school' : data.trainerId,
            ownerType: data.ownerType,
        };

        if (editingCar) {
            setCars(cars.map(car => 
                car.id === editingCar.id ? { 
                    ...car, 
                    ...finalData,
                    image: selectedImage || car.image 
                } : car
            ));
        } else {
            setCars([...cars, { 
                ...finalData, 
                id: Date.now(), 
                status: 'Available',
                image: selectedImage || 'https://example.com/default-car.jpg'
            }]);
        }
        setSelectedImage(null);
        handleCloseDialog();
    };

    const handleDelete = (carId) => {
        setCars(cars.filter(car => car.id !== carId));
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div className="h-full overflow-y-auto bg-gray-100">
            <div className="p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="flex justify-between items-center">
                        <Typography 
                            variant="h4" 
                            component="h1" 
                            sx={{ 
                                fontWeight: 600,
                                color: '#1a1a1a',
                            }}
                        >
                            School Cars
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenDialog()}
                            sx={{
                                backgroundColor: '#72b626',
                                '&:hover': {
                                    backgroundColor: '#5f9c1f',
                                },
                            }}
                        >
                            Add New Car
                        </Button>
                    </div>

                    <SearchBar 
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                    />

                    <CarsTable 
                        cars={displayedCars}
                        handleEdit={handleOpenDialog}
                        handleDelete={handleDelete}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />

                    <Dialog 
                        open={openDialog} 
                        onClose={handleCloseDialog}
                        maxWidth="sm"
                        fullWidth
                    >
                        <DialogTitle>
                            {editingCar ? 'Edit Car' : 'Add New Car'}
                        </DialogTitle>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <DialogContent>
                                <div className="space-y-4">
                                    <TextField
                                        fullWidth
                                        label="Car Model"
                                        {...register('model', { required: 'Model is required' })}
                                        error={!!errors.model}
                                        helperText={errors.model?.message}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Year"
                                        {...register('year', { required: 'Year is required' })}
                                        error={!!errors.year}
                                        helperText={errors.year?.message}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Transmission"
                                        {...register('transmission', { required: 'Transmission is required' })}
                                        error={!!errors.transmission}
                                        helperText={errors.transmission?.message}
                                    />
                                    <TextField
                                        fullWidth
                                        select
                                        label="Owner Type"
                                        {...register('ownerType', { required: 'Owner type is required' })}
                                        error={!!errors.ownerType}
                                        helperText={errors.ownerType?.message}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        onChange={(e) => setOwnerType(e.target.value)}
                                        value={ownerType}
                                    >
                                        <option value="school">School</option>
                                        <option value="trainer">Trainer</option>
                                    </TextField>

                                    {ownerType === 'trainer' && (
                                        <TextField
                                            fullWidth
                                            select
                                            label="Select Trainer"
                                            {...register('trainerId', { 
                                                required: ownerType === 'trainer' ? 'Trainer selection is required' : false 
                                            })}
                                            error={!!errors.trainerId}
                                            helperText={errors.trainerId?.message}
                                            SelectProps={{
                                                native: true,
                                            }}
                                        >
                                            <option value="">Select a Trainer</option>
                                            {trainers.map(trainer => (
                                                <option key={trainer.id} value={trainer.name}>
                                                    {trainer.name}
                                                </option>
                                            ))}
                                        </TextField>
                                    )}

                                    <div>
                                        <input
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            id="car-image-upload"
                                            type="file"
                                            onChange={handleImageChange}
                                        />
                                        <label htmlFor="car-image-upload">
                                            <Button
                                                variant="outlined"
                                                component="span"
                                                fullWidth
                                            >
                                                Upload Car Image
                                            </Button>
                                        </label>
                                        {selectedImage && (
                                            <div className="mt-2">
                                                <img 
                                                    src={selectedImage} 
                                                    alt="Selected car" 
                                                    className="w-full h-40 object-cover rounded"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDialog}>Cancel</Button>
                                <Button 
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#72b626',
                                        '&:hover': {
                                            backgroundColor: '#5f9c1f',
                                        },
                                    }}
                                >
                                    {editingCar ? 'Save Changes' : 'Add Car'}
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default CarsPage;