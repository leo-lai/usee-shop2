<template>
  <div class="l-page-group">
    <div class="l-page">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">{{ $route.meta.title }}</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content">
        <ul class="bd-top">
          <li>仅法人单位（具备公司营业执照）才可以申请。</li>
          <li>为了保护您的账号及安全，请勿替他人提交申请，所有操作只能本人进行，否则平台将不予通过。</li>
        </ul>
        <div class="l-form _rq _tr">
          <div class="l-form-row l-link-arrow">
            <label>代理类型</label>
            <div class="_rest _ipt">
              <select v-model="formData.agentId">
                <option value="1">小U店长</option>
                <option value="2">区域合伙人</option>
              </select>
            </div>
          </div>
          <div class="l-form-row">
            <label>真实姓名</label>
            <div class="_rest _ipt">
              <input type="text" placeholder="请填写" maxlength="50" v-model="formData.userName">
            </div>
          </div>
          <div class="l-form-row">
            <label>手机号码</label>
            <div class="_rest _ipt">
              <input type="tel" placeholder="请填写" maxlength="11" v-model="formData.phoneNumber">
            </div>
          </div>
          <div class="l-form-row">
            <label>身份证号</label>
            <div class="_rest _ipt">
              <input type="text" readonly placeholder="请填写" maxlength="18" @click="showKeyboard($event.target)" v-model="formData.idCards">
            </div>
          </div>
          <div class="l-form-row _middle">
            <label>营业执照</label>
            <div class="_rest _ipt" @click="chooseImage">
              <img v-if="formData.businessLicenseImage" :src="$utils.image.thumb(formData.businessLicenseImage, 60, 60)">
              <span v-else class="l-text-gray">请上传真实照片</span>
            </div>
          </div>
          <div class="l-form-row">
            <label>收货地址</label>
            <div class="_rest _ipt">
              <textarea rows="3" placeholder="请填写" maxlength="100" v-model="formData.address"></textarea>
            </div>
          </div>
        </div>
        <div class="l-fs-xs l-margin l-text-gray" style="margin-top:0.25rem;">收货地址将用于线下首批货发货使用，请填写正确地址</div>

        <div class="l-form-row l-margin-t">
          <label class="l-checkbox">
            <input type="checkbox" v-model="isAgree">
            <i></i>
            <span>阅读并同意</span>
          </label>
          <a @click="$pageTo('#page-agreement', '优视一号代理商协议')">《优视一号代理商协议》</a>
        </div>
        <div class="l-form-btn">
          <button type="button" class="mui-btn l-btn-main" :disabled="submiting" @click="submit">提交申请</button>
        </div>
      </div>
    </div>
    <div class="l-page" id="page-result">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">申请结果</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content l-text-center l-flex-vhc l-bg-white">
        <div class="l-padding" v-if="result === 0">
          <div style="margin:-5rem 0 1rem 0;">
            <i class="l-icon l-text-warn" style="font-size:3rem;">&#xe674;</i>
          </div>
          <h3>您的申请正在审核中</h3>
          <p class="l-text-gray l-fs-s l-margin">如有疑问，请您联系客服：<a href="tel:400-1806900">400-1806900</a></p>
          <div style="margin: 2rem auto auto; width: 70%;">
            <button @click="closeWindow" type="button" class="mui-btn l-btn-main" >返回</button>
          </div>
        </div>

        <div class="l-padding" v-else-if="result === 1">
          <div style="margin:-5rem 0 1rem 0;">
            <i class="l-icon l-text-main" style="font-size:3rem;">&#xe7f8;</i>
          </div>
          <h3>您的申请已审核通过</h3>
          <p class="l-text-gray l-fs-s l-margin">您可以通过公众号菜单“U视商城”购买U视一号产品，也可以通过“代理商”入口查看对应收益明细。</p>
          <div style="margin: 2rem auto auto; width: 70%;">
            <button @click="closeWindow" type="button" class="mui-btn l-btn-main" >返回</button>
          </div>
        </div>
        <div class="l-padding" v-else-if="result === 2">
          <div style="margin:-5rem 0 1rem 0;">
            <i class="l-icon l-text-hot" style="font-size:3rem;">&#xe694;</i>
          </div>
          <h3>您的申请未通过审核</h3>
          <p class="l-text-gray l-fs-s l-margin">如有疑问，请您联系客服：<a href="tel:400-1806900">400-1806900</a></p>
          <div style="margin: 2rem auto auto; width: 70%;">
            <button @click="$router.back()" type="button" class="mui-btn l-btn-main" >再次申请</button>
          </div>
        </div>
        <div class="l-padding" v-else>
          <div style="margin:-5rem 0 1rem 0;">
            <i class="l-icon l-text-main" style="font-size:3rem;">&#xe7f8;</i>
          </div>
          <h3>您的申请提交成功，请等待审核通过！</h3>
          <p class="l-text-gray l-fs-s l-margin">如有疑问，请您联系客服：<a href="tel:400-1806900">400-1806900</a></p>
          <div style="margin: 2rem auto auto; width: 70%;">
            <button @click="closeWindow" type="button" class="mui-btn l-btn-main" >返回</button>
          </div>
        </div>
      </div>
    </div>
    <div class="l-page" id="page-agreement">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">优视一号代理商协议</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content l-bg-white">
        <div class="l-padding l-fs-s l-agreement">
          <h2 class="l-text-center l-margin-b">优视一号代理商协议</h2>
          <div class="l-margin-b-m">
            <h4 class="l-margin-b-xs">【首部及导言】</h4>
            <p>为使用U视一号平台（以下简称“本平台”）及相关代理商服务，您应当阅读并遵守《优视力一号合作推广协议》（以下简称“本协议”）。请您务必审慎阅读、充分理解各条款内容，特别是免除或限制责任的相应条款，以及开通或使用某项服务的单独协议，并选择接受或不接受。限制、免责条款可能以加粗形式提示您注意。</p>
            <p>除非您已阅读并接受本协议所有条款，否则您无法提交代理申请并无权使用U视一号平台代理商服务。您必须为具备营业执照的法定代表人才能提交申请，否则平台不受理代理商申请，如果您对协议有任何疑问，可向U视一号平台客服咨询。</p>
          </div>
          <div class="l-margin-b-m">
            <h4 class="l-margin-b-xs">一、【协议的范围】</h4>
            <p>1.1 本协议是您与贵州优视一号生物科技有限公司之间关于您使用U视一号平台服务所订立的协议。“贵州优视一号生物科技有限公司”是指贵州优视一号生物科技有限公司及其相关服务可能存在的运营关联单位。“用户”是指提交申请、登录、使用U视一号平台服务的代理商组织，在本协议中更多地称为“您”。</p>
            <p>1.2 本服务是贵州优视一号生物科技有限公司向用户提供的信息发布、客户服务、企业管理以及与此相关的互联网技术服务。</p>
            <p>1.3 您提交线上申请不论是否U视一号平台审核通过，都视为认同并接受U视一号平台的经营管理制度、规范，U视一号平台审核通过则授权您在规定范围内作为“U视一号”品牌及产品的推广商。您接受授权后，从事和U视一号平台相关的业务活动按U视一号平台确认的统一规范和模式进行管理，您可以享受U视一号平台的专业服务与支持，但需要接受U视一号平台的业务监督。</p>
            <p>1.4 本协议授权推广产品为：U视一号产品。</p>
            <p>1.5 本协议授权推广渠道仅限于U视一号平台指定的U视一号线上商城。</p>
            <p>1.6 授权推广期限为与U视一号平台线下合同协议签订之日起一年的有效期。</p>
          </div>
          <div class="l-margin-b-m">
            <h4 class="l-margin-b-xs">二、【代理商帐号注册与认证】</h4>
            <p>2.1 您在使用本服务前需要关注U视一号公众号。贵州优视一号生物科技有限公司有权根据用户需求和产品需要对帐号注册和绑定的方式进行变更。 </p>
            <p>2.2 因用户行为导致与其他用户或第三方发生争议的，由用户独立对外承担责任，因此给贵州优视一号生物科技有限公司、其他用户或第三方造成损害的，您应当依法予以赔偿。</p>
            <p>2.3 为向用户提供更专业的服务，您同意授权贵州优视一号生物科技有限公司对您所提交的认证资料进行审核，并根据审核情况进行独立判断后确定认证结果。同时，为依法保护相关权利人的在先权利并规范平台运营，您的代理商平台账号需要相关人员认证审核才能登录或使用 。</p>
            <p>2.4 用户在提交代理商申请认证资料时，需提交真实有效的信息，否则，贵州优视一号生物科技有限公司有权拒绝或终止提供本服务，并依照本协议对违规帐号进行处罚。因此给贵州优视一号生物科技有限公司或第三方造成损害的，您应当依法予以赔偿。</p>
          </div>
          <div class="l-margin-b-m">
            <h4 class="l-margin-b-xs">三、【用户个人信息保护】</h4>
            <p>3.1 保护用户个人信息是贵州优视一号生物科技有限公司的一项基本原则，贵州优视一号生物科技有限公司将会采取合理的措施保护用户的个人信息。除法律法规规定的情形外，未经用户许可贵州优视一号生物科技有限公司不会向第三方公开、透露用户个人信息。贵州优视一号生物科技有限公司对相关信息采用专业加密存储与传输方式，保障用户个人信息的安全。</p>
            <p>3.2 您在申请本服务过程中，需要填写一些必要的信息，请保持这些信息的真实、准确、合法、有效并注意及时更新，以便贵州优视一号生物科技有限公司向您提供及时有效的帮助，或更好地为您提供服务。根据相关法律法规和政策，请您填写真实的身份信息。若您填写的信息不完整或不准确，则可能无法使用本服务或在使用过程中受到限制。</p>
            <p>3.3 您可随时浏览自己的代理商个人信息。</p>
            <p>3.4 贵州优视一号生物科技有限公司将运用各种安全技术和程序建立完善的管理制度来保护您的个人信息，以免遭受未经授权的访问、使用或披露。</p>
            <p>3.5 未经您的同意，贵州优视一号生物科技有限公司不会向贵州优视一号生物科技有限公司以外的任何公司、组织和个人披露您的个人信息，但法律法规另有规定的除外。</p>
            <p>3.6 您应对通过本服务了解、接收或可接触到的包括但不限于其他用户在内的任何人的个人信息予以充分尊重，您不应以搜集、复制、存储、传播或以其他任何方式使用其他用户的个人信息，否则，由此产生的后果由您自行承担。</p>
            <p>3.7 您理解并同意在和U视一号平台的合作期间，因与U视一号平台及U视一号平台授权品牌授权方的业务关系而掌握U视一号平台及U视一号平台授权品牌授权方的商业机密，如竞争和商业上的优势以及获得优势的机会（以下简称“机密”），这些机密涉及到其他领域，包括但不限于推广合同及相关条款、设计、行销计划、成本、销售、价格、报价、U视一号平台雇员或代表、以及项目、需求、政策、客户、供应商等，未经U视一号平台书面授权，乙方不可在合同期内或合同期满后以任何形式泄露给任何人或实体。</p>
          </div>
          <div class="l-margin-b-m">
            <h4 class="l-margin-b-xs">四、【帐号管理】</h4>
            <p>4.1 U视一号平台账号的所有权归贵州优视一号生物科技有限公司所有，用户完成申请手续并通过U视一号平台审核后，获得U视一号平台代理商账号的使用权，该使用权仅属于初始申请注册主体。帐号使用权禁止赠与、借用、租用、转让或售卖。</p>
            <p>4.2 U视一号平台账号密码具备初始密码，密码修改由您自行设定。贵州优视一号生物科技有限公司特别提醒您应妥善保管您的帐号和密码。贵州优视一号生物科技有限公司与您共同负有维护帐号安全的责任。贵州优视一号生物科技有限公司会采取并不断更新技术措施，努力保护您的帐号在服务器端的安全。您需要采取特定措施保护您的帐号安全，包括但不限于妥善保管U视一号平台账号与密码、安装防病毒木马软件、定期更改密码等措施。当您使用完毕后，应安全退出。您同意在任何情况下不向他人透露帐号或密码信息。因您保管不善可能导致帐号被他人使用（包括但不限于遭受盗号、密码失窃）或信息数据泄漏，责任由您自行承担。您理解并同意，在您未进行投诉或提出帐号申诉等方式明确告知贵州优视一号生物科技有限公司帐号被他人使用或信息数据泄漏等情况并提供相关证明材料前，贵州优视一号生物科技有限公司有理由相信该帐号行为是您使用帐号的行为。</p>
            <p>4.3 在您怀疑他人在使用您的帐号或密码时，您同意立即通知贵州优视一号生物科技有限公司。如果您当前使用的U视一号平台账号并不是您初始申请注册的或者通过贵州优视一号生物科技有限公司提供的其他途径获得的，但您却知悉该帐号当前的密码，您不得用该帐号登录或进行任何操作，并请您在第一时间通知贵州优视一号生物科技有限公司。如果贵州优视一号生物科技有限公司发现您并非该帐号初始申请注册主体，贵州优视一号生物科技有限公司有权在未经通知的情况下终止您使用该帐号。</p>
            <p>4.4 如您违反相关法律法规、本协议以及专项规则的规定，贵州优视一号生物科技有限公司有权进行独立判断并随时限制、冻结或终止您对U视一号平台账号的使用，且根据实际情况决定是否恢复使用。由此给您带来的所有损失由您自行承担。</p>
            <p>4.5 如果您的U视一号平台账号被盗、密码遗忘或因其他原因导致无法正常登录，您可以按照贵州优视一号生物科技有限公司的申诉途径进行申诉。贵州优视一号生物科技有限公司并不承诺您一定能通过申诉找回帐号。</p>
          </div>
          <div class="l-margin-b-m">
            <h4 class="l-margin-b-xs">五、【平台收益】</h4> 
            <p>5.1 您对推广产品需执行U视一号平台价规定的统一零售价，价格见线下签订合同。</p>
            <p>5.2 U视一号平台负责制定统一的电子版产品宣传资料，您以推广商身份进行商业推广活动时可以该资料为母本制作所需的其他宣传资料，但宣传资料在使用前必须先经U视一号平台书面审核同意，不得进行商业推广时禁止向潜在买家夸大宣传、虚假宣传、强迫消费等。</p>
            <p>5.3 您在推广期期间需全程接受U视一号平台的监管，保证其推广行为完全符合U视一号平台的标准规范（包括但不限于本合同系列文件、U视一号平台发布及更新的推广管理制度规范等）。</p>
          </div>
          <div class="l-margin-b-m">
            <h4 class="l-margin-b-xs">六、【风险及免责】</h4>
            <p>6.1 用户在使用本服务时，须自行承担如下贵州优视一号生物科技有限公司不可掌控的风险内容，包括但不限于：</p>
            <p>6.1.1 由于受到计算机病毒、木马或其他恶意程序、黑客攻击的破坏等不可抗拒因素可能引起的信息丢失、泄漏等风险；</p>
            <p>6.1.2 用户或贵州优视一号生物科技有限公司的电脑软件、系统、硬件和通信线路出现故障；</p>
            <p>6.1.3 用户操作不当或通过非贵州优视一号生物科技有限公司授权的方式使用本服务；</p>
            <p>6.1.4 用户发布的内容被他人转发、分享，因此等传播可能带来的风险和责任；</p>
            <p>6.1.5 由于网络信号不稳定等原因，所引起的登录失败、资料同步不完整、页面打开速度慢等风险；</p>
            <p>6.1.6 其他贵州优视一号生物科技有限公司无法控制或合理预见的情形。</p>

            <p>6.2 您理解并同意，因业务发展需要，贵州优视一号生物科技有限公司保留单方面对本服务的全部或部分服务内容在任何时候不经任何通知的情况下变更、暂停、限制、终止或撤销的权利，用户需承担此风险。</p>
            <p>6.3 贵州优视一号生物科技有限公司会根据您的数据记录分析并向您提供相应的推广服务。</p>
          </div>
          <div class="l-margin-b-m">
            <h4 class="l-margin-b-xs">七、【知识产权声明】</h4>
            <p>7.1 贵州优视一号生物科技有限公司在本服务中提供的内容（包括但不限于网页、文字、图片、音频、视频、图表等）的知识产权归贵州优视一号生物科技有限公司所有，用户在使用本服务中所产生的内容的知识产权归用户或相关权利人所有。</p>
            <p>7.2 双方须共同遵守知识产权、专用技术、商业秘密保护的相关法律法规和国际惯例。U视一号平台对“U视一号”系列知识产权、专用技术、商业秘密拥有独占性、排他性的权利，乙方不得将推广期间可能使用的或接触到的U视一号平台商标及技术用于超越授权范围的用途，尤其不得将U视一号平台的注册商标及法律许可U视一号平台使用的其他标记、文字、符号、形象、图形等提供给第三方，包括与此相关的容易混淆的任何标记、商标或公司名称。</p>
            <p>7.3 在您当前还拥有代理商资格账号的前提下，您可在授权范围内按照使用U视一号平台及推广产品所涉及的标识、外观形象及商标，但不得在推广范围外使用。合同终止后，您同意并理解按U视一号平台要求立即终止使用U视一号平台及其产品的商标及其他相关知识产权，并应停止授权产品的销售及促销活动，否则视为侵犯U视一号平台知识产权的行为。</p>
            <p>7.4 您发现第三方有实际或潜在的损害、伪造、非法使用授权品牌及商标等实际情况应立即书面通知U视一号平台。U视一号平台决定对以上情况采取措施，您应积极配合。</p>
          </div>
          <div class="l-margin-b-m">
            <h4 class="l-margin-b-xs">八、【用户的违约及处理】</h4>
            <p>8.1发生包括但不限于一下情形之一的，均视您为违约</p>
            <p>8.1.1 若乙方违反本协议第5.1款、第5.2款、第5.3款、第7.1款、第7.2款，第7.3款，第7.4款中任一款约定的。</p>
            <p>8.1.2 使用平台服务时违反有关法律法规规定的；</p>
            <p>8.2违约处理措施</p>
            <p>8.2.1 U视一号平台有权要求您立即改正违约行为</p>
            <p>8.2.2 U视一号平台有权单方终止本合同并要求乙方赔偿U视一号平台遭受的实际损失；</p>
          </div>
          <div class="l-margin-b-m">
            <h4 class="l-margin-b-xs">九、【协议的终止与变更】</h4>
            <p>9.1 双方合作过程中，U视一号平台可以与您协商以书面协议形式进行补充或调整，与本协议具有同等法律效力。</p>
          </div>
          <div class="l-margin-b-m">
            <h4 class="l-margin-b-xs">十、【其他】</h4>
            <p>10.1 若您和贵州优视一号生物科技有限公司之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交本U视一号平台所在地有管辖权的人民法院进行诉讼解决。</p>
          </div>
        </div>
      </div>
    </div>

    <number-keyboard ref="numberKeyboard" nk-type="idcard"></number-keyboard>
  </div>
