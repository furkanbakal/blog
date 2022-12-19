import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Blog } from '../entities/blog.entity';
import { BaseController } from '../interfaces/base-controller.interface';
import { BlogService } from './blog.service';
import { BlogDto } from './dto/blog.dto';

@Controller('blogs')
export class BlogController implements BaseController<Blog> {
    /**
     *
     */
    constructor(private blogService: BlogService){}

    @Get(':id')
    getById(@Param('id') id: number): Promise<Blog> {
        return this.blogService.getById(id);
    }

    @Post()
     create(@Body() blog: BlogDto)  {  
        return  this.blogService.create(blog);
    }

    @Get()
    getAll() {
        return this.blogService.getAll();
    }


    @Put(':id')
    update(@Param('id') id: number,
           @Body() data: BlogDto) {
        return this.blogService.update(id, data);    
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.blogService.delete(id);
    }
    
}
