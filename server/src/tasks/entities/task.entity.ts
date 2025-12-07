import { Order } from '../../order/entities/order.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.tasks, { onDelete: 'CASCADE' })
  order: Order;

  @Column({ type: 'varchar' })
  title: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending',
  })
  status: string;

  @Column({ default: 0 })
  progress: number;

  @ManyToOne(() => User, { eager: true })
  assignedTo: User;

  @Column({ type: 'timestamp', nullable: true })
  startedAt: Date;
  
  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
