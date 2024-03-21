import BookModel from "./BookModel";

class UserModel
{
    public constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public roleId: number,
        public role: string,
        public books: BookModel[]
    ) {}
}

export default UserModel;
