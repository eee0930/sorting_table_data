class SortDataList {
  /**
   * $target: sort를 적용할 대상 table,
   * $sortbys: sort event를 발생시킬 버튼들,
   * dataList: table 안 데이터들,
   * handleSort: sort event 함수,
   * @param {object} sortDataList 
   */
  constructor({ $target, $sortbys, dataList, handleSort }) {
    this.$target  = $target;
    this.$sortbys = $sortbys;
    this.dataList = dataList;
    this.handleClickSortData = handleSort;
    this.$trs = Array.from(this.$target.querySelectorAll("tr"));
    this.settingInitial();
  }

  render = ($trs) => {
    this.removeChildrenByEle(this.$target);
    $trs.map($tr => this.$target.appendChild($tr));
  }

  settingInitial = () => {
    this.$trs.map(($tr, i) => $tr.dataset.sortIdx = i);
    this.$sortbys.forEach($sort => 
      $sort.addEventListener("click", this.handleClickSortData)
    );
  }

  /**
   * [handleClickSortData에 의해 호출됨]
   * sortby로 데이터 재정리
   * @method
   * @param {string} sortby 
   * @param {boolean} isDecre 
   */
  settingSortDataList = (sortby, isDecre) => {
    const $trs = Array.from(this.$target.querySelectorAll("tr"));
    $trs.sort((a, b) => this.sortData(a, b, isDecre, sortby));
    this.render($trs);
  }

  sortData = (a, b, isDecre, sortby) => {
    const aValue = this.dataList[a.dataset.sortIdx];
    const bValue = this.dataList[b.dataset.sortIdx];
    aValue[sortby] = isNaN(+aValue[sortby]) ? aValue[sortby] : +aValue[sortby];
    bValue[sortby] = isNaN(+bValue[sortby]) ? bValue[sortby] : +bValue[sortby];
    if(typeof aValue[sortby] === "string") {
      const aString = aValue[sortby].toUpperCase();
      const bString = bValue[sortby].toUpperCase();
      if(aString > bString) {
        return isDecre ? 1 : -1;
      } else if(aString < bString) {
        return isDecre ? -1 : 1;
      } else {
        return 0;
      }
    } else if(typeof aValue[sortby] === "number") {
      return isDecre ? 
        bValue[sortby] - aValue[sortby] : 
        aValue[sortby] - bValue[sortby];
    }
  };

  getTarget = () => {
    return this.$target;
  }

  setTarget = ($target) => {
    this.$target = $target;
    this.$trs = Array.from(this.$target.querySelectorAll("tr"));
  }

  removeChildrenByEle = ($ele) => {
    while($ele.firstChild) {
      $ele.removeChild($ele.firstChild);
    }
  }
}


export default SortDataList;