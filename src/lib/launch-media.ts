import type { StaticImageData } from "next/image";
import courtyardNight from "../../web-media/launch/heroes/hero-courtyard-night.webp";
import iqbalPgshf from "../../web-media/launch/heroes/hero-iqbal-1-kanal-pgshf.webp";
import khursheed586a from "../../web-media/launch/heroes/hero-khursheed-586a-dusk.webp";
import parkViewKitchen from "../../web-media/launch/interiors/interior-park-view-kitchen.webp";
import attockTvWall from "../../web-media/launch/interiors/interior-attock-tv-wall.webp";
import mansehraLounge from "../../web-media/launch/interiors/interior-mansehra-lounge.webp";
import omodaJaecoo from "../../web-media/launch/commercial/commercial-omoda-jaecoo.webp";
import proof352cCgi from "../../web-media/launch/proof/proof-352c-cgi.webp";
import proof352cSite from "../../web-media/launch/proof/proof-352c-site.webp";
import proof629dCgi from "../../web-media/launch/proof/proof-629d-cgi.webp";
import proof629dSite from "../../web-media/launch/proof/proof-629d-site.webp";
import proof586aSite from "../../web-media/launch/proof/proof-586a-site.webp";
import proofIftikharCgi from "../../web-media/launch/proof/proof-iftikhar-cgi.webp";
import proofIftikharSite from "../../web-media/launch/proof/proof-iftikhar-site.webp";

export const launchMedia = {
  courtyardNight,
  iqbalPgshf,
  khursheed586a,
  parkViewKitchen,
  attockTvWall,
  mansehraLounge,
  omodaJaecoo,
  proof352cCgi,
  proof352cSite,
  proof629dCgi,
  proof629dSite,
  proof586aSite,
  proofIftikharCgi,
  proofIftikharSite,
} satisfies Record<string, StaticImageData>;

export const heroStill = launchMedia.courtyardNight;
