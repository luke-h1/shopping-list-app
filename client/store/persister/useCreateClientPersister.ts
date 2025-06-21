import * as UIReact from "tinybase/ui-react/with-schemas";
import { OptionalSchemas, MergeableStore } from "tinybase/with-schemas";
import { createClientPersister } from "./createClientPersister";

export const useCreateClientPersister = <Schemas extends OptionalSchemas>(
  storeId: string,
  store: MergeableStore<Schemas>,
  initialContentJson?: string,
  then?: () => void
) =>
  (UIReact as UIReact.WithSchemas<Schemas>).useCreatePersister(
    store as MergeableStore<Schemas>,
    async (store): Promise<any> =>
      createClientPersister(storeId, store as MergeableStore<Schemas>),
    [storeId],
    async (persister) => {
      let initialContent = undefined;
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        initialContent = JSON.parse(initialContentJson ?? "");
      } catch (error) {
        console.error(error);
      }

      await persister.load();
      await persister.startAutoSave();
      then?.();
    },
    [initialContentJson]
  );
