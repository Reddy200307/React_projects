import React from "react";

import { Container, Typography, Grid, Paper, Stack, Button, Box,Chip } from '@mui/material';
import { FaGlobe, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import {  FaJava, FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiDart, SiMaterialdesign,SiGooglesheets,SiOpencv,SiArduino } from "react-icons/si";
import { FaFlutter } from "react-icons/fa6";
import { IoLogoFirebase } from "react-icons/io5";
import PortfolioImage from "../assets/projects_images/portfolio.png"
import Samarpan2024 from "../assets/projects_images/samarpan_2024.png"
import Samarpan2023 from "../assets/projects_images/samarpan_2023.png"
import ToDoMatic from "../assets/projects_images/toDo.png";
import ExpensesCalculator from "../assets/projects_images/PersonalExpenses.png"
import Smarthome from "../assets/projects_images/SmartHome.png"
import { PiPepper } from "react-icons/pi";
// Map tech names to icons
const techIcons: { [key: string]: React.JSX.Element }  = {
  Flutter: <FaFlutter size={14} />,
  Dart: <SiDart size={14} />,
  "Material UI": <SiMaterialdesign size={14} />,
  Java: <FaJava size={14} />,
  HTML: <FaHtml5 size={14} />,
  CSS: <FaCss3Alt size={14} />,
  React: <FaReact size={14} />,
  NodeJS: <FaNodeJs size={14} />,
  Python: <FaPython size={14} />,
  Firebase: <IoLogoFirebase size={14} />,
  "Google Sheets": <SiGooglesheets size={14} />,
  "Open Cv": <SiOpencv size={14} />,
  Arduino: <SiArduino size={14} />,
  Flask:<PiPepper size={14}/>
};

const projects = [
  {
    title: 'This Portfolio Website',
    desc: 'A personal portfolio built using React and Material Ui.',
    tech: ['React', 'CSS', 'Material UI'], 
    live: '/',
    github: 'https://github.com/Reddy200307/React_projects/tree/main/personal-portfolio',
    img: PortfolioImage,
  },
    {
    title: 'Samarpan 2024',
    desc: 'A WebPage used to manage the events of CBIT Samarpan event.',
    tech: ['React', 'Material UI','Google Sheets'],
    live: 'https://cbit-samarpan-2024.vercel.app/',
    github: 'https://github.com/Reddy200307/React_projects/tree/main/personal-portfolio',
    img: Samarpan2024,
  },
  {
    title: 'Samarpan 2023',
    desc: 'A WebPage used to manage the events of CBIT Samarpan event.',
    tech: ['React', 'CSS','Firebase'], 
    live: 'https://samarpan-cbit-2023.web.app/',
    github: 'https://github.com/Reddy200307/React_projects/tree/main/personal-portfolio',
    img: Samarpan2023,
  },
  {
    title: 'Personal Expenses Calculator',
    desc: 'A Simple App to calculate Personal or Any expenses.',
    tech: ['React', 'Flask','Open Cv','Arduino'],
    live: '',
    github: 'https://github.com/Reddy200307/React_projects/tree/main/personal-expenses-calculator',
    img: Smarthome,
  },
  {
    title: 'ToDo Matic',
    desc: 'A Simple todo App using React,MUI and React-Lottie .',
    tech: ['React', 'CSS','Firebase'], 
    live: 'https://prashanth-reddy-projects.web.app/',
    github: 'https://github.com/Reddy200307/React_projects/tree/main/to-do-list-swipeable',
    img: ToDoMatic,
  },
  {
    title: 'Personal Expenses Calculator',
    desc: 'A Simple App to calculate Personal or Any expenses.',
    tech: ['React', 'CSS','Firebase'],
    live: 'https://prashanth-reddy-projects-personal-expenses-calculator.web.app/',
    github: 'https://github.com/Reddy200307/React_projects/tree/main/personal-expenses-calculator',
    img: ExpensesCalculator,
  },
];



export default function ProjectsSection() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6,md:6 } }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        color="white"
        sx={{ textAlign: 'center', mb: { xs: 4, sm: 6 } }}
      >
        Projects
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3, md: 3 }}>
        {projects.map((project, idx) => (
          <Grid
            key={idx}
            size={{
                xs:12,      // full width on extra-small devices (<600px)
            sm:6,       // half width on small devices (600px+)
            md:12,       // one third width on medium devices (900px+)
            lg:6
              }}      // one quarter width on large devices (1200px+)
          >
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 6,
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  color: 'white',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <Box
                  component="img"
                  src={project.img}
                  alt={project.title}
                  sx={{
                    width: '100%',
                    height: { xs: 220, sm: 240, md: 290 },
                    // objectFit: 'inherit',
                    borderRadius: 4,
                    mb: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />

                <Typography variant="h6" fontWeight="bold" gutterBottom noWrap sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                  {project.title}
                </Typography>

                <Typography sx={{ flexGrow: 1, fontSize: { xs: '0.85rem', sm: '0.95rem' } }} noWrap>
                  {project.desc}
                </Typography>

<Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
  {project.tech.map((t, index) => (
    <motion.div
      key={index}
      initial={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      style={{ display: "inline-flex" }}
    >
      <Chip
        icon={techIcons[t] || null}
        label={t}
        variant="outlined"
        sx={{
          color: "white",
          borderColor: "rgba(255, 255, 255, 0.5)",
          fontSize: { xs: "0.65rem", sm: "0.75rem",md:"0.9rem" },
          height: 24,mt:1,
          backgroundColor: "rgba(255,255,255,0.05)",
           '& .MuiChip-icon': {
      color: 'white',
            fontSize: '1.2rem', 
    }
        }}
      />
    </motion.div>
  ))}
</Stack>




                <Stack direction="row" spacing={1} mt={3}>
                  <Button
                    href={project.live}
                    startIcon={<FaGlobe />}
                    size="small"
                    sx={{ color: 'white', textTransform: 'none', fontSize: { xs: '0.7rem', sm: '0.8rem' },border:1,borderColor:"GrayText",borderRadius:3 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                   View Live
                  </Button>
                  <Button
                    href={project.github}
                    startIcon={<FaGithub />}
                    size="small"
                    sx={{ color: 'white', textTransform: 'none', fontSize: { xs: '0.7rem', sm: '0.8rem', },border:1,borderColor:"GrayText",borderRadius:3 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source Code on GitHub
                  </Button>
                </Stack>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}