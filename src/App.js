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
    this.settingInitial();
  }

  settingInitial = () => {
    this.setDataList(); // table에 있는 data를 object[] 로 변환하여 dataList에 저장
    const $sortbys = document.querySelectorAll(".sortby"); // sort할 대상 버튼들
    this.sortDataList = new SortDataList({
      $target: this.$target,
      $sortbys: $sortbys,
      dataList: this.dataList,
      handleSort: this.handleClickSortData,
    });
    this.hideData = new HideData({ 
      $target: this.$target, 
      trigger: "#verified_check", 
      hideData: "verified", 
      dataList: this.dataList,
      handleHide: this.handleChangeTrigger,
    });
    this.scrollTop = new ScrollTop("#top_btn");
  }

  /**
   * table에 있는 데이터를 object list로 정리
   */
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

  /**
   * SortDataList class의 sort 버튼들에 적용할 이벤트 함수
   * @param {*} event 
   */
  handleClickSortData = (event) => {
    const { target } = event;
    const sortby = target.dataset.sortby;
    if(target.classList.contains("isDecre")) {
      target.classList.remove("isDecre");
      this.sortDataList.settingSortDataList(sortby, false); // from SortDataList
    } else {
      target.classList.add("isDecre");
      this.sortDataList.settingSortDataList(sortby, true); // from SortDataList
    }
    this.$target = this.sortDataList.getTarget(); // from SortDataList
    this.hideData.setTarget(this.$target); // from HideData
  }

  /**
   * HideData class의 data를 hide할 checkbox에 적용할 이벤트 함수
   * @param {*} event 
   */
  handleChangeTrigger = (event) => {
    const $target = event.target;
    this.hideData.settingDataList($target.checked); // from HideData

    this.$target = this.hideData.getTarget(); // from HideData
    this.sortDataList.setTarget(this.$target); // from SortDataList
  }
 
}

export default App;