import WishesModel from "../model/wishesModel.js";
import WishModel from "../model/wishesModel.js";
import mongoose from "mongoose";
const ObjectId=mongoose.Types.ObjectId

export const CreateWishService= async (req) => {
    try {
        let user_id=req.headers['user_id']
        let {productID}=req.body;
        let postJSON={
            productID:productID,
            userID:user_id
        }

        await WishesModel.updateOne(postJSON,{$set:postJSON},{upsert:true})


        return {status:"success",message:"Create Successfully"};
    }catch(error) {
        return {status:"fail",data:error.toString()}
    }
}


export const ReadWishListService= async (req) => {
    try {
        let user_id=new ObjectId(req.headers['user_id'])

        let matchStage={$match:{userID:user_id}}

        let JoinStageProduct={
            $lookup:{
                from:"products",
                localField:"productID",
                foreignField:"_id",as:"product"
            }
        }


        let data = await WishModel.aggregate([
            matchStage,
            JoinStageProduct
        ])

        return {status:"success",message:"Read Successfully",data:data};
    }catch(error) {
        return {status:"fail",data:error.toString()}
    }
}


export const RemoveWishService= async (req) => {
    try {
        let user_id=req.headers['user_id']
        let {productID}=req.body;
        let postJSON={
            productID:productID,
            userID:user_id
        }

        await WishesModel.deleteOne(postJSON)


        return {status:"success",message:"Remove Successfully"};
    }catch(error) {
        return {status:"fail",data:error.toString()}
    }
}