

export class UpdateTodosDto {

    private constructor(
        public readonly id: number,
        public readonly name?: string,
        public readonly lastName?: string,
        public readonly gender?: string,
        public readonly date?: Date

    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.name) returnObj.name = this.name;
        if (this.lastName) returnObj.lastName = this.lastName;
        if (this.gender) returnObj.gender = this.gender;
        if (this.date) returnObj.date = new Date(this.date);

        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateTodosDto?] {

        const { id, name, lastName, gender, date } = props;
        let newDate = date;

        if (!id || isNaN(id)) return ['Id must be a valid number']

        if (date) {
            newDate = new Date(date);
            if (newDate.toString() === 'Invalid Date')
                return ['Date must be a valid date']
        }

        return [undefined, new UpdateTodosDto(id, name, lastName, gender, date)]
    }
}