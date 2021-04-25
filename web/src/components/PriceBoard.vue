<template>
  <div class="ns-price-board">
    <div class="ns-price-board__row" role="ask5">
      <div class="ns-price-board__cell ns-price-board__cell--left"></div>
      <div class="ns-price-board__cell ns-price-board__cell--mid">
        {{ askPrice[4] }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--right">
        {{ askVol[4] }}
      </div>
    </div>
    <div class="ns-price-board__row" role="ask4">
      <div class="ns-price-board__cell ns-price-board__cell--left"></div>
      <div class="ns-price-board__cell ns-price-board__cell--mid">
        {{ askPrice[3] }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--right">
        {{ askVol[3] }}
      </div>
    </div>
    <div class="ns-price-board__row" role="ask3">
      <div class="ns-price-board__cell ns-price-board__cell--left"></div>
      <div class="ns-price-board__cell ns-price-board__cell--mid">
        {{ askPrice[2] }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--right">
        {{ askVol[2] }}
      </div>
    </div>
    <div class="ns-price-board__row" role="ask2">
      <div class="ns-price-board__cell ns-price-board__cell--left"></div>
      <div class="ns-price-board__cell ns-price-board__cell--mid">
        {{ askPrice[1] }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--right">
        {{ askVol[1] }}
      </div>
    </div>
    <div class="ns-price-board__row" role="ask1">
      <div class="ns-price-board__cell ns-price-board__cell--left"></div>
      <div class="ns-price-board__cell ns-price-board__cell--mid">
        {{ askPrice[0] }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--right">
        {{ askVol[0] }}
      </div>
    </div>
    <div
      class="ns-price-board__row ns-price-board__row--highlight"
      role="latest"
    >
      <div class="ns-price-board__cell ns-price-board__cell--left">
        {{ volume }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--mid">
        {{ lastPrice }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--right">
        {{ volume }}
      </div>
    </div>
    <div class="ns-price-board__row" role="bid1">
      <div class="ns-price-board__cell ns-price-board__cell--left">
        {{ bidVol[0] }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--mid">
        {{ bidPrice[0] }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--right"></div>
    </div>
    <div class="ns-price-board__row" role="bid2">
      <div class="ns-price-board__cell ns-price-board__cell--left">
        {{ bidVol[1] }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--mid">
        {{ bidPrice[1] }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--right"></div>
    </div>
    <div class="ns-price-board__row" role="bid3">
      <div class="ns-price-board__cell ns-price-board__cell--left">
        {{ bidVol[2] }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--mid">
        {{ bidPrice[2] }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--right"></div>
    </div>
    <div class="ns-price-board__row" role="bid4">
      <div class="ns-price-board__cell ns-price-board__cell--left">
        {{ bidVol[3] }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--mid">
        {{ bidPrice[3] }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--right"></div>
    </div>
    <div class="ns-price-board__row" role="bid5">
      <div class="ns-price-board__cell ns-price-board__cell--left">
        {{ bidVol[4] }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--mid">
        {{ bidPrice[4] }}
      </div>
      <div class="ns-price-board__cell ns-price-board__cell--right"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      askPrice: [1234, 1235, 1236, 1237, 1238],
      askVol: [12, 135, 12, 0, 12, 23],
      bidPrice: [1233, 1232, 1231, 1230, 1229],
      bidVol: [12, 135, 12, 0, 12, 35],
      lastPrice: 1234,
      volume: 120
    }
  },
  computed: {
    // askPrice1: () => this.askPrice[0],
    // askPrice2: () => this.askPrice[1],
    // askPrice3: () => this.askPrice[2],
    // askPrice4: () => this.askPrice[3],
    // askPrice5: () => this.askPrice[4],
    // bidPrice1: () => this.bidPrice[0],
    // bidPrice2: () => this.bidPrice[1],
    // bidPrice3: () => this.bidPrice[2],
    // bidPrice4: () => this.bidPrice[3],
    // bidPrice5: () => this.bidPrice[4]
  }
}
</script>

<style>
.ns-price-board {
  font-size: 8px;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: rgba(20, 20, 20, 0.4);
  color: lightgray;
  padding: 0 10px;
}
.ns-price-board__row {
  display: flex;
  width: 100%;
  height: 100%;
}
.ns-price-board__cell {
  width: 100%;
  height: 100%;
  text-align: center;
}
.ns-price-board__row--highlight {
  border-top: 1px solid rgb(206, 48, 48);
  border-bottom: 1px solid rgb(206, 48, 48);
}
</style>
