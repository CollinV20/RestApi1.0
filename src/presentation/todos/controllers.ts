
import { Request, Response } from 'express';
import { prisma } from '../../data/postgres/index'
import { CreateTodoDto, UpdateTodosDto } from '../../domain/dtos/index'



interface newUser {
    id: number | any,
    name: string,
    lastName: string,
    gender: string,
    date: Date
}


export class TodoControllers {

    constructor() {

    }

    public getTodos = async (req: Request, res: Response) => {

        const todosPrisma = await prisma.todo.findMany()
        try {
            return res.json(todosPrisma)
        } catch (error) {
            res.status(404)
        }

    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "ID argument is not a number" });

        const todo = await prisma.todo.findUnique({ where: { id } })

        try {
            (todo) ?
                res.json(todo)
                : res.status(404).json({ error: "El TODO no existe" })
        } catch (error) {
            console.log(error)
        }
    }



    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) return res.status(400).json({ error });

        const todo = await prisma.todo.create({
            data: createTodoDto!
        })

        res.json(todo)
    }


    public deleteTodo = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        let todo = await prisma.todo.delete({ where: { id } })

        try {
            if (!todo) return res.status(404).json({ error: `User with ID ${todo} not found` });
            else {
                res.json(await this.getTodos(req, res))
            }
        } catch (error) {
            res.status(404).json({ error: `User with ID ${todo} not found` });
            console.log(error);
        }
    }


    public editTodo = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const [error, updateTodosDto] = UpdateTodosDto.update({...req.body, id})

        if (error) return res.status(404).json({ error: error })

        const user = await prisma.todo.findUnique({
            where: { id }
        })

        if (!user) return res.status(404).json({ error: `User with ID ${id} not found` })
        else {
            await prisma.todo.update({
                where: { id },
                data: updateTodosDto!.values
            })
            res.json(user)
        }
    }
}