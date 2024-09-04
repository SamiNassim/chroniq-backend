import { PartialType } from '@nestjs/mapped-types';
import { StoryRequest } from './create-story.dto';

export class UpdateStoryRequest extends PartialType(StoryRequest) {}
