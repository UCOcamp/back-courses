import ContentBlock from '../entities/ContentBlock';

interface ContentBlockEntityRepository {
  getOne(id: string): Promise<ContentBlock>;
  getAll(): Promise<ContentBlock[]>;
  saveOne(contentBlock: ContentBlock): Promise<void>;
  updateOne(contentBlock: ContentBlock): Promise<void>;
  deleteOne(id: string): Promise<void>;
}

export default ContentBlockEntityRepository;
