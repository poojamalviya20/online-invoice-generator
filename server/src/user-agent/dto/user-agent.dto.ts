import { IsNotEmpty, MinLength } from 'class-validator';
import { UUID } from 'crypto';

export class UserAgentDto {
   readonly uuid : UUID;
   readonly ip : string;
   readonly user_agent: string;
}
