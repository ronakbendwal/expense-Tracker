
class apiError extends Error{

  constructor(
     statusCode,
    message="something went wrong",
    errors=[]
  ){
   super(message)
   this.statusCode=statusCode,
   this.message=message,
   this.errors=errors,
   this.sucess=false,
   this.data=null
  }
}

export {
  apiError
}