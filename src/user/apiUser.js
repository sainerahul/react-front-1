export const read = (userId, token) => {
    //  console.log(userId)
    //  ${process.env.REACT_APP_API_URL}
    return fetch(`http://localhost:8081/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}
export const list = () => {
    return fetch(`http://localhost:8081/users`, {
        method: "GET",
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}
export const remove = (userId, token) => {
    //  console.log(userId)
    //  ${process.env.REACT_APP_API_URL}
    return fetch(`http://localhost:8081/user/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}
export const update = (userId, token,user) => {
     console.log('user data update--', user)
    //  ${process.env.REACT_APP_API_URL}
    
    // const {name,email,photo} = user
    return fetch(`http://localhost:8081/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        // body: JSON.stringify({name,email})
        body : user
    })
        .then(response => {

            return (
                console.log(response),
                response.json())
        })
        .catch(error => {
            console.log(error)
        })
}
export const updateUser = (user,next) =>{
    if(typeof window!=='undefined'){
        if(localStorage.getItem("jwt")){
            let auth = JSON.parse(localStorage.getItem("jwt"))
            auth.user = user
            localStorage.setItem("jwt",JSON.stringify(auth))
            next();
        }
    }
}

export const follow = (userId, token,followId) => {
   //  ${process.env.REACT_APP_API_URL}
   
   // const {name,email,photo} = user
   return fetch(`http://localhost:8081/user/follow`, {
       method: "PUT",
       headers: {
           Accept: "application/json",
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`
       },
       body: JSON.stringify({userId,followId})
    //    body : user
   })
       .then(response => {

           return (
               console.log(response),
               response.json())
       })
       .catch(error => {
           console.log(error)
       })
}

export const unfollow = (userId, token,unfollowId) => {
    //  ${process.env.REACT_APP_API_URL}
    
    // const {name,email,photo} = user
    return fetch(`http://localhost:8081/user/unfollow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId,unfollowId})
     //    body : user
    })
        .then(response => {
 
            return (
                console.log(response),
                response.json())
        })
        .catch(error => {
            console.log(error)
        })
 }
 export const findPeople= (userId, token)=>{
    return fetch(`http://localhost:8081/user/findpeople/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
     
    })
        .then(response => {
 
            return (
                console.log(response),
                response.json())
        })
        .catch(error => {
            console.log(error)
        })
 }