import { CreateTodoDto, UpdateTodosDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";


export abstract class TodoRepository {

    abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;

    //todo: luego se recibira una paginacion 
    abstract getAll(): Promise<TodoEntity[]>

    abstract findById(id: number): Promise<TodoEntity>;
    abstract update(updateTodoDto: UpdateTodosDto): Promise<TodoEntity>;
    abstract deleteById(id: number): Promise<TodoEntity>

}