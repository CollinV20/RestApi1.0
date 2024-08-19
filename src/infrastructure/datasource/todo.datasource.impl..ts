import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodosDto } from "../../domain";


export class TodoDataSourceImpl implements TodoDataSource {

    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {

        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        return TodoEntity.fromJSON(todo)
    }


    async getAll(): Promise<TodoEntity[]> {
        const todo = await prisma.todo.findMany();

        return todo.map(todo => TodoEntity.fromJSON(todo))
    }


    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({ where: { id } });

        if (!todo) throw `Todo with ${id} is not found`;
        return TodoEntity.fromJSON(todo);
    }


    async update(updateTodoDto: UpdateTodosDto): Promise<TodoEntity> {
        const todo = await this.findById(updateTodoDto.id);

        const update = await prisma.todo.update({
            where: { id: updateTodoDto.id },
            data: updateTodoDto!.values
        })

        return TodoEntity.fromJSON(update)
    }


    async deleteById(id: number): Promise<TodoEntity> {
        await this.findById(id);

        const deleteTodo = await prisma.todo.delete({ where: { id } });
        return TodoEntity.fromJSON(deleteTodo)
    }

}