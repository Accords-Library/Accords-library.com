import Chip from "components/Chip";
import Img, { getAssetURL, ImageQuality } from "components/Img";
import LanguageSwitcher from "components/LanguageSwitcher";
import RecorderChip from "components/RecorderChip";
import ToolTip from "components/ToolTip";
import { useAppLayout } from "contexts/AppLayoutContext";
import {
  GetLibraryItemScansQuery,
  UploadImageFragment,
} from "graphql/generated";
import { useRouter } from "next/router";
import { AppStaticProps } from "queries/getAppStaticProps";
import { getPreferredLanguage, getStatusDescription } from "queries/helpers";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

interface Props {
  setLightboxOpen: Dispatch<SetStateAction<boolean>>;
  setLightboxImages: Dispatch<SetStateAction<string[]>>;
  setLightboxIndex: Dispatch<SetStateAction<number>>;
  images: Exclude<
    Exclude<
      Exclude<
        GetLibraryItemScansQuery["libraryItems"],
        null | undefined
      >["data"][number]["attributes"],
      null | undefined
    >["images"],
    null | undefined
  >;
  languages: AppStaticProps["languages"];
  langui: AppStaticProps["langui"];
}

export default function ScanSetCover(props: Props): JSX.Element {
  const {
    setLightboxOpen,
    setLightboxImages,
    setLightboxIndex,
    images,
    languages,
    langui,
  } = props;
  const appLayout = useAppLayout();
  const router = useRouter();

  const [selectedScan, setSelectedScan] = useState<Props["images"][number]>();
  const scanLocales: Map<string, number> = new Map();

  const [selectedScanIndex, setSelectedScanIndex] = useState<
    number | undefined
  >();

  images.map((scan, index) => {
    if (scan?.language?.data?.attributes?.code) {
      scanLocales.set(scan.language.data.attributes.code, index);
    }
  });

  useMemo(() => {
    setSelectedScanIndex(
      getPreferredLanguage(
        appLayout.preferredLanguages ?? [router.locale],
        scanLocales
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appLayout.preferredLanguages]);

  useEffect(() => {
    if (selectedScanIndex !== undefined)
      setSelectedScan(images[selectedScanIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedScanIndex]);

  const coverImages: UploadImageFragment[] = [];
  if (selectedScan?.obi_belt?.full?.data?.attributes)
    coverImages.push(selectedScan.obi_belt.full.data.attributes);
  if (selectedScan?.obi_belt?.inside_full?.data?.attributes)
    coverImages.push(selectedScan.obi_belt.inside_full.data.attributes);
  if (selectedScan?.dust_jacket?.full?.data?.attributes)
    coverImages.push(selectedScan.dust_jacket.full.data.attributes);
  if (selectedScan?.dust_jacket?.inside_full?.data?.attributes)
    coverImages.push(selectedScan.dust_jacket.inside_full.data.attributes);
  if (selectedScan?.cover?.full?.data?.attributes)
    coverImages.push(selectedScan.cover.full.data.attributes);
  if (selectedScan?.cover?.inside_full?.data?.attributes)
    coverImages.push(selectedScan.cover.inside_full.data.attributes);

  if (coverImages.length > 0) {
    return (
      <>
        {selectedScan && (
          <div>
            <div className="flex flex-row flex-wrap place-items-center gap-6 text-base pt-10 first-of-type:pt-0">
              <h2 id={"cover"} className="text-2xl">
                {"Cover"}
              </h2>

              <Chip>
                {selectedScan.language?.data?.attributes?.code ===
                selectedScan.source_language?.data?.attributes?.code
                  ? "Scan"
                  : "Scanlation"}
              </Chip>
            </div>

            <div className="flex flex-row flex-wrap gap-4 pb-6 place-items-center">
              <LanguageSwitcher
                languages={languages}
                locales={scanLocales}
                localesIndex={selectedScanIndex}
                setLocalesIndex={setSelectedScanIndex}
              />

              <div className="grid place-items-center place-content-center">
                <p className="font-headers">{langui.status}:</p>
                <ToolTip
                  content={getStatusDescription(selectedScan.status, langui)}
                  maxWidth={"20rem"}
                >
                  <Chip>{selectedScan.status}</Chip>
                </ToolTip>
              </div>

              {selectedScan.scanners && selectedScan.scanners.data.length > 0 && (
                <div>
                  <p className="font-headers">{"Scanners"}:</p>
                  <div className="grid place-items-center place-content-center gap-2">
                    {selectedScan.scanners.data.map((scanner) => (
                      <>
                        {scanner.attributes && (
                          <RecorderChip
                            key={scanner.id}
                            langui={langui}
                            recorder={scanner.attributes}
                          />
                        )}
                      </>
                    ))}
                  </div>
                </div>
              )}

              {selectedScan.cleaners && selectedScan.cleaners.data.length > 0 && (
                <div>
                  <p className="font-headers">{"Cleaners"}:</p>
                  <div className="grid place-items-center place-content-center gap-2">
                    {selectedScan.cleaners.data.map((cleaner) => (
                      <>
                        {cleaner.attributes && (
                          <RecorderChip
                            key={cleaner.id}
                            langui={langui}
                            recorder={cleaner.attributes}
                          />
                        )}
                      </>
                    ))}
                  </div>
                </div>
              )}

              {selectedScan.typesetters &&
                selectedScan.typesetters.data.length > 0 && (
                  <div>
                    <p className="font-headers">{"Typesetters"}:</p>
                    <div className="grid place-items-center place-content-center gap-2">
                      {selectedScan.typesetters.data.map((typesetter) => (
                        <>
                          {typesetter.attributes && (
                            <RecorderChip
                              key={typesetter.id}
                              langui={langui}
                              recorder={typesetter.attributes}
                            />
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            <div className="grid gap-8 items-end mobile:grid-cols-2 desktop:grid-cols-[repeat(auto-fill,_minmax(10rem,1fr))] pb-12 border-b-[3px] border-dotted last-of-type:border-0">
              {coverImages.map((image, index) => (
                <div
                  key={image.url}
                  className="drop-shadow-shade-lg hover:scale-[1.02] cursor-pointer transition-transform"
                  onClick={() => {
                    const imgs: string[] = [];
                    coverImages.map((img) => {
                      if (img.url)
                        imgs.push(getAssetURL(img.url, ImageQuality.Large));
                    });
                    setLightboxOpen(true);
                    setLightboxImages(imgs);
                    setLightboxIndex(index);
                  }}
                >
                  <Img image={image} quality={ImageQuality.Small} />
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
  return <></>;
}
