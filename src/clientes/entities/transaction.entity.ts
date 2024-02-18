import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cliente } from './cliente.entity';

@Entity()
export class Transacao extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    valor: number;

    @Column({ type: 'varchar' })
    tipo: string;

    @Column({ type: 'string' })
    descricao: string;

    @OneToMany(() => Cliente, (cliente) => cliente.id)
    clienteId: number;

}
