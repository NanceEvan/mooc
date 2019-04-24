// jsx就是讲html代码写在js里面， 最终转化成render方法， 每个节点都是createElement方法

import '../assets/styles/footer.styl'

export default {
  data () {
    return {
      author: 'Sizer'
    }
  },
  // 与vue不同的是讲template部分写到render方法中
  render () {
    return (
    // 使用这种方法可以直接在这里写js代码
      <div id="footer">
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
