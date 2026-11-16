import { Pool } from "pg";

import { env, hasPostgresConfig } from "@/lib/config/env";

declare global {
  var __agri-monitorPostgresPool__: Pool | null | undefined;
}

export const getPostgresPool = () => {
  if (!hasPostgresConfig) {
    return null;
  }

  if (!globalThis.__agri-monitorPostgresPool__) {
    globalThis.__agri-monitorPostgresPool__ = new Pool({
      host: env.postgres.host,
      port: env.postgres.port,
      user: env.postgres.user,
      password: env.postgres.password,
      database: env.postgres.database,
      max: Math.max(1, env.postgres.poolMax)
    });
  }

  return globalThis.__agri-monitorPostgresPool__;
};

/** Throws if PostgreSQL is not configured. The app does not use in-memory mock data. */
export const requirePostgresPool = (): Pool => {
  if (!hasPostgresConfig) {
    throw new Error(
      "PostgreSQL is required. Set POSTGRES_HOST, POSTGRES_USER, POSTGRES_DATABASE (and password if needed)."
    );
  }
  const pool = getPostgresPool();
  if (!pool) {
    throw new Error("PostgreSQL pool could not be created.");
  }
  return pool;
};

export const queryRows = async <TRow>(
  text: string,
  values: Array<string | number | boolean | null> = []
) => {
  const pool = requirePostgresPool();
  const result = await pool.query(text, values);

  return result.rows as TRow[];
};

export const isPostgresHealthy = async () => {
  const pool = getPostgresPool();

  if (!pool) {
    return false;
  }

  try {
    await pool.query("SELECT 1");
    return true;
  } catch {
    return false;
  }
};
