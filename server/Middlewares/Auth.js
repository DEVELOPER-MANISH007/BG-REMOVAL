import jwt from 'jsonwebtoken'

//middlware function to decode jwt token to get clerkid

const authUser = async (req,res,next)=>{
    try {
        
        const {token} = req.headers
        if(!token){
            return res.json({success:false,message:"not authorized login again"})
        }
        const token_decode  = jwt.decode(token)

        if(!token_decode || (!token_decode?.clerkId && !token_decode?.sub)){
            return res.status(401).json({success:false,message:"invalid token"})
        }

        req.clerkId = token_decode?.clerkId || token_decode?.sub
        next()

    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}


export default authUser