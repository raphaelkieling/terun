import { CodeError } from './CoreError';

export class NotFoundFileError extends CodeError {
    static code = 'NOT_FOUND_FILE_ERROR';

    constructor(filename: string) {
        super(NotFoundFileError.code, `Filename ${filename} not founded`);
    }
}
