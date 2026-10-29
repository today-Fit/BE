import {
    // ArgumentsHost,
    Catch,
    ConflictException,
    ExceptionFilter,
    NotFoundException
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(
        exception:Prisma.PrismaClientKnownRequestError,
        // host:ArgumentsHost
    ):never {
        // const context = host.switchToHttp();

        switch(exception.code) {
            case 'P2025':
                throw new NotFoundException('해당 데이터를 찾을 수 없습니다.');
            case 'P2002':
                // const meta = exception.meta as ExceptionMeta | undefined;

                throw new ConflictException("중복된 데이터가 있습니다.");
            default:
                throw exception;
        }
    }
}

// interface ExceptionMeta {
//     readonly modelName?: string;
//     readonly driverAdapterError?: DriverAdapterError;
// }

// interface DriverAdapterError {
//     readonly name: string;
//     readonly cause?: DriverAdapterErrorCause;
// }

// interface DriverAdapterErrorCause {
//     readonly originalCode: string;
//     readonly originalMessage: string;
//     readonly kind: string;
//     readonly constraint: DriverAdapterErrorConstraint;
// }

// interface DriverAdapterErrorConstraint {
//     readonly index: string;
// }
