import {
  RemoteConfig,
  fetchAndActivate,
  getRemoteConfig,
  getValue
} from "firebase/remote-config";
import {
  createContext,
  useEffect
} from "react";
import { app } from "../util/FirebaseConfig";
import { useAppDispatch } from "../../hooks/storeHooks";
import { clearDictionary } from "../store/slices/dictionarySlice";
import {
  atom,
  useSetAtom
} from "jotai";
import { loadSettings } from "../store/slices/settingsSlice";
import { i18n } from "../store/i18n";

interface ConfigContextProps {
  remoteConfig: RemoteConfig | null;
}

export const ConfigContext = createContext<ConfigContextProps>({
  remoteConfig: null,
});

export const isUnderMaintenanceAtom = atom<boolean>(false);

function ConfigContextProvider({ children }: { children: React.ReactNode }) {
  const remoteConfig = getRemoteConfig(app);

  const dispatch = useAppDispatch();

  const setIsUnderMaintenance = useSetAtom(isUnderMaintenanceAtom);

  if (__DEV__) {
    useEffect(
      () => {
        const unsubscribe = i18n.onChange((event) => {
          console.log("I18n has changed!", event);
        });

        return unsubscribe;
      },
      []
    );
  }

  useEffect(
    () => {
      dispatch(loadSettings());

      remoteConfig.settings.minimumFetchIntervalMillis = 600000; // 600000ms = 10 minutes

      remoteConfig.defaultConfig = {
        last_cache_invalidation_timestamp: 1739391134,
        is_under_maintenance: false,
        maintenance_text: "Uuendame appi, proovige uuesti hiljem!"
      };

      fetchAndActivate(remoteConfig).
        then(() => {
          const lastCacheInvalidationTimestamp = getValue(
            remoteConfig,
            "last_cache_invalidation_timestamp"
          ).asString();

          const cachedLastCacheInvalidationTimestamp = localStorage.getItem("last_cache_invalidation_timestamp");

          if (cachedLastCacheInvalidationTimestamp == null || lastCacheInvalidationTimestamp !== cachedLastCacheInvalidationTimestamp) {
            localStorage.setItem(
              "last_cache_invalidation_timestamp",
              lastCacheInvalidationTimestamp
            );
            dispatch(clearDictionary());

            return;
          }

          setIsUnderMaintenance(getValue(
            remoteConfig,
            "is_under_maintenance"
          ).asBoolean());

          localStorage.setItem(
            "maintenanceText",
            getValue(
              remoteConfig,
              "maintenance_text"
            ).asString()
          );

          dispatch({ type: "dictionary/loadCachedWords" });

        }).catch((error) => {
          console.error(
            "error fetching config",
            error
          );
        });
    },
    []
  );

  const value = {
    remoteConfig,
  }

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
}

export default ConfigContextProvider;
