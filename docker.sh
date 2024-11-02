#!/bin/bash

echo "1. Build image"
echo "2. List images"
echo "3. Remove image"
echo "4. Start container"
echo "5. List running containers"
echo "6. Stop container"
echo "7. Remove container"
echo "8. Build & Start"
echo "9. Stop all containers"
echo "10. Remove all containers"
echo "11. Delete all images"
echo "Enter your choice:"
read CHOICE

function build_image() {
    echo "Enter the tag for the image:"
    read TAG
    export $(cat .env | xargs)
    docker build -t bc-dapp-events:$TAG .
}

function list_images() {
    docker images --filter reference="bc-dapp-events*"
}

function remove_image() {
    echo "Enter the tag of the image you want to remove:"
    read TAG
    docker rmi bc-dapp-events:$TAG
}

function start_container() {
    echo "Enter the tag of the image you want to start:"
    read TAG
    CONTAINER_ID=$(docker run --env-file .env -d -p 8080:8080 bc-dapp-events:$TAG)
    echo "Started container $CONTAINER_ID"

    # Trap command modified to catch only SIGINT (Ctrl+C)
    trap "{ stop_container_by_id $CONTAINER_ID; remove_container_by_id $CONTAINER_ID; }" INT

    # Keep the script running to allow it to catch Ctrl+C
    echo "Press Ctrl+C to stop the container..."
    while true; do
        sleep 1
    done
}

function list_containers() {
    docker ps --filter ancestor="bc-dapp-events*"
}

function stop_container_by_id() {
    CONTAINER_ID=$1
    echo "Stopping container $CONTAINER_ID"
    docker stop $CONTAINER_ID
}

function stop_container() {
    echo "Stopping containers with image bc-dapp-events"
    docker stop $(docker ps -aq --filter ancestor=bc-dapp-events)
}

function remove_container() {
    echo "Removing containers with image bc-dapp-events"
    docker rm $(docker ps -aq --filter ancestor=bc-dapp-events)
}

function remove_container_by_id() {
    CONTAINER_ID=$1
    echo "Removing container $CONTAINER_ID"
    docker rm $CONTAINER_ID
}

function stop_all_containers() {
    docker stop $(docker ps -q)
}

function remove_all_containers() {
    docker rm $(docker ps -aq)
}

function delete_all_images() {
    docker rmi $(docker images -q)
}

case $CHOICE in
1)
    build_image
    ;;
2)
    list_images
    ;;
3)
    remove_image
    ;;
4)
    start_container
    ;;
5)
    list_containers
    ;;
6)
    stop_container
    ;;
7)
    remove_container
    ;;
8)
    build_image
    start_container
    ;;
9)
    stop_all_containers
    ;;
10)
    remove_all_containers
    ;;
11)
    delete_all_images
    ;;
*)
    echo "Invalid choice. Please select a valid option."
    ;;
esac
