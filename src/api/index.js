const HOST='http://localhost:8887';


export function post(url,data){
    return fetch(HOST+url,{
        method:"POST",
        credentials:"include",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    }).then((res)=>res.json());
}

export function get(url){
    return fetch(HOST+url,{
        method:"GET",
        credentials:"include",
        headers:{
            "Accept":"application/json"
        }
    }).then((res)=>res.json());
}
