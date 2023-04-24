const btn = document.querySelector(".js-sendBtn");
const API_URL = "https://api.ipify.org/?format=json";

btn.addEventListener("click", onBtnClick);

async function onBtnClick() {
  const ip = await getIPAdress();
  const infoByIP = await getInfoByIP(ip);

  const markup = renderCard(infoByIP);
  btn.insertAdjacentHTML("afterend", markup);
}

async function getIPAdress() {
  try {
    const response = await fetch(API_URL);
    const responseParse = await response.json();
    return responseParse;
  } catch (error) {
    return alert(error.message);
  }
}

async function getInfoByIP({ ip }) {
  try {
    const response = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,message,continent,country,countryCode,region,regionName,city,district,zip,timezone`
    );
    const responseParse = await response.json();
    return responseParse;
  } catch (error) {
    return alert(error.message);
  }
}

function renderCard({
  continent = "Europe/Kyiv",
  country = "Ukraine",
  district = "",
  regionName = "Kyiv City",
  city = "Kyiv",
}) {
  if (district.length === 0) {
    district = "no district";
  }
  return `
  <form name="info-by-IP" class='form'>
      <input class='form-item' type="text" name="continent" value='Continent: ${continent}' readonly/>
      <input class='form-item' type="text" name="country" value='Country: ${country} ' readonly  />
      
      <input class='form-item' type="text" name="regionName" value='RegionName: ${regionName} ' readonly  />
      <input class='form-item' type="text" name="city" value='City: ${city} ' readonly  />
      <input class='form-item' type="text" name="district" value='District: ${district} ' readonly  />
    </form>
  `;
}
