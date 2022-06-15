function getData(key){
    let data = JSON.parse(localStorage.getItem(key))
    if(data) return data;
    return null
}

function setData(key, data){
    try{
        localStorage.setItem(key, JSON.stringify(data))
    } catch(err){
        console.log({err})
        return false;
    }
    return true;
}

function removeItem(key){
    localStorage.removeItem(key)
}

function getTime(){
    return `${new Date().toDateString()} | ${new Date().toLocaleTimeString()}`
}