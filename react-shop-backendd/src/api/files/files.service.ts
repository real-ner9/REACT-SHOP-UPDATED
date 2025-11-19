import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import LocalFile from './entities/local-file.entity';
import * as fs from 'fs';
import { join } from 'path';
import { DeleteResult } from 'typeorm/browser';
import {
  CreateLocalFileDto,
  UpdateLocalFileDto,
} from './dto/local-file.dto';
import type { Express } from 'express';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(LocalFile)
    private readonly repository: Repository<LocalFile>,
  ) {}

  async findOne(id: number): Promise<LocalFile> {
    return this.repository.findOneByOrFail({ id });
  }

  async create(fileData: CreateLocalFileDto | Express.Multer.File): Promise<LocalFile> {
    let dto: CreateLocalFileDto;

    if ('filename' in fileData && typeof fileData.filename === 'string') {
      // Это Express.Multer.File
      dto = {
        filename: fileData.filename,
        path: fileData.path,
        mimetype: fileData.mimetype,
      };
    } else {
      // Это уже CreateLocalFileDto
      dto = fileData as CreateLocalFileDto;
    }

    const newFile = await this.repository.create(dto);

    return this.repository.save(newFile);
  }

  update(id: number, params: UpdateLocalFileDto): Promise<UpdateResult> {
    return this.repository.update({ id }, { ...params });
  }

  async remove(id: number): Promise<DeleteResult> {
    const file = await this.findOne(id);

    await fs.unlink(join(process.cwd(), file.path), (err) => {
      if (err) {
        console.error(err);
        return err;
      }
    });

    return this.repository.delete({ id });
  }
}
