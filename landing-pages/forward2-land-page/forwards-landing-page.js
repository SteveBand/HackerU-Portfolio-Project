const showMenu = () => {
  var element = document.getElementById("pop-nav");
  if (element.classList.contains("pop-nav-show")) {
    element.classList.remove("pop-nav-show");
  } else {
    element.classList.add("pop-nav-show");
  }
};
