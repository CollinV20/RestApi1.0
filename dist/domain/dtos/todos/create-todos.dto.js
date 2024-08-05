"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTodoDto = void 0;
class CreateTodoDto {
    constructor(name, lastName, gender, date) {
        this.name = name;
        this.lastName = lastName;
        this.gender = gender;
        this.date = date;
    }
    static create(props) {
        const { name, lastName, gender = 'N/A', date = new Date() } = props;
        if (!name)
            return ['Name is required'];
        if (!lastName)
            return ['Last name is required'];
        return [undefined, new CreateTodoDto(name, lastName, gender, date)];
    }
}
exports.CreateTodoDto = CreateTodoDto;
