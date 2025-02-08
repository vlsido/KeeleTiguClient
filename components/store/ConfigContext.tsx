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

      remoteConfig.defaultConfig = { current_build_version: "1.0.0", is_under_maintenance: false, maintenance_text: "Uuendame appi, proovige uuesti hiljem!" };

      fetchAndActivate(remoteConfig).
        then(() => {

          const currentBuildVersion = getValue(
            remoteConfig,
            "current_build_version"
          ).asString();

          const cachedBuildVersion = localStorage.getItem("current_build_version");

          if (cachedBuildVersion == null || currentBuildVersion !== cachedBuildVersion) {
            localStorage.setItem(
              "current_build_version",
              currentBuildVersion
            );
            removeCache().then(() => {
              loadTranslations("ee");
            });

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
          removeCache().then(() => {
            loadTranslations("ee");
          });
        });

    },
    []
  );

  async function removeCache() {
    localStorage.removeItem("allWords");
    localStorage.removeItem("wordsAndExamData");
    dispatch(clearDictionary());
  }

  async function loadTranslations(locale: string) {
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
