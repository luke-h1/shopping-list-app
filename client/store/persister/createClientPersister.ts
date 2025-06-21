import * as SQLite from "expo-sqlite";
import {
  createExpoSqlitePersister,
  ExpoSqlitePersister,
} from "tinybase/persisters/persister-expo-sqlite/with-schemas";
import { MergeableStore, OptionalSchemas } from "tinybase/with-schemas";

export const createClientPersister = <Schema extends OptionalSchemas>(
  storeId: string,
  store: MergeableStore<Schema>
): ExpoSqlitePersister<Schema> =>
  createExpoSqlitePersister(store, SQLite.openDatabaseSync(storeId + ".db"));
