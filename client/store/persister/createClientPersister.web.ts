import {
  LocalPersister,
  createLocalPersister,
} from "tinybase/persisters/persister-browser/with-schemas";
import { MergeableStore, OptionalSchemas } from "tinybase/with-schemas";

export const createClientPersister = <Schema extends OptionalSchemas>(
  storeId: string,
  store: MergeableStore<Schema>
): LocalPersister<Schema> => createLocalPersister(store, storeId);
