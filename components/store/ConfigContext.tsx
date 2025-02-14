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
import { i18n } from "./i18n";
import ee from "../../components/store/translations/ee.json"
import { useAppDispatch } from "../../hooks/storeHooks";
import { clearDictionary } from "./slices/dictionarySlice";
import {
  atom,
  useSetAtom
} from "jotai";

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

  // if (__DEV__) {
  //   useEffect(
  //     () => {
  //       const unsubscribe = i18n.onChange(() => {
  //         console.log("I18n has changed!");
  //       });
  //
  //       return unsubscribe;
  //     },
  //     []
  //   );
  // }

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
            removeCache();
            loadTranslations("ee");

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

          loadTranslations("ee");
        }).catch((error) => {
          console.error(
            "error fetching config",
            error
          );
          loadTranslations("ee");
        });

    },
    []
  );

  function removeCache() {
    localStorage.removeItem("myDictionary");
    localStorage.removeItem("allWords");
    localStorage.removeItem("wordsAndExamData");
    dispatch(clearDictionary());
  }

  function loadTranslations(locale: string) {
    i18n.defaultLocale = locale;
    i18n.locale = locale;

    i18n.store(ee);
  }

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
