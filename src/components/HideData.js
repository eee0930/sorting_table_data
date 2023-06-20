class HideData {
  /**
   * $target: 숨김을 적용할 대상 table, 
   * trigger: 숨김 적용 클릭 이벤트를 걸 checkbox id 또는 className, 
   * hideData: 숨김 적용 대상 key, 
   * dataList: table 안의 dataList,
   * handleHide: trigger의 event 함수
   * @param {object} hideData,
   */
  constructor({ $target, trigger, hideData, dataList, handleHide }) {
    this.$target = $target;
    this.$trigger = document.querySelector(trigger);
    this.hideData = hideData;
    this.dataList = dataList;
    this.handleChangeTrigger = handleHide;
    this.$trs = Array.from(this.$target.querySelectorAll("tr")); 
    this.settingInitial();
  }

  render = ($tr, isChecked) => {
    $tr.style.display = isChecked ? "none": "";
  }

  settingInitial = () => {
    this.$trs.map(($tr, i) => $tr.dataset.hideIdx = i);
    this.$trigger.addEventListener("change", this.handleChangeTrigger);
  }

  /**
   * [handleChangeTrigger에 의해 호출됨]
   * key에 해당되는 데이터를 찾아서 hidden or show 정보를 결정함
   * @method
   * @param {boolean} isChecked 
   */
  settingDataList = (isChecked) => {
    this.$trs.map($tr => {
      const trIdx = $tr.dataset.hideIdx;
      if(this.dataList[trIdx][this.hideData] === "false" || false) {
        this.render($tr, isChecked);
      }
    });
  }

  getTarget = () => {
    return this.$target;
  }

  setTarget = ($target) => {
    this.$target = $target;
    this.$trs = Array.from(this.$target.querySelectorAll("tr")); 
  }

}
 
 export default HideData;