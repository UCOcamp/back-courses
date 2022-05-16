import { Prop, Schema } from '@nestjs/mongoose';
import IdentifiableEntitySchema from '../../../../../shared/data/IdentifiableEntitySchema';
import { ContentBlockAsJSON } from '../../../../domain/entities/ContentBlock';
import { SubscriptionAsJSON } from '../../../../domain/entities/Subscription';

@Schema({
  versionKey: false,
  timestamps: false,
  id: false,
  collection: 'courses',
})
class CourseSchema extends IdentifiableEntitySchema {
  @Prop({
    required: true,
  })
  readonly title!: string;

  @Prop({
    required: true,
  })
  readonly description!: string;

  @Prop({
    required: true,
  })
  readonly thumbnailUrl!: string;

  @Prop({
    required: true,
  })
  readonly authorID!: string;

  @Prop({
    required: true,
  })
  readonly createdAt!: Date;

  @Prop({
    required: true,
  })
  readonly duration!: number;

  @Prop({
    required: true,
  })
  readonly contentBlocks!: ContentBlockAsJSON[];

  @Prop({
    required: true,
  })
  readonly subscriptions!: SubscriptionAsJSON[];
}

export default CourseSchema;
