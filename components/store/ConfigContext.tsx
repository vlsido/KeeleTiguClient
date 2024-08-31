import { RemoteConfig, fetchAndActivate, getRemoteConfig, getValue } from "firebase/remote-config";
import { createContext, useEffect } from "react";
import { app } from "../util/FirebaseConfig";
import { allWords, myDictionary, cachedWordsAndData } from "../util/WordsUtil";
import { i18n } from "./i18n";
import ee from "@/components/store/translations/ee.json"
import { useSignal } from "@preact/signals-react";

interface ConfigContextProps {
  remoteConfig: RemoteConfig | null;
  isUnderMaintenance: boolean;
}

export const ConfigContext = createContext<ConfigContextProps>({
  remoteConfig: null,
  isUnderMaintenance: false
});


function ConfigContextProvider({ children }: { children: React.ReactNode }) {
  const remoteConfig = getRemoteConfig(app);

  const isUnderMaintenance = useSignal<boolean>(false);

  remoteConfig.settings.minimumFetchIntervalMillis = 600000; // 600000ms = 10 minutes

  remoteConfig.defaultConfig = { current_build_version: "1.0.0", is_under_maintenance: false, maintenance_text: "Uuendame appi, proovige uuesti hiljem!" };

  useEffect(() => {
    fetchAndActivate(remoteConfig)
      .then(() => {

        const currentBuildVersion = getValue(remoteConfig, "current_build_version").asString();

        const cachedBuildVersion = localStorage.getItem("current_build_version");

        if (cachedBuildVersion == null || currentBuildVersion !== cachedBuildVersion) {
          localStorage.setItem("current_build_version", currentBuildVersion);
          removeCache().then(() => {
            loadTranslations("ee");
          });

          return;
        }

        isUnderMaintenance.value = getValue(remoteConfig, "is_under_maintenance").asBoolean();

        localStorage.setItem("maintenanceText", getValue(remoteConfig, "maintenance_text").asString());

        getDictionaryHistory();
        loadTranslations("ee");
      }).catch((error) => {
        console.log("error fetching config", error);
        removeCache().then(() => {
          loadTranslations("ee");
        });
      });

  }, []);

  async function removeCache() {
    console.log("Removing cache...");
    localStorage.removeItem("allWords");
    localStorage.removeItem("cachedWordsAndData");
    allWords.value = [];
    myDictionary.value = [];
    cachedWordsAndData.value = [];
  }


  function getDictionaryHistory() {
    if (localStorage.getItem("cachedWordsAndData") != null) {
      cachedWordsAndData.value = JSON.parse(localStorage.getItem("cachedWordsAndData") as string);
      return;
    }
  }

  useEffect(() => {
    const unsubscribe = i18n.onChange(() => {
      console.log("I18n has changed!");
    });

    return unsubscribe;
  }, []);

  async function loadTranslations(locale: string) {
    i18n.defaultLocale = locale;
    i18n.locale = locale;

    i18n.store(ee);
  }

  const value = {
    remoteConfig,
    isUnderMaintenance: isUnderMaintenance.value
  }

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
}

export default ConfigContextProvider;
