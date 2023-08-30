export default class CustomError{
    static createError({ name = 'Error', cause, code = 1, message }){
        const error = new Error(message)
        error.name = name;
        error.code = code;
        error.cause = cause;
        throw error;
    }
}