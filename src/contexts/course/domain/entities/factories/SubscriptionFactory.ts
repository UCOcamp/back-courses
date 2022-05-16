import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import EntityFactory from '../../../../shared/domain/EntityFactory';
import Subscription from '../Subscription';

@Injectable()
class SubscriptionFactory implements EntityFactory<Subscription> {
  create(userID: string, courseID: string, expirationDate: Date): Subscription {
    return new Subscription(
      uuid(),
      userID,
      courseID,
      new Date(),
      expirationDate
    );
  }
}

export default SubscriptionFactory;
