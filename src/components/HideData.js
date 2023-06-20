class HideData {
  constructor({ $target, $trigger, hideData, dataList, handleHide }) {
    this.$target = $target;
    this.$trigger = $trigger;
    this.hideData = hideData;
    this.dataList = dataList;
    this.handleChangeTrigger = handleHide;
    this.$trs;
    this.settingInitial();
  }

  render = ($tr, isChecked) => {
    const trIdx = $tr.dataset.hideIdx;
    if(this.dataList[trIdx][this.hideData] === "false" || false) {
      $tr.style.display = isChecked ? "none": "";
    }
  }

  settingInitial = () => {
    this.setTrs();
    this.$trs.map(($tr, i) => $tr.dataset.hideIdx = i);
    this.$trigger.addEventListener("change", this.handleChangeTrigger);
  }

  settingDataList = (isChecked) => {
    this.$trs.map($tr => this.render($tr,isChecked));
  }

  getTarget = () => {
    return this.$target;
  }

  setTarget = ($target) => {
    this.$target = $target;
    this.setTrs();
  }

  setTrs = () => {
    this.$trs = Array.from(this.$target.querySelectorAll("tr")); 
  }
}
 
 export default HideData;