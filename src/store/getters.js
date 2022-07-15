export default {
  trademarkList: state => state.search.searchList.trademarkList || [],
  goodsList: state => state.search.searchList.goodsList || [],
  attrsList: state => state.search.searchList.attrsList || [],
  total: state => state.search.searchList.total || "",

  categoryView: state => state.details.detailsList.categoryView || {},
  skuInfo: state => state.details.detailsList.skuInfo || {}
}