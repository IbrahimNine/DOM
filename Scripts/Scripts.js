/* ------------------- Bookmark Heart Toggle Functionality ------------------- */
let favIcons = document.getElementsByClassName("bi-bookmark-heart");

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
    newItem.innerHTML = `
      <div class="dropdown-item">
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

/* -------------------- Your Purchases Cart Toggle Functionality -------------------- */
let cardContainers = document.querySelectorAll(".card");

for (const cardContainer of cardContainers) {
  let icons = cardContainer.querySelectorAll(".bi-plus-circle, .bi-x-circle");
  let price = parseFloat(cardContainer.querySelector(".price").textContent);
  let quantityDisplay = cardContainer.querySelector(".card .card-body h4");
  let totalCostDisplay = document.querySelector(".totalCost .cost");

  // a function to be called on the event listener for adding items to the dropdownlist of purchases
  function addToCartDropdown(itemName, itemImage) {
    let cartDropdown = document.querySelector(".cart-dropdown");

    if (!cartDropdown.querySelector(`[data-item="${itemName}"]`)) {
      let listItem = document.createElement("li");
      listItem.setAttribute("data-item", itemName);
      listItem.innerHTML = `
        <div class="dropdown-item">
          <img
            class="rounded float-left"
            src="${itemImage}"
            alt="${itemName}"
          />
          <span><b>${itemName} | ${quantityDisplay.textContent} Pc(s)</b></span>
        </div>
      `;
      cartDropdown.appendChild(listItem);
    }
  }

  // a removing items function to be called on the event listener on a second click to remove the item
  function removeFromCartDropdown(itemName) {
    let cartDropdown = document.querySelector(".cart-dropdown");
    let itemToRemove = cartDropdown.querySelector(`[data-item="${itemName}"]`);

    if (itemToRemove) {
      itemToRemove.remove();
    }
  }

  // listening through all the icons of the page to know where the functions should be applied
  for (const icon of icons) {
    icon.addEventListener("click", function () {
      for (const oneOfEach of icons) {
        oneOfEach.classList.toggle("d-none");
      }

      let quantity = parseInt(quantityDisplay.textContent);
      let currentTotal = parseFloat(totalCostDisplay.textContent);

      if (icon.classList.contains("bi-plus-circle")) {
        currentTotal += quantity * price;
        if (currentTotal > 0) {
          addToCartDropdown(
            cardContainer.querySelector(".card-title").textContent,
            cardContainer.querySelector("img").src
          );
        }
      } else {
        if (currentTotal > 0) {
          currentTotal -= quantity * price;
          removeFromCartDropdown(
            cardContainer.querySelector(".card-title").textContent
          );
        }
      }

      totalCostDisplay.textContent = currentTotal.toFixed(2);

      let selectedBagIcon = document.querySelector(".bi-cart-check");
      let iconItems = document.querySelectorAll(".cart-dropdown li");

      // another toggle method to highlight the icon in condition if any item exists
      iconItems.forEach((item) => console.log(item.innerHTML));
      selectedBagIcon.classList.toggle("text-warning", iconItems.length > 0);
    });
  }
}

/* ----------------------- Quantity Controls Script ------------------------ */
const plusbtns = document.querySelectorAll(".card .plusplus");
const minusBtns = document.querySelectorAll(".card .minusminus");
const cardQtn = document.querySelectorAll(".card .card-body h4");
let counts = Array(plusbtns.length).fill(0);

for (const [i, plusbtn] of plusbtns.entries()) {
  plusbtn.addEventListener("click", function () {
    counts[i]++;
    cardQtn[i].textContent = counts[i];
  });
}

for (const [j, minusBtn] of minusBtns.entries()) {
  minusBtn.addEventListener("click", function () {
    if (counts[j] > 0) {
      counts[j]--;
      cardQtn[j].textContent = counts[j];
    }
  });
}

/* --------------------------back to the top-----------------------*/
let mybutton = document.getElementById("myBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
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