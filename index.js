const showMenu = () => {
  var element = document.getElementById("pop-nav");
  if (element.classList.contains("pop-nav-show")) {
    element.classList.remove("pop-nav-show");
  } else {
    element.classList.add("pop-nav-show");
  }
};
window.onscroll = () => {
  var current = "";
  let sections = document.querySelectorAll("section");
  let navLinks = document.querySelectorAll(".nav ul a");
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset + 500 >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((li) => {
    li.classList.remove("active");
    if (li.classList.contains(current)) {
      li.classList.add("active");
    }
  });
};

const pList = document.querySelectorAll(".p");

const submitForm = (e) => {
  e.preventDefault();
  const obj = {};
  const inputs = [...e.target].filter((i) => i.id);
  inputs.forEach((el) => {
    const { id, value } = el;
    obj[id] = value;
  });
  console.log(obj);
  window.localStorage.setItem("contact", JSON.stringify(obj));
  location.href = "contact.html";
};
