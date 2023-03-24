const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    deliveryId:{
        type: String,
        required:[true, 'A delivery must have a Delivery ID']
    },
    deliverer:{
        type: String,
        required:[true, 'A delivery must have a Deliverer']
    },
    delivery_date:{
        type: Date,
        default: Date.now,
        required:[true, 'A delivery must have a delivery date']
    },
    product:{
        type: String,
        required:[true, 'A delivery must have a product name']
    },
    quantity:{
        type: Number,
        required:[true, 'A delivery must have a quantity']
    },
    location:{
        type: String,
        required:[true, 'A delivery must have a location']
    }
});

module.exports = mongoose.model('Deliveries', userSchema);