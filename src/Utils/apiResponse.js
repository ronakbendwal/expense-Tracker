

class apiResponse{
constructor(
  message="sucess",data,statusCode,
){
  
  this.message=message,
  this.data=data,
  this.statusCode=statusCode<400,
  this.sucess=false
}
}

export {
  apiResponse
}