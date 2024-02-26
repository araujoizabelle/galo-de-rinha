import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import { Cliente } from './cliente.entity';

@Entity()
export class Transacao extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    valor: number;

    @Column({ type: 'varchar' })
    tipo: string;

    @Column({ type: 'varchar' })
    descricao: string;

    @Column({ type: 'timestamptz' })
    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'int' })
    @ManyToOne(() => Cliente, (cliente) => cliente.id)
    clienteId: number;
}
