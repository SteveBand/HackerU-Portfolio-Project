const buttons = document.querySelectorAll(".btn");
const signupForm = document.querySelector("form.signup-form");
const loginForm = document.querySelector("form.login-form");
const signPage = document.querySelector("section.sign-page");
const lobyPage = document.querySelector("section.loby-page");
const liBtns = document.querySelectorAll(".loby-container > nav > ul > li");
const editWrapper = document.querySelector(".edit-page-wrapper");
const productsContainer = document.querySelector("article.products-container");
let editId;

const clearInputs = (...params) => {
  params.forEach((param) => (param.value = ""));
  console.log(params);
};

const showLoader = (i) => {
  const loader = document.querySelector(".loader");
  if (i) {
    loader.style.display = "block";
  }
  if (!i) {
    loader.style.display = "none";
  }
};

const signUp = async () => {
  const username = document.querySelector(".signup-form > #username");
  const password = document.querySelector(".signup-form > #password");
  const email = document.querySelector(".signup-form > #email");
  const fullname = document.querySelector(".signup-form > #fullName");

  const newAccount = {
    fullName: fullname.value,
    email: email.value,
    userName: username.value,
    password: password.value,
  };
  try {
    const response = await fetch("https://api.shipap.co.il/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAccount),
    });
    const data = await response.json();
    if (data) {
      signupForm.style.display = "none";
      loginForm.style.display = "block";
    }
  } catch (error) {
    showSnackBar("Account already exists or one of the fields is empty", 6000);
    clearInputs(username, password, fullname, email);
  }
};

const login = async () => {
  const username = document.querySelector(".login-form > #username");
  const password = document.querySelector(".login-form > #password");
  const logAccount = {
    userName: username.value,
    password: password.value,
  };
  try {
    const response = await fetch("https://api.shipap.co.il/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logAccount),
    });
    const data = await response.json();
    console.log(data);
    if (data.status == "success") {
      showSnackBar("Logged In Successfuly", 3000);
      signPage.style.display = "none";
      lobyPage.style.display = "flex";
      getProducts();
    }
    if (data.status == "error") {
      signPage.style.display = "flex";
      lobyPage.style.display = "none";
      showSnackBar("Username or Password is incorrect", 6000);
    }
  } catch (error) {
    showSnackBar("Username or Password is incorrect", 6000);
  }
};

const loginAtStart = async () => {
  try {
    const response = await fetch("https://api.shipap.co.il/login", {
      credentials: "include",
    });
    const data = await response.json();
    if (data.user) {
      signPage.style.display = "none";
      loginForm.style.display = "none";
      lobyPage.style.display = "flex";
      showLoader(false);
      showSnackBar("Logged In Successfuly", 3000);
      getProducts();
    }
    if (!data.user) {
      console.log("error has been found");
      loginForm.style.display = "block";
      signPage.style.display = "flex";
      lobyPage.style.display = "none";
      showLoader(false);
    }
  } catch (error) {
    console.log(error + "Failed");
    setTimeout(() => {
      showLoader(false);
    }, 1000);
  }
};

const addItem = async () => {
  showProductsLoader(true);
  const newItem = {
    name: document.getElementById("item").value,
    price: +document.getElementById("price").value,
    discount: +document.getElementById("discount").value,
  };
  try {
    const response = await fetch("https://api.shipap.co.il/products", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });

    const data = response.json();
    console.log(data);
    getProducts();
    showProductsLoader(false);
    showSnackBar("Item added", 3000);
  } catch (error) {
    console.log(error);
    showSnackBar(
      "There was a problem adding your Item, Log back in and try again",
      3000
    );
  }
};

const logOut = async () => {
  try {
    await fetch("https://api.shipap.co.il/logout", {
      credentials: "include",
    });

    showSnackBar("Logged Out successfuly", 3000);
    signPage.style.display = "flex";
    lobyPage.style.display = "none";
  } catch (error) {
    console.log(error);
    showSnackBar("Token expired long ago, or there was an error :D", 3000);
  }
};

const getProducts = async () => {
  productsContainer.innerHTML = "";
  try {
    const response = await fetch("https://api.shipap.co.il/products", {
      credentials: "include",
    });
    const data = await response.json();
    data.forEach((obj) => {
      const div = document.createElement("div");
      div.classList.add("product");
      div.id = obj.id;
      div.innerHTML = `
      <p>${obj.name}</p>
      <p>${obj.price}</p>
      <p>${obj.discount}</p>
            <div class="product-btns">
              <button class="btn" id="remove-item"><i class="gg-trash"></i></button>
              <button id="edit" class="btn">
                <i class="gg-edit-markup"></i>
              </button>
            </div>
    `;
      productsContainer.appendChild(div);
    });

    handleEvents();
  } catch (error) {
    console.log(error);
  }
};

