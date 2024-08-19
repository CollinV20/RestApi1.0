import { UpdateTodosDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface UpdateTodoUseCase {
    execute(dto: UpdateTodosDto): Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase {


    constructor(
        private readonly repository: TodoRepository
    ) { }

    execute(dto: UpdateTodosDto): Promise<TodoEntity> {
        return this.repository.update(dto)
    }

}