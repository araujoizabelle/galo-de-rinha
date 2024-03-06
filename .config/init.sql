CREATE DATABASE crebito;

-- --- TABLES
-- CREATE TABLE cliente (
--     id SERIAL PRIMARY KEY,
--     limite INTEGER NOT NULL,
--     saldo INTEGER NOT NULL
-- );

-- CREATE TABLE transacao (
--     id SERIAL PRIMARY KEY,
--     clienteId INTEGER NOT NULL,
--     valor INTEGER NOT NULL,
--     tipo CHAR(1) NOT NULL,
--     descricao VARCHAR(10) NOT NULL,
--     created_at TIMESTAMP NOT NULL DEFAULT NOW(),
--     CONSTRAINT fk_cliente_transacao_id FOREIGN KEY (clienteId) REFERENCES cliente(id)
-- );

-- -- INDEX
-- CREATE INDEX idx_cliente_id ON cliente (id);
-- CREATE INDEX idx_transacao_cliente_id ON transacao (clienteId);
-- CREATE INDEX idx_transacao_cliente_id_created_at ON transacao (clienteId, created_at DESC);

-- -- SEED
-- INSERT INTO cliente (limite, saldo)
-- VALUES
--     (400000, 100000),
--     (80000, 1000);