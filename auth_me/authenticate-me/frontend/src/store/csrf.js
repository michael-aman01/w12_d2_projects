

export const csrfFetch = async (url,options={}) => {
    options.headers = options.headers || {};
    options.method = options.method || "GET";

    if(options.method.toUpperCase() !== "GET"){
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
        options.headers['X-CSRF-Token'] = sessionStorage.getItem("X-CSRF-Token")
    }

    const res = await fetch(url,options)
    if(res.status >= 400){
        throw res.error;
    }else{
        return res
    }
}



export const restoreCSRF = async () => {
    const res = await csrfFetch('/api/session')
    const token = res.headers.get("X-CSRF-Token")
    console.log('token:', token)
    if(token) sessionStorage.setItem("X-CSRF-Token",token)
    return res
}