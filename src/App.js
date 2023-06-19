import SortDataList from "./components/SortDataList.js";
import ScrollTop from "./components/ScrollTop.js";

import { fetchDataList } from "./api.js";

class App {
  constructor($target) {
    this.$target = document.querySelector($target);
    this.dataList = [];
    this.sortDataList;
    this.scrollTop;

    this.render();
  }

  render = async () => {
    this.settingApp();
    const dataList = this.dataList.length > 0 ? 
      this.dataList : await this.getDataList();

  }

  settingApp = async () => {
    const $tbody = this.$target.querySelector("#data_body");
    this.dataList = await this.getDataList();
    this.sortDataList = new SortDataList({
      $target: $tbody,
      dataList: this.dataList
    });
    this.scrollTop = new ScrollTop("#top_btn");

  }

  getDataList = async() => {
    const dataList = await fetchDataList();
    return dataList;
  }
}

export default App;