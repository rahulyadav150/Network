
function valid(data){
    const err={}
   if(data.fullName.length>25)
   err.fullName='atmost 25 characters allowed';

   if(data.userName.length>25)
   err.userName='atmost 25 characters allowed';

   if(!validateEmail(data.email))
   err.email='please provide a valid email';

   if(data.password.length<6)
   err.password='password must be atleast 6 character long';

   if(data.password!==data.cfPass)
   err.cfPass="Not matched "
   console.log("in valid amd err is ",err);
   return {
       errLength:Object.keys(err).length,
       err:err
   }
   

}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export default valid;
