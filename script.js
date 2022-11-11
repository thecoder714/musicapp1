// Start
leftWristX = 0;
leftWristY = 0;
scoreLeft = 0;
rightWristX = 0;
rightWristY = 0;
scoreRight = 0;
songStatus = "";

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
    fill("#FF0000");
	stroke("#FF0000");

    songStatus = music1.isPlaying()

    if (scoreRightWrist > 0.2) {
        if (rightWristY > 0 && rightWristY > 0) {
          document.getElementById("speed").innerHTML = "Speed = 0.5x";
          song.rate(0.5);
        } else if (rightWristY > 100 && rightWristY < 200) {
          document.getElementById("speed").innerHTML = "Speed = 1x";
          song.rate(1);
        } else if (rightWristY > 200 && rightWristY < 300) {
          document.getElementById("speed").innerHTML = "Speed = 1.5x";
          song.rate(1.5);
        } else if (rightWristY > 300 && rightWristY < 400) {
          document.getElementById("speed").innerHTML = "Speed = 2x";
          song.rate(2);
        } else if (rightWristY > 300 && rightWristY < 400) {
          document.getElementById("speed").innerHTML = "Speed = 2.5x";
          song.rate(2.5);
        }
      }
    
    if (scoreLeftWrist > 0.2) {
        music2.stop();
        circle(rightWristX,rightWristY,20);
        volume = floor(Number(leftWristY * 2) / 1000); 
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }

    if (songStatus = false) {
        music1.play();
    }
}

function gotPoses(results) {
    if (results > 0) {
        // Getting Let Wrist postions
        leftWristX = pose.leftWrist.x;
        leftWristY = pose.leftWrist.y;
        // Getting Right Wrist postions
        rightWristX = pose.rightWrist.x;
        rightWristY = pose.rightWrist.y;
        // Consoling the output
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        scoreRight =  results[0].pose.keypoints[10].score;
	    scoreLeft =  results[0].pose.keypoints[9].score;
    }

}