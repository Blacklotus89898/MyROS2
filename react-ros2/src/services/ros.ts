// Import necessary types from ROSLIB
import * as ROSLIB from 'roslib';

// Create ros object to communicate over your Rosbridge connection
const ros = new ROSLIB.Ros({ url: "ws://localhost:9090" });

export default ros;