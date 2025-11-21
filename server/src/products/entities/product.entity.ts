import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  price: string;
  
  // FIXME: Implement 'simple-array'
  @Column({ type: 'varchar' })
  images: string[];

  @Column({ type: 'varchar' })
  category: string;
  
  @Column({ type: 'boolean', default: false })
  isDelete?: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
