/**
 * Created by HulkTron on 2/14/2016.
 */
    var mongoose = require("mongoose");
    var q = require("q");
    var Schema = mongoose.Schema;
    var UserSchema = new Schema({
    FirstName: String,
    LastName: String,
    Email: { type: String, unique: true, required: true },
    Password: String,
    CreatedOn: { type: Date, default: Date.now() },
    FirebaseToken: String
    });
    //var scope = mongoose.Schema;
    //var Schema = mongoose.Schema;
    var company = new Schema({
     name: String,
        catory: String,
        loc: String
    });
    var product = new Schema({
    cname: String,
    name: String,
    price: Number,
    stk: Number
    });



     var salesman = new Schema({
         FirstName: String,
         LastName: String,
         Email: String,
         Password: String,
         CreatedOn: { type: Date, default: Date.now() }
     });
    var UserModel = mongoose.model("users", UserSchema);
    var Companies = mongoose.model("companies",company);
    var salesman1 = mongoose.model("salesman",salesman);
    var poc1 = mongoose.model("Products",product)
    function saveUser(userProps) {
    var deferred = q.defer();
    var user = new UserModel(userProps);
    user.save(function (err, data) {
        if (err) {
            console.log("Error in saving User");
            console.log(err);
            deferred.reject("Error occurred while saving user");
        }
        else {
            console.log("User Saved Succesfully");
            deferred.resolve(data);
        }
    });
    return deferred.promise;
    }
    exports.saveUser = saveUser;
    function findUser(query) {
    //console.log("this is query data");
    //console.log(query);
    var deferred = q.defer();
    UserModel
        .findOne(query, function (err,record) {
            if (err) {
                console.log("Error in finding User");
                console.log(err);
                deferred.reject("Error in finding User");
            }
            else {
                //console.log("this is record");
                //console.log(record);
                deferred.resolve(record);
            }
        });
    return deferred.promise;
    }
    exports.findUser = findUser;


     function saveCom(comprops){
      var deferred = q.defer();
      var com1 = new Companies(comprops);
       com1.save(function(err,data) {
           if (err) {
            console.log("Error in saving User");
            console.log(err);
            deferred.reject("Error occurred while saving user");
        }
        else {
            //console.log(data);
            console.log("User Saved Succesfully");
            deferred.resolve(data)
        }

      });
         return deferred.promise;
     }
      exports.saveCom = saveCom;




    function savesales(salesprops) {
    var deferred = q.defer();
    var sales = new salesman1(salesprops);
    sales.save(function (err, data) {
        if (err) {
            console.log("Error in saving User");
            console.log(err);
            deferred.reject("Error occurred while saving user");
        }
        else {
            console.log("User Saved Succesfully");
            console.log(data);
            deferred.resolve(data);
        }
    });
    return deferred.promise;

   }
    exports.savesales = savesales;

    function saveproduct(comprops){
    var deferred = q.defer();
    var com1 = new poc1(comprops);
    com1.save(function(err,data) {
        if (err) {
            console.log("Error in saving User");
            console.log(err);
            deferred.reject("Error occurred while saving user");
        }
        else {
            //console.log(data);
            console.log("User Saved Succesfully");
            deferred.resolve(data)
        }

    });
    return deferred.promise;
}
exports.saveproduct = saveproduct;
     function findsales(query) {
      //console.log("this is query data");
      //console.log(query);
     var deferred = q.defer();
         //console.log(query)
     salesman1
        .findOne(query, function (err,record) {
            if (err) {
                console.log("Error in finding User");
                console.log(err);
                deferred.reject("Error in finding User");
            }
            else {
                console.log("this is record");
                console.log(record);
                deferred.resolve(record);
            }
        });
    return deferred.promise;
}
exports.findsales = findsales;
function finddata(query) {
    var deferred = q.defer();
    salesman1.find({},function(err, docs){
        //res.send('index',{docs:docs});
        deferred.resolve(docs)
        //console.log(docs)
    });
  return deferred.promise;
}
exports.finddata = finddata;
     function findcom(query) {
     var deferred = q.defer();
         Companies.find({},function(err, docs){
        //res.send('index',{docs:docs});
        deferred.resolve(docs)
        //console.log(docs)
    });
    return deferred.promise;
}
exports.findcom = findcom;
function proddata(query) {
    var deferred = q.defer();
    poc1.find({},function(err, docs){
        //res.send('index',{docs:docs});
        deferred.resolve(docs);
        //console.log(docs)
    });
    return deferred.promise;
}
exports.proddata =  proddata;

