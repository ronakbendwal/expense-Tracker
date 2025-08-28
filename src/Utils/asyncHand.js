export const asyncHandle=(request)={
  return (req,res,next){
    Promise.resolve(request(req,res,next)).catch((error)=>nexr(error))
  }
}