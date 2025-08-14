import { Box, Typography, Grid, Button } from "@mui/material";
import { FaGithub } from "react-icons/fa";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { SiLeetcode, SiGmail } from "react-icons/si";
import { motion } from "framer-motion";
import "../App.css"
export default function SocialLinks() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay },
    }),
  };

  const links = [
    { label: "Gmail", icon: <SiGmail />, href: "mailto:grprashanthreddy@gmail.com" },
    { label: "LinkedIn", icon: <LinkedInIcon />, href: "https://www.linkedin.com/in/g-r-prashanth-reddy-186574220/" },
    { label: "YouTube", icon: <YouTubeIcon />, href: "https://www.youtube.com/@its_prashanth27" },
    { label: "GitHub", icon: <FaGithub />, href: "https://github.com/Reddy200307" },
    { label: "LeetCode", icon: <SiLeetcode />, href: "https://leetcode.com/u/grprashanthreddy/" },
  ];

  const buttonStyles = {
    p: 1,
    border: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    color: "white",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.09)",
    fontSize: { xs: "0.85rem", sm: "1rem", md: "1.085rem" },
    textTransform: "none",
    borderRadius: 40,
    fontFamily: 'DM Sans, sans-serif',
    transition: 'transform 0.3s ease',
     '&:hover': {
                      transform: 'scale(1.05)',
                    },
  };

  return (
    <Box>
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0.4}>
        <Typography variant="h6" mt={{ xs: 2, sm: 3, md: 4 }} textAlign="center" p={2}>
          My Other Links
        </Typography>

        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center">
          {links.map((link, idx) => (
            <Grid  key={idx}>
              <Button
                variant="outlined"
                startIcon={link.icon}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={buttonStyles}
              >
                {link.label} Link
              </Button>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
}
