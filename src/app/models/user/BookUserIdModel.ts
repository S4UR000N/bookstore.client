class BookUserIdModel {
    public constructor(
        public id: number,
        public title: string,
        public description: string,
        public author: string,
        public year: number,
        public users: {id: number}[],
        public userId: number = 0
    ) {}
}

export default BookUserIdModel;