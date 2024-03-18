class UserJwtTokenModel {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public role: string,
        public aud: string,
        public exp: string | Date,
        public iss: string
    ) {}

    static encodeString(ujtm: UserJwtTokenModel) {
        return Object.values(ujtm).join('-');
    }

    static decodeString(encodedString: string): UserJwtTokenModel | null {
        if (encodedString) {
            const values = encodedString.split('-');
            if (values.length !== 7) {
                return null; // Invalid format
            }

            const [id, firstName, lastName, role, aud, exp, iss] = values;
            return new UserJwtTokenModel(id, firstName, lastName, role, aud, exp, iss);
        }
        return null;
    }

    public expToDate(): UserJwtTokenModel
    {
        this.exp = new Date(+this.exp * 1000);
        return this;
    }
}

export default UserJwtTokenModel;