export default {
  accountingFormatter(val) {
    return val.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
  }
}
