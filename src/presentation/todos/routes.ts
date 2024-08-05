import { Router } from 'express'
import { TodoControllers } from './controllers';

export class TodoRoutes {

    static get routes(): Router {

        const router = Router();
        const todoController = new TodoControllers();

        router.get('/', todoController.getTodos);
        router.get('/:id/', todoController.getTodoById);
        router.delete('/:id', todoController.deleteTodo);
        router.post('/', todoController.createTodo);
        router.put('/:id', todoController.editTodo);

        return router;
    }
}