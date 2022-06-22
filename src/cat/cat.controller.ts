import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Param,
    Post,
    Put,
    UseFilters,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { CatService } from './cat.service';
import { CreateCatDto } from './create-cat.dto';


@Controller('cats')
@UsePipes(
    new ValidationPipe({
        whitelist: true,
        transform: true,
    }),
)
export class CatController {
    constructor(private readonly catService: CatService) { }

    @ApiTags('cat')
    @Post('')
    @ApiOperation({
        description: 'create new Cat'
    })
    @UsePipes(ValidationPipe)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'OK' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiInternalServerErrorResponse({ description: 'data has been created successfully' })
    async createCat(@Body() cat: CreateCatDto) {
        return this.catService.create(cat);
    }

    @ApiTags('cat')
    @Get('')
    @ApiOperation({
        description: 'Get All Cat'
    })
    @UsePipes(ValidationPipe)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'OK' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiInternalServerErrorResponse({ description: 'data has been fetched successfully' })
    async listAll() {
        return this.catService.findAll();
    }
}