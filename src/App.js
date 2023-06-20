import SortDataList from "./components/SortDataList.js";
import HideData from "./components/HideData.js";
import ScrollTop from "./components/ScrollTop.js";

class App {
  constructor($target) {
    this.$target = document.querySelector($target);
    this.dataList = [];
    this.sortDataList;
    this.hideData;
    this.scrollTop;
    this.render();
  }

  render = () => {
    this.settingInitial();
  }

  settingInitial = () => {
    this.setDataList();
    const $sortbys = document.querySelectorAll(".sortby");
    const $verified = document.querySelector("#verified_check");
    this.sortDataList = new SortDataList({
      $target: this.$target,
      $sortbys: $sortbys,
      dataList: this.dataList,
      handleSort: this.handleClickSortData,
    });
    this.hideData = new HideData({ 
      $target: this.$target, 
      $trigger: $verified, 
      hideData: "verified", 
      dataList: this.dataList,
      handleHide: this.handleChangeTrigger,
    });
    this.scrollTop = new ScrollTop("#top_btn");
  }

  setDataList = () => {
    const $keys = Array.from(document.querySelectorAll("thead td"));
    const keys = $keys.map($key => $key.dataset.sortby);
    const $trs = this.$target.querySelectorAll("tr");
    $trs.forEach(($tr, i) => {
      const $tds = $tr.querySelectorAll("td");
      const data = {}
      for(let i = 0; i < keys.length; i++) {
        const text = $tds[i].innerText;
        data[keys[i]] = isNaN(+text) ? text : (+text);
      }
      this.dataList.push(data);
    });
  }

  handleClickSortData = (event) => {
    const { target } = event;
    const sortby = target.dataset.sortby;
    if(target.classList.contains("isDecre")) {
      target.classList.remove("isDecre");
      this.sortDataList.settingSortDataList(sortby, false);
    } else {
      target.classList.add("isDecre");
      this.sortDataList.settingSortDataList(sortby, true);
    }
    this.$target = this.sortDataList.getTarget();
    this.hideData.setTarget(this.$target);
  }

  handleChangeTrigger = (event) => {
    const $target = event.target;
    this.hideData.settingDataList($target.checked);

    this.$target = this.hideData.getTarget();
    this.sortDataList.setTarget(this.$target);
  }
 
}

export default App;