import express from 'express';
import models from '../models';

//이미지 저장되는 위치 설정
import path from 'path';
let uploadDir = path.join( __dirname , '../../uploads' );
import fs from 'fs';

//multer 셋팅
import multer from 'multer';
let storage = multer.diskStorage({
    destination : function (req, file, callback) {
        callback(null, uploadDir );
    },
    filename : function (req, file, callback) {
        callback(null, 'product-' + Date.now() + '.'+ file.mimetype.split('/')[1] );
    }
});
let upload = multer({ storage: storage });

const router = express.Router();

router.get('/products', (req,res)=>{
    models.Products.findAll({

    }).then(function(products) {
        res.json({ products : products });
    });
});

router.post('/products', upload.single('thumbnail') , (req,res)=>{
    models.Products.create({
        product_name : req.body.product_name,
        thumbnail : (req.file) ? req.file.filename : "",
        price : req.body.price ,
        sale_price : req.body.sale_price ,
        description : req.body.description
    }).then(function() {
        res.json({ message : "success" });
    });
});

router.get('/products/:id', (req,res)=>{
    models.Products.findById(req.params.id).then( (product) => {
        res.json({ product : product });
    });
});

router.put('/products/:id', upload.single('thumbnail'), (req,res)=>{

    models.Products.findById(req.params.id).then( (product) => {

        if(req.file){  //요청중에 파일이 존재 할시 이전이미지 지운다.
            fs.unlinkSync( uploadDir + '/' + product.thumbnail );
        }
        models.Products.update(
            {
                product_name : req.body.product_name,
                thumbnail : (req.file) ? req.file.filename : product.thumbnail ,
                price : req.body.price ,
                sale_price : req.body.sale_price ,
                description : req.body.description
            }, 
            { 
                where : { id: req.params.id } 
            }
        ).then(function() {
            res.json({ message : "success" });
        });
        
    });
});

router.delete('/products/:id', (req,res)=>{
    models.Products.destroy({
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.json({ message : "success" });
    });
});

export default router;