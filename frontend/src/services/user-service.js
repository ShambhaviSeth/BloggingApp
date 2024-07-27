import { myAxios } from "./helper";

export const signup = async (user) => {
    const response = await myAxios.post('/auth/register', user);
    return response.data;
}

export const loginUser = async (loginDetail) => {
    const response = await myAxios.post('/auth/login', loginDetail);
    return response.data;
}

export const getUser = (userId) => {
    return myAxios.get(`/users/${userId}`).then(resp=>resp.data)
}