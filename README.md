[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![](https://ga4gh.datainsights.cloud/api?repo=tfjs-tuberculosis)](https://github.com/SaschaDittmann/gaforgithub)

# TensorFlow.JS Example: Training Flower Clasasification images with Node.JS

This example shows you how to use TensorFlow.JS for classifying flower images. To get this, I modified Sasha Dittman's repo here: 

For the flower purposes, I added data and formatted it as the rest of the code needs in data-preprocess.ipynb, using the flower images I had downloaded on my PC. Flower images downloadable from https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos.tgz

Prepare the node environments:
```sh
$ npm install
# Or
$ yarn
```

After doing this, you need to move the tensorflow.dll file from '/tfjs-tubercolosis-master/train/node_modules/tensorflow/tfjs-node-gpu/deps/lib/' to '/tfjs-tubercolosis-master/train/node_modules/tensorflow/tfjs-node-gpu/lib/' for everything to go through.

Run the training script:
```sh
$ node main.js
```
OR, if you want to do transfer learning, use:
```sh
$ node transfer-learning-main.js
```

After this, move the trained model .bin and .json files from \tfjs-tuberculosis-master\train\model to \tfjs-tuberculosis-master\web\static\model

If you're doing transfer learning, move them to tfjs-tuberculosis-master\transfer-learning-web\static\model instead.

Run the local web server script after cd-ing into \tfjs-tuberculosis-master\web\ if you're doing training from scratch OR after cd-ing into \tfjs-tuberculosis-master\transfer-learning-web\ if you're doing transfer learning
```sh
$ node server.js
```

This will put the running site on port 81. To access port 81, use localtunnel. Install and run it with:
```sh
$ npm install -g localtunnel
$ lt --port 81
```
This will create a URL for you to go to and test out the code.# tfjs-flowers-classification
