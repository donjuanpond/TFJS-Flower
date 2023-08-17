# USE THIS TO DOWNLOAD MODEL
import tensorflow as tf
from tensorflow import keras
import tensorflowjs as tfjs
vgg16 = tf.keras.applications.vgg16.VGG16()
tfjs.converters.save_keras_model(vgg16,r'../model')