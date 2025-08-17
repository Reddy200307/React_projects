// GlassTimeline.tsx
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2
} from "lucide-react";
import { FaC } from "react-icons/fa6";
import { TbBrandCpp,TbBrandJavascript } from "react-icons/tb";
import {  FaJava, FaHtml5, FaCss3Alt, FaReact, FaPython } from "react-icons/fa";
import { Box, Typography } from "@mui/material";
import "./timeline.css";
import { GiSchoolBag } from "react-icons/gi";
import javaIcon from "../assets/time_line_images/icons8-java-logo-120.svg";
import cbit from "../assets/time_line_images/cbit.jpg";
import type { ReactNode } from "react";
import { SiArduino, SiTypescript,SiFlask } from "react-icons/si";
import { CircuitBoard } from "lucide-react";
import vector from "../assets/time_line_images/vector.jpeg";

// 🔹 Define the type for each event
interface TimelineEvent {
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
  image?: string | ReactNode; // can be URL or JSX (icon)
}

const DEFAULT_SLIDES = [
  { src: javaIcon },
  { src: cbit },
  { src: vector },
  { src: "https://raw.githubusercontent.com/Reddy200307/React_projects/refs/heads/main/personal-portfolio/src/assets/images/img4.jpg" },
  { src: "https://raw.githubusercontent.com/Reddy200307/React_projects/refs/heads/main/personal-portfolio/src/assets/images/img5.jpg" },
];

const GlassTimeline = () => {
  const timelineEvents: TimelineEvent[] = [
    {
      title: "Started Learning Java",
      subtitle: "2018",
      description:
        "In 2018 I was taught Java Programming Language in our school and my obsession towards programming started.",
      icon: <Code2 size={20} />,
      image: <FaJava size={80}/>, 
    },
    {
      title: "Joined CBIT",
      subtitle: "Jan 2021",
      description:
        "On this year I joined C Byre Gowda Institute of Technology, Kolar as a Electronics and Communication Engineer.",
      icon: <GiSchoolBag size={20} />,
      image: DEFAULT_SLIDES[1].src,
    },
    {
      title: "Started Learning Programming",
      subtitle: "Mid 2021",
      description:
        "This year I grew my obsession towards coding and started learning basics of C, C++,Python.",
      icon: <Code2 size={20} />,
      image: [<FaC size={60} />,<TbBrandCpp size={60} />,<FaPython size={60} />], 
    },
    {
      title: "Introduction to Web Development",
      subtitle: "2022",
      description:
        "I found web development and found it as the way to express my self and started learning HTML,CSS,JS, Jquery and started implementing those and created self oriented small basic projects .",
      icon: <Code2 size={20} />,
      image: [<FaHtml5 size={60}/>,<FaCss3Alt size={60}/>,<TbBrandJavascript size={60}/>],
    },
    {
      title: "Web + Arduino",
      subtitle: " 2023",
      description:
        "I started learning React, Flask backend framework and integrated web with arduino uno and did some pretty interactive and useful apps which used web as a frontend interactive ui, flask server as a bridge bw web and arduino ,and arduino to control and monitor the sensors. It was pretty fun 🤓.  ",
      icon: <Code2 size={20} />,
      image: [<FaReact size={60}/>,<SiFlask size={60}/>,<SiArduino size={60}/>],
    },
    {
      title: "TypeScript",
      subtitle: " Early 2025",
      description:
        "As every JS dev even i was annoyed with JS sometimes and was searching alternatives and found TypeScript and liked it and learnt it and implemented it by doing some projects like this and above mentioned projects",
         icon: <Code2 size={20} />,
      image: <SiTypescript size={60}/>,
    },
    {
      title: "Embedded System",
      subtitle: " Aug 2025",
      description:
        "Joined Vector India Bangalore to learn and gain skills about embedded systems. Why embedded ? because i love integrating code with hardware thats why i joined Embedded System. ",
         icon: <GiSchoolBag size={20} />,
      image: DEFAULT_SLIDES[2].src,
    },
    {
      title: "Embedded C",
      subtitle: " late 2025 - Present",
      description:
        "Now i Prioritise my entire time in learning embedded c and c frameworks and building projects with them.",
         icon: <Code2 size={20} />,
      image: [<FaC size={60}/>,<CircuitBoard size={60}/>],
    },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key="timeline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Box px={6} py={12}>
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
            sx={{ fontFamily: "Orbitron, sans-serif" }}
          >
            My Timeline
          </Typography>

          <VerticalTimeline lineColor="rgba(255, 255, 255, 0.2)">
            {timelineEvents.map((item, idx) => (
              <VerticalTimelineElement
                key={idx}
                className="timeline-card"
                contentStyle={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
                  borderRadius: "25px",
                  padding: "1rem",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid rgba(255,255,255,0.2)",
                }}
                date={item.subtitle}
                iconStyle={{
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(4px)",
                  border: "none",
                }}
                icon={item.icon}
              >
                {/* Title */}
                <Typography
                  variant="h6"
                  fontWeight="600"
                  gutterBottom
                  sx={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: {
                      xs: "1rem",
                      sm: "1.1rem",
                      md: "1.35rem",
                      lg: "1.5rem",
                    },
                  }}
                >
                  {item.title}
                </Typography>

                {/* ✅ Image OR React Icon */}
                {typeof item.image === "string" ? (
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.title}
                    sx={{
                      width: "100%",
                      borderRadius: "16px",
                      mb: 1.5,
                      objectFit: "contain",
                      maxHeight: { xs: 180, md: 240, lg: 280 },
                      filter:
                        item.image === javaIcon
                          ? "brightness(0) invert(1)"
                          : "none",
                      p: 2,
                    }}
                  />
                ) : (
                  <Box display="flex" justifyContent="center" my={2}>
                    {item.image}
                  </Box>
                )}

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: {
                      xs: "0.8rem",
                      sm: "0.9rem",
                      md: "1rem",
                    },
                  }}
                >
                  {item.description}
                </Typography>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </Box>
      </motion.section>
    </AnimatePresence>
  );
};

export default GlassTimeline;
