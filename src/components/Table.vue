<template>
    <div class="ListView">
        <tab>
            <tab-item @on-item-click="holdShow(e)">持仓</tab-item>
            <tab-item @on-item-click="hangShow(e)">挂单</tab-item>
            <tab-item @on-item-click="entrustShow(e)">委托</tab-item>
            <tab-item @on-item-click="accomShow(e)">成交</tab-item>
        </tab>
        <div class="holdPosition">
            <table>
                <thead>
                <!-- 表头字段不能写死, 写组件就要是考虑重用, 要通过传参设置 -->
                    <tr v-if="holdSwitch">
                        <th>合约名称</th>
                        <th>方向</th>
                        <th>总仓</th>
                        <th>可用</th>
                        <th>开仓均价</th>
                        <th>逐笔浮盈</th>
                    </tr>
                    <tr v-if="hangSwitch">
                        <th>合约名称</th>
                        <th>开平</th>
                        <th>委托价</th>
                        <th>委托量</th>
                        <th>挂单量</th>
                    </tr>
                    <tr v-if="entrustSwitch">
                        <th>合约名称</th>
                        <th>状态</th>
                        <th>开平</th>
                        <th>委托价</th>
                        <th>委托量</th>
                    </tr>
                    <tr v-if="accomSwitch">
                        <th>合约名称</th>
                        <th>开平</th>
                        <th>成交价</th>
                        <th>成交量</th>
                        <th>成交时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for = "item in hold" v-if="holdSwitch">
                        <td>{{item.name}}</td>
                        <td class="empty">{{item.direction}}</td>
                        <td>{{item.total}}</td>
                        <td>{{item.use}}</td>
                        <td>{{item.price}}</td>
                        <td class="earnFlo">{{item.float}}</td>
                    </tr>
                    <tr v-for = "item in hang" v-if="hangSwitch">
                        <td>{{item.name}}</td>
                        <td>{{item.openBan}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.nunber}}</td>
                        <td>{{item.hang}}</td>
                    </tr>
                    <tr v-for = "item in entrust" v-if="entrustSwitch">
                        <td>{{item.name}}</td>
                        <td>{{item.status}}</td>
                        <td>{{item.openBan}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.nunber}}</td>
                    </tr>
                    <tr v-for = "item in accom" v-if="accomSwitch">
                        <td>{{item.name}}</td>
                        <td>{{item.openBan}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.nunber}}</td>
                        <td>{{item.time}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { Tab, TabItem } from 'vux'

// TODO 点中某一行的时候，可以显示操作按钮（也可以不显示），由组件的使用方在使用时通过属性传参控制
// FIXME 切换tab时控制台会报错
export default {
  data () {
    return {
      holdSwitch: true,
      hangSwitch: false,
      entrustSwitch: false,
      accomSwitch: false,
      hold: [
                {id: 1, name: '泸银2006', direction: '空', total: '5', use: '5', price: '3964.2', float: '-30960'},
                {id: 2, name: '泸银2006', direction: '空', total: '5', use: '5', price: '3964.2', float: '-30960'},
                {id: 3, name: '泸银2006', direction: '空', total: '5', use: '5', price: '3964.2', float: '-30960'},
                {id: 4, name: '泸银2006', direction: '空', total: '5', use: '5', price: '3964.2', float: '-30960'}
      ],
      hang: [
                {id: 1, name: '泸银2006', openBan: '开', price: '3333.2', nunber: '100', hang: '62'},
                {id: 2, name: '泸银2006', openBan: '开', price: '3333.2', nunber: '100', hang: '62'},
                {id: 3, name: '泸银2006', openBan: '开', price: '3333.2', nunber: '100', hang: '62'},
                {id: 4, name: '泸银2006', openBan: '开', price: '3333.2', nunber: '100', hang: '62'}
      ],
      entrust: [
                {id: 1, name: '泸银2006', status: '开', openBan: '开', price: '3333.2', nunber: '100'},
                {id: 2, name: '泸银2006', status: '开', openBan: '开', price: '3333.2', nunber: '100'},
                {id: 3, name: '泸银2006', status: '开', openBan: '开', price: '3333.2', nunber: '100'},
                {id: 4, name: '泸银2006', status: '开', openBan: '开', price: '3333.2', nunber: '100'}
      ],
      accom: [
                {id: 1, name: '泸银2006', openBan: '开', price: '3333.2', nunber: '100', time: '14:57'},
                {id: 2, name: '泸银2006', openBan: '开', price: '3333.2', nunber: '100', time: '14:57'},
                {id: 3, name: '泸银2006', openBan: '开', price: '3333.2', nunber: '100', time: '14:57'},
                {id: 4, name: '泸银2006', openBan: '开', price: '3333.2', nunber: '100', time: '14:57'}
      ]
    }
  },
  components: {
    Tab,
    TabItem
  },
  methods: {
    // FIXME 想想如何简化状态代码？ 把四个状态变为一个状态
    holdShow () {
      this.holdSwitch = true
      this.hangSwitch = false
      this.entrustSwitch = false
      this.accomSwitch = false
    },
    hangShow () {
      this.holdSwitch = false
      this.hangSwitch = true
      this.entrustSwitch = false
      this.accomSwitch = false
    },
    entrustShow () {
      this.holdSwitch = false
      this.hangSwitch = false
      this.entrustSwitch = true
      this.accomSwitch = false
    },
    accomShow () {
      this.holdSwitch = false
      this.hangSwitch = false
      this.entrustSwitch = false
      this.accomSwitch = true
    }
  }
}
</script>

<style scoped>
    .ListView{
        width:100%;
        height: 50%;
    }

    .holdPosition{
        width:100%;
    }

    table{
        width: 100%;
        height: 100%;
    }

    .holdPosition th{
        color:#000;
        padding:0.5rem 1px;
        background:rgb(126, 125, 125);
    }

    .holdPosition tr{
        text-align: center;
    }

    .empty{
        color:aquamarine;
    }

    .earnFlo{
        color:aquamarine;
    }
</style>
