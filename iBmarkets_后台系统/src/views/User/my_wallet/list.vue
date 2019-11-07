<template>
  <div style="overflow: hidden;" class="my_wallet_list">
    <div class="item_header">
      <div class="header_box" style="width:100%;">
        <!-- 充值明细 -->
        <div @click="type='add'" class="firstDiv" :class="type=='add'?'active':''">{{ $t('Wallet.text21') }}</div>
        <!-- 提现明细 -->
        <div @click="type='get'" :class="type=='get'?'active':''">{{ $t('Wallet.text22') }}</div>
        <!-- 转账明细 -->
        <div @click="type='transfer'" class="lastDiv" :class="type=='transfer'?'active':''">{{ $t('Wallet.text23') }}</div>
        <!-- 银行入金 -->
        <div @click="type='bank'" class="lastDiv" :class="type=='bank'?'active':''">{{ $t('Wallet.text24') }}</div>
        <!-- 钱包流水 -->
        <div @click="type='wallet'" class="lastDiv" :class="type=='wallet'?'active':''">{{ $t('Wallet.text25') }}</div>
      </div>
    </div>
    <ListAdd v-if="type=='add'"></ListAdd>
    <ListGet v-if="type=='get'"></ListGet>
    <ListTransfer v-if="type=='transfer'"></ListTransfer>
    <ListBank v-if="type=='bank'"></ListBank>
    <ListWallet v-if="type=='wallet'"></ListWallet>
  </div>
</template>
  <script>
import WatchScreen from "@/mixins/watchScreen.js";
import TableDate from "@/components/TableDate.vue";
import ListAdd from "./list_add.vue";
import ListGet from "./list_get.vue";
import ListTransfer from "./list_transfer.vue";
import ListBank from "./list_bank.vue";
import ListWallet from './list_wallet.vue';
export default {
  name: "my_wallet_list",
  mixins: [WatchScreen],
  components: {
    TableDate,
    ListAdd,
    ListTransfer,
    ListGet,
    ListBank,
    ListWallet
  },
  data() {
    return {
      type: "add"
    };
  }
};
</script>
<style lang="scss">
.my_wallet_list {
  .item_header {
    height: 0.28rem;
    line-height: 0.28rem;
    margin-bottom: 0.05rem;
    .header_box {
      height: 0.28rem;
      .active {
        background: rgba(24, 75, 139, 1);
        color: #fff;
      }
      div {
        float: left;
        font-size: 0.12rem;
        padding-left: 0.15rem;
        padding-right: 0.2rem;
        // background: rgba(28, 39, 56, 1);
        background: rgba(212, 216, 221, 1);
        color: #000;
        cursor: pointer;
      }
      .firstDiv {
        // border-radius: 45% 0px 0px 45%;
      }
      .lastDiv {
        // border-radius: 0px 45% 45% 0px;
      }
    }
  }
}
</style>
