/**
 * Grateful Partners section and footer — authorised corrections.
 * Taken from the 25 August 2026 Memorial tribute Home.tsx.
 * Strings: en.grateful-partners.corrected.json (home.footer1 and home.partnerStats).
 * Authorised by Nigel Dearden on 18 November 2026.
 * First draft, not issued. Not deployed to the live Memorial host.
 * Manus AI is retained. The unused category key home.gratefulCatVault was not added.
 * Every outbound partner link uses target="_blank" and rel="noopener noreferrer".
 */
const GRATEFUL_PARTNER_GROUPS: {
  catKey: string;
  partners: { name: string; url: string; key: string }[];
}[] = [
  {
    catKey: "home.gratefulCatForge",
    partners: [
      { name: "Shokz", url: "https://www.shokz.com", key: "home.gratefulShokz" },
      { name: "HP", url: "https://www.hp.com", key: "home.gratefulHP" },
      { name: "Garmin", url: "https://www.garmin.com", key: "home.gratefulGarmin" },
      { name: "Apple", url: "https://www.apple.com", key: "home.gratefulApple" },
      { name: "Lenovo", url: "https://www.lenovo.com", key: "home.gratefulLenovo" },
      { name: "Intel", url: "https://www.intel.com", key: "home.gratefulIntel" },
      { name: "Omega", url: "https://www.omegawatches.com", key: "home.gratefulOmega" },
      { name: "Seiko", url: "https://www.seikowatches.com", key: "home.gratefulSeiko" },
      { name: "Dyson", url: "https://www.dyson.com", key: "home.gratefulDyson" },
      { name: "Sony", url: "https://www.sony.com", key: "home.gratefulSony" },
      { name: "Samsung", url: "https://www.samsung.com", key: "home.gratefulSamsung" },
    ],
  },
  {
    catKey: "home.gratefulCatDigital",
    partners: [
      { name: "Manus AI", url: "https://manus.im", key: "home.gratefulManus" },
      { name: "Google", url: "https://www.google.com", key: "home.gratefulGoogle" },
      { name: "Microsoft", url: "https://www.microsoft.com", key: "home.gratefulMicrosoft" },
      { name: "Meta", url: "https://about.meta.com", key: "home.gratefulMeta" },
      { name: "Adobe", url: "https://www.adobe.com", key: "home.gratefulAdobe" },
      { name: "Amazon", url: "https://www.amazon.com", key: "home.gratefulAmazon" },
      { name: "Autodesk", url: "https://www.autodesk.com", key: "home.gratefulAutodesk" },
      { name: "Cisco", url: "https://www.cisco.com", key: "home.gratefulCisco" },
      { name: "Starlink", url: "https://www.starlink.com", key: "home.gratefulStarlink" },
    ],
  },
  {
    catKey: "home.gratefulCatStory",
    partners: [
      { name: "Disney", url: "https://www.disney.com", key: "home.gratefulDisney" },
      { name: "Marvel", url: "https://www.marvel.com", key: "home.gratefulMarvel" },
      { name: "DreamWorks", url: "https://www.dreamworks.com", key: "home.gratefulDreamWorks" },
      { name: "MGM", url: "https://www.mgm.com", key: "home.gratefulMGM" },
      { name: "HBO", url: "https://www.hbo.com", key: "home.gratefulHBO" },
      { name: "Netflix", url: "https://www.netflix.com", key: "home.gratefulNetflix" },
      { name: "BBC", url: "https://www.bbc.com", key: "home.gratefulBBC" },
      { name: "ESPN", url: "https://www.espn.com", key: "home.gratefulESPN" },
    ],
  },
  {
    catKey: "home.gratefulCatRecord",
    partners: [
      { name: "Reuters", url: "https://www.reuters.com", key: "home.gratefulReuters" },
      { name: "AP", url: "https://www.ap.org", key: "home.gratefulAP" },
      { name: "Bloomberg", url: "https://www.bloomberg.com", key: "home.gratefulBloomberg" },
      { name: "Al Jazeera", url: "https://www.aljazeera.com", key: "home.gratefulAlJazeera" },
      { name: "The Times", url: "https://www.thetimes.co.uk", key: "home.gratefulTheTimes" },
      { name: "Wall Street Journal", url: "https://www.wsj.com", key: "home.gratefulWSJ" },
      { name: "Washington Post", url: "https://www.washingtonpost.com", key: "home.gratefulWashPost" },
      { name: "TIME", url: "https://time.com", key: "home.gratefulTIME" },
      { name: "National Geographic", url: "https://www.nationalgeographic.com", key: "home.gratefulNatGeo" },
    ],
  },
  {
    catKey: "home.gratefulCatJournals",
    partners: [
      { name: "Nature", url: "https://www.nature.com", key: "home.gratefulNature" },
      { name: "Science", url: "https://www.science.org", key: "home.gratefulScience" },
      { name: "The Lancet", url: "https://www.thelancet.com", key: "home.gratefulLancet" },
      { name: "IEEE", url: "https://www.ieee.org", key: "home.gratefulIEEE" },
      { name: "ASCE", url: "https://www.asce.org", key: "home.gratefulASCE" },
    ],
  },
  {
    catKey: "home.gratefulCatMuseums",
    partners: [
      { name: "Smithsonian", url: "https://www.si.edu", key: "home.gratefulSmithsonian" },
      { name: "British Museum", url: "https://www.britishmuseum.org", key: "home.gratefulBritishMuseum" },
      { name: "The Louvre", url: "https://www.louvre.fr", key: "home.gratefulLouvre" },
      { name: "The Met", url: "https://www.metmuseum.org", key: "home.gratefulMet" },
      { name: "Hermitage", url: "https://www.hermitagemuseum.org", key: "home.gratefulHermitage" },
      { name: "Guggenheim", url: "https://www.guggenheim.org", key: "home.gratefulGuggenheim" },
      { name: "M+ Museum HK", url: "https://www.mplus.org.hk", key: "home.gratefulMPlus" },
    ],
  },
  {
    catKey: "home.gratefulCatLibraries",
    partners: [
      { name: "British Library", url: "https://www.bl.uk", key: "home.gratefulBritishLibrary" },
      { name: "Library of Congress", url: "https://www.loc.gov", key: "home.gratefulLOC" },
      { name: "BnF (France)", url: "https://www.bnf.fr", key: "home.gratefulBNF" },
      { name: "NDL (Japan)", url: "https://www.ndl.go.jp", key: "home.gratefulNDL" },
      { name: "NLC (China)", url: "https://www.nlc.cn", key: "home.gratefulNLC" },
      { name: "Royal Society", url: "https://royalsociety.org", key: "home.gratefulRoyalSociety" },
    ],
  },
  {
    catKey: "home.gratefulCatScience",
    partners: [
      { name: "NASA", url: "https://www.nasa.gov", key: "home.gratefulNASA" },
      { name: "CERN", url: "https://home.cern", key: "home.gratefulCERN" },
      { name: "SETI", url: "https://www.seti.org", key: "home.gratefulSETI" },
      { name: "Red Cross", url: "https://www.ifrc.org", key: "home.gratefulRedCross" },
    ],
  },
  {
    catKey: "home.gratefulCatGlobal",
    partners: [
      { name: "United Nations", url: "https://www.un.org", key: "home.gratefulUN" },
      { name: "UN SDGs", url: "https://sdgs.un.org", key: "home.gratefulUNSDG" },
      { name: "WHO", url: "https://www.who.int", key: "home.gratefulWHO" },
      { name: "WWF", url: "https://www.wwf.org", key: "home.gratefulWWF" },
      { name: "World Bank", url: "https://www.worldbank.org", key: "home.gratefulWorldBank" },
      { name: "Nobel Prize", url: "https://www.nobelprize.org", key: "home.gratefulNobel" },
      { name: "Olympics", url: "https://www.olympics.com", key: "home.gratefulOlympics" },
      { name: "FIFA", url: "https://www.fifa.com", key: "home.gratefulFIFA" },
    ],
  },
  {
    catKey: "home.gratefulCatFinance",
    partners: [
      { name: "JPMorgan Chase", url: "https://www.jpmorganchase.com", key: "home.gratefulChase" },
      { name: "HSBC", url: "https://www.hsbc.com", key: "home.gratefulHSBC" },
      { name: "Wells Fargo", url: "https://www.wellsfargo.com", key: "home.gratefulWellsFargo" },
    ],
  },
  {
    catKey: "home.gratefulCatEngineer",
    partners: [
      { name: "Rolls-Royce", url: "https://www.rolls-royce.com", key: "home.gratefulRollsRoyce" },
      { name: "Aston Martin", url: "https://www.astonmartin.com", key: "home.gratefulAstonMartin" },
      { name: "Lotus", url: "https://www.lotuscars.com", key: "home.gratefulLotus" },
      { name: "Bentley", url: "https://www.bentleymotors.com", key: "home.gratefulBentley" },
      { name: "Maserati", url: "https://www.maserati.com", key: "home.gratefulMaserati" },
      { name: "Porsche", url: "https://www.porsche.com", key: "home.gratefulPorsche" },
      { name: "BMW", url: "https://www.bmw.com", key: "home.gratefulBMW" },
      { name: "Mercedes-Benz", url: "https://www.mercedes-benz.com", key: "home.gratefulMercedes" },
      { name: "Tesla", url: "https://www.tesla.com", key: "home.gratefulTesla" },
      { name: "GE", url: "https://www.ge.com", key: "home.gratefulGE" },
    ],
  },
  {
    catKey: "home.gratefulCatLifestyle",
    partners: [
      { name: "Tiffany & Co.", url: "https://www.tiffany.com", key: "home.gratefulTiffany" },
      { name: "Virgin", url: "https://www.virgin.com", key: "home.gratefulVirgin" },
      { name: "Alibaba", url: "https://www.alibaba.com", key: "home.gratefulAlibaba" },
      { name: "WeWork", url: "https://www.wework.com", key: "home.gratefulWeWork" },
    ],
  },
];

export function GratefulPartnersSection({ t }: { t: (key: string) => string }) {
  return (
    <>
      <section aria-labelledby="grateful-partners-title">
        <p id="grateful-partners-title">{t("home.gratefulTitle")}</p>
        <p>{t("home.gratefulSubtitle")}</p>
        <p>{t("home.gratefulIntro")}</p>
        {GRATEFUL_PARTNER_GROUPS.map((category) => (
          <div key={category.catKey}>
            <h3>{t(category.catKey)}</h3>
            <ul>
              {category.partners.map((partner) => (
                <li key={partner.name}>
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={t(partner.key)}
                  >
                    {partner.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p>{t("home.gratefulMore")}</p>
        <p>{t("home.partnerStats")}</p>
      </section>
      <footer>
        <p>{t("home.footer1")}</p>
        <p>{t("home.footer2")}</p>
        <a
          href="https://infrastructure-academy.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("home.infraAcademyOdyssey")}
        </a>
      </footer>
    </>
  );
}
