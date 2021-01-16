import {
  MunicipalitiesInfectionsCumulativeResponse,
  MunicipalitiesInfectionsCumulative
} from "../types/types";
export const queryFetcher = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    if (error) {
      console.error("Error on fetch " + url);
      return null;
    }
  }
};

export const API_municipalitiesInfectionsCumulative =
  "https://plus.yle.fi/lambda_sheets/korona/2020-08-municipality_infections/data.json";
export const API_ageGroups =
  "https://plus.yle.fi/lambda_sheets/korona/2021-01-korona_ikaryhma/data.json";

export const API_testAmountsCumulative =
  "https://plus.yle.fi/lambda_sheets/korona/2020-04-test-amounts-cumulative/data.json";

export const API_genederData =
  "https://plus.yle.fi/lambda_sheets/korona/2021-01-korona_sukupuoli/data.json";

export const municipalities = [
  "Akaa",
  "Alajärvi",
  "Alavieska",
  "Alavus",
  "Asikkala",
  "Askola",
  "Aura",
  "Brändö",
  "Eckerö",
  "Enonkoski",
  "Enontekiö",
  "Espoo",
  "Eura",
  "Eurajoki",
  "Evijärvi",
  "Finström",
  "Forssa",
  "Föglö",
  "Geta",
  "Haapajärvi",
  "Haapavesi",
  "Hailuoto",
  "Halsua",
  "Hamina",
  "Hammarland",
  "Hankasalmi",
  "Hanko",
  "Harjavalta",
  "Hartola",
  "Hattula",
  "Hausjärvi",
  "Heinola",
  "Heinävesi",
  "Helsinki",
  "Hirvensalmi",
  "Hollola",
  "Honkajoki",
  "Huittinen",
  "Humppila",
  "Hyrynsalmi",
  "Hyvinkää",
  "Hämeenkyrö",
  "Hämeenlinna",
  "Ii",
  "Iisalmi",
  "Iitti",
  "Ikaalinen",
  "Ilmajoki",
  "Ilomantsi",
  "Imatra",
  "Inari",
  "Inkoo",
  "Isojoki",
  "Isokyrö",
  "Janakkala",
  "Joensuu",
  "Jokioinen",
  "Jomala",
  "Joroinen",
  "Joutsa",
  "Juuka",
  "Juupajoki",
  "Juva",
  "Jyväskylä",
  "Jämijärvi",
  "Jämsä",
  "Järvenpää",
  "Kaarina",
  "Kaavi",
  "Kajaani",
  "Kalajoki",
  "Kangasala",
  "Kangasniemi",
  "Kankaanpää",
  "Kannonkoski",
  "Kannus",
  "Karijoki",
  "Karkkila",
  "Karstula",
  "Karvia",
  "Kaskinen",
  "Kauhajoki",
  "Kauhava",
  "Kauniainen",
  "Kaustinen",
  "Keitele",
  "Kemi",
  "Kemijärvi",
  "Keminmaa",
  "Kemiönsaari",
  "Kempele",
  "Kerava",
  "Keuruu",
  "Kihniö",
  "Kinnula",
  "Kirkkonummi",
  "Kitee",
  "Kittilä",
  "Kiuruvesi",
  "Kivijärvi",
  "Kokemäki",
  "Kokkola",
  "Kolari",
  "Konnevesi",
  "Kontiolahti",
  "Korsnäs",
  "Koski Tl",
  "Kotka",
  "Kouvola",
  "Kristiinankaupunki",
  "Kruunupyy",
  "Kuhmo",
  "Kuhmoinen",
  "Kumlinge",
  "Kuopio",
  "Kuortane",
  "Kurikka",
  "Kustavi",
  "Kuusamo",
  "Kyyjärvi",
  "Kärkölä",
  "Kärsämäki",
  "Kökar",
  "Lahti",
  "Laihia",
  "Laitila",
  "Lapinjärvi",
  "Lapinlahti",
  "Lappajärvi",
  "Lappeenranta",
  "Lapua",
  "Laukaa",
  "Lemi",
  "Lemland",
  "Lempäälä",
  "Leppävirta",
  "Lestijärvi",
  "Lieksa",
  "Lieto",
  "Liminka",
  "Liperi",
  "Lohja",
  "Loimaa",
  "Loppi",
  "Loviisa",
  "Luhanka",
  "Lumijoki",
  "Lumparland",
  "Luoto",
  "Luumäki",
  "Maalahti",
  "Maarianhamina - Mariehamn",
  "Marttila",
  "Masku",
  "Merijärvi",
  "Merikarvia",
  "Miehikkälä",
  "Mikkeli",
  "Muhos",
  "Multia",
  "Muonio",
  "Mustasaari",
  "Muurame",
  "Mynämäki",
  "Myrskylä",
  "Mäntsälä",
  "Mänttä-Vilppula",
  "Mäntyharju",
  "Naantali",
  "Nakkila",
  "Nivala",
  "Nokia",
  "Nousiainen",
  "Nurmes",
  "Nurmijärvi",
  "Närpiö",
  "Orimattila",
  "Oripää",
  "Orivesi",
  "Oulainen",
  "Oulu",
  "Outokumpu",
  "Padasjoki",
  "Paimio",
  "Paltamo",
  "Parainen",
  "Parikkala",
  "Parkano",
  "Pedersören kunta",
  "Pelkosenniemi",
  "Pello",
  "Perho",
  "Pertunmaa",
  "Petäjävesi",
  "Pieksämäki",
  "Pielavesi",
  "Pietarsaari",
  "Pihtipudas",
  "Pirkkala",
  "Polvijärvi",
  "Pomarkku",
  "Pori",
  "Pornainen",
  "Porvoo",
  "Posio",
  "Pudasjärvi",
  "Pukkila",
  "Punkalaidun",
  "Puolanka",
  "Puumala",
  "Pyhtää",
  "Pyhäjoki",
  "Pyhäjärvi",
  "Pyhäntä",
  "Pyhäranta",
  "Pälkäne",
  "Pöytyä",
  "Raahe",
  "Raasepori",
  "Raisio",
  "Rantasalmi",
  "Ranua",
  "Rauma",
  "Rautalampi",
  "Rautavaara",
  "Rautjärvi",
  "Reisjärvi",
  "Riihimäki",
  "Ristijärvi",
  "Rovaniemi",
  "Ruokolahti",
  "Ruovesi",
  "Rusko",
  "Rääkkylä",
  "Saarijärvi",
  "Salla",
  "Salo",
  "Saltvik",
  "Sastamala",
  "Sauvo",
  "Savitaipale",
  "Savonlinna",
  "Savukoski",
  "Seinäjoki",
  "Sievi",
  "Siikainen",
  "Siikajoki",
  "Siikalatva",
  "Siilinjärvi",
  "Simo",
  "Sipoo",
  "Siuntio",
  "Sodankylä",
  "Soini",
  "Somero",
  "Sonkajärvi",
  "Sotkamo",
  "Sottunga",
  "Sulkava",
  "Sund",
  "Suomussalmi",
  "Suonenjoki",
  "Sysmä",
  "Säkylä",
  "Taipalsaari",
  "Taivalkoski",
  "Taivassalo",
  "Tammela",
  "Tampere",
  "Tervo",
  "Tervola",
  "Teuva",
  "Tohmajärvi",
  "Toholampi",
  "Toivakka",
  "Tornio",
  "Turku",
  "Tuusniemi",
  "Tuusula",
  "Tyrnävä",
  "Ulvila",
  "Urjala",
  "Utajärvi",
  "Utsjoki",
  "Uurainen",
  "Uusikaarlepyy",
  "Uusikaupunki",
  "Vaala",
  "Vaasa",
  "Valkeakoski",
  "Valtimo",
  "Vantaa",
  "Varkaus",
  "Vehmaa",
  "Vesanto",
  "Vesilahti",
  "Veteli",
  "Vieremä",
  "Vihti",
  "Viitasaari",
  "Vimpeli",
  "Virolahti",
  "Virrat",
  "Vårdö",
  "Vöyri",
  "Ylitornio",
  "Ylivieska",
  "Ylöjärvi",
  "Ypäjä",
  "Ähtäri",
  "Äänekoski"
];

