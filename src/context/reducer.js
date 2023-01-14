const idStored = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).id
    : undefined;
const tokenStored = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).token
    : undefined;
const rolStored = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).rol
    : undefined;
const emailStored = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).email
    : undefined;
const nameStored = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).name
    : undefined;   
const imageStored = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).image
    : undefined;    

export const initialState = {
    id: idStored,
    token: tokenStored,
    rol: rolStored,
    email: emailStored,
    name: nameStored,
    image: imageStored,
    loading: false,
    errorMessage: null
};

export const AuthReducer = (initialState, action) => {
    switch (action.type) {
        case "REQ_LOGIN":

            return {
                ...initialState,
                loading: true
            };
        case "REQ_REGISTER":

            return {
                ...initialState,
                loading: true
            };
        case "LOGIN_OK":
            return {
                id: action.payload.id,
                token: action.payload.token,
                rol: action.payload.rol,
                email: action.payload.email,
                name: action.payload.name,
                image: action.payload.image,
                loading: false
            };
        case "LOGIN_FAIL":
            return {
                ...initialState,
                loading: false,
                errorMessage: action.error
            };
        case "LOGOUT":
            return {
                id: undefined,
                token: undefined,
                loading: false
            };


        default:
            throw new Error(`Unhandled action type: ${action.type}`);

    }
};