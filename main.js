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




}

function modelLoaded() {

    console.log("Model Loaded!");

    status = true;
}

function draw() {

    image(video, 0, 0, 350, 350);



    if (status != "") {

        objectDetector.detect(video, gotResults);

        for (i = 0; i < objects.length; i++) {

            percent = floor(objects[i].confidence * 100);


            text(objects[i].label + "  " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            textSize(18);


            noFill();
            stroke("#00008b");


            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            console.log(objects[i].label);
            console.log(document.getElementById("input").value);

            if (objects[i].label == document.getElementById("input").value) {

                video.stop();

                document.getElementById("object_detected").innerHTML = object_name + "  found";

               
            }
            else{
                document.getElementById("object_detected").innerHTML = object_name + "  not found";

            }
            
        }
    }
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}