export const getAgeGroup = (age: number): string => {
  let ageGroup: string;
  if (age < 11) {
    ageGroup = "00-10";
  } else if (age < 21) {
    ageGroup = "10-20";
  } else if (age < 31) {
    ageGroup = "20-30";
  } else if (age < 41) {
    ageGroup = "30-40";
  } else if (age < 51) {
    ageGroup = "40-50";
  } else if (age < 61) {
    ageGroup = "50-60";
  } else if (age < 71) {
    ageGroup = "60-70";
  } else if (age < 81) {
    ageGroup = "70-80";
  } else if (age > 80) {
    ageGroup = "80-";
  }
  return ageGroup;
};

export const getAveragePerhundredthousand = (
  municipalitiesInfectionsData: MunicipalitiesInfectionsCumulativeResponse
): number => {
  let allPerhundredthousand = municipalitiesInfectionsData.data.map((item) => {
    return parseFloat(item.perhundredthousand);
  });
  allPerhundredthousand = allPerhundredthousand.filter((val) => {
    return val !== 0;
  });
  const averagePerhundredthousand = Math.round(
    (sum(allPerhundredthousand) / allPerhundredthousand.length) * 100000
  );
  return averagePerhundredthousand;
};

export const getMunicipalityAveragePerhundredthousand = (
  municipalitiesInfectionsData: MunicipalitiesInfectionsCumulative[]
): number => {
  const allPerhundredthousand = municipalitiesInfectionsData.map((item) => {
    return parseFloat(item.perhundredthousand);
  });

  const averagePerhundredthousand = Math.round(
    (sum(allPerhundredthousand) / allPerhundredthousand.length) * 100000
  );
  return averagePerhundredthousand;
};

const sum = (input) => {
  let total = 0;
  for (let i = 0; i < input.length; i++) {
    if (isNaN(input[i])) {
      continue;
    }
    total += Number(input[i]);
  }
  return total;
};
