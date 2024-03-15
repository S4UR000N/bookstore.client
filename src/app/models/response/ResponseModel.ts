class ResponseModel<T> {
    result: T;
    statusCode: number;
    errors: {[key: string] : string[]} = {};

    addError(key: string, error: string) {
        if (!(key in this.errors)) {
            this.errors[key] = [];
        }
        this.errors[key].push(error);
    }
}

export default ResponseModel;