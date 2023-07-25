let newObj;

const getContacts = () => {
  const pList = document.querySelectorAll(".title > p");
  const localObj = window.localStorage.getItem("contant");
  newObj = JSON.parse(localObj);

  pList.forEach((el) => {
    el.innerHTML = `${newObj[el.id]}`;
  });
};
