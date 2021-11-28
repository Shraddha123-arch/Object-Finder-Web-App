status = "";


object_name = "";


objects = [];

function setup() {

    canvas = createCanvas(350, 350);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(350, 350);
    video.hide();
}

function start() {

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);

    document.getElementById("status").innerHTML = "Status : Detecting Objects";

    object_name = document.getElementById("input").value;


}

function modelLoaded() {

    console.log("Model Loaded!");

    status = true;
}

function draw() {

    image(video, 0, 0, 350, 350);


    if (status != "") {

        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) {

            percent = floor(objects[i].confidence * 100);


            text(objects[i].label + "  " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            textSize(18);


            noFill();
            stroke("#00008b");


            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == object_name) {

                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_detected").innerHTML = object_name + "  found";
            }
        }
    }
}