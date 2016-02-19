/**
 * Created by HulkTron on 2/14/2016.
 */

    var express = require("express");
    var Firebase = require("firebase");
    var ref = new Firebase("https://meanstack01.firebaseio.com/");
    var UserModel_1 = require("../DBRepo/UserModel");
    var router = express.Router();


    router.post("/signup", function (req, res) {
    ref.createUser({
        email: req.body.data.Email,
        password: req.body.data.Password
    }, function (err, success) {
        if (err) {
            res.send(err);
        }
        else {
            req.body.data.FirebaseToken = success.uid;
            UserModel_1.saveUser(req.body.data)
                .then(function (userInstance) {
                    res.send({ status: true, user: userInstance });
                }, function (err) {
                    res.send({ status: false, message: err });
                });
        }
    });
    });


     router.post("/login", function (req, res) {
     console.log("On Login In");
     var user1 = req.body.data;
         //console.log(user1.email);
      UserModel_1.findUser(user1.email)
        .then(function (userInstance) {
            if (!userInstance) {
                res.send("No user found with supplied email");
                return;
            }
            if (userInstance.Password == user1.password) {
                res.send({ message: "Logged In successfully", token: userInstance.FirebaseToken });
            }
            else {
                res.send("Wrong Password");
            }
        }, function (err) {
            res.send({ status: false, message: err });
        });
     });


     //router.get("/salesmenData", function (req, res) {
     //console.log(req.user);
     //var salesmenArr = [{ name: "S 01", id: 1 }, { name: "S 02", id: 2 }, { name: "S 03", id: 3 }];
     //res.send({ status: true, data: salesmenArr });
     //});

       router.post("/company",function(req,res){
               var usersRef = ref.child("company");
               usersRef.child("companies").push({
                   name: req.body.data.name,
                   catory: req.body.data.catory,
                   loc:req.body.data.loc

               },function (err, success) {
                   if (err) {
                       res.send(err);
                   }
                   else {
                       console.log(req.body.data);
           //console.log(company);
        //console.log(com12)
           UserModel_1.saveCom(req.body.data)
             .then(function(userInstance) {
              res.send({ status: true, user: userInstance });
              },function (err) {
              res.send({ status: false, message: err });

               });
                   }
               });
       });


router.post("/sales", function (req, res){
              var usersRef = ref.child("salesman12");
              usersRef.child("salesman").push({
              email: req.body.data.Email,
              password: req.body.data.Password,
              FirstName:req.body.data.FirstName,
              LastName : req.body.data.LastName

          },function (err, success) {
              if (err) {
                  res.send(err);
              }
              else {
              console.log(req.body.data);
              UserModel_1.savesales(req.body.data)
                .then(function (userInstance) {
                    res.send({ status: true, user: userInstance });
                }, function (err) {
                    res.send({ status: false, message: err });
                  });
              }
              });
      });


     router.post("/prod", function (req, res) {

     var usersRef = ref.child("Product");
     usersRef.child("Products").push({
        cname: req.body.data.cname,
        name: req.body.data.name,
        price:req.body.data.price,
        stk:req.body.data.stk
    },function (err, success) {
        if (err) {
            res.send(err);
        }
        else {
            console.log(req.body.data);
        console.log(req.body.data);
        UserModel_1.saveproduct(req.body.data)
        .then(function (userInstance) {
            res.send({ status: true, user: userInstance });
        }, function (err) {
            res.send({ status: false, message: err });
            });
        }
    });
});
       router.post("/salesmanlogin", function (req, res) {
       //console.log("On Login In");
        var user1 = req.body.data;
        //console.log(user1.email);
        UserModel_1.findsales(user1.email)
        .then(function (userInstance) {
            if (!userInstance) {
                res.send("No user found with supplied email");
                return;
            }
            if (userInstance.Password == user1.password) {
                res.send({ message: "Logged In successfully", status : true });
            }
            else {
                res.send("Wrong Password");
            }
        }, function (err) {
            res.send({ status: false, message: err });
        });
});
     router.get("/salesmenData", function (req, res) {
         //console.log("On Login In");
         //console.log(user1.email);
         UserModel_1.finddata(req)
            .then(function (userInstance) {
                 res.send({ status: true, message: userInstance })
            }, function (err) {
                res.send({ status: false, message: err });
            });

         //ref.on("value", function (snapshot) {
         //    console.log(snapshot.val())
         //    var imi = snapshot.val()
         //    res.send({status: true, data: imi})







             //.then(function (userInstance){
             //     res.send({ status: true, message: userInstance })
             //}, function (err) {
             //    res.send({ status: false, message: err });
             //});
         })
          router.get("/comdata", function (req, res) {
              //console.log("On Login In");
              //console.log(user1.email);
              console.log(req)
              UserModel_1.findcom(req)
                  .then(function (userInstance) {
                      res.send({status: true, message: userInstance})
                  }, function (err) {
                      res.send({status: false, message: err});
                  });
          })
     router.get("/Proddata", function (req, res) {
    //console.log("On Login In");
    //console.log(user1.email);
        console.log(req)
       UserModel_1.proddata(req)
        .then(function (userInstance) {
            res.send({status: true, message: userInstance})
        }, function (err) {
            res.send({status: false, message: err});
        });
})

module.exports = router;
