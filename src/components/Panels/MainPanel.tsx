import Link from "next/link";
import NavOption from "components/PanelComponents/NavOption";
import { useRouter } from "next/router";
import Button from "components/Button";
import HorizontalLine from "components/HorizontalLine";
import { GetWebsiteInterfaceQuery } from "graphql/operations-types";
import Markdown from "markdown-to-jsx";
import { useMediaDesktop } from "hooks/useMediaQuery";
import { useAppLayout } from "contexts/AppLayoutContext";

type MainPanelProps = {
  langui: GetWebsiteInterfaceQuery["websiteInterfaces"]["data"][number]["attributes"];
};

export default function MainPanel(props: MainPanelProps): JSX.Element {
  const langui = props.langui;
  const router = useRouter();
  const isDesktop = useMediaDesktop();
  const appLayout = useAppLayout();

  return (
    <div
      className={`flex flex-col justify-center content-start gap-y-2 justify-items-center text-center p-8 ${
        appLayout.mainPanelReduced && isDesktop && "px-4"
      }`}
    >
      <div>
        <div className="grid place-items-center">
          <Link href="/" passHref>
            <div
              onClick={() => appLayout.setMainPanelOpen(false)}
              className={`${
                appLayout.mainPanelReduced && isDesktop ? "w-12" : "w-1/2"
              } aspect-square cursor-pointer transition-colors [mask:url('/icons/accords.svg')] ![mask-size:contain] ![mask-repeat:no-repeat] ![mask-position:center] bg-black hover:bg-dark mb-4`}
            ></div>
          </Link>

          {appLayout.mainPanelReduced && isDesktop ? (
            ""
          ) : (
            <h2 className="text-3xl">Accord&rsquo;s Library</h2>
          )}

          <div
            className={`flex ${
              appLayout.mainPanelReduced && isDesktop
                ? "flex-col gap-3"
                : "flex-row"
            } flex-wrap gap-2`}
          >
            <Button
              className={
                appLayout.mainPanelReduced && isDesktop ? "" : "!py-0.5 !px-2.5"
              }
              onClick={() => {
                appLayout.setConfigPanelOpen(true);
              }}
            >
              <span
                className={`material-icons ${
                  !(appLayout.mainPanelReduced && isDesktop) && "!text-sm"
                } `}
              >
                settings
              </span>
            </Button>

            {router.locale && (
              <Button
                onClick={() => appLayout.setLanguagePanelOpen(true)}
                className={
                  appLayout.mainPanelReduced && isDesktop
                    ? ""
                    : "!py-0.5 !px-2.5 !text-sm"
                }
              >
                {router.locale.toUpperCase()}
              </Button>
            )}

            <Button
              className={
                appLayout.mainPanelReduced && isDesktop ? "" : "!py-0.5 !px-2.5"
              }
            >
              <span
                className={`material-icons ${
                  !(appLayout.mainPanelReduced && isDesktop) && "!text-sm"
                } `}
              >
                search
              </span>
            </Button>
          </div>
        </div>
      </div>

      <HorizontalLine />

      <NavOption
        url="/library"
        icon="library_books"
        title={langui.library}
        subtitle={langui.library_short_description}
        tooltipId="MainPanelTooltip"
        reduced={appLayout.mainPanelReduced && isDesktop}
        onClick={() => appLayout.setMainPanelOpen(false)}
      />

      <NavOption
        url="/contents"
        icon="workspaces"
        title={langui.contents}
        subtitle={langui.contents_short_description}
        tooltipId="MainPanelTooltip"
        reduced={appLayout.mainPanelReduced && isDesktop}
        onClick={() => appLayout.setMainPanelOpen(false)}
      />

      {/*
      
      <NavOption
        url="/wiki"
        icon="travel_explore"
        title={langui.wiki}
        subtitle={langui.wiki_short_description}
        tooltipId="MainPanelTooltip"
        reduced={appLayout.mainPanelReduced && isDesktop}
        onClick={() => appLayout.setMainPanelOpen(false)}
      />

      <NavOption
        url="/chronicles"
        icon="watch_later"
        title={langui.chronicles}
        subtitle={langui.chronicles_short_description}
        tooltipId="MainPanelTooltip"
        reduced={appLayout.mainPanelReduced && isDesktop}
        onClick={() => appLayout.setMainPanelOpen(false)}
      />
      
      */}

      <HorizontalLine />

      <NavOption
        url="/news"
        icon="feed"
        title={langui.news}
        tooltipId="MainPanelTooltip"
        reduced={appLayout.mainPanelReduced && isDesktop}
        onClick={() => appLayout.setMainPanelOpen(false)}
      />
      {/*
      <NavOption
        url="/merch"
        icon="store"
        title={langui.merch}
        tooltipId="MainPanelTooltip"
        reduced={appLayout.mainPanelReduced && isDesktop}
        onClick={() => appLayout.setMainPanelOpen(false)}
      />
      
      */}

      <NavOption
        url="/gallery"
        icon="collections"
        title={langui.gallery}
        tooltipId="MainPanelTooltip"
        reduced={appLayout.mainPanelReduced && isDesktop}
        onClick={() => appLayout.setMainPanelOpen(false)}
      />

      {/*

      <NavOption
        url="/archives"
        icon="inventory"
        title={langui.archives}
        tooltipId="MainPanelTooltip"
        reduced={appLayout.mainPanelReduced && isDesktop}
        onClick={() => appLayout.setMainPanelOpen(false)}
      />


      */}

      <NavOption
        url="/about-us"
        icon="info"
        title={langui.about_us}
        tooltipId="MainPanelTooltip"
        reduced={appLayout.mainPanelReduced && isDesktop}
        onClick={() => appLayout.setMainPanelOpen(false)}
      />

      {appLayout.mainPanelReduced && isDesktop ? "" : <HorizontalLine />}

      <div
        className={`text-center ${
          appLayout.mainPanelReduced && isDesktop ? "hidden" : ""
        }`}
      >
        <p>
          {langui.licensing_notice && (
            <Markdown>{langui.licensing_notice}</Markdown>
          )}
        </p>
        <a
          aria-label="Read more about the license we use for this website"
          className="transition-[filter] colorize-black hover:colorize-dark"
          href="https://creativecommons.org/licenses/by-sa/4.0/"
        >
          <div className="mt-4 mb-8 grid grid-flow-col place-content-center gap-1 hover:[--theme-color-black:var(--theme-color-dark)]">
            <div className="w-6 aspect-square [mask:url('/icons/creative-commons-brands.svg')] ![mask-size:contain] ![mask-repeat:no-repeat] ![mask-position:center] bg-black" />
            <div className="w-6 aspect-square [mask:url('/icons/creative-commons-by-brands.svg')] ![mask-size:contain] ![mask-repeat:no-repeat] ![mask-position:center] bg-black" />
            <div className="w-6 aspect-square [mask:url('/icons/creative-commons-sa-brands.svg')] ![mask-size:contain] ![mask-repeat:no-repeat] ![mask-position:center] bg-black" />
          </div>
        </a>
        <p>
          {langui.copyright_notice && (
            <Markdown>{langui.copyright_notice}</Markdown>
          )}
        </p>
        <div className="mt-12 mb-4 grid h-4 grid-flow-col place-content-center gap-8">
          <a
            aria-label="Browse our GitHub repository, which include this website source code"
            className="transition-colors [mask:url('/icons/github-brands.svg')] ![mask-size:contain] ![mask-repeat:no-repeat] ![mask-position:center] w-10 aspect-square bg-black hover:bg-dark"
            href="https://github.com/Accords-Library"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
          <a
            aria-label="Join our Discord server!"
            className="transition-colors [mask:url('/icons/discord-brands.svg')] ![mask-size:contain] ![mask-repeat:no-repeat] ![mask-position:center] w-10 aspect-square bg-black hover:bg-dark"
            href="/discord"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </div>
      </div>
    </div>
  );
}
