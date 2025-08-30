
const asyncHandle= (userFilePath) => {
  return (req,res,next)=>{
    Promise.resolve(userFilePath(req,res,next)).catch((err)=>next(err))
  }
}

export {asyncHandle}