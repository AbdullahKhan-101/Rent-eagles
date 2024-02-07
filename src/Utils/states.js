export function SetUserState(state){
    return state?.data?.data[0]?.user;
}

export function BackEndResponse(response){
    return response?.data?.message[0];
}


export function BackEndResponseError(error){
       return error?.response?.data?.message[0];
}

