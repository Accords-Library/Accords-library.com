import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFetch } from "usehooks-ts";
import { useAtomSetter } from "helpers/atoms";

import {
  LocalDataGetWebsiteInterfacesQuery,
  LocalDataGetCurrenciesQuery,
  LocalDataGetLanguagesQuery,
} from "graphql/generated";
import { LocalDataFile } from "graphql/fetchLocalData";
import { internalAtoms } from "contexts/atoms";
import { processLanguages, processCurrencies, processLangui } from "helpers/localData";
import { getLogger } from "helpers/logger";

const getFileName = (name: LocalDataFile): string => `/local-data/${name}.json`;
const logger = getLogger("💽 [Local Data]");

export const useLocalData = (): void => {
  const setLanguages = useAtomSetter(internalAtoms.localData.languages);
  const setCurrencies = useAtomSetter(internalAtoms.localData.currencies);
  const setLangui = useAtomSetter(internalAtoms.localData.langui);
  const setFallbackLangui = useAtomSetter(internalAtoms.localData.fallbackLangui);

  const { locale } = useRouter();
  const { data: rawLanguages } = useFetch<LocalDataGetLanguagesQuery>(getFileName("languages"));
  const { data: rawCurrencies } = useFetch<LocalDataGetCurrenciesQuery>(getFileName("currencies"));
  const { data: rawLangui } = useFetch<LocalDataGetWebsiteInterfacesQuery>(
    getFileName("websiteInterfaces")
  );

  useEffect(() => {
    logger.log("Refresh languages");
    setLanguages(processLanguages(rawLanguages));
  }, [rawLanguages, setLanguages]);

  useEffect(() => {
    logger.log("Refresh currencies");
    setCurrencies(processCurrencies(rawCurrencies));
  }, [rawCurrencies, setCurrencies]);

  useEffect(() => {
    logger.log("Refresh langui");
    setLangui(processLangui(rawLangui, locale));
  }, [locale, rawLangui, setLangui]);

  useEffect(() => {
    logger.log("Refresh fallback langui");
    setFallbackLangui(processLangui(rawLangui, "en"));
  }, [rawLangui, setFallbackLangui]);
};
