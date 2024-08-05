"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoControllers = void 0;
const index_1 = require("../../data/postgres/index");
const index_2 = require("../../domain/dtos/index");
class TodoControllers {
    constructor() {
        this.getTodos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const todosPrisma = yield index_1.prisma.todo.findMany();
            try {
                return res.json(todosPrisma);
            }
            catch (error) {
                res.status(404);
            }
        });
        this.getTodoById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            if (isNaN(id))
                return res.status(400).json({ error: "ID argument is not a number" });
            const todo = yield index_1.prisma.todo.findUnique({ where: { id } });
            try {
                (todo) ?
                    res.json(todo)
                    : res.status(404).json({ error: "El TODO no existe" });
            }
            catch (error) {
                console.log(error);
            }
        });
        this.createTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, createTodoDto] = index_2.CreateTodoDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            const todo = yield index_1.prisma.todo.create({
                data: createTodoDto
            });
            res.json(todo);
        });
        this.deleteTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            let todo = yield index_1.prisma.todo.delete({ where: { id } });
            try {
                if (!todo)
                    return res.status(404).json({ error: `User with ID ${todo} not found` });
                else {
                    res.json(yield this.getTodos(req, res));
                }
            }
            catch (error) {
                res.status(404).json({ error: `User with ID ${todo} not found` });
                console.log(error);
            }
        });
        this.editTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const [error, updateTodosDto] = index_2.UpdateTodosDto.update(Object.assign(Object.assign({}, req.body), { id }));
            if (error)
                return res.status(404).json({ error: error });
            const user = yield index_1.prisma.todo.findUnique({
                where: { id }
            });
            if (!user)
                return res.status(404).json({ error: `User with ID ${id} not found` });
            else {
                yield index_1.prisma.todo.update({
                    where: { id },
                    data: updateTodosDto.values
                });
                res.json(user);
            }
        });
    }
}
exports.TodoControllers = TodoControllers;
