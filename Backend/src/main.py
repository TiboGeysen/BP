from flask import Flask, request, send_file
from flask_cors import CORS
import os

from detectron2.data import DatasetCatalog, MetadataCatalog, build_detection_test_loader
from detectron2.evaluation import COCOEvaluator, inference_on_dataset
from detectron2.config import get_cfg
from detectron2.engine import DefaultPredictor
from detectron2 import model_zoo
from detectron2.utils.visualizer import Visualizer, ColorMode

import cv2
import base64
import json

import torch, torchvision
import cloudinary.uploader
import cloudinary
import config

cloudinary.config(cloud_name= config.cloud_name, api_key= config.api_key, api_secret=config.api_secret)

app = Flask(__name__)
CORS(app)
cors = CORS(app, resources=
    {r"/api":
        {"origins": "*",}
    })
app.config['CORS_HEADERS'] = 'Content-Type: multipart/form-data'
folder = "../static/images"

cfg = get_cfg()
cfg.merge_from_file(model_zoo.get_config_file("COCO-InstanceSegmentation/mask_rcnn_R_101_FPN_3x.yaml"))
cfg.MODEL.WEIGHTS = "/home/tibo/Bap/App/Backend/src/model_final.pth"
cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.5
cfg.MODEL.ROI_HEADS.NUM_CLASSES = 1
cfg.MODEL.DEVICE = 'cpu'
predictor = DefaultPredictor(cfg)

@app.route('/upload-images', methods=['GET', 'POST'])
def upload_images():
    f=request.files.getlist('file')
    count = 0
    dictionary = dict()
    for img in f:
        img.save(folder+'/original/'+img.filename)
        name = predict_images(img.filename)
        dictionary[str(count)] = name
        count += 1

        
    return json.dumps(dictionary)

def predict_images(name):

    im = cv2.imread(folder+'/original/'+name)
    im = cv2.resize(im, (512,512))
    outputs = predictor(im)

    

    v = Visualizer(im[:,:,::-1], scale = 1, instance_mode=ColorMode.IMAGE_BW)
    out = v.draw_instance_predictions(outputs['instances'].to("cpu"))
    cv2.imwrite(folder+'/predict/pred_'+name, out.get_image()[:,:,::-1])

    cloudinary.uploader.upload(folder+'/predict/pred_'+name, public_id = 'pred_'+os.path.splitext(name)[0])
    return 'pred_'+name

app.run(debug=True)
