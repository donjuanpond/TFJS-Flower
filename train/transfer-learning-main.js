
const tf = require('@tensorflow/tfjs-node-gpu');

const data = require('./transfer-learning-data');

async function run(epochs, batchSize, modelSavePath) {
  data.loadData();

  const {images: trainImages, labels: trainLabels} = data.getTrainData();
  console.log("Training Images (Shape): " + trainImages.shape);
  console.log("Training Labels (Shape): " + trainLabels.shape);
  const base_model = await tf.loadGraphModel(
    'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/classification/5/default/1',
    {fromTFHub: true})

  tf.tidy(function () {
    let answer = base_model.predict(tf.zeros([1, 224, 224, 3]));
    console.log(answer.shape);
  });

  MobileNetTrain = base_model.predict(trainImages);
  
  let model = tf.sequential();
  model.add(tf.layers.dense({inputShape: [1001], units:128, activation:'relu'}));
  model.add(tf.layers.dense({units: 5, activation: 'softmax'}))

  const optimizer = tf.train.adam(0.0001);
  model.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });

  
  const validationSplit = 0.15;
  await model.fit(MobileNetTrain, trainLabels, {
    epochs,
    batchSize,
    validationSplit
  });
  
  const {images: testImages, labels: testLabels} = data.getTestData();
  MobileNetTest = base_model.predict(testImages);
  const evalOutput = model.evaluate(MobileNetTest, testLabels);

  console.log(
      `\nEvaluation result:\n` +
      `  Loss = ${evalOutput[0].dataSync()[0].toFixed(3)}; `+
      `Accuracy = ${evalOutput[1].dataSync()[0].toFixed(3)}`);

  if (modelSavePath != null) {
    await model.save(`file://${modelSavePath}`);
    console.log(`Saved model to path: ${modelSavePath}`);
  }
}

run(45, 32, './model');
