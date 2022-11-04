// Start
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

music1 = "music.mp3";
music2 = "music2.mp3";

function preload() {
    loadSound(music1);
    loadSound(music2);
}

function setup() {
    canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {console.log('posenet loaded!');}

function draw() {
    image(video,100,100,600,500);
}

function gotPoses(results) {
    if (results > 0) {
        leftWristX = pose.leftWrist.x;
        leftWristY = pose.leftWrist.y;
        rightWristX = pose.rightWrist.x;
        rightWristY = pose.rightWrist.y;
    }
}