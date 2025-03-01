import { Schema, model } from 'mongoose';

const companySchema = Schema({
    name: { 
        type: String, 
        required: true 
    },
    address: {
        type: String,
        requerid: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    impactLevel: { 
        type: String, 
        required: true, 
        enum: ["BAJO", "ALTO", "SUPERIOR"]
    },
    fundation: {  
         type: Number, 
         required: true 
    },
    trajectory:{
        type: String,
        requerid: true
    },
    category: { 
        type: String, 
        required: true 
    },
    status:{
        type: Boolean,
        default: true
    },
    },{
        versionKey: false,
        timestamps: true
})

export default model("Company", companySchema)
