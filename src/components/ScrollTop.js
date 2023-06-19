class ScrollTop {
  /**
   * $btn is top button's id or className of HTML element
   * ex) "#topBtn" or ".topBtn"
   * @param {string} $btn 
   */
  constructor($btn) {
    this.$btn = document.querySelector($btn);
    this.setting();
  }

  setting = () => {
    window.addEventListener("scroll", this.handleShowBtn);
    this.$btn.addEventListener("click", this.handleClickTop);
  }

  handleShowBtn = () => {
    window.scrollY + window.innerHeight > document.body.scrollHeight - 80
    ? this.$btn.style.display = "block"
    : this.$btn.style.display = "none"
  }

  handleClickTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }
}

export default ScrollTop;