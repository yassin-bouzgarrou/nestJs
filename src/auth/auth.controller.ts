import { Body, Controller, Get, ParseIntPipe, Post, Req } from '@nestjs/common';
import { AuthServie } from './auth.service';
import { CreateUserDto } from './dto/auth.dto';


//Controllers are responsible for handling incoming requests and returning responses to the client.
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthServie) {}



  @Post('singup')
  singup(@Body() dto:CreateUserDto){
    return  this.authService.singup(dto)


  }
 @Post("signin")
  signin(@Body() dto :CreateUserDto) {

    
    return this.authService.signin(dto)
  }
}
