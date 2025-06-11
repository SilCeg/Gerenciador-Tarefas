import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

async create(title: string, description?: string): Promise<Task> {
  const createdTask = new this.taskModel({ title, description });
  return createdTask.save();
}
  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task | null> {
    return this.taskModel.findById(id).exec();
  }

  async update(id: string, updateData: Partial<Task>): Promise<Task | null> {
    return this.taskModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<Task | null> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }
} 
