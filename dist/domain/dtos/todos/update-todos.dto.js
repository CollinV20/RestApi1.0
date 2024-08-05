"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTodosDto = void 0;
class UpdateTodosDto {
    constructor(id, name, lastName, gender, date) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.gender = gender;
        this.date = date;
    }
    get values() {
        const returnObj = {};
        if (this.name)
            returnObj.name = this.name;
        if (this.lastName)
            returnObj.lastName = this.lastName;
        if (this.gender)
            returnObj.gender = this.gender;
        if (this.date)
            returnObj.date = new Date(this.date);
        return returnObj;
    }
    static update(props) {
        const { id, name, lastName, gender, date } = props;
        let newDate = date;
        if (!id || isNaN(id))
            return ['Id must be a valid number'];
        if (date) {
            newDate = new Date(date);
            if (newDate.toString() === 'Invalid Date')
                return ['Date must be a valid date'];
        }
        return [undefined, new UpdateTodosDto(id, name, lastName, gender, date)];
    }
}
exports.UpdateTodosDto = UpdateTodosDto;
