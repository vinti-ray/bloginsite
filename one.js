// // Allow an author to login with their email and password. On a successful login attempt return a JWT token contatining the authorId in response body like this
// // If the credentials are incorrect return a suitable error message with a valid HTTP status code
// const login=async function(req,res){
//     let email=req.body.email
//     let password=req.body.password
//     const userLogin=await userModel.findOne({email:email,password:password})

//     const createToken =jwt.sign({id:userLogin._id.toString(),name:userLogin.fname},"my_secret_key")
//     res.heades("token",createToken)
//     res.status(200).send({msg:createToken})
// }

// 546.5476.65
// Given a string S containing a number of words. If the count of words in the string S is even then reverse its even position’s words else reverse its odd position, push reversed words at the starting of a new string and append the remaining words as it is in order.
// let s=[ 'Ashish', 'Yadav', 'Abhishek', 'Rajput', 'Sunil', 'Pundir' ]
// let a=s.length
// function main(s){
//     let k=[]
//     let i=1
//     while(i<a){
//         k.push(s[i])
//         i=i+2
//     }
//     let j=0
//     let i2=[]
//     while(j<a){
//      i2.push(s[j])
//      j=j+2
//     }
//    let pop=k.reverse()
//    let yui=pop.map(g=> g.split("").reverse().join(""))
//     return yui.concat(i2)
// }
// console.log(main(s))

//let text = "Mr Blue has a blue house and a blue car";
// let result = text.replace(/blue/g, "red");
//          cocodeed
// let arr= "cocodeeddeco"
// let tu="code"
// const regex = new RegExp(/code/);
// // let n = arr.search(tu)
// // var pos = arr.search(/.de/);
// console.log(regex.test(arr));
// // console.log(arr.match(/cocodede/))
// // regex.test(str)

// // let b=arr.split("")
// // let c=tu.split("")

// function canBecomeEmpty(arr,tu){  
//     // const regex = new RegExp(tu);
// let i=arr.length
// let j=tu.length
// while(i>0){
//     const regex = new RegExp(arr);
//     if(regex.test(tu)){
//        let h=arr.replace(tu, "");
//        i=i-j
//     }else{
//         break
//     }
        
    
       
// }
// if(i==0){
//     return true
// }else {
//     return false
// }
// // return i

// }
// hohohowwwhow
// how
let s1= ""
// let s2="how"
// let x=s1.indexOf(s2)
// s1=s1.replaceAll(s2,"")
console.log(s1==0)
function solution(s1,s2) {
    let i=s1.length
  
    while(i>0){
        let x=s1.indexOf(s2)
        if(x== -1){
            break;
        }
        s1=s1.replace(s2,"");
        
    }
      if(s1==0){
          return "Yes"
      }else{
          return "No"
      }
  }
console.log( solution(s1,s2))

let data=[1,4]
let b=Object.keys(data).length
console.log(b)

// Given an array of N integers and an integer M.

// Find an element K in the array such that if all the elements from the array that are greater than K are made equal to K then the sum of all the elements of the resultant array becomes equal to M.