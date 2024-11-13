import React, { useEffect, useState } from 'react';
import ROSLIB from 'roslib';
import ros from "../services/ros"; 

// Assuming my_controller/terminal_node.py is running
const RosNodeController = () => {
  const [command, setCommand] = useState('');
  const [terminalOutput, setTerminalOutput] = useState('');

  const [publisher, setPublisher] = useState<ROSLIB.Topic | null>(null);
  const [subscriber, setSubscriber] = useState<ROSLIB.Topic | null>(null);
  const [subscriberName, setSubscriberName] = useState<string>("");
  const [publisherName, setPublisherName] = useState<string>("");

  useEffect(() => {
    if (ros) {
      // Initialize the publisher for sending commands
      const commandPublisher = new ROSLIB.Topic({
        ros: ros,
        name: '/command_input',
        messageType: 'std_msgs/String',
      });

      // Initialize the subscriber for receiving terminal output
      const outputSubscriber = new ROSLIB.Topic({
        ros: ros,
        name: '/topic',
        messageType: 'std_msgs/String',
      });

      // Handle incoming messages on the terminal output topic
      outputSubscriber.subscribe((message: ROSLIB.Message) => {
        const dataMessage = message as ROSLIB.Message & { data: string };
        console.log('Received terminal output:', dataMessage.data);
        setTerminalOutput(dataMessage.data);
      });

      setPublisher(commandPublisher);
      setSubscriber(outputSubscriber);

      // Cleanup function to unsubscribe and reset publishers/subscribers
      return () => {
        if (outputSubscriber) {
          outputSubscriber.unsubscribe();
          console.log('Unsubscribed from /terminal_output');
        }
        setPublisher(null);
        setSubscriber(null);
      };
    }
  }, [ros]);

  useEffect(() => {
    if (subscriber) {
      subscriber.unsubscribe();
      console.log('Unsubscribed from /topic');
    }
    
    const outputSubscriber = new ROSLIB.Topic({
      ros: ros,
      name: subscriberName,
      messageType: 'std_msgs/String',
    });
    
    setSubscriber(outputSubscriber);
    
    if (subscriber) {
      outputSubscriber.subscribe((message: ROSLIB.Message) => {
        const dataMessage = message as ROSLIB.Message & { data: string };
        console.log('Received terminal output:', dataMessage.data);
        setTerminalOutput(dataMessage.data);
      });
    }




  }, [subscriberName]);


  const handlePublishCommand = () => {
    if (publisher) {
      const message = new ROSLIB.Message({ data: command });
      publisher.publish(message);
      console.log('Published command:', command);
      setCommand(''); // Clear the command input after publishing
    }
  };

  return (
    <div style={{ border: '1px solid black', padding: '10px', flex: '1 1 200px' }}>
      <h2>ROS Node Controller</h2>
      <input type="text"
        placeholder="Topic Name"
        value={publisherName}
        onChange={(e) => setPublisherName(e.target.value)}
        style={{ width: '70%', marginRight: '10px' }}
      />
      
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Enter command"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          style={{ width: '70%', marginRight: '10px' }}
        />
        <button onClick={handlePublishCommand}>Send Command</button>
      </div>

      <h3>Terminal Output</h3>
      <input type="text"
        placeholder="Subscriber Topic Name"
        value={subscriberName}
        onChange={(e) => setSubscriberName(e.target.value)}
        onBlur={() => {
          if (subscriberName.trim() !== "") {
        setSubscriberName(subscriberName);
          }
        }}
        style={{ width: '70%', marginRight: '10px' }}
      />
      <pre style={{ border: '1px solid gray', padding: '10px', whiteSpace: 'pre-wrap' }}>
        {terminalOutput || 'No output received yet.'}
      </pre>
    </div>
  );
};

export default RosNodeController;
