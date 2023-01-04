import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { Blog } from '../entities/blog.entity';
import { BaseController } from '../interfaces/base-controller.interface';
import { BlogService } from './blog.service';
import { BlogDto } from './dto/blog.dto';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import { equal } from 'assert';

const storage = { 
    storage: diskStorage({
        destination: './images',
        filename: (req: any, file: any, cb: any) => {
            // Calling the callback passing the random name generated with the original extension name
            cb(null, `${uuid()}${extname(file.originalname)}`);
        },
 })}

@Controller('blogs')
export class BlogController{
    /**
     *
     */
    constructor(private blogService: BlogService){}

    @Get(':id')
    getById(@Param('id') id: number): Promise<Blog> {
        return this.blogService.getById(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('image',storage
    ))
     async create(@Body() blog: BlogDto,
            @UploadedFile() image: Express.Multer.File,
            @Req() req)  {  
        
                if (req.fileValidationError) {
                    throw new BadRequestException(req.fileValidationError);
                };
                const imagePath = req.protocol + '://' + req.get('host') + '/' + image.path;
                if(imagePath) {
                    blog.photo = imagePath;
                }

          return await this.blogService.create(blog);
    }

    @Get()
    getAll() {
        return this.blogService.getAll();
    }


    @Put(':id')
    @UseInterceptors(FileInterceptor('image', storage))
    update(@Param('id') id: number,
           @Body() data: BlogDto,
           @UploadedFile() image: Express.Multer.File,
           @Req() req) {

            if (req.fileValidationError) {
                throw new BadRequestException(req.fileValidationError);
            };
            const imagePath = req.protocol + '://' + req.get('host') + '/' + image.path;
            
            data.photo = imagePath;

        return this.blogService.update(id, data);    
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.blogService.delete(id);
    }
    
}
