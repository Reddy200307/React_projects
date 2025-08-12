import React, { useEffect, useRef, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  IconButton,
  Paper,
  Typography,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion, AnimatePresence } from "framer-motion";

type Slide = {
  src: string;
  title?: string;
  subtitle?: string;
};
import flowerImage from "./assets/images/img1.jpg";
import aurora from "./assets/images/img2.jpg";
import sky from "./assets/images/img3.jpg";
import wolf from "./assets/images/img4.jpg";
import tree from "./assets/images/img5.jpg";
import metroStation from "./assets/images/img6.jpg";
import boatingGirl from "./assets/images/img7.jpg";
import greenBridge from "./assets/images/img8.jpg";
import soil from "./assets/images/img9.jpg";

const DEFAULT_SLIDES: Slide[] = [
  { src: flowerImage, title: "Blooming petals", subtitle: "A close-up of nature’s gentle colors" },
  { src: aurora, title: "Aurora Borealis", subtitle: "Dancing lights under a starry sky" },
  { src: sky, title: "Cloudy sky", subtitle: "A calm horizon with drifting clouds" },
  { src: wolf, title: "Lone wolf", subtitle: "Wild eyes in the silence of the forest" },
  { src: tree, title: "Ancient tree", subtitle: "Roots deep in history, branches touching the sky" },
  { src: metroStation, title: "Metro station", subtitle: "Urban life in motion" },
  { src: boatingGirl, title: "Serene boating", subtitle: "Drifting through calm waters" },
  { src: greenBridge, title: "Green bridge", subtitle: "Nature and architecture intertwined" },
  { src: soil, title: "Earth’s texture", subtitle: "A close look at the ground beneath our feet" },
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

export default function App() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoplayRef = useRef<number | null>(null);
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () => createTheme({ palette: { mode: prefersDark ? "dark" : "light" } }),
    [prefersDark]
  );

  const slideTo = (newIndex: number, dir: number) => {
    setDirection(dir);
    setIndex((newIndex + DEFAULT_SLIDES.length) % DEFAULT_SLIDES.length);
  };

  useEffect(() => {
    autoplayRef.current = window.setInterval(
      () => slideTo(index + 1, 1),
      4000
    );
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [index]);

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
          bgcolor: "background.default",
        }}
      >
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            maxWidth: 1000,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: 300, sm: 500 },
            }}
          >
            <AnimatePresence custom={direction} initial={false}>
              <motion.img
                key={DEFAULT_SLIDES[index].src}
                src={DEFAULT_SLIDES[index].src}
                alt={DEFAULT_SLIDES[index].title}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </AnimatePresence>

            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                color: "white",
                textShadow: "0 4px 12px rgba(0,0,0,0.6)",
              }}
            >
              <Typography variant="h5">
                {DEFAULT_SLIDES[index].title}
              </Typography>
              <Typography variant="body2">
                {DEFAULT_SLIDES[index].subtitle}
              </Typography>
            </Box>

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
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
