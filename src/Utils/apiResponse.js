

class apiResponse{
constructor(
  message="sucess",data,statusCode,
){
  this.message=message,
  this.data=data,
  this.statusCode=statusCode,
  this.sucess=statusCode<400
}
}

export {
  apiResponse
}