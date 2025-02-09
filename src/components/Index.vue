<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div>
    <div class="head immersive">
      <img class="head-img" src="./static/v1/images/head.png" alt="" srcset="">
    </div>
    <div class="tab-wrapper">
      <div class="tab-head ">
        <div class="item gun-stands on"></div>
        <a class="item all" href="https://www.onebiji.com/hykb_tools/ty_query/index.html#/home?pid=31"
           title="枪械码大全">
        </a>
      </div>
      <div class="tab-content">
        <div class="content">
          <form id="gai_search_form" style="margin:0;padding:0;">
            <div class="search-wrapper">
              <input type="text" placeholder="请输入枪械名">
              <a class="close"></a>
              <a href="javascript:void(0);" class="search-btn"></a>
            </div>
          </form>
          <div class="options" id="options">
            <a class="guns">全部枪械</a>
            <a class="lables">标签筛选</a>
            <a class="sort">点赞最多</a>
            <div class="options-content">
              <div class="guns-box box" style="display:none;">
                <div class="guns-head" id="head_cate">
                  <div class="item on">全部</div>
                  <div class="item" data-cid="9">突击步枪</div>
                  <div class="item" data-cid="5">冲锋枪</div>
                  <div class="item" data-cid="7">射手步枪</div>
                  <div class="item" data-cid="6">狙击步枪</div>
                  <div class="item" data-cid="10">霰弹枪</div>
                  <div class="item" data-cid="8">轻机枪</div>
                  <div class="item" data-cid="4">手枪</div>
                </div>
                <div class="guns-content" id="head_guns_content">
                  <div class="item" data-cid="6" data-gun-id="51">SV-98狙击步枪</div>
                  <div class="item" data-cid="6" data-gun-id="50">R93狙击步枪</div>
                  <div class="item" data-cid="6" data-gun-id="49">M700狙击步枪</div>
                  <div class="item" data-cid="6" data-gun-id="48">AWM狙击步枪</div>
                  <div class="item" data-cid="7" data-gun-id="47">Mini射手步枪</div>
                  <div class="item" data-cid="7" data-gun-id="46">VSS射手步枪</div>
                  <div class="item" data-cid="7" data-gun-id="45">SVD狙击步枪</div>
                  <div class="item" data-cid="7" data-gun-id="44">M14射手步枪</div>
                  <div class="item" data-cid="7" data-gun-id="43">SKS射手步枪</div>
                  <div class="item" data-cid="4" data-gun-id="42">QSZ92G</div>
                  <div class="item" data-cid="4" data-gun-id="41">.357左轮</div>
                  <div class="item" data-cid="4" data-gun-id="40">沙漠之鹰</div>
                  <div class="item" data-cid="4" data-gun-id="39">G18</div>
                  <div class="item" data-cid="4" data-gun-id="38">93R</div>
                  <div class="item" data-cid="4" data-gun-id="37">G17</div>
                  <div class="item" data-cid="7" data-gun-id="36">SR-25射手步枪</div>
                  <div class="item" data-cid="8" data-gun-id="35">PKM通用机枪</div>
                  <div class="item" data-cid="8" data-gun-id="34">M249轻机枪</div>
                  <div class="item" data-cid="10" data-gun-id="33">M1014霰弹枪</div>
                  <div class="item" data-cid="9" data-gun-id="32">AKM突击步枪</div>
                  <div class="item" data-cid="9" data-gun-id="31">QBZ95-1突击步枪</div>
                  <div class="item" data-cid="9" data-gun-id="30">AKS-74U突击步枪</div>
                  <div class="item" data-cid="10" data-gun-id="29">S12K霰弹枪</div>
                  <div class="item" data-cid="9" data-gun-id="28">ASh-12战斗步枪</div>
                  <div class="item" data-cid="9" data-gun-id="27">K416突击步枪</div>
                  <div class="item" data-cid="9" data-gun-id="26">M16A4突击步枪</div>
                  <div class="item" data-cid="9" data-gun-id="25">AUG突击步枪</div>
                  <div class="item" data-cid="9" data-gun-id="24">M7战斗步枪</div>
                  <div class="item" data-cid="9" data-gun-id="23">SG552突击步枪</div>
                  <div class="item" data-cid="10" data-gun-id="22">M870霰弹枪</div>
                  <div class="item" data-cid="5" data-gun-id="21">MP5冲锋枪</div>
                  <div class="item" data-cid="9" data-gun-id="20">AK-12突击步枪</div>
                  <div class="item" data-cid="5" data-gun-id="19">P90</div>
                  <div class="item" data-cid="5" data-gun-id="18">Vector</div>
                  <div class="item" data-cid="5" data-gun-id="17">UZI冲锋枪</div>
                  <div class="item" data-cid="5" data-gun-id="16">SR-3M紧凑突击步枪</div>
                  <div class="item" data-cid="9" data-gun-id="15">SCAR-H战斗步枪</div>
                  <div class="item" data-cid="5" data-gun-id="14">勇士冲锋枪</div>
                  <div class="item" data-cid="9" data-gun-id="13">G3战斗步枪</div>
                  <div class="item" data-cid="9" data-gun-id="12">PTR-32突击步枪</div>
                  <div class="item" data-cid="9" data-gun-id="11">AS Val突击步枪</div>
                  <div class="item" data-cid="9" data-gun-id="10">M4A1突击步枪</div>
                  <div class="item" data-cid="9" data-gun-id="7">CAR-15突击步枪</div>
                  <div class="item" data-cid="5" data-gun-id="6">野牛冲锋枪</div>
                  <div class="item" data-cid="5" data-gun-id="5">SMG-45冲锋枪</div>
                </div>
                <div class="btn-box">
                  <a href="javascript:void(0);" class="btn1" id="reset_cate_gun_btn">重置</a>
                  <a href="javascript:void(0);" class="btn2" id="ok_cate_gun_btn">完成</a>
                </div>
              </div>
              <div class="lables-box box" style="display:none;">
                <div class="lables-content">
                  <div class="item" data-id="1"><img class="icon" src="./static/v1/images/s1.png"
                                                     alt="萌新推荐" srcset="">萌新推荐
                  </div>
                  <div class="item" data-id="2"><img class="icon" src="./static/v1/images/s2.png" alt="性价比"
                                                     srcset="">性价比
                  </div>
                  <div class="item" data-id="3"><img class="icon" src="./static/v1/images/s3.png" alt="满配枪"
                                                     srcset="">满配枪
                  </div>
                  <div class="item" data-id="4"><img class="icon" src="./static/v1/images/s4.png"
                                                     alt="主播专用" srcset="">主播专用
                  </div>
                  <div class="item" data-id="5"><img class="icon" src="./static/v1/images/s5.png"
                                                     alt="全面战场" srcset="">全面战场
                  </div>
                  <div class="item" data-id="6"><img class="icon" src="./static/v1/images/s6.png"
                                                     alt="零号大坝" srcset="">零号大坝
                  </div>
                </div>
                <div class="btn-box v2">
                  <a href="javascript:void(0);" class="btn1" id="reset_tag_btn">重置</a>
                  <a href="javascript:void(0);" class="btn2" id="ok_tag_btn">完成</a>
                </div>
              </div>
              <div class="sort-box box" style="display:none;">
                <div class="sort-content" id="sort-content">
                  <a class="item" sort="id"> 最新发布</a>
                  <a class="item" sort="collect"> 收藏最多</a>
                  <a class="on item" sort="zan"> 点赞最多</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="list_div">
      <div class="list1" style="display: none;">
      </div>
      <div class="more">
        加载中...
      </div>
      <div class="content no-content" style="display: none;">
        <div class="null-tip">
          <img src="./static/v1/images/null.png" alt="" srcset="">
          <p class="des">
            这里空空如也，<br>
            点击下方【+】创建并分享你的专有改枪吧！
          </p>
        </div>
      </div>
    </div>
    <div class="tool-tip">
      <img src="./static/v1/images/tool_tip.png" alt="" srcset="">
      <a class="close"></a>
      <a href="javascript:;" onclick="ACT.toToolsList()" class="icon"></a>
    </div>
    <div class="sidebar">
      <a href="javascript:;" class="item" onclick="ACT._dialog('dialog_shuoming')">
        <img src="./static/v1/images/use.png" alt="" srcset="">
      </a>
      <a href="javascript:;" class="top item" id="top_btn" style="display: none">
        <img src="./static/v1/images/top.png" alt="" srcset="">
      </a>
      <a class="collapse">
        <img src="./static/v1/images/unfold.png" alt="" srcset="">
      </a>
    </div>
    <a href="javascript:;" class="unfold">
      <img src="./static/v1/images/unfold.png" alt="" srcset="">
    </a>
    <div class="bottom-bar step_div index_div">
      <a href="" class="item home on"><span class="str">首页</span></a>
      <a href="javascript:;" onclick="ACT.toForumDetail(38263,'攻略站', '');return false;" class="item strategy"><span
          class="str">攻略站</span></a>
      <a href="javascript:;" class="refit statBtn" onclick="ACT.toGaiPage()" data-stat-id="11">改装搭配</a>
      <a href="https://m.bbs.3839.com/forum-38263.htm" class="item forum"><span class="num">25.3万讨论</span><span
          class="str">论坛交流</span></a>
      <a href="javascript:;" onclick="ACT.toMyPage(1)" class="item mine "><span class="str">我的</span></a>
    </div>
    <div style="width:6rem;display:none;" id="dialog_other_place_login">
      <div class="dialog-base dialog-center">
        <div class="inner">
          <div class="dia-con">
            <div class="dia-f28">你的账号已经在另外一台设备登录，如非本人操作请注意账号安全。</div>
          </div>
          <div class="dia-btn">
            <a class="bt1 dialog_other_place_login_close" href="">知道了</a>
            <a class="bt2" href="" onclick="window.activityInterface.switchToMine(); return false;">重新登录</a>
          </div>
        </div>
      </div>
    </div>
    <div style="width:6rem;display:none;" id="dialog_version">
      <div class="dialog-base dialog-center">
        <div class="inner">
          <div class="dia-con">
            <div class="dia-f28">本活动需要更新到最新版本快爆即可参与哦！<br>升级途径：首页<span
                class="cl-green">【我的】</span>- 右上角齿轮<span class="cl-green">【设置】</span>-检查新版本
            </div>
          </div>
          <div class="dia-btn">
            <a class="bt1 dialog_version_close" href="">好的</a>
            <a class="bt2" href="" onclick="window.activityInterface.toSetting(); return false;">去升级</a>
          </div>
        </div>
      </div>
    </div>
    <div class="dia v2" id="dialog_shuoming" style="display: none">
      <span class="dia-close dialog_shuoming_close"></span>
      <div class="dia-title">
        工具使用说明
      </div>
      <div class="html-content">
        <p class="txt">
          <img src="https://img.71acg.net/sykb~bbs/pc/1726818211564" alt="改枪">
        </p></div>
    </div>
    <div style="width:6rem;display:none;" id="dialog_msg">
      <div class="dialog-base dialog-center">
        <div class="inner">
          <div class="dia-con">
            <div class="dia-f28 mt10" id="dialog_msg_info"></div>
          </div>
          <div class="dia-btn">
            <a class="bt1 dialog_msg_close" href="">好的</a>
          </div>
        </div>
      </div>
    </div>
    <div style="width:6rem;display:none;" id="dialog_record">
      <div class="dialog-base dialog-center">
        <div class="inner">
          <div class="dia-con">
            <div class="dia-f28 mt10">检测到上一次未完成改枪，是否返回上次改枪界面</div>
          </div>
          <div class="dia-btn">
            <a class="bt1 dialog_record_close" href="javascript:;" onclick="ACT.clearRecord();">否</a>
            <a class="bt2 dialog_record_close" href="javascript:;" onclick="ACT.loadRecord();">是</a>
          </div>
        </div>
      </div>
    </div>
    <div style="width:6rem;display:none;" id="dialog_back_queren">
      <div class="dialog-base dialog-center">
        <div class="inner">
          <div class="dia-con">
            <div class="dia-f28 mt10">即将返回工具箱，如需返回之前页面，请点击底部【上一步】<br>下次回来：【首页搜索——三角洲改枪】
            </div>
          </div>
          <div class="dia-btn">
            <a class="bt1 dialog_back_queren_close" href="">取消</a>
            <a class="bt2 dialog_back_queren_close" href="" onclick="ACT.toToolsList(1)">确定</a>
          </div>
        </div>
      </div>
    </div>
    <div style="width:6rem;display:none;" class="fixed-center" id="dialog_gai_ok">
      <div class="dialog-base dialog-center">
        <div class="inner">
          <div class="dia-con">
            <div class="dia-f28 mt10">方案创建成功，你的方案将在1个工作日内审核，审核通过后将在【首页/我的-我的发布】中展示。
              <br>（预计将在24小时内审核通过）
            </div>
          </div>
          <div class="dia-btn">
            <a href="javascript:;" onclick="ACT.toMyPage(1);" class="dialog_gai_ok_close bt1">返回首页</a>
            <a href="javascript:;" onclick="ACT.makeImg();" class="dialog_gai_ok_close bt2 statBtn"
               data-stat-id="12">生成枪械卡</a>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹窗遮罩 -->
    <div class="create-dialog-mask"></div><!-- 下次如何回来 -->
    <div class="dialog-base dialog-center" id="kbtool_come_back_next_dlg" style="display: none;">
      <div class="inner">
        <div class="dia-tit">下次如何回来</div>
        <div class="dia-f26 ta-c">从【我的-常用功能】的<span class="cl-green">“快爆工具箱”</span>即可回来</div>
        <div class="dia-back-guide">
          <img src="https://img.71acg.net/sykb~bbs/pc/1736300670935596" alt="">
        </div>
        <div class="dia-btn">
          <a class="bt2 huge" href="" id="kbtool_know_come_back_next">我知道了</a>
        </div>
        <label class="dia-notip dia-notip-center" for="kbtool_no_remind_next"><input type="checkbox" name=""
                                                                                     id="kbtool_no_remind_next">下次不再提醒</label>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
