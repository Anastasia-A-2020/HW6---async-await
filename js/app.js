const btn = document.querySelector(".js-sendBtn");

const API_URL = "https://api.ipify.org/?format=json";

// під кнопкою вивести на сторінку інформацію, отриману з останнього запиту – континент, країна, регіон, місто, район.

btn.addEventListener("click", onBtnClick);

async function onBtnClick() {
  const ip = await getIPAdress();
  const infoByIP = await getInfoByIP(ip);

  const markup = renderCard(infoByIP);
  console.log(markup);
  btn.insertAdjacentHTML("afterend", markup);
}

async function getIPAdress() {
  const response = await fetch(API_URL);
  const responseParse = await response.json();
  return responseParse;
}

async function getInfoByIP(objWithIP) {
  const response = await fetch(`http://ip-api.com/json/${objWithIP.ip}`);
  const responseParse = await response.json();
  return responseParse;
}

function renderCard(data) {
  console.log(data);
  return `
  <form name="info-by-IP">
      <input type="text" name="continent" value=${data.timezone} />
      <input type="text" name="country" value=${data.country} />
      <input type="text" name="region" value=${data.region} />
      <input type="text" name="regionName" value=${data.regionName} />
      <input type="text" name="city" value=${data.city} />
    </form>
  `;
}
