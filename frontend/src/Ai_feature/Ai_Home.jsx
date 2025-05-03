import { Container, Grid, Paper, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const Home = () => {
  const navigate = useNavigate();

  const designOptions = [
    {
      title: 'Start from Scratch',
      description: 'Begin with a blank canvas and create your design from the ground up',
      icon: '🎨',
      action: () => navigate('/design-studio/new'),
    },
    {
      title: 'AI-Powered Design',
      description: 'Let AI generate a complete interior design based on your preferences',
      icon: '🤖',
      action: () => navigate('/design-studio/ai'),
    },
    {
      title: 'Template Gallery',
      description: 'Choose from pre-made templates and customize them to your needs',
      icon: '🏠',
      action: () => navigate('/templates'),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" component="h1" gutterBottom>
          AI Interior Design Studio
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Create stunning interior designs with the power of AI
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {designOptions.map((option, index) => (
          <Grid item xs={12} md={4} key={index}>
            <StyledPaper onClick={option.action}>
              <Box>
                <Typography variant="h1" gutterBottom>
                  {option.icon}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                  {option.title}
                </Typography>
                <Typography color="text.secondary">
                  {option.description}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
              >
                Get Started
              </Button>
            </StyledPaper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home; 