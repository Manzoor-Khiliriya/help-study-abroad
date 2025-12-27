'use client';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import {
    Box, Button, Typography, Paper, Avatar, Divider,
    CircularProgress, Stack, Chip
} from '@mui/material';
import { Grid } from '@mui/material'; // Using the latest MUI Grid2 for better spacing
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';

export default function UserDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { currentUser, fetchUserById, loading } = useUserStore();

    useEffect(() => {
        if (id) fetchUserById(id as string);
    }, [id, fetchUserById]);

    if (loading || !currentUser) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress size={40} thickness={4} />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 1000, mx: 'auto', p: { xs: 2, sm: 3, md: 4 } }}>
            {/* Navigation */}
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => router.push('/users')}
                sx={{ mb: 3, borderRadius: 2, textTransform: 'none' }}
            >
                Back to Users
            </Button>

            <Paper
                elevation={0}
                sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: '1px solid #eceff1',
                    boxShadow: '0px 4px 20px rgba(0,0,0,0.05)'
                }}
            >
                {/* Header Profile Section with subtle background */}
                <Box sx={{ bgcolor: '#fdfbfbff', p: { xs: 3, md: 5 }, borderBottom: '1px solid #eee' }}>
                    <Grid container spacing={4} sx={{ alignItems: 'center' }}>
                        <Grid size={{ xs: 12, md: 'auto' }} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Avatar
                                src={currentUser.image}
                                sx={{
                                    width: { xs: 120, md: 160 },
                                    height: { xs: 120, md: 160 },
                                    boxShadow: '0px 8px 16px rgba(0,0,0,0.1)',
                                    border: '4px solid #fff'
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 'grow' }}>
                            <Stack spacing={1} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                                <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
                                    {currentUser.firstName} {currentUser.lastName}
                                </Typography>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    justifyContent={{ xs: 'center', md: 'flex-start' }}
                                >
                                    <BusinessIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                                    <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                                        {currentUser.company?.title} at {currentUser.company?.name}
                                    </Typography>
                                </Stack>
                                <Box sx={{ mt: 1, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 1 }}>
                                    <Chip label={currentUser.role || 'Member'} color="primary" variant="outlined" size="small" />
                                    <Chip label="Active" color="success" size="small" />
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>

                {/* Details Section */}
                <Box sx={{ p: { xs: 3, md: 5 } }}>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Personal Information</Typography>

                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <InfoCard
                                icon={<EmailIcon color="primary" />}
                                label="Email Address"
                                value={currentUser.email}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <InfoCard
                                icon={<PhoneIcon color="primary" />}
                                label="Phone Number"
                                value={currentUser.phone}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <InfoCard
                                icon={<LocationOnIcon color="primary" />}
                                label="Office Address"
                                value={`${currentUser.address?.address}, ${currentUser.address?.city}`}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Box sx={{ pl: 1 }}>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontWeight: 600, textTransform: 'uppercase' }}>
                                    Gender
                                </Typography>
                                <Typography sx={{ textTransform: 'capitalize', fontWeight: 500 }}>
                                    {currentUser.gender}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
}


function InfoCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <Stack direction="row" spacing={2} alignItems="flex-start">
            <Box sx={{ bgcolor: 'primary.light', p: 1, borderRadius: 1.5, display: 'flex', opacity: 0.8 }}>
                {icon}
            </Box>
            <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontWeight: 600, textTransform: 'uppercase' }}>
                    {label}
                </Typography>
                <Typography sx={{ fontWeight: 500, wordBreak: 'break-all' }}>
                    {value}
                </Typography>
            </Box>
        </Stack>
    );
}