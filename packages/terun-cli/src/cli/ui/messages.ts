import { EMOJIS } from './emojis';

export const MESSAGES = {
    WELCOME_MESSAGE: `Thanks for believing in this project! We working hard to improve the experience ${EMOJIS.HEART}`,
    CONFIG_FILE_CREATED: 'Config created with success!',
    OPERATION_CANCELED: 'Operation canceled',
    CONFIG_NOT_FOUND: 'Config file terun.js not found',
    COMMAND_NOT_FOUND: (commandName: string): string => `Command [${commandName}] not found on config`,
    FILE_SKYPED: 'Relax, file skyped',
    DONE_TRANSPORT_SUCCESS: 'File transported with success!',
};
