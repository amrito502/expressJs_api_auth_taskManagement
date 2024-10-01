import CartModel from "../model/cartsModel.js";
import mongoose from "mongoose";
import WishesModel from "../model/wishesModel.js";
const ObjectId=mongoose.Types.ObjectId

export const CreateCartService= async (req) => {
    try {
        let user_id=req.headers['user_id']
        let {productID,color,qty,size}=req.body;
        let postJSON={
            productID:productID,
            userID:user_id,
            color:color,
            qty:qty,
            size:size
        }
        await CartModel.create(postJSON)
        return {status:"success",message:"Cart Create Successfully"};
    }catch(error) {
        return {status:"fail",data:error.toString()}
    }
}


export const ReadCartService= async (req) => {
    try {

        let user_id=new ObjectId(req.headers['user_id'])

        let matchStage={$match:{userID:user_id}}

        let JoinStageProduct={$lookup:{from:"products", localField:"productID", foreignField:"_id",as:"product"}}

        let data = await CartModel.aggregate([matchStage, JoinStageProduct])

        return {status:"success",message:"Read Successfully",data:data};

    }catch(error) {

        return {status:"fail",data:error.toString()}
    }
}


export const RemoveCartService= async (req) => {
    try {
        let user_id=req.headers['user_id']
        let {id}=req.body;
        let postJSON={
            _id:id,
            userID:user_id
        }
        let data=await CartModel.deleteOne(postJSON)
        return {status:"success",message:"Remove Successfully",data:data};
    }catch(error) {
        return {status:"fail",data:error.toString()}
    }
}



export const UpdateCartService= async (req) => {
    try {
        let user_id=req.headers['user_id']
        let {color,qty,size,id}=req.body;

        let postJSON={
            color:color,
            qty:qty,
            size:size
        }
        let data=await CartModel.updateOne({userID: user_id,_id:id},{$set:postJSON})

        return {status:"success",message:"Cart Update Successfully",data:data};
    }catch(error) {
        return {status:"fail",data:error.toString()}
    }
}