
import { Request, Response } from 'express';
import { prisma } from '../../data/postgres/index'
import { CreateTodoDto, UpdateTodosDto } from '../../domain/dtos/index'
import { TodoRepository } from '../../domain';

export class TodoControllers {

    constructor(
        private readonly todoRepository: TodoRepository,
    ) { }

    public getTodos = async (req: Request, res: Response) => {

        const todos = await this.todoRepository.getAll();

        return res.json(todos)

    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        try {
            const todo = await this.todoRepository.findById(id);
            return res.json(todo);
        } catch (error) {
            res.json(error)
        }
    }



    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) return res.status(400).json({ error });

        const todo = await this.todoRepository.create(createTodoDto!);
    }


    public deleteTodo = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        try {
            const todo = await this.todoRepository.deleteById(id)

        } catch (error) {
            res.status(404).json({ error: `User with ID ${id} not found` });
            console.log(error);
        }
    }


    public editTodo = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const [error, updateTodosDto] = UpdateTodosDto.update({ ...req.body, id })

        if (error) return res.status(404).json({ error: error })

        try {
            const user = await this.todoRepository.update(updateTodosDto!);
            res.json(user)
        } catch (error) {
            res.json(error)
        }
    }
}