

class apiResponse{
constructor(
  message="sucess",data,statusCode,
){
  
  this.message=message,
  this.data=data,
  this.sucess=statusCode<400,
  this.statusCode=statusCode
}
}

export {
  apiResponse
}