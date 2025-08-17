import { Box, Typography, Stack } from "@mui/material";
import { FaReact } from "react-icons/fa";
import { SiMaterialdesign } from "react-icons/si";

export default function BottomBar() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        py: 2,
        textAlign: "center",
        backdropFilter: "blur(12px)",
        bgcolor: "rgba(255,255,255,0.1)",
        borderTop: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.3)",
        borderRadius: "16px 16px 0 0", // rounded top corners
      }}
    >
      {/* Copyright */}
      <Typography
        variant="body2"
        sx={{
          color: "rgba(255,255,255,0.8)",
          fontWeight: 400,
        }}
      >
        © G R Prashanth Reddy 
      </Typography>

      {/* Made with React + MUI */}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
        mt={1}
      >
        <Typography
          variant="caption"
          sx={{ color: "rgba(255,255,255,0.7)" }}
        >
          Made with
        </Typography>

        {/* React Icon */}
        <Box
          component="span"
          sx={{
            display: "flex",
            alignItems: "center",
            transition: "transform 0.4s ease, filter 0.4s ease",
            "&:hover": {
              transform: "rotate(20deg) scale(1.2)",
              filter: "drop-shadow(0 0 8px #61dafb)",
            },
          }}
        >
          <FaReact color="#61dafb" size={20} />
        </Box>

        <Typography
          variant="caption"
          sx={{ color: "rgba(255,255,255,0.7)" }}
        >
          React &
        </Typography>

        {/* MUI Icon */}
        <Box
          component="span"
          sx={{
            display: "flex",
            alignItems: "center",
            transition: "transform 0.4s ease, filter 0.4s ease",
            "&:hover": {
              transform: "rotate(-20deg) scale(1.2)",
              filter: "drop-shadow(0 0 8px #0081CB)",
            },
          }}
        >
          <SiMaterialdesign color="#0081CB" size={18} />
        </Box>

        <Typography
          variant="caption"
          sx={{ color: "rgba(255,255,255,0.7)" }}
        >
          Material UI
        </Typography>
      </Stack>
    </Box>
  );
}
