import {
  ExceptionFilter,
  HttpException,
  HttpStatus,
  ArgumentsHost,
  Catch,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const handleErrors = (err: string) => {
      if(exception.message.includes('Cannot GET')){
        return "Endpoint não encontrado"
      }

      return {
        Unauthorized: 'Token inválido',
        InvalidCredentials: "Usuário ou senha inválidos"
      }[err];
    };

    const errorResponse = {
      code: status,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message:
        status !== HttpStatus.INTERNAL_SERVER_ERROR
          ? handleErrors(exception.message) || null
          : 'Internal server error',
    };

    Logger.error(
      `${request.method} ${request.url}`,
      exception.stack,
      'HttpExceptionFilter',
    );

    response.status(status).json(errorResponse);
  }
}
