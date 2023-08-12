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

let model;
$( document ).ready(async function () {
	$('.progress-bar').show();
    console.log( "Loading model..." );
    model = await tf.loadLayersModel('transfer-learning-model/model.json');
    console.log( "Model loaded." );
	$('.progress-bar').hide();
});

$("#predict-button").click(async function () {
	let image = $('#selected-image').get(0);
	
	// Pre-process the image
	let tensor = tf.browser.fromPixels(image)
		.resizeNearestNeighbor([224,224]) // change the image size here
		.toFloat()
		.div(tf.scalar(255.0))
		.expandDims();
	
	const base_model = await tf.loadGraphModel(
		'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/classification/5/default/1',
		{fromTFHub: true})
	// console.log('warming up...');
	// tf.tidy(function () {
	// 	let answer = base_model.predict(tf.zeros([1, 224, 224, 3]));
	// 	console.log(answer.shape);
	// });	
	// console.log('warmed');
	console.log(tf.version)
	let processedTensor = base_model.predict(tensor);

	let predictions = await model.predict(processedTensor).data();
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
