# MyROS2
This is the repo for RnD ROS2 Humble and Testing for McGill Robotics

## Table of Contents
- [MyROS2](#myros2)
  - [Table of Contents](#table-of-contents)
  - [Node Management](#node-management)
  - [Graphical Tools](#graphical-tools)
  - [Topic Management](#topic-management)
  - [Service Management](#service-management)
  - [Parameter Management](#parameter-management)
  - [Action Management](#action-management)
  - [Logging and Launching](#logging-and-launching)
  - [Rosbridge with Webapp](#rosbridge-with-webapp)
  - [Build Tools](#build-tools)
  - [Docker for Unity](#docker-for-unity)

## Node Management
- List all nodes:
    ```sh
    ros2 node list
    ```
- Get information about a node:
    ```sh
    ros2 node info <node_name>
    ```
- Run a node from a package:
    ```sh
    ros2 run <package_name> <executable_name>
    ```

## Graphical Tools
- View the ROS graph:
    ```sh
    rqt_graph
    ```

## Topic Management
- Echo messages from a topic:
    ```sh
    ros2 topic echo <topic_name>
    ```
- Show interface of a message type:
    ```sh
    ros2 interface show <msg_type>
    ```
- Publish a message to a topic:
    ```sh
    ros2 topic pub <topic_name> <msg_type> '<arguments>'
    ```
- Check the publishing rate of a topic:
    ```sh
    ros2 topic hz <topic_name>
    ```

## Service Management
- Get the type of a service:
    ```sh
    ros2 service type <service_name>
    ```

## Parameter Management
- List all parameters:
    ```sh
    ros2 param list
    ```
- Set a parameter for a node:
    ```sh
    ros2 param set <node_name> <param_name> <value>
    ```

## Action Management
- List all actions:
    ```sh
    ros2 action list
    ```

## Logging and Launching
- Run the ROS console:
    ```sh
    ros2 run rqt_console rqt_console
    ```
- Publish a Twist message to control a turtle:
    ```sh
    ros2 topic pub -r 1 /turtle1/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 2.0, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 0.0}}"
    ```
- Launch a ROS launch file (supports Python launch scripts):
    ```sh
    ros2 launch <launch_file>
    ```
- Record data to a bag file:
    ```sh
    ros2 bag record <topics>
    ```

## Rosbridge with Webapp
- Run the rosbridge websocket server:
    ```sh
    ros2 run rosbridge_server rosbridge_websocket
    ```
- Launch the rosbridge websocket server:
    ```sh
    ros2 launch rosbridge_server rosbridge_websocket.launch
    ```

## Build Tools
- Build packages with colcon:
    ```sh
    colcon build --symlink-install
    ```
- Create a new ROS package:
    ```sh
    ros2 pkg create <package_name>
    ```

## Docker for Unity
- (Add relevant Docker commands for Unity here)