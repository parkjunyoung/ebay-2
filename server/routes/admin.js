import express from 'express';
import models from '../models';

const router = express.Router();

router.get('/products', (req,res)=>{
    models.Products.findAll({

    }).then(function(products) {
        res.json({ products : products });
    });
});

router.post('/products', (req,res)=>{
    models.Products.create({
        product_name : req.body.product_name,
        price : req.body.price ,
        sale_price : req.body.sale_price ,
        description : req.body.description
    }).then(function() {
        res.json({ message : "success" });
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