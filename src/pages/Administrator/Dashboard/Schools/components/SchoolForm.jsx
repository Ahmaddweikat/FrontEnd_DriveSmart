import React, { useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schoolSchema } from '../schema/schoolSchema';

const SchoolForm = ({ open, handleClose, handleSubmit, initialData = null }) => {
    const {
        register,
        handleSubmit: handleFormSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        resolver: zodResolver(schoolSchema),
        defaultValues: {
            name: '',
            address: '',
            city: '',
            description: '',
            phone: '',
            website: '',
            email: '',
            managerId: '',
            logo: '',
        },
    });

    // Reset form when initialData changes or dialog opens/closes
    useEffect(() => {
        if (open) {
            if (initialData) {
                // Set each field individually to ensure all fields are updated
                Object.keys(initialData).forEach((key) => {
                    if (key !== 'id') { // Skip the id field
                        setValue(key, initialData[key]);
                    }
                });
            } else {
                reset({
                    name: '',
                    address: '',
                    city: '',
                    description: '',
                    phone: '',
                    website: '',
                    email: '',
                    managerId: '',
                    logo: '',
                });
            }
        }
    }, [open, initialData, setValue, reset]);

    const onSubmit = async (data) => {
        await handleSubmit(data);
        reset();
    };

    const onClose = () => {
        reset();
        handleClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                {initialData ? "Edit School" : "Add New School"}
            </DialogTitle>
            <form onSubmit={handleFormSubmit(onSubmit)}>
                <DialogContent>
                    <Box sx={{ display: "grid", gap: 2, pt: 2 }}>
                        <TextField
                            {...register('name')}
                            label="School Name"
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                        <TextField
                            {...register('address')}
                            label="Address"
                            fullWidth
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        />
                        <TextField
                            {...register('city')}
                            label="City"
                            fullWidth
                            error={!!errors.city}
                            helperText={errors.city?.message}
                        />
                        <TextField
                            {...register('description')}
                            label="Description"
                            fullWidth
                            multiline
                            rows={3}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                        <TextField
                            {...register('phone')}
                            label="Phone"
                            fullWidth
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                        <TextField
                            {...register('website')}
                            label="Website"
                            fullWidth
                            error={!!errors.website}
                            helperText={errors.website?.message}
                        />
                        <TextField
                            {...register('email')}
                            label="Email"
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            {...register('managerId')}
                            label="Manager ID"
                            fullWidth
                            error={!!errors.managerId}
                            helperText={errors.managerId?.message}
                        />
                        <TextField
                            {...register('logo')}
                            label="Logo URL"
                            fullWidth
                            error={!!errors.logo}
                            helperText={errors.logo?.message}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button 
                      onClick={handleClose}
                      sx={{
                        color: '#72b626',
                        '&:hover': {
                          bgcolor: 'rgba(114, 182, 38, 0.04)',
                        },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        bgcolor: '#72b626',
                        '&:hover': {
                          bgcolor: '#5a9320',
                        },
                      }}
                    >
                      {initialData ? 'Update' : 'Add'} School
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default SchoolForm;
