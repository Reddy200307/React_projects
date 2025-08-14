import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
// import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Code2,
  Projector,
  Trophy,
  Users,
  Layers3,
  TerminalSquare,
} from 'lucide-react';
import "./timeline.css";
import { Briefcase, GraduationCap } from 'lucide-react';


import {  AnimatePresence } from 'framer-motion';



const GlassTimeline = () => {

    const timelineEvents = [
  {
    title: "Graduated B.Tech",
    subtitle: "Computer Science - 2023",
    description: "Completed my undergrad with a strong foundation in algorithms and development.",
    icon: <GraduationCap size={20} />,
  },
  {
    title: "Internship at Google",
    subtitle: "Summer 2024",
    description: "Worked with the Firebase team to improve CLI tools.",
    icon: <Briefcase size={20} />,
  },
  {
    title: "Freelancing",
    subtitle: "2024 - Present",
    description: "Building interactive dashboards and portfolios for startups.",
    icon: <Code2 size={20} />,
  },
  {
    title: "Launched Open Source Project",
    subtitle: "Mar 2024",
    description: "Published an open-source tool for visualizing API traffic in real-time.",
    icon: <Projector size={20} />,
  },
  {
    title: "Hackathon Winner",
    subtitle: "HackDev 2023",
    description: "Won 1st place for building a cross-platform productivity app in 24 hours.",
    icon: <Trophy size={20} />,
  },
  {
    title: "Joined Dev Community",
    subtitle: "Early 2023",
    description: "Started contributing to online forums and helping others learn frontend development.",
    icon: <Users size={20} />,
  },
  {
    title: "Built First Full-stack App",
    subtitle: "Late 2022",
    description: "Created a task management app using React, Node.js, and MongoDB.",
    icon: <Layers3 size={20} />,
  },
  {
    title: "Started Coding Journey",
    subtitle: "2019",
    description: "Wrote my first 'Hello World' in C++ and fell in love with programming.",
    icon: <TerminalSquare size={20} />,
  }
];

  return (
      <AnimatePresence mode="wait">
  
   
    <motion.section
  key="timeline"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
  className="px-6 py-12"
>
  <h3 className="text-2xl font-bold mb-6 text-center" style={{fontFamily:"Orbitron,sans-serif"}}>Timeline</h3>
  <VerticalTimeline lineColor="rgba(255, 255, 255, 0.2)">
{timelineEvents.map((item, idx) => (
  <VerticalTimelineElement
    key={idx}
    className="timeline-card"
    contentStyle={{
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255,255,255,0.2)',
      boxShadow: '0 4px 30px rgba(0,0,0,0.1)'
      ,borderRadius:"25px",
    }}
    contentArrowStyle={{ borderRight: '7px solid rgba(255,255,255,0.2)' }}
    date={item.subtitle}
    iconStyle={{
      background: 'rgba(255,255,255,0.12)',
      backdropFilter: 'blur(4px)',
      border: 'none'
    }}
    icon={item.icon} // ✅ THIS LINE FIXES IT
  >
    <h4 className="vertical-timeline-element-title font-semibold text-lg" style={{fontFamily:"DM Sans,sans-serif"}}>{item.title}</h4>
    <p className="text-sm" style={{fontFamily:"Poppins,sans-serif"}}>{item.description}</p>
  </VerticalTimelineElement>
))}

  </VerticalTimeline>
</motion.section>
</AnimatePresence>
   );
};

export default GlassTimeline;
