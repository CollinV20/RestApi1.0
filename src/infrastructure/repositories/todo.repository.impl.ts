import { CreateTodoDto, TodoDataSource, TodoEntity, TodoRepository, UpdateTodosDto } from "../../domain";

export class TodoRepositoryImpl implements TodoRepository {

    constructor(
        private readonly datasource: TodoDataSource,
    ) { }


    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datasource.create(createTodoDto);
    }
    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll();
    }
    findById(id: number): Promise<TodoEntity> {
        return this.datasource.findById(id);

    }
    update(updateTodoDto: UpdateTodosDto): Promise<TodoEntity> {
        return this.datasource.update(updateTodoDto);

    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.datasource.deleteById(id);
    }

}