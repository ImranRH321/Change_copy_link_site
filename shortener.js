function elementSelector(selector) {
  const element = document.getElementById(selector);
  if (element) return element;
  throw new Error(`Selector Element not found ${element}`);
}

// select btn
const copyShortensBtn = elementSelector("button_shortens_Copy");
// clicked btn
copyShortensBtn.onclick = function () {
  const inpText = elementSelector("inputText");
  const inpValue = inpText.value;
  inpText.value = "";
  if (!inpValue) {
    alert(`No URL specified parameter is empty`);
    return;
  } else {
    shortenDynamicApiLoad(inpValue);
  }
};

// display
async function shortenDynamicApiLoad(inpValue) {
  //   alert(inpValue);
  try {
    const url = ` https://api.shrtco.de/v2/shorten?url=${inpValue}`;
    const response = await fetch(url);
    const data = await response.json();
    displayUiSorter(data.result);
  } catch (error) {
    console.log("err", error);
  }
}

function displayUiSorter(data) {
  if (!data) {
    alert("found Not Valid url ");
    return;
  }
  const displaySortedDiv = elementSelector("display_Shortener_container");

  const div = document.createElement("div");
  div.classList.add("d-flex", "gap-4");
  //   code;
  //   full_share_link;
  //   full_short_link; !Normal Good
  //   full_short_link2;
  //   full_short_link3;
  //   original_link;
  //   share_link;
  //   short_link;
  //   short_link2;
  //   short_link3;
  let i = 1;
  div.innerHTML = `
   <h3 class="mt-3 pe-auto"><a class=" px-2 text-white pe-auto" target="_blank" href=${data.full_short_link}> ${data.full_short_link}</a></h3>
 `;
  displaySortedDiv.appendChild(div);
}
