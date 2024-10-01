import ReviewModel from "../model/reviewsModel.js";

export const CreateReviewService= async (req) => {
    try {

        let user_id=req.headers['user_id']
        let {productID,des,rating}=req.body;
        let postJSON={userID:user_id, productID:productID, des:des, rating:rating};

        let data=await ReviewModel.updateOne({userID:user_id, productID:productID},{$set:postJSON},{upsert:true})

        return {status:"success",message:"Create Successfully",data:data};
    }catch(error) {
        return {status:"fail",data:error.toString()}
    }
}