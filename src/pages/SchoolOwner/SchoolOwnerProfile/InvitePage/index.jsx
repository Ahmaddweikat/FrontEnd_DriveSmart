import React, { useState } from 'react';
import {
    Typography,
    TextField,
    Button,
    Paper,
    Alert,
} from '@mui/material';
import { useForm } from 'react-hook-form';

const InvitePage = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            console.log('Sending invitation to:', data.email);
            setSuccessMessage('Invitation sent successfully!');
            reset();
            setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
        } catch (error) {
            setErrorMessage('Failed to send invitation. Please try again.');
        }
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
                            mb: 4
                        }}
                    >
                        Invite Trainers
                    </Typography>

                    <Paper elevation={2} className="p-6">
                        <Typography variant="h6" className="mb-4">
                            Send New Invitation
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <TextField
                                fullWidth
                                label="Trainer's Email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address',
                                    },
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{
                                    backgroundColor: '#72b626',
                                    '&:hover': {
                                        backgroundColor: '#5f9c1f',
                                    },
                                }}
                            >
                                Send Invitation
                            </Button>
                        </form>

                        {successMessage && (
                            <Alert severity="success" className="mt-4">
                                {successMessage}
                            </Alert>
                        )}
                        {errorMessage && (
                            <Alert severity="error" className="mt-4">
                                {errorMessage}
                            </Alert>
                        )}
                    </Paper>
                </div>
            </div>
        </div>
    );
};

export default InvitePage;