const removeProduct = async (removedId) => {
  showProductsLoader(true);
  try {
    const response = await fetch(
      `https://api.shipap.co.il/products/${removedId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    showSnackBar("Product removed successfuly", 3000);
    getProducts();
    showProductsLoader(false);
  } catch (error) {
    console.log(error);
    showProductsLoader(true);
    showSnackBar("Removing product failed, Log back in and try again", 3000);
  }
};

const editProduct = async () => {
  showProductsLoader(true);
  const editedItem = {
    name: document.getElementById("item").value,
    price: +document.getElementById("price").value,
    discount: +document.getElementById("discount").value,
  };
  try {
    await fetch(`https://api.shipap.co.il/products/${editId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedItem),
    });
    getProducts();
    showProductsLoader(false);
    showSnackBar("Editing Saved", 3000);
    editWrapper.classList.remove("edit-page-active");
  } catch (error) {
    console.log(error);
    showProductsLoader(false);
    showSnackBar("Editing Failed , Log back in and try again", 3000);
  }
};

buttons.forEach((btn) => {
  if (btn.id == "to-login") {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.style.display = "block";
      signupForm.style.display = "none";
    });
  }

  if (btn.id == "to-signup") {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.style.display = "none";
      signupForm.style.display = "block";
    });
  }

  if (btn.id == "signup-btn") {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      signUp();
      console.log("function active");
    });
  }

  if (btn.id == "login-btn") {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      login();
      console.log("login-func active");
    });
  }

  if (btn.id == "edit-close") {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      editWrapper.classList.remove("edit-page-active");
    });
  }

  if (btn.id == "add-item") {
    btn.addEventListener("click", (e) => {
      handleEditPage(false);
    });
  }

  if (btn.id == "edit-add") {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      addItem();
      handleEditPage(false);
    });
  }

  if (btn.id == "edit-save") {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      editProduct();
    });
  }

  if (btn.id == "log-out") {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      logOut();
    });
  }
});

function showSnackBar(text, timer) {
  var snackBar = document.getElementById("snackbar");
  snackBar.innerHTML = text;
  snackBar.className = "show";
  setTimeout(function () {
    snackBar.className = snackBar.className.replace("show", "");
  }, timer);
}

liBtns.forEach((li) => {
  li.addEventListener("click", () => {
    liBtns.forEach((item) => {
      item.className = "";
    });
    li.className = "li-active";
  });
});

const ItemsArr = document.querySelectorAll(".products-container > .product");

ItemsArr.forEach((div) => {
  div.addEventListener("click", (e) => {});
});

const handleEditPage = (element = false) => {
  const editInputs = document.querySelectorAll(
    "form.edit-page-container > input"
  );
  if (element) {
    document.getElementById("edit-add").style.display = "none";
    document.getElementById("edit-save").style.display = "block";
    const divChildrens = element.children;
    const divInputs = {
      item: divChildrens[0].innerHTML,
      price: divChildrens[1].innerHTML,
      discount: divChildrens[2].innerHTML,
    };
    editInputs.forEach((input) => (input.value = ""));
    editInputs[0].value = divInputs.item;
    editInputs[1].value = divInputs.price;
    editInputs[2].value = divInputs.discount;
    if (!editWrapper.classList.contains("edit-page-active")) {
      editWrapper.classList.add("edit-page-active");
    } else {
      editWrapper.classList.remove("edit-page-active");
      setTimeout(() => {
        editWrapper.classList.add("edit-page-active");
      }, 500);
    }
  }
  if (!element) {
    editInputs.forEach((input) => (input.value = ""));
    editWrapper.classList.add("edit-page-active");
    document.getElementById("edit-add").style.display = "block";
    document.getElementById("edit-save").style.display = "none";

    if (!editWrapper.classList.contains("edit-page-active")) {
      editWrapper.classList.add("edit-page-active");
    } else {
      editWrapper.classList.remove("edit-page-active");
      setTimeout(() => {
        editWrapper.classList.add("edit-page-active");
      }, 500);
    }
  }
};

const handleEvents = () => {
  document.querySelectorAll("#edit").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const parentDiv = btn.closest(".product");
      editId = parentDiv.id;
      handleEditPage(parentDiv);
    });
  });

  document.querySelectorAll("#remove-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const parentDiv = btn.closest(".product");
      parentDiv.id;
      removeProduct(parentDiv.id);
    });
  });
};

showProductsLoader = (bool) => {
  const loader = document.querySelector(".loader-products");

  if (bool) {
    loader.style.display = "block";
    productsContainer.style.display = "none";
  }
  if (!bool) {
    loader.style.display = "none";
    productsContainer.style.display = "block";
  }
};
