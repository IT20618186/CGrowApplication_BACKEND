const express = require('express');
const Deliveries = require('../models/Delivery');

const router = express.Router();

//Save Delivery Record

router.post('/delivery/save',(req,res)=>{

    const deliveryId = req.body.deliveryId;
    const deliverer = req.body.deliverer;
    const delivery_date = Date(req.body.delivery_date);
    const product = req.body.product;
    const quantity = Number(req.body.quantity);
    const location = req.body.location;

    const newDeliveries = new Deliveries({
        deliveryId,
        deliverer,
        delivery_date,
        product,
        quantity,
        location
    });

    newDeliveries.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Delivery Record Save Successfully"
        });
    });
});


//Get Deliveries records

router.get('/deliveries',(req,res)=>{

    Deliveries.find().exec((err, deliveries)=> {
        if(err) {
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success: true,
            existingDeliveries: deliveries
        });
    });
});


//Get a Specific Delivery Record

router.get('/delivery/:id', (req,res) => {

    let deliveryId = req.params.id;

    Deliveries.findById(deliveryId,(err,delivery) =>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            delivery
        });
    });
});


//Update Delivery's record

router.patch('/delivery/update/:id', (req,res)=>{

    Deliveries.findByIdAndUpdate(
        req.params.id, {
            $set: req.body
        },
        (err, Deliveries) => {
            if(err) {
                return res.status(400).json({
                    error: err
                });
            }
            return res.status(200).json({
                success: "Updated Successfully."
            });
        }
    );
});


//Delete Materials in the list

router.delete('/delivery/delete/:id', (req,res)=>{

    Deliveries.findByIdAndRemove(req.params.id).exec((err, deletedDelivery)=>{
        if (err) {
            return res.status(400).json({
                message: "Delete Unsuccessfully.",
                err
            });
        }
        return res.status(200).json({
            message: "Delete Successfully.",
            deletedDelivery
        });
    });
});

module.exports = router;