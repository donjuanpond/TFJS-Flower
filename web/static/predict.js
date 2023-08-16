$("#image-selector").change(function () {
	let reader = new FileReader();
	reader.onload = function () {
		let dataURL = reader.result;
		$("#selected-image").attr("src", dataURL);
		$("#prediction-list").empty();
	}
	
	let file = $("#image-selector").prop('files')[0];
	reader.readAsDataURL(file);
});

$("#webcam-capture-button").click(async function () {
	const webcamElement = document.getElementById("webcam")
	const webcam = await tf.data.webcam(webcamElement) 

	const v = document.querySelector('video')
	let c = document.createElement('canvas')
	c.height = v.videoHeight || parseInt(v.style.height)
	c.width = v.videoWidth || parseInt(v.style.width)
	const ctx = c.getContext('2d')
	ctx.drawImage(v, 0, 0)
	console.log(c.toDataURL())

	$("#selected-image").attr("src", c.toDataURL());
	$("#prediction-list").empty();
});


const webcamElement = document.getElementById("webcam")
CLASS_NAMES = ['tulips', 'dandelion', 'daisy', 'sunflowers', 'roses']

async function predictLoop() {
	tf.tidy(async function() {
		let videoFrameAsTensor = tf.browser.fromPixels(webcamElement)
			.resizeNearestNeighbor([224,224]) // change the image size here
			.toFloat()
			.div(tf.scalar(255.0))
			.expandDims();

		// let prediction = model.predict(imageFeatures);
		// let highestIndex = prediction.argMax();
		// let predictionArray = Array.from(prediction.dataSync())
		// document.getElementById('status').innerText = 'Prediction: ' + CLASS_NAMES[highestIndex] + ' with ' + Math.floor(predictionArray[highestIndex] * 100) + '% confidence';
		// window.requestAnimationFrame(predictLoop);
		let predictions = await model.predict(videoFrameAsTensor).data();
		let top5 = Array.from(predictions)
			.map(function (p, i) { // this is Array.map
				return {
					probability: p,
					className: TARGET_CLASSES[i] // we are selecting the value from the obj
				};
			}).sort(function (a, b) {
				return b.probability - a.probability;
			}).slice(0, 5);
	
		$("#prediction-list").empty();
		top5.forEach(function (p) {
			$("#prediction-list").append(`<li>${p.className}: ${p.probability.toFixed(6)}</li>`);
			});
		console.log(predictions);
		
	});
	setTimeout(function(){
		window.requestAnimationFrame(predictLoop);
	}, 300)
}


$("#webcam-predict-button").click(async function () {
	const webcam = await tf.data.webcam(webcamElement) 
	predictLoop();
});


let model;
$( document ).ready(async function () {
	$('.progress-bar').show();
    console.log( "Loading model..." );
    model = await tf.loadLayersModel('model/model.json');
    console.log( "Model loaded." );
	$('.progress-bar').hide();
});

$("#predict-button").click(async function () {
	let image = $('#selected-image').get(0);
	
	// Pre-process the image
	let tensor = tf.browser.fromPixels(image)
		.resizeNearestNeighbor([96,96]) // change the image size here
		.toFloat()
		.div(tf.scalar(255.0))
		.expandDims();

	let predictions = await model.predict(tensor).data();
	let top5 = Array.from(predictions)
		.map(function (p, i) { // this is Array.map
			return {
				probability: p,
				className: TARGET_CLASSES[i] // we are selecting the value from the obj
			};
		}).sort(function (a, b) {
			return b.probability - a.probability;
		}).slice(0, 5);

	$("#prediction-list").empty();
	top5.forEach(function (p) {
		$("#prediction-list").append(`<li>${p.className}: ${p.probability.toFixed(6)}</li>`);
		});
});
