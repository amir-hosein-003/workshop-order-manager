import { Product } from 'src/products/entities/product.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column()
  price: string;

  @Column()
  quantity: number;

  @Column({
    type: 'enum',
    enum: ['pending', 'in_progress', 'completed', 'canceled'],
    default: 'pending',
  })
  status: string;

  @Column({ nullable: true })
  customerName: string;

  @Column({ nullable: true })
  dueDate: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'enum', enum: ['low', 'normal', 'high'], default: 'normal' })
  priority: string;

  @Column({ default: 0 })
  progress: number;

  @ManyToOne(() => User, { eager: true })
  createdBy: User;

  @OneToMany(() => Task, (task) => task.order)
  tasks: Task[];

  @Column({ type: 'boolean', default: false })
  isDelete: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
