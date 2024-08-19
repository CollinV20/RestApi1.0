
import { Request, Response } from 'express';
import { prisma } from '../../data/postgres/index'
import { CreateTodoDto, UpdateTodosDto } from '../../domain/dtos/index'
import { CreateTodo, DeleteTodos, GetTodo, GetTodos, TodoRepository, UpdateTodo } from '../../domain';
import { error } from 'console';

export class TodoControllers {

    constructor(
        private readonly todoRepository: TodoRepository,
    ) { }

    public getTodos = (req: Request, res: Response) => {
        new GetTodos(this.todoRepository)
            .execute()
            .then(todos => res.json(todos))
            .catch(error => res.status(400).json(error))

    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;
        new GetTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(404).json(error))
    }


    public createTodo = (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) return res.status(400).json({ error });

        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then(todo => res.json(`${todo} \n was creted`))
            .catch(error => res.json(error))
    }


    public deleteTodo = (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        new DeleteTodos(this.todoRepository)
            .execute(id)
            .then(todo => res.json(`${todo} was removed`))
            .catch(error => res.json(error))
    }


    public editTodo = (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const [error, updateTodosDto] = UpdateTodosDto.update({ ...req.body, id })

        if (error) return res.status(404).json({ error: error })

        new UpdateTodo(this.todoRepository)
            .execute(updateTodosDto!)
            .then(todo => res.json(todo))
            .catch(error => res.json(error))
    }
}