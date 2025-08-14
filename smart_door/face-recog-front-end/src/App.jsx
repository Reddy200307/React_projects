import { useState,useEffect } from 'react';
import axios from "axios";
// import './App.css'

function App() {
const [value,setvalue]=useState("hello");
const [imageUrl, setImageUrl] = useState('');
const [status, setStatus] = useState('Unknown');
const [error, setError] = useState(null);
function sendData(){
  const postData = {
    state: 'Button is pressed',
  };
  
  // Sending a POST request to the Flask server
  axios.post('http://localhost:5000/get-data', postData)
    .then(response => {
      console.log(response.data);
      setvalue(response.data);
      // Fetch the image only after the first request is successful
      return axios.get('http://localhost:5000/get-image', { responseType: 'arraybuffer' });
    })
    .then(response => {
      // Convert the binary data to a Base64 string
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
      // Set the Base64 string as the source of the image
      setImageUrl(`data:image/jpeg;base64,${base64}`);
    })
    .catch(error => {
      console.error('Error fetching the data or the image', error);
    });
}
  
useEffect(()=>{
  const intervalId = setInterval(() => {
    fetch('http://localhost:5000/person-status')
      .then(response => {
        if (!response.ok) {
          console.log(response)
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setStatus(data.status);
      })
      .catch(error => {
        setError(error.toString());
      });
  }, 15000); // Polling interval set to 5 seconds

  // Cleanup function to clear the interval when the component unmounts
  

  axios.get('http://localhost:5000/server-status')
  .then(function (response) {
    // handle success
    console.log(`The data from the server is '${response.data.message}'`);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    console.log("Fetched Data from the server ");
  });
  return () => clearInterval(intervalId);
},[[imageUrl]])
if (error) {
  return <div>Error: {error}</div>;
}
// setvalue('hello')
  return (
    <>
      <p>Current Status: {status}</p>
    <h1>The data from the server is {value}</h1>
    {/* <img src={imageUrl} alt={value}/> */}
    {value !== 'hello' ? <img id="myImage" src={imageUrl} alt={value} /> : null}

      {/* <img src={"http://localhost:5000/video_feed"}/> */}
    <button onClick={sendData}>click to view</button>
    </>
  )
}

export default App
