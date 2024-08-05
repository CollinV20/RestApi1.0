"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRoutes = void 0;
const express_1 = require("express");
const controllers_1 = require("./controllers");
class TodoRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const todoController = new controllers_1.TodoControllers();
        router.get('/', todoController.getTodos);
        router.get('/:id/', todoController.getTodoById);
        router.delete('/:id', todoController.deleteTodo);
        router.post('/', todoController.createTodo);
        router.put('/:id', todoController.editTodo);
        return router;
    }
}
exports.TodoRoutes = TodoRoutes;