</template>
<script>
import NumberKeyboard from 'components/number-keyboard'
export default {
  components: {
    NumberKeyboard
  },
  data () {
    return {
      submiting: false,
      isAgree: true,
      result: -1,
      formData: {
        agentId: '1',
        userName: '',
        phoneNumber: '',
        idCards: '',
        businessLicenseImage: '',
        address: ''
      }
    }
  },
  methods: {
    showKeyboard(input) {
      this.$refs.numberKeyboard.$emit('$keyboard:show', input)
    },
    chooseImage() {
      this.$server.chooseImage(1).then((localIds)=>{
        this.$server.uploadImage(localIds).then(({ serverIds, images, localIds })=>{
          this.formData.businessLicenseImage = images[0] || ''
        })
      }).catch((errMsg)=>{
        this.$mui.alert('添加图片失败，请刷新重试！', ()=>{
          this.$url.reload()
        })
      })
    },
    closeWindow() {
      this.$server.getWxConfig().then((wx)=>{
        wx.closeWindow()
      })
    },
    getApplyResult() {
      let userCode = this.$route.query._uc || ''
      if(userCode){
        this.$server.agent.getResult(userCode).then(({data})=>{
          this.result = data.agentState
          if(data.agentState > -1){
            this.$pageTo('#page-result', '申请结果', 'replace')
          }
        })
      }
    },
    submit() {
      let userCode = this.$route.query._uc || ''
      if(!this.formData.userName){
        this.$mui.toptip('必须填写真实姓名')
        return
      }
      if(!this.formData.phoneNumber){
        this.$mui.toptip('必须填写联系方式')
        return
      }
      if(!this.formData.idCards){
        this.$mui.toptip('必须填写身份证号')
        return
      }
      if(!this.formData.businessLicenseImage){
        this.$mui.toptip('必须上传营业执照')
        return
      }
      if(!this.isAgree){
        this.$mui.toptip('必须阅读并同意协议')
        return
      }

      this.formData.recommendAgentCode = userCode

      this.$mui.showWaiting()
      this.$server.agent.apply(this.formData).then(()=>{
        this.$pageTo('#page-result', '申请结果')
      }).finally(()=>{
        this.$mui.hideWaiting()
      })
    }
  },
  mounted() {
    this.$refs.numberKeyboard.$on('$keyboard:input', (val)=>{
      this.formData.idCards = val
    })
    this.getApplyResult()
  }
}
</script>
<style scoped lang="less">
.l-form._tr ._rest,
.l-form._tr ._ipt textarea,
.l-form._tr ._ipt input{text-align: right;}
.l-form._tr ._ipt select{direction: rtl;}
.l-form-row{background: #fff;display: flex; position: relative; padding:0.5rem 0.75rem;}
.l-form-row._middle{align-items: center;}
.l-form-row:before{
  content: ''; position: absolute; left: 0.75rem; top:0; right:0; height: 1px;  background: #efeff4;
  transform: scaleY(0.5); transform-origin: 0 0;
}
.l-form-row:first-child:before{background: transparent ;}
.l-form-row > label{display: block;font-weight: 400;min-width: 30%;}
.l-form-row > ._rest{flex: 1;}
.l-form-row ._ipt img{width: 2rem; height: 2rem; vertical-align: middle; margin-left: 0.75rem;}
.l-form-row ._ipt input, 
.l-form-row ._ipt textarea, 
.l-form-row ._ipt select{margin:0; padding: 0; background: transparent; border:none;}
.l-form._tr ._ipt textarea{padding: 0.15rem 0;}
.l-form-row ._tr, .l-form-row ._ipt._tr input{text-align: right;}
.l-form-btn{text-align: center;margin: 1rem 0.75rem;}
.l-form._rq .l-form-row > label:after,
.l-form-row._rq > label:after{
  content: '*'; margin:0 0.25rem; color: red; vertical-align: middle;
}

.bd-top{ margin: 0; padding: 0.5rem 0.75rem 0.5rem 1.75rem; background: linear-gradient(105deg, #ff784e, #f4524e); color: #fff; list-style-type: decimal; font-size: 0.7rem;  }
.bd-top li{line-height: 1.4; margin: 0.25rem 0;}
</style>