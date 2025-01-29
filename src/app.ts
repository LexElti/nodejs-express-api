import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { json } from 'body-parser';
import { UsersController } from './users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';

@injectable()
export class App {
  app: Express;
  port: number;
  server: Server;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UsersController) private usersController: UsersController,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter,
  ) {
    this.app = express();
    this.port = 8000;
  }

  useMiddleware(): void {
    this.app.use(json());
  }

  useRoutes(): void {
    this.app.use('/users', this.usersController.router);
  }

  useExceptionFilters(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilters();

    this.server = this.app.listen(this.port, () => {
      this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
    });
  }
}
