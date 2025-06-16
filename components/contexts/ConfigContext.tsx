import {
  RemoteConfig,
  fetchAndActivate,
  getRemoteConfig,
  getValue
} from "firebase/remote-config";
import {
  createContext,
  useEffect,
  useMemo,
} from "react";
import { app } from "../util/FirebaseConfig";
import { useAppDispatch, useAppStore } from "../../hooks/storeHooks";
import { clearDictionary } from "../store/slices/dictionarySlice";
import {
  atom,
  useAtom,
  useSetAtom
} from "jotai";
import { loadSettings } from "../store/slices/settingsSlice";
import { i18n } from "../store/i18n";

interface ConfigContextProps {
  remoteConfig: RemoteConfig | null;
  rerender: () => void;
}

export const ConfigContext = createContext<ConfigContextProps>({
  remoteConfig: null,
  rerender: () => { },
});

export const isUnderMaintenanceAtom = atom<boolean>(false);

function ConfigContextProvider({ children }: { children: React.ReactNode }) {
  const [isRendered, setIsRendered] = useAtom<boolean>(useMemo(() => atom<boolean>(true), []));


  const remoteConfig = getRemoteConfig(app);

  useAppStore().dispatch(loadSettings());

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

  function rerender() {
    setIsRendered(false);

    setTimeout(() => {
      setIsRendered(true);
    }, 1);
  }

  const value = {
    remoteConfig,
    rerender
  }

  return (
    <ConfigContext.Provider value={value}>
      {isRendered ? children : null}
    </ConfigContext.Provider>
  );
}

export default ConfigContextProvider;
