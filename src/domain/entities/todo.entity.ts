

export class TodoEntity {

    constructor(
        public id: number,
        public name: string,
        public lastName: string,
        public gender: string,
        public date: Date | null
    ) { }

    get isCompleted() {
        return !!this.date;
    }

    public static fromJSON(object: { [key: string]: any }) {
        const { id, name, lastName, gender, date } = object;
        
        if (!id) throw 'Id is required';
        if (!name) throw 'Name is required';
        if (!lastName) throw 'Last name is required';
        if (!gender) throw 'Gender name is required';

        let completedAt;

        if (date) {
            completedAt = new Date(date);

            if (isNaN(completedAt.getTime())) {
                throw 'CompletedAt is a not validate date'
            }
        }

        return new TodoEntity(id, name, lastName, gender, date);
    }
}