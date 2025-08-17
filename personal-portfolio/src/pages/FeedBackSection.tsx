import { motion } from "framer-motion";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Rating,
} from "@mui/material";
import { useState } from "react";

interface Feedback {
  name: string;
  message: string;
  rating: number | null;
}

export default function FeedbackSection() {
  const [rating, setRating] = useState<number | null>(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [errors, setErrors] = useState({
    name: "",
    message: "",
    rating: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = { name: "", message: "", rating: "" };
    let hasError = false;

    if (!name.trim()) {
      formErrors.name = "Please enter your name.";
      hasError = true;
    }
    if (!message.trim()) {
      formErrors.message = "Please enter your feedback.";
      hasError = true;
    }
    if (!rating || rating === 0) {
      formErrors.rating = "Please provide a rating.";
      hasError = true;
    }

    setErrors(formErrors);

    if (hasError) return;

    const newFeedback: Feedback = { name, message, rating };
    setFeedbacks([newFeedback, ...feedbacks]);

    // Reset fields
    setName("");
    setMessage("");
    setRating(0);
    setErrors({ name: "", message: "", rating: "" });
  };

  return (
    <motion.section
      key="feedback"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          px: 3,
          py: 6,
          maxWidth: "40rem",
          mx: "auto",
          color: "white",
        }}
      >
        {/* Title */}
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          mb={3}
        >
          Feedback Form
        </Typography>

        {/* Feedback Form */}
        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backdropFilter: "blur(12px)",
            bgcolor: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 3,
            p: 3,
            mb: 4,
            boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
          }}
        >
          {/* Rating */}
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body1" mb={1} sx={{ color: "GrayText" }}>
              Give your Feedback
            </Typography>
            <Rating
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
              sx={{
                "& .MuiRating-iconEmpty": { color: "rgba(255,255,255,0.4)" },
              }}
            />
            {errors.rating && (
              <Typography variant="caption" color="error">
                {errors.rating}
              </Typography>
            )}
          </Box>

          {/* Name */}
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            placeholder="Your Name"
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
            InputProps={{
              sx: {
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                "& input::placeholder": {
                  color: "rgba(255,255,255,0.7)",
                },
              },
            }}
          />

          {/* Feedback */}
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Feedback"
            multiline
            rows={4}
            fullWidth
            error={!!errors.message}
            helperText={errors.message}
            InputProps={{
              sx: {
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                "& textarea::placeholder": {
                  color: "rgba(255,255,255,0.7)",
                },
              },
            }}
          />

          {/* Submit */}
          <Button
            type="submit"
            fullWidth
            sx={{
              py: 1.2,
              borderRadius: 2,
              bgcolor: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "white",
              fontWeight: 500,
              textTransform: "none",
              transition: "0.3s",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.3)",
              },
            }}
          >
            Submit Feedback
          </Button>
        </Paper>

        {/* Submitted Feedbacks */}
        {feedbacks.length > 0 && (
          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              mb={2}
              textAlign="center"
            >
              Submitted Feedback
            </Typography>

            {feedbacks.map((fb, index) => (
              <Paper
                key={index}
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ color: "white" }}
                >
                  {fb.name}
                </Typography>
                <Rating
                  value={fb.rating}
                  readOnly
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.8)" }}
                >
                  {fb.message}
                </Typography>
              </Paper>
            ))}
          </Box>
        )}
      </Box>
    </motion.section>
  );
}
