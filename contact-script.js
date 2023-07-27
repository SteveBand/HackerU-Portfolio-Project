let newObj;

const getContacts = () => {
  const pList = document.querySelectorAll(".title > p");
  const localObj = window.localStorage.getItem("contact");
  newObj = JSON.parse(localObj);

  if (pList && newObj) {
    pList.forEach((el) => {
      el.innerHTML = `${newObj[el.id]}`;
    });
  } else {
    document.querySelector("h1").innerHTML = "הראה שגיאה בשליחת הטופס";
  }
};
