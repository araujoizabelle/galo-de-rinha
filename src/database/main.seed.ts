// main.seed.ts
import { DataSource } from 'typeorm';
import { dataSourceOptions } from './dataSource';
import { Cliente } from '../cliente/entities/cliente.entity';

const dataSource = new DataSource(dataSourceOptions);
const clienteRepository = dataSource.getRepository(Cliente);

async function connect() {
  try {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
    await dataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (err) {
    console.error('Error during Data Source connect', err);
  }
}

async function disconnect() {
  try {
    await dataSource.destroy();

    console.log('Data Source disconnected!');
  } catch (err) {
    console.error('Error during Data Source disconnect', err);
  }
}

async function seed() {
  const ClienteSeed = () => [
    {
      limite: 100000,
      saldo: 0,
    },
    {
      limite: 80000,
      saldo: 0,
    },
    {
      limite: 1000000,
      saldo: 0,
    },
    {
      limite: 10000000,
      saldo: 0,
    },
    {
      limite: 500000,
      saldo: 0,
    },
  ];

  await clienteRepository.save(ClienteSeed());
  console.log('created seeds');
}

async function runSeed() {
  await connect();
  console.log('connected');
  await seed();
  console.log('seed done');
  await disconnect();
  console.log('disconnected');
}

runSeed();
