let users = [
    { "id": 0.372598048211062, "username": "Gioconde", "password": "321" },
    { "id": 0.42963005605214954, "username": "killer", "password": "111" },
    { "id": 0.08133849221774536, "username": "Ira", "password": "222" },
]
let usersTokens = [
    { "id": 0.372598048211062, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MC4zNzI1OTgwNDgyMTEwNjIsInVzZXJuYW1lIjoiR2lvY29uZGUiLCJpYXQiOjE2MTMzNTAzMzZ9.mN_cF2X6jhDqUd8r7TyEujffcVXb3msnm6-4AUXdn1s" },
    { "id": 0.42963005605214954, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MC40Mjk2MzAwNTYwNTIxNDk1NCwidXNlcm5hbWUiOiJraWxsZXIiLCJpYXQiOjE2MTMyNzI0Njh9.6rusgsbvUYme3oQKAWe2gUD9KxBGB_43tZB-JEohHk8" },
    { "id": 0.08133849221774536, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MC4wODEzMzg0OTIyMTc3NDUzNiwidXNlcm5hbWUiOiJJcmEiLCJpYXQiOjE2MTMyNzMxNTd9.19lq8gswkEPIxVehNvZOjYxDYUbQUSvVE6SCSpcwTL4" },
]

const findByUsername = (username) => {
    return users.find((user) => {
        return user.username === username
    });
}
const findToken = (id, token) => {
    return usersTokens.find((userToken) => {
        return userToken.id === id && userToken.token === token
    })
}
const storeToken = ({ id }, token) => {
    usersTokens.push({ id, token })
}
const add = (user) => {
    users.push(user)
}
const list = () => {
    return users
}
const remove = (id)=>{
    users = users.filter(user=>{
        return user.id != id
    })
    usersTokens = usersTokens.filter(user=>{
        return user.id != id
    })
}

module.exports = {
    remove,
    storeToken,
    findByUsername,
    add,
    list,
    findToken
}