[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![](https://ga4gh.datainsights.cloud/api?repo=tfjs-tuberculosis)](https://github.com/SaschaDittmann/gaforgithub)

# TensorFlow.JS Example: Training Flower Clasasification images with Node.JS

This example shows you how to use TensorFlow.JS for classifying flower images. To get this, I modified Sascha Dittmann's repo here: https://github.com/SaschaDittmann/tfjs-tuberculosis

For the flower purposes, I added data and formatted it as the rest of the code needs in data-preprocess.ipynb, using the flower images I had downloaded on my PC. Flower images downloadable from https://drive.google.com/file/d/1JEbTzhiRWsOkoh1wcc3JclSurt4cC55F/view?usp=sharing - extract into the folder titled "train" so that there is a "data" folder in there. Models you will have to train and put into their folders as shown below before just launching the server.js.

Prepare the node environments by cd-ing into each subfolder (train, web, and all the others) and running the following:
```sh
$ yarn
```

After doing this, you need to move the tensorflow.dll file from '/train/node_modules/tensorflow/tfjs-node-gpu/deps/lib/' to '/train/node_modules/tensorflow/tfjs-node-gpu/lib/' for everything to go through.

Run the training script:
```sh
$ node main.js
```
OR, if you want to do transfer learning, use:
```sh
$ node transfer-learning-main.js
```
If you're using the VGG16 pre-trained model, you don't need to do any training, you just need to download the model using the conveniently named `model-download.py` - to run this, you will need to install tensorflow and tensorflowjs using pip. 

After this, move the trained model .bin and .json files from \train\model to \web\static\model - if you're doing transfer learning, move them to \transfer-learning-web\static\model instead.

Run the local web server script after cd-ing into \web\ if you're doing training from scratch, \transfer-learning-web\ if you're doing transfer learning, or \vgg-web\ if you're using the pre-trained VGG model (imagenet classes, not for flowers but for any general objects)
```sh
$ node server.js
```

This will put the running site on port 81. To access port 81, use localtunnel. Install and run it with:
```sh
$ npm install -g localtunnel
$ lt --port 81
```
This will create a URL for you to go to and test out the code.

