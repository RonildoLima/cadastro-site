function selectButton(index) {
    var buttons = document.getElementsByClassName("menu-item");
    for (var i = 0; i < buttons.length; i++) {
      if (i === index) {
        buttons[i].classList.add("selected");
      } else {
        buttons[i].classList.remove("selected");
      }
    }
  }
  