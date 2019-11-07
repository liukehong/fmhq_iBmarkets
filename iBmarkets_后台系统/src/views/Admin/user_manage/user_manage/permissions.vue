<template>
  <div class="item_box permissions">
    <div class="item_list_box">
      <!-- 权限容器 -->
      <div style="overflow: hidden; margin-bottom: .2rem;">
        <el-row>
          <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="12" :xl="10">
            <el-checkbox
              style="color: #000;"
              v-model="checked1"
              @change="(data)=>fnDoSome(data,1)"
            >{{ NAME(1) }}</el-checkbox>
          </el-col>
          <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="12" :xl="10">
            <el-checkbox
              style="color: #000;"
              v-model="checked2"
              @change="(data)=>fnDoSome(data,2)"
            >{{ NAME(2) }}</el-checkbox>
          </el-col>
          <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="12" :xl="10">
            <el-checkbox
              style="color: #000;"
              v-model="checked3"
              @change="(data)=>fnDoSome(data,3)"
            >{{ NAME(3) }}</el-checkbox>
          </el-col>
          <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="12" :xl="10">
            <el-checkbox
              style="color: #000;"
              v-model="checked4"
              @change="(data)=>fnDoSome(data,4)"
            >{{ NAME(4) }}</el-checkbox>
          </el-col>
          <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="12" :xl="10">
            <el-checkbox
              style="color: #000;"
              v-model="checked5"
              @change="(data)=>fnDoSome(data,5)"
            >{{ NAME(5) }}</el-checkbox>
          </el-col>
          <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="12" :xl="10">
            <el-checkbox
              style="color: #000;"
              v-model="checked6"
              @change="(data)=>fnDoSome(data,6)"
            >{{ NAME(6) }}</el-checkbox>
          </el-col>
          <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="12" :xl="10">
            <el-checkbox
              style="color: #000;"
              v-model="checked7"
              @change="(data)=>fnDoSome(data,7)"
            >{{ NAME(7) }}</el-checkbox>
          </el-col>
          <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="12" :xl="10">
            <el-checkbox
              style="color: #000;"
              v-model="checked8"
              @change="(data)=>fnDoSome(data,8)"
            >{{ NAME(8) }}</el-checkbox>
          </el-col>
          <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="12" :xl="10">
            <el-checkbox
              style="color: #000;"
              v-model="checked9"
              @change="(data)=>fnDoSome(data,9)"
            >{{ NAME(9) }}</el-checkbox>
          </el-col>
          <el-col class="col-item" :span="24" :xs="24" :sm="24" :md="24" :lg="12" :xl="10">
            <el-checkbox
              style="color: #000;"
              v-model="checked10"
              @change="(data)=>fnDoSome(data,10)"
            >{{ NAME(10) }}</el-checkbox>
          </el-col>
        </el-row>
      </div>
      <!-- 提交 -->
      <!-- <el-button size="small" type="primary" @click="submitForm('ruleForm')">{{ $t('btn.submit') }}</el-button> -->
      <!-- 返回 -->
      <el-button size="small" @click="p.pageType = 'list'">{{ $t('btn.return') }}</el-button>
    </div>
  </div>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
import GetUserInfo from "@/mixins/getUserInfo.js";
import MyValidate from "@/mixins/myValidate.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "permissions",
  mixins: [WatchScreen, GetUserInfo, MyValidate, MessageBox],
  inject: ["$main", "p"],
  data() {
    return {
      passType: "enter",
      list: [], // 权限数据
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false,
      checked6: false,
      checked7: false,
      checked8: false,
      checked9: false,
      checked10: false
    };
  },
  components: {},
  mounted() {
    let vm = this;
    vm.fnGetData();
  },
  methods: {
    // 权限名称
    NAME(data) {
      let vm = this;
      return vm.$t(`permission.num${data}`);
    },
    // 选中后的操作
    fnDoSome(data, num) {
      let vm = this;
      let params = {
        userId: vm.p.info.user_id,
        userPermissionNumber: num,
        userPermissionStatus: !!data ? 1 : 0
      };
      vm.$main.loading = true;
      vm.$api.SYSTEM_UPDATEUSERPERMISSION(params).then(res => {
        vm.$main.loading = false;
        if (res.code == 0) {
          vm.fnOpenMessageBox(vm.$t("alert.text20"), "success");
        } else {
          vm.fnOpenMessageBox(vm.$t(`error.${res.code}`), "error");
        }
        vm.fnGetData();
      });
    },
    // 获取该用户的权限
    fnGetData() {
      let vm = this;
      vm.$main.loading = true;
      let arrs = [];
      vm.$api
        .SYSTEM_GETUSERPERMISSIONALL({
          userId: vm.p.info.user_id
        })
        .then(res => {
          vm.$main.loading = false;
          //   vm.list = res.data;
          //   arrs = res.data;
          res.data.forEach((item, index) => {
            if (index == 0) {
              vm.checked1 = item.userPermissionStatus == 0 ? false : true;
            } else if (index == 1) {
              vm.checked2 = item.userPermissionStatus == 0 ? false : true;
            } else if (index == 2) {
              vm.checked3 = item.userPermissionStatus == 0 ? false : true;
            } else if (index == 3) {
              vm.checked4 = item.userPermissionStatus == 0 ? false : true;
            } else if (index == 4) {
              vm.checked5 = item.userPermissionStatus == 0 ? false : true;
            } else if (index == 5) {
              vm.checked6 = item.userPermissionStatus == 0 ? false : true;
            } else if (index == 6) {
              vm.checked7 = item.userPermissionStatus == 0 ? false : true;
            } else if (index == 7) {
              vm.checked8 = item.userPermissionStatus == 0 ? false : true;
            } else if (index == 8) {
              vm.checked9 = item.userPermissionStatus == 0 ? false : true;
            } else {
              vm.checked10 = item.userPermissionStatus == 0 ? false : true;
            }
          });
        });
    },
    // 表单提交
    submitForm(formName) {
      let vm = this;
      let params;
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          params = {
            userId: vm.p.info.user_id,
            pw: vm.ruleForm.newPassword,
            type: vm.ruleForm.type
          };
          vm.$main.loading = true;
          vm.$api.USER_RESETPASSWORD(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(vm.$t("alert.text13"), "success");
              vm.p.pageType = "list";
            } else {
              vm.fnOpenMessageBox(vm.$t(`error.${res.code}`), "error");
            }
          });
        } else {
          vm.fnOpenMessageBox(err, "error");
        }
      });
    }
  }
};
</script>

<style lang="scss">
.permissions {
  .el-checkbox {
    color: #000 !important;
  }
}
</style>
