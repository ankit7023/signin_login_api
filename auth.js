const express = require("express");

//! sign route
router.post("/register", async (req, res) => {
    const { name, email, password, cpassword } = req.body;
  
    if (!name || !email || !password || !cpassword) {
      return res.status(401).json({
        err: "all field are not filled",
      });
    }
  
    try{
          const userExist = await User.findOne({email: email,})
            if (userExist) {
              return res.status(401).json({err: "Email already exist"});
            }
            else if(password != cpassword){
              return res.status(401).json({err: "password are not matching"});
            }
              const user = new User({name,email,password,cpassword,});
  
            await user.save()
            
            return res.status(201).json({messag: "register success"});
              
    }
    catch(err){
      console.log(err);
    }
  });



  //! login route

router.post("/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({err: "all field are not filled",});
      }
       
      const userLogin = await User.findOne({email:email})
      // console.log(userLogin);
      if(!userLogin){
          res.status(400).json({err: "user error",});
      }
      else{
    
          const isPassMatch = compare(password, userLogin.password)
          if(isPassMatch){
              res.status(200).json({message: "login sucessfully",});
          }
          else{
              res.status(400).json({err: "user error",});
          }
      }
      
  
    } catch (err) {
      console.log(err);
    }
  });