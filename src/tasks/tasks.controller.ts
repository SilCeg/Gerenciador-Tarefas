import { Controller, Get, Post, Body, Param, Put, Delete, Query, BadRequestException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

@Post()
create(
  @Body('title') bodyTitle: string,
  @Body('description') bodyDesc?: string,
  @Query('title') queryTitle?: string,
  @Query('description') queryDesc?: string,
): Promise<Task> {
  const title = bodyTitle || queryTitle;
  const description = bodyDesc || queryDesc;

  if (!title) {
    throw new BadRequestException('O campo title é obrigatório.');
  }

  return this.tasksService.create(title, description);
}


  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task | null> {
    return this.tasksService.findOne(id);
  }

@Put(':id')
update(
  @Param('id') id: string,
  @Body() body: Partial<Task>,
  @Query('title') title?: string,
  @Query('description') description?: string,
  @Query('completed') completed?: string
): Promise<Task | null> {
  // Prioriza o que vem no body, mas se não vier, usa o query
  const updateData: Partial<Task> = {
    title: body.title ?? title,
    description: body.description ?? description,
    completed: body.completed ?? (completed === 'true') // trata string → boolean
  };

  return this.tasksService.update(id, updateData);
}
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Task | null> {
    return this.tasksService.delete(id);
  }
}
