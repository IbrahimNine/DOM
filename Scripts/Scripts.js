/* ------------------- Bookmark Heart Toggle Functionality ------------------- */
let favIcons = document.getElementsByClassName("bi-bookmark-heart");
// console.log(favIcons);
// a function to  add/remove a clicked cards to the bookmark(Your favourites item list).
function toggleItemInBag(item) {
  let bagDropdown = document.getElementById("bookmarkDropdown");
  let existingItems = bagDropdown.getElementsByClassName("dropdown-item");

  // first loop to check whether the clicked item(card) exist in the dropdown list or not
  let itemExists = false;
  for (const existingItem of existingItems) {
    if (existingItem.textContent.includes(item.title)) {
      itemExists = true;
      break;
    }
  }
  // condition to check if the item exist then it loop through the dropdown till find it and remove it, else it add the item to the list
  if (itemExists) {
    Array.from(existingItems).forEach((existingItem) => {
      if (existingItem.innerHTML.includes(item.title)) {
        existingItem.remove();
      }
    });
  } else {
    let newItem = document.createElement("li");
    newItem.setAttribute("data-item", item.title);
    newItem.innerHTML = `
      <div class="dropdown-item favItem">
        <img
          class="rounded float-left"
          src="${item.image}"
          alt="${item.title}"
        />
        <span><b>${item.title}</b></span>
      </div>
    `;
    bagDropdown.appendChild(newItem);
  }
  // little toggle method with a condition to turn yellow the icon if there are any items in it
  let bagHeartIcon = document.querySelector(".bi-bag-heart");
  bagHeartIcon.classList.toggle("text-warning", existingItems.length > 0);
}
// looping(listening) through all the page to know where exactly to apply the toggleItemIinBag function and change the colour of the icon
for (let i = 0; i < favIcons.length; i++) {
  favIcons[i].addEventListener("click", function () {
    this.classList.toggle("text-danger");

    let card = this.closest(".card");
    let title = card.querySelector(".card-title").textContent;
    let image = card.querySelector(".card-img-top").src;

    let item = {
      title: title,
      image: image,
    };
    toggleItemInBag(item);
  });
}

/* ----------------------- Quantity Controls Script ------------------------ */
const plusbtns = document.querySelectorAll(".card .plusplus");
const minusBtns = document.querySelectorAll(".card .minusminus");
const cardQtn = document.querySelectorAll(".card .card-body h4");
const price = Array.from(document.querySelectorAll(".price"));
let counts = Array(plusbtns.length).fill(0);
let currentTotal = 0;
const totalQtnDisplay = document.getElementById("cost");
const items = document.querySelectorAll(".card");
const deleteBtns = document.querySelectorAll(".bi-trash");

// listener for when we click on the plus button it add quantity and an element to the purchase list
plusbtns.forEach((plusbtn, i) => {
  plusbtn.addEventListener("click", function () {
    // quantity update
    counts[i]++;
    cardQtn[i].textContent = counts[i];
    currentTotal += parseInt(price[i].textContent);
    totalQtnDisplay.textContent = currentTotal.toFixed(2);

    const cartDropdown = document.querySelector(".cart-dropdown");
    const itemImgSrc = items[i].querySelector("img").src;
    const itemTitle = items[i].querySelector(".card-title").textContent;

    const listItem = cartDropdown.querySelector(`[data-item="${itemTitle}"]`);
    // purchases bag item update
    if (!listItem) {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-item", itemTitle);
      listItem.innerHTML = `
        <div class="dropdown-item">
          <img class="rounded float-left" src="${itemImgSrc}" alt="${itemTitle}" />
          <span><b>${itemTitle} | ${cardQtn[i].textContent} Pc(s)</b></span>
        </div>
      `;
      cartDropdown.appendChild(listItem);
    } else {
      listItem.querySelector(
        `span b`
      ).textContent = `${itemTitle} | ${cardQtn[i].textContent} Pc(s)`;
    }

    // colour toggle to check if there are items on the purchases list
    const selectedBagIcon = document.querySelector(".bi-cart-check");
    const iconItems = document.querySelectorAll(".cart-dropdown li");
    selectedBagIcon.classList.toggle("text-warning", iconItems.length > 0);
  });
});

// listener for when we click minus button it subtract the quentity from the total cost and update the purchases list or removes it if the Card quanity reaches zero
minusBtns.forEach((minusBtn, j) => {
  minusBtn.addEventListener("click", function () {
    if (counts[j] > 0) {
      const cartDropdown = document.querySelector(".cart-dropdown");
      const itemTitle = items[j].querySelector(".card-title").textContent;
      const listItem = cartDropdown.querySelector(`[data-item="${itemTitle}"]`);
      // quantity update
      counts[j]--;
      cardQtn[j].textContent = counts[j];
      currentTotal -= parseInt(price[j].textContent);
      totalQtnDisplay.textContent = currentTotal.toFixed(2);
      // purchases bag update (subtract or remove item)
      if (counts[j] === 0 && listItem) {
        listItem.remove();
      } else {
        listItem.querySelector(
          `span b`
        ).textContent = `${itemTitle} | ${cardQtn[j].textContent} Pc(s)`;
      }

      // colour toggle to check if there are items on the purchases list
      const selectedBagIcon = document.querySelector(".bi-cart-check");
      const iconItems = document.querySelectorAll(".cart-dropdown li");
      selectedBagIcon.classList.toggle("text-warning", iconItems.length > 0);
    }
  });
});

deleteBtns.forEach((deleteBtn, z) => {
  deleteBtn.addEventListener("click", function () {
    const cartDropdown = document.querySelector(".cart-dropdown");
    const itemTitle = items[z].querySelector(".card-title").textContent;
    const favList = cartDropdown
      .closest(".row")
      .querySelector("#bookmarkDropdown");

    if (cartDropdown.querySelector(`[data-item="${itemTitle}"]`)) {
      currentTotal -= price[z].textContent * cardQtn[z].textContent;
      totalQtnDisplay.textContent = currentTotal.toFixed(2);
      cartDropdown.querySelector(`[data-item="${itemTitle}"]`).remove();
    }
    if (favList.querySelector(`[data-item="${itemTitle}"]`)) {
      favList.querySelector(`[data-item="${itemTitle}"]`).remove();
    }
    items[z].remove();
    const selectedBagIcon = document.querySelector(".bi-cart-check");
    const iconItems = document.querySelectorAll(".cart-dropdown li");
    let favoritedItems = document.querySelectorAll(".favItem");
    let bagHeartIcon = document.querySelector(".bi-bag-heart");
    selectedBagIcon.classList.toggle("text-warning", iconItems.length > 0);
    bagHeartIcon.classList.toggle("text-warning", favoritedItems.length > 0);
    console.log(favoritedItems);
  });
});

/* --------------------------back to the top-----------------------*/
let mybutton = document.getElementById("myBtn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
