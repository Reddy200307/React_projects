import React from 'react';
import { Box, Container, Typography, Avatar, Stack, Chip } from '@mui/material';
import {  styled as muiStyled } from '@mui/system';
import { motion } from 'framer-motion';
import ProjectsSection from './Projects';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaPython,
  FaGitAlt,
  FaJava,
  FaPepperHot,
} from 'react-icons/fa';
import { TbBrandJavascript,TbBrandCpp } from "react-icons/tb";
import { SiTypescript } from 'react-icons/si';
import SocialLinks from './SocialLinks';
import Carousel from './Carousel';
// import TimelineSection from './timeline';
import { Typewriter } from 'react-simple-typewriter';
import { FaC } from "react-icons/fa6";
import Prashu from "../assets/prashu.jpg";
const skills = [
  { name: 'React', icon: <FaReact /> },
  { name: 'HTML', icon: <FaHtml5 /> },
  { name: 'CSS', icon: <FaCss3Alt /> },
  { name: 'JavaScript', icon: <TbBrandJavascript /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'Python', icon: <FaPython /> },
  { name: 'Flask', icon: <FaPepperHot /> },
  { name: 'C language', icon: <FaC /> },
  { name: 'C++ language', icon: <TbBrandCpp /> },
  { name: 'Java', icon: <FaJava /> },
  { name: 'Git', icon: <FaGitAlt /> },
];


const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h1: {
      fontFamily: 'Orbitron, sans-serif',
      fontWeight: 800,
    },
    h2: {
      fontFamily: 'Orbitron, sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'Orbitron, sans-serif',
    },
       h4: {
      fontFamily: 'Orbitron, sans-serif',
    },
           h5: {
      fontFamily: 'Orbitron, sans-serif',
    },
           h6: {
      fontFamily: 'Orbitron, sans-serif',
    },
    button: {
      fontFamily: 'DM Sans, sans-serif',
      fontWeight: 600,
      textTransform: 'uppercase',
    },
  },
});




import "../App.css";

const StyledSection = muiStyled(motion.section)(({ theme }) => ({
  padding: theme.spacing(8, 2),
  borderRadius: '16px',
}));


const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};




const HomePage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Box sx={{bgcolor:"transparent" ,color:"rgba(255,255,255,0.9)"}}>
    
      <StyledSection id="hero" initial="hidden" animate="visible">
        <Container maxWidth="md">

          <Stack spacing={3} alignItems="center" textAlign="center">
            <motion.div variants={fadeInUp} initial="hidden" animate="visible">
 <motion.div variants={fadeInUp} initial="hidden" animate="visible">
 
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8 }}
>
    <Avatar
    src={Prashu}
    alt='Prashu'
      sx={{
        width:{xs:"178px",md:"300px"},
        height: {xs:"178px",md:"300px"},
        zIndex: 3,
        position: 'relative',
        background: 'linear-gradient(-45deg,  #000000ff)',
        boxShadow: '0 0 20px rgba(0, 0, 0, 1)',
        border: '4px solid rgba(0, 0, 0, 0.3)',
        transition: 'color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease',
   
        '&:hover': {
  // color: 'black',
  transform: 'scale(1.05)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
},
      }}
    />
 </motion.div>
  </motion.div>
</motion.div>

            <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0.1}>
              <Typography variant='h5' fontWeight="bold">
                Hi 👋, I'm 
              </Typography>
              <Typography variant="h5" fontWeight="bold"   sx={{ display: 'inline-block',maxHeight:"3vh",transition: 'all 0.3s ease-in-out',}}
><Typewriter
        words={['G R Prashanth Reddy']}
        loop={0} 
        cursor
        cursorStyle='|'
        typeSpeed={80}
        deleteSpeed={50}
        delaySpeed={3000}
      /> </Typography>
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0.2}>
              <Typography variant="subtitle1" >
                Embedded Engineer | Front End Web Dev | Tech Enthusiast
              </Typography>
            </motion.div>

            {/* <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0.3}>
              <Typography>
                I build fast and beautiful cross-platform apps using Flutter. I love solving real-world problems and bringing ideas to life with clean code and modern UI.
              </Typography>
            </motion.div> */}

            <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0.4}>
              <Typography variant="h6" m={2} >My Skills</Typography>  
               <Grid container spacing={1} justifyContent="center">
                {skills.map((skill,idx) => (
                  <Grid  key={idx}>
                    
                  <Chip
  component={motion.div}
  whileHover={{ scale: 1.1 }}
  label={skill.name}
  variant="outlined"
  sx={{
    p:1,
    border:1,
    backgroundColor:"rgba(255, 255, 255, 0.1)",
    borderColor:"rgba(255, 255, 255, 0.5)",
     backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  color:"white",
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.09)',
    fontSize:{xs:"0.95rem",sm:"1rem",md:"1.085rem"},

    '& .MuiChip-icon': {
      color: 'white',
            fontSize: '1.2rem', 
    },
'&:hover': {

  transform: 'scale(1.05)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  border:2
  
},
    '&:hover .MuiChip-icon': {

}
  }} icon={skill.icon} size="medium"
  aria-label={`Technology: ${skill.name}`}
/>
</Grid>
                ))}
              </Grid>
            </motion.div>
          </Stack>
      <SocialLinks/>

        </Container>
      <ProjectsSection/>
      <Carousel/>
      </StyledSection>

        {/* <TimelineSection/> */}
     
    </Box>
     </ThemeProvider>
  );
};

export default HomePage;
