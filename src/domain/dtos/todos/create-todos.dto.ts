

export class CreateTodoDto {

    private constructor(
        public readonly name: string,
        public readonly lastName: string,
        public readonly gender: string,
        public readonly date: Date,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {

        const { name, lastName, gender = 'N/A', date = new Date() } = props

        if (!name) return ['Name is required'];
        if (!lastName) return ['Last name is required'];

        return [undefined, new CreateTodoDto(name, lastName, gender, date)];
    }
}
