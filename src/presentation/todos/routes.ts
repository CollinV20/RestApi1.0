import { Router } from 'express'
import { TodoControllers } from './controllers';

export class TodoRoutes {

    static get routes(): Router {

        const router = Router();
        const todoController = new TodoControllers();

        router.get('/', todoController.getTodos);
        router.get('/:id/', todoController.getTodoById);

        router.post('/', todoController.createTodo);
        router.delete('/:id', todoController.deleteTodo);
        router.put('/:id', todoController.editTodo);

        return router;
    }
}