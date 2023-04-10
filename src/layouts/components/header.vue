<template>
  <div class="header-box flex-row-between-center">
    <div class="left-box flex-row-start-center" @click="router.push('/login')">
      <img src="../../assets/images/favicon.png" alt="">
      <span>Matchmakting Testing Toolkit</span>
    </div>
    <div class="right-box flex-row-start-center">
      <a-dropdown :trigger="['click']">
        <div class="flex-row-between-center">
          <span>{{ 'Admin' }}</span>
			    <CaretDownOutlined />
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1"><SettingOutlined /> 系统设置</a-menu-item>
            <a-menu-item key="2"><FormOutlined /> 修改密码</a-menu-item>
            <a-menu-item key="3" @click="logout"><LoginOutlined /> 退出系统</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const logout = () => {
	router.push('/login')
}
</script>

<style lang="less" scoped>
.header-box {
  height: @headerHeight;
	background-color: @bgColor;
	padding: 0 20px;
	font-size: 16px;
	margin-bottom: 2px;

  .left-box {
    height: 100%;
    font-size: 22px;
    margin-right: 30px;
    color: @subColor;
    font-weight: 800;
    cursor: pointer;
    img {
      width: 36px;
      height: 36px;
      margin-right: 10px;
    }
  }
  .right-box {
    height: 100%;
    >.anticon {
      font-size: 20px;
      padding: 0 15px;
      cursor: pointer;
      &:hover {
        color: @activeColor;
      }
    }
    >.ant-dropdown-trigger {
      padding: 0 15px;
      cursor: pointer;

      .anticon {
        font-size: 14px;
        margin-left: 10px;
      }
    }
  }
  
}
</style>
