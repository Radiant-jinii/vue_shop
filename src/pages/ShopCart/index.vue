<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <!-- shopcart数据动态展示start -->
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @change="updateChecked(cart,$event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', +1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <!-- 通过计算属性达到总价 -->
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
        <!-- shopcart数据动态展示end -->
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllchecked" @click="updateAllCheckedCart($event.target.checked)"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    //拿到购物车数据的接口
    getData() {
      this.$store.dispatch("getCartList");
    },
    //派发actions的函数,修改数量
    handler: throttle(async function (type, disNum, cart) {
      //type区分发请求的是哪一个（因为加减和input都向服务器发送请求，得到数量变化后的接口数据）
      //disNum有两种情况：一种是加减（变化量），二对于input框则是变化后的量，不是变化量（skuNnm）
      //cart上面有发送请求需要的skuId,所以需要拿到对应的cart
      switch (type) {
        case "add":
          disNum = 1;
          break;
        case "minus":
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          //用户输入非法或者是负数，带给服务器的数据是0
          //这里的disNum是用户输入的数据
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            //正常情况，要给变化量
            //如果输入小数，则取整，然后减去初始值
            disNum = parseInt(disNum) - cart.skuNum;
          }
      }
      try {
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        this.getData();
      } catch (error) {
        alert(error.message)
      }
    },1000),
    //删除购物车产品的接口
    async deleteCartById(cart) {
      try {
        await this.$store.dispatch("deleteCartListBySkuId", cart.skuId);
        this.getData();
      } catch (error) {
       
      }
    },
    //修改某个产品的勾选状态
    updateChecked(cart,event){
      let isChecked=event.target.checked?"1":"0"
       this.$store.dispatch('updateCheckedById',{
        skuId:cart.skuId,isChecked:isChecked
     
      })
         this.getData();
    },
    //删除全部已选中的商品
   async deleteAllCheckedCart(){
      //这里的$store对应着大仓库
      //因为调用这个函数返回的是一个promise对象，所以通过await可以拿到该promise的
  try {
       await this.$store.dispatch('deleteAllCheckedCart')
       this.getData()
   
  } catch (error) {
     console.log(error.message);
  }
    },
    //全选按钮（使商品的状态变为全选）
   async updateAllCheckedCart(isChecked){
     try {
       this.$store.dispatch('updateAllCheckedCart',isChecked)
       this.getData()
     } catch (error) {
       console.log(error.message);
     } 
  }
  },
  //计算属性，拿到购物车商品的对象数组
  computed: {
    //通过mapGetters的映射，拿到cartObject这个对象
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    //计算产品总价
    totalPrice() {
      let total = 0;
      this.cartInfoList.forEach((item) => {
        let price = item.skuPrice;
        let num = item.skuNum;
        total += price * num;
      });
      return total;
    },
    isAllchecked() {
      return this.cartInfoList.every((item) => {
        return item.isChecked == 1;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
