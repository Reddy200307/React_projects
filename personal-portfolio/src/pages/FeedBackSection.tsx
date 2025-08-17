import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Rating,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

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
  const [errors, setErrors] = useState({ name: "", message: "", rating: "" });
  const [snackbar, setSnackbar] = useState<{ open: boolean; type: "success" | "error"; message: string }>({
    open: false,
    type: "success",
    message: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Firestore real-time listener
  useEffect(() => {
    const q = query(collection(db, "feedbacks"), orderBy("createdAt", "desc"), limit(20));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const loadedFeedbacks: Feedback[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            name: typeof data.name === "string" ? data.name : "Anonymous",
            message: typeof data.message === "string" ? data.message : "",
            rating: typeof data.rating === "number" ? data.rating : 0,
          };
        });

        setFeedbacks((prev) => {
          // avoid unnecessary re-render if same length and contents
          if (JSON.stringify(prev) === JSON.stringify(loadedFeedbacks)) return prev;
          return loadedFeedbacks;
        });
        setLoading(false);
      },
      (error) => {
        console.error("Firestore listener error:", error);
        setSnackbar({ open: true, type: "error", message: "Failed to load feedbacks." });
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
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

    setSubmitting(true);

    const newFeedback: Feedback = { name, message, rating };

    try {
      await addDoc(collection(db, "feedbacks"), {
        ...newFeedback,
        createdAt: serverTimestamp(),
      });

      // Reset fields
      setName("");
      setMessage("");
      setRating(0);
      setErrors({ name: "", message: "", rating: "" });
      setSnackbar({ open: true, type: "success", message: "Feedback submitted successfully!" });
    } catch (err) {
      console.error("Error saving feedback:", err);
      setSnackbar({ open: true, type: "error", message: "Failed to submit feedback. Try again!" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.section
      key="feedback"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ px: 3, py: 6, maxWidth: "42rem", mx: "auto", color: "white" }}>
        {/* Title */}
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
          Like my website 🤓? Share your thoughts with me!
        </Typography>
        <Typography
          variant="h6"
          fontWeight="medium"
          textAlign="center"
          mb={3}
          sx={{ color: "rgba(255,255,255,0.8)" }}
        >
          Feedback Form 😀
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
              Rate your experience
            </Typography>
            <Rating
  name="rating"
  value={rating}
  onChange={(_, newValue) => setRating(newValue ?? 0)}
  size="large"
/>

            {errors.rating && (
              <Typography variant="caption" color="error" sx={{ display: "block", mt: 0.5 }}>
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
            aria-label="Your name"
            error={!!errors.name}
            helperText={errors.name}
            InputProps={{
              sx: {
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                "& input::placeholder": { color: "rgba(255,255,255,0.7)" },
              },
            }}
          />

          {/* Feedback */}
          <Box>
            <TextField
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Feedback"
              multiline
              rows={4}
              fullWidth
              aria-label="Your feedback"
              error={!!errors.message}
              helperText={errors.message}
              inputProps={{ maxLength: 300 }}
              InputProps={{
                sx: {
                  borderRadius: 2,
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                  "& textarea::placeholder": { color: "rgba(255,255,255,0.7)" },
                },
              }}
            />
            <Typography
              variant="caption"
              sx={{ display: "block", textAlign: "right", mt: 0.5, color: "rgba(255,255,255,0.6)" }}
            >
              {message.length}/300
            </Typography>
          </Box>

          {/* Submit */}
          <Button
            type="submit"
            fullWidth
            disabled={submitting}
            sx={{
              py: 1.2,
              borderRadius: 2,
              bgcolor: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "white",
              fontWeight: 500,
              textTransform: "none",
              transition: "0.3s",
              "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
            }}
          >
            {submitting ? <CircularProgress size={24} color="inherit" /> : "Submit Feedback"}
          </Button>
        </Paper>

        {/* Submitted Feedbacks */}
        {loading ? (
          <Box sx={{ textAlign: "center", my: 3 }}>
            <CircularProgress color="inherit" />
          </Box>
        ) : feedbacks.length > 0 ? (
          <Box
            sx={{ mt:4}}
          >
            <Typography variant="h6" fontWeight="bold" mb={2} textAlign="center">
              Submitted Feedback
            </Typography>

            <AnimatePresence>
              {feedbacks.map((fb, index) => (
                <motion.div
                  key={fb.name + fb.message + index}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ type: "spring", stiffness: 120, damping: 12 }}
                >
                  <Paper
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      bgcolor: index === 0 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "white" }}>
                      {fb.name}
                    </Typography>
                    <Rating value={fb.rating} readOnly size="small" sx={{ mb: 1 }} />
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
                      {fb.message}
                    </Typography>
                  </Paper>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>
        ) : (
          <Typography textAlign="center" sx={{ color: "rgba(255,255,255,0.6)", mt: 2 }}>
            No feedback yet. Be the first to share!
          </Typography>
        )}

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={snackbar.type} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </motion.section>
  );
}
