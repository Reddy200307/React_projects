import React, { useEffect, useRef, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  IconButton,
  Paper,
  CssBaseline,
  useMediaQuery,
  Typography,
  Dialog,
  CircularProgress,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import "../index.css";

type Slide = {
  src: string;
};

const DEFAULT_SLIDES: Slide[] = [
  { src: "https://github.com/Reddy200307/React_projects/blob/main/personal-portfolio/src/assets/images/img1.jpg?raw=true" },
  { src: "https://github.com/Reddy200307/React_projects/blob/main/personal-portfolio/src/assets/images/img2.jpg?raw=true" },
  { src: "https://github.com/Reddy200307/React_projects/blob/main/personal-portfolio/src/assets/images/img3.jpg?raw=true" },
  { src: "https://github.com/Reddy200307/React_projects/blob/main/personal-portfolio/src/assets/images/img4.jpg?raw=true" },
  { src: "https://github.com/Reddy200307/React_projects/blob/main/personal-portfolio/src/assets/images/img5.jpg?raw=true" },
  { src: "https://github.com/Reddy200307/React_projects/blob/main/personal-portfolio/src/assets/images/img6.jpg?raw=true" },
  { src: "https://github.com/Reddy200307/React_projects/blob/main/personal-portfolio/src/assets/images/img7.jpg?raw=true" },
  { src: "https://github.com/Reddy200307/React_projects/blob/main/personal-portfolio/src/assets/images/img8.jpg?raw=true" },
  { src: "https://github.com/Reddy200307/React_projects/blob/main/personal-portfolio/src/assets/images/img9.jpg?raw=true" },
  { src: "https://github.com/Reddy200307/React_projects/blob/main/personal-portfolio/src/assets/images/img10.jpg?raw=true" },
  { src: "https://github.com/Reddy200307/React_projects/blob/main/personal-portfolio/src/assets/images/img11.jpg?raw=true" },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.98,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.98,
  }),
};

// Reusable image component with spinner
function ImageWithLoader({
  src,
  alt,
  style,
  onClick,
}: {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const [loading, setLoading] = useState(true);

  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading && <CircularProgress size={48} sx={{ position: "absolute", zIndex: 2 }} />}
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoading(false)}
        style={{
          ...style,
          opacity: loading ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
        onClick={onClick}
      />
    </Box>
  );
}

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoplayRef = useRef<number | null>(null);
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [paused, setPaused] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: { mode: prefersDark ? "dark" : "light" },
        typography: {
          fontFamily: "DM Sans, sans-serif",
          h4: {
            fontFamily: "Orbitron, sans-serif",
            fontWeight: 500,
          },
          body1: {
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 400,
          },
        },
      }),
    [prefersDark]
  );

  const slideTo = (newIndex: number, dir: number) => {
    setDirection(dir);
    setIndex((newIndex + DEFAULT_SLIDES.length) % DEFAULT_SLIDES.length);
  };

  useEffect(() => {
    if (!paused) {
      autoplayRef.current = window.setInterval(
        () => slideTo(index + 1, 1),
        4000
      );
    }
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [index, paused]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            maxWidth: 1000,
            borderRadius: 6,
            overflow: "hidden",
            p: { xs: 1.5, sm: 2 },
             backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: "1px solid rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            color: "white",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Typography variant="h4" sx={{ my: 2, textAlign: "center" }}>
            My Image Carousel
          </Typography>

          <Typography
            variant="body1"
            sx={{
              my: 2,
              textAlign: "center",
              fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.2rem" },
            }}
          >
            These are the images which I took when I was passionate about
            photography
          </Typography>

          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: 350, sm: 500, md: 700 },
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
           <AnimatePresence custom={direction} initial={false}>
  <motion.div
    key={DEFAULT_SLIDES[index].src}
    custom={direction}
    variants={variants}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{ duration: 0.6, ease: "easeInOut" }}
    style={{
      position: "absolute",
      width: "100%",
      height: "100%",
    }}
  >
    <ImageWithLoader
      src={DEFAULT_SLIDES[index].src}
      alt={`Slide ${index + 1}`}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: 10,
        cursor: "pointer",
      }}
      onClick={() => setFullscreen(true)}
    />
  </motion.div>
</AnimatePresence>


            <IconButton
              onClick={() => slideTo(index - 1, -1)}
              sx={{
                position: "absolute",
                left: 8,
                top: "50%",
                bgcolor: "rgba(0,0,0,0.35)",
                color: "white",
                "&:hover": { bgcolor: "rgba(0,0,0,0.55)" },
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            <IconButton
              onClick={() => slideTo(index + 1, 1)}
              sx={{
                position: "absolute",
                right: 8,
                top: "50%",
                bgcolor: "rgba(0,0,0,0.35)",
                color: "white",
                "&:hover": { bgcolor: "rgba(0,0,0,0.55)" },
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>

            {/* Slide count */}
            <Typography
              variant="body2"
              sx={{
                position: "absolute",
                bottom: 12,
                right: 16,
                bgcolor: "rgba(0,0,0,0.4)",
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                fontSize: "0.85rem",
              }}
            >
              {index + 1} / {DEFAULT_SLIDES.length}
            </Typography>
          </Box>

          {/* Dots navigation */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              mt: 2,
            }}
          >
            {DEFAULT_SLIDES.map((_, i) => (
              <Box
                key={i}
                onClick={() => slideTo(i, i > index ? 1 : -1)}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: i === index ? "white" : "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": { transform: "scale(1.2)" },
                }}
              />
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Fullscreen Dialog */}
      <Dialog open={fullscreen} onClose={() => setFullscreen(false)} fullScreen>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <ImageWithLoader
            key={DEFAULT_SLIDES[index].src}
            src={DEFAULT_SLIDES[index].src}
            alt={`Fullscreen Slide ${index + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              backgroundColor: "black",
            }}
          />
          <IconButton
            onClick={() => setFullscreen(false)}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              bgcolor: "rgba(0,0,0,0.6)",
              color: "white",
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Dialog>
    </ThemeProvider>
  );
}
