import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { styled } from '@mui/material/styles';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: "89vw",
  height: "70vh",
  padding: theme.spacing(4),
  ...theme.typography.body2,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // Centers items vertically in the container
  alignItems: 'center',
}));
export default function Websocket(){
  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#f5f5f5', // Light grey background
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.4)', // Adds a subtle shadow
    borderRadius: '10px', // Rounded corners
    padding: '20px',
    margin: '20px',
    maxWidth: '70vw', // Maximum width
  };

  const imageStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '160px', // Fixed image height
    width: 'auto', // Auto width based on the aspect ratio of the image
    padding: '120px', // Padding around the image
    borderRadius: '5px', // Rounded corners for the image
  };
  const currentURL = window.location.href;
  // const socket = io(currentURL);
  
  const socket = io("http://localhost:5000/");
  const [objStatus,setObjStatus]=useState(null);
  const [arduinoStatus,setArduinoStatus]=useState(null);
  const [objectName,setObjectName]=useState("unknown");
  const [imageData, setImageData] = useState('');
  const [doorStatus, setDoorStatus] = useState('');
  useEffect(() => {
    socket.on("object_detected", (data) => {
      console.log(data);
      setObjStatus(data)
    });
    socket.on('connect', () => {
      console.log('Connected to the server');
    });
    socket.on('my-event', (data) => {
      console.log(data);
    });
    socket.on("disconnect", (data) => {
      console.log(data);
    });
    socket.on("data_from_server", (data) => {
      console.log(data);
    });
    socket.on("server_status", (data) => {
      console.log(data);
    });
    socket.on("Arduino_status", (data) => {
      console.log(data);
      setArduinoStatus(data.arduino_status)
    });
    socket.on("face_recognise", (data) => {
      console.log(data);
      setObjectName(data)
    });
    socket.on("door_status", (data) => {
      console.log(data);
      setDoorStatus(data)
    });
    socket.on("image_data", (data) => {
      // Assuming 'data.data' is the ArrayBuffer or binary data received
      const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(data.data)));
      setImageData(`data:image/jpeg;base64,${base64String}`);
    });
  
    // Cleanup function to remove event listeners
    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [setObjStatus, setArduinoStatus, setObjectName,objectName]);

    return(
        <>
            <h2>Current URL: {currentURL}</h2>
            {arduinoStatus === "Device is connected" && <Typography variant="h4" component="div" sx={{ flexGrow: 1,alignItems:"center",textAlign:"center" }}>
     Arduino Board {arduinoStatus}
      </Typography>}
        <div>
      <Box sx={{ flexGrow: 1 ,alignItems:"center" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1,alignItems:"center",textAlign:"center" }}>
          Smart Door Using Face Authentication
          </Typography>
        </Toolbar>
      </AppBar>
      <DemoPaper variant="outlined" square={false}>
      {objStatus !== "Object detected" &&objectName==="unknown" && <Typography variant="h4" component="div" sx={{ flexGrow: 1,alignItems:"center",textAlign:"center" }}>
      Stand Near The Sensor to start face Recognition
          </Typography>}
      {objStatus === "Object detected" &&objectName==="unknown" && <Typography variant="h4" component="div" sx={{ flexGrow: 1,alignItems:"center",textAlign:"center" }}>
      Person Detected
          </Typography>}
                {objStatus === "Object detected"&&objectName==="unknown" && <Typography variant="h4" component="div" sx={{ flexGrow: 1,alignItems:"center",textAlign:"center" }}>
      Loading Camera Starting Face Recognition
          </Typography>}
          {objectName!=="unknown" &&     <Box sx={cardStyle}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Face Recognised: {objectName}
          </Typography>
          <CardMedia
            component="img"
            image={imageData}
            alt={`Recognised face: ${objectName}`}
            sx={imageStyle}
          />
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Door Status: {doorStatus}
          </Typography>
        </CardContent>
      </Card>
    </Box>}
      </DemoPaper>
    </Box>
    </div>
        </>
    )
}