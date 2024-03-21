class UpdateBooksOnUserRequestModel {
    constructor(
        public UserId: number,
        public AddBooks: number[],
        public RemoveBooks: number[]
    ) {}
}

export default UpdateBooksOnUserRequestModel;