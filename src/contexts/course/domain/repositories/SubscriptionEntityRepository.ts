import Subscription from '../entities/Subscription';

interface SubscriptionEntityRepository {
  getOne(id: string): Promise<Subscription>;
  getAll(): Promise<Subscription[]>;
  saveOne(subscription: Subscription): Promise<void>;
  updateOne(subscription: Subscription): Promise<void>;
  deleteOne(id: string): Promise<void>;
}

export default SubscriptionEntityRepository;
