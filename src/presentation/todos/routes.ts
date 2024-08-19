import { Router } from 'express'
import { TodoControllers } from './controllers';
import { TodoDataSourceImpl } from '../../infrastructure/datasource/todo.datasource.impl.';
import { TodoRepositoryImpl } from '../../infrastructure/repositories/todo.repository.impl';

export class TodoRoutes {

    static get routes(): Router {

        const router = Router();

        const datasource = new TodoDataSourceImpl();

        const todoRepository = new TodoRepositoryImpl(datasource);
        const todoController = new TodoControllers(todoRepository);

        router.get('/', todoController.getTodos);
        router.get('/:id/', todoController.getTodoById);

        router.post('/', todoController.createTodo);
        router.delete('/:id', todoController.deleteTodo);
        router.put('/:id', todoController.editTodo);

        return router;
    }
}