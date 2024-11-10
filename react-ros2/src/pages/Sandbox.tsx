// Pages are the views that can contain components. They are displayed based on the path.
import React from 'react';
import TopicForm from '../components/TopicForm';
import VideoFeed from '../components/VideoWebRTC';
function Sandbox() {
  return (
    <>
    <h2>Sandbox Page</h2>;
    <TopicForm />
    <VideoFeed />
    </>
  ) 

}

export default Sandbox;