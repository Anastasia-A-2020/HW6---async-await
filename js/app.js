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
    alert(error.message);
  }
}

async function getInfoByIP(objWithIP) {
  try {
    const response = await fetch(`http://ip-api.com/json/${objWithIP.ip}`);
    const responseParse = await response.json();
    return responseParse;
  } catch (error) {
    alert(error.message);
  }
}

function renderCard(data) {
  return `
  <form name="info-by-IP" class='form'>
      <input class='form-item' type="text" name="continent" value='Continent: ${data.timezone}' />
      <input class='form-item' type="text" name="country" value='Country: ${data.country}' />
      <input class='form-item' type="text" name="region" value='Region: ${data.region}' />
      <input class='form-item' type="text" name="regionName" value='RegionName: ${data.regionName}' />
      <input class='form-item' type="text" name="city" value='City: ${data.city}' />
    </form>
  `;
}
