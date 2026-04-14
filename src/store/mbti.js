import { defineStore } from 'pinia'
import { imageFile } from '../config/assets'

export const useMbtiStore = defineStore('mbti', {
  state: () => ({
    answers: [],
    questions: [
      {
        id: 1,
        title: '周一早晨',
        scene: '你刚进入办公室，发现邮箱里堆满了 20 封未读邮件，你的第一反应是？',
        bgUrl: imageFile('q1-bg.png'),
        options: [
          { text: '顺手拿起咖啡，先和碰面的同事聊两句周末趣事缓和气氛。', weight: { E: 1 } },
          { text: '默默走到位子上，戴上耳机，开始一封封处理邮件。', weight: { I: 1 } }
        ]
      },
      {
        id: 2,
        title: '突发危机',
        scene: '一个重要的项目突然出了差错，需要紧急制定新方案。你更倾向于：',
        bgUrl: imageFile('q2-bg.png'),
        options: [
          { text: '立即召集大家开会，通过头脑风暴碰撞灵感。', weight: { S: 1 } },
          { text: '自己先静下心来，梳理逻辑，形成一个清晰的整体框架。', weight: { N: 1 } }
        ]
      },
      {
        id: 3,
        title: '同事求助',
        scene: '一位平时关系不错的同事因为个人失误导致工作延误，向你求助。你会：',
        bgUrl: imageFile('q3-bg.png'),
        options: [
          { text: '先安慰她的情绪，告诉她“没事，我们一起想办法”。', weight: { F: 1 } },
          { text: '帮她冷静分析原因，找出最有效的补救方案。', weight: { T: 1 } }
        ]
      },
      {
        id: 4,
        title: '周五下午',
        scene: '下午 4 点，一个新任务突然派下来，要求周一早上交。你会：',
        bgUrl: imageFile('q4-bg.png'),
        options: [
          { text: '周五晚上加班干完，这样周末就可以彻底放松。', weight: { J: 1 } },
          { text: '先放一边，周末享受生活，周日晚上或周一早点来干。', weight: { P: 1 } }
        ]
      },
      {
        id: 5,
        title: '团建活动',
        scene: '公司组织团建，你更倾向于：',
        bgUrl: imageFile('q5-bg.png'),
        options: [
          { text: '积极参与，和大家一起玩游戏、聊天，享受热闹氛围。', weight: { E: 1 } },
          { text: '找个安静角落休息，或只和一两个人深度交流。', weight: { I: 1 } }
        ]
      },
      {
        id: 6,
        title: '接到新任务',
        scene: '领导交给你一个新项目，你首先会：',
        bgUrl: imageFile('q6-bg.png'),
        options: [
          { text: '先问清楚具体要求和截止时间，按步骤逐项执行。', weight: { S: 1 } },
          { text: '先思考整体目标和大方向，再细化行动方案。', weight: { N: 1 } }
        ]
      },
      {
        id: 7,
        title: '做决策',
        scene: '团队需要做一个重要决策，你更倾向于：',
        bgUrl: imageFile('q7-bg.png'),
        options: [
          { text: '基于数据和逻辑分析，选出最优解。', weight: { T: 1 } },
          { text: '考虑团队感受和价值观，尽量让大家都能接受。', weight: { F: 1 } }
        ]
      },
      {
        id: 8,
        title: '工作计划',
        scene: '新的一周开始，你会：',
        bgUrl: imageFile('q8-bg.png'),
        options: [
          { text: '列出详细待办清单，按优先级逐项完成。', weight: { J: 1 } },
          { text: '大致有个方向，根据当天状态灵活安排。', weight: { P: 1 } }
        ]
      },
      {
        id: 9,
        title: '午休时间',
        scene: '午休时，你更喜欢：',
        bgUrl: imageFile('q9-bg.png'),
        options: [
          { text: '和同事一起吃饭聊天，顺便交流工作。', weight: { E: 1 } },
          { text: '独自吃饭或散步，享受一段独处时光。', weight: { I: 1 } }
        ]
      },
      {
        id: 10,
        title: '方案讨论',
        scene: '开会讨论新方案时，你更关注：',
        bgUrl: imageFile('q10-bg.png'),
        options: [
          { text: '具体细节和可执行性，落地有没有风险。', weight: { S: 1 } },
          { text: '创新点和未来可能性，有没有更大想象空间。', weight: { N: 1 } }
        ]
      },
      {
        id: 11,
        title: '被质疑时',
        scene: '同事对你的方案提出质疑，你会：',
        bgUrl: imageFile('q11-bg.png'),
        options: [
          { text: '用事实和数据说明，理性论证自己的观点。', weight: { T: 1 } },
          { text: '先理解对方的顾虑和情绪，再一起沟通解决。', weight: { F: 1 } }
        ]
      },
      {
        id: 12,
        title: '临时变动',
        scene: '原定计划突然被打乱，你会：',
        bgUrl: imageFile('q12-bg.png'),
        options: [
          { text: '尽快调整新计划，重新梳理优先级。', weight: { J: 1 } },
          { text: '顺势而为，看看有什么新机会。', weight: { P: 1 } }
        ]
      }
    ],
    characters: {
      INTJ: { name: '幕后战略家', color: '#607D8B', tags: ['逻辑怪', '预判一切', '完美主义'], quote: '别和我说过程，我只看三年后的局。', match: 'ENFP / ENTP', imgUrl: imageFile('intj.png') },
      INTP: { name: '问题解决专家', color: '#00BCD4', tags: ['学术派', '好奇心强', '冷幽默'], quote: '比起执行，我更想知道它为什么能运转。', match: 'ENTJ / ESTJ', imgUrl: imageFile('intp.png') },
      ENTJ: { name: '铁腕指挥官', color: '#1A237E', tags: ['结果导向', '决断力', '效率至上'], quote: '跟上我的节奏，或者靠边站。', match: 'INTP / ISTP', imgUrl: imageFile('entj.png') },
      ENTP: { name: '头脑风暴家', color: '#FF9800', tags: ['点子王', '不走寻常路', '杠精'], quote: '如果只有一个方案，那肯定不够好。', match: 'INTJ / INFJ', imgUrl: imageFile('entp.png') },
      INFJ: { name: '精神导师', color: '#673AB7', tags: ['洞察力', '同理心', '完美主义'], quote: '我能看到你未被发掘的潜力。', match: 'ENTP / ENFP', imgUrl: imageFile('infj.png') },
      INFP: { name: '灵魂绘梦师', color: '#E91E63', tags: ['理想主义', '同理心', '内敛'], quote: '我不仅在工作，我是在为世界增添美好。', match: 'ENFJ / ENTJ', imgUrl: imageFile('infp.png') },
      ENFJ: { name: '社群建设者', color: '#FF5722', tags: ['感染力', '领导力', '利他'], quote: '大家的成长，就是我最大的成就。', match: 'INFP / ISFP', imgUrl: imageFile('enfj.png') },
      ENFP: { name: '职场快乐修勾', color: '#FFC107', tags: ['灵感炸弹', '乐观', '自由'], quote: '把工作变成一场盛大的派对！', match: 'INTJ / INFJ', imgUrl: imageFile('enfp.png') },
      ISTJ: { name: '秩序守护者', color: '#3F51B5', tags: ['靠谱', '细节控', '责任感'], quote: '流程和细节，是成功的唯一路径。', match: 'ESTP / ESFP', imgUrl: imageFile('istj.png') },
      ISFJ: { name: '幕后守护者', color: '#2196F3', tags: ['细心', '服务意识', '忠诚'], quote: '你放心冲，后勤交给我。', match: 'ESTJ / ISTJ', imgUrl: imageFile('isfj.png') },
      ESTJ: { name: '效率推土机', color: '#4CAF50', tags: ['执行力', '务实', '秩序'], quote: '别废话，按计划做，现在就要。', match: 'ISTP / ISFP', imgUrl: imageFile('estj.png') },
      ESFJ: { name: '团队粘合剂', color: '#00C853', tags: ['热心肠', '协调', '照顾他人'], quote: '大家都开心，工作才高效。', match: 'ISFP / INFP', imgUrl: imageFile('esfj.png') },
      ISTP: { name: '技术游侠', color: '#607D8B', tags: ['动手能力', '危机处理', '务实'], quote: '有问题？我能修，别打扰我就行。', match: 'ESTJ / ENTJ', imgUrl: imageFile('istp.png') },
      ISFP: { name: '职场艺术家', color: '#E91E63', tags: ['审美', '自由', '感性'], quote: '用我自己的方式，创造美的价值。', match: 'ENFJ / ESFJ', imgUrl: imageFile('isfp.png') },
      ESTP: { name: '救火队员', color: '#FF5722', tags: ['行动派', '冒险精神', '务实'], quote: '别做计划了，直接干，遇到问题再说！', match: 'ISTJ / ISFJ', imgUrl: imageFile('estp.png') },
      ESFP: { name: '舞台中心', color: '#FFC107', tags: ['即兴', '乐观', '表演欲'], quote: '把枯燥的日常，变成精彩的表演！', match: 'ISTJ / ISTP', imgUrl: imageFile('esfp.png') }
    }
  }),
  actions: {
    recordAnswer(questionId, weight) {
      this.answers = this.answers.filter(a => a.questionId !== questionId)
      this.answers.push({ questionId, weight })
    },
    reset() {
      this.answers = []
    },
    calculateResult() {
      const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
      this.answers.forEach(ans => {
        Object.entries(ans.weight).forEach(([key, val]) => {
          scores[key] += val
        })
      })
      const E_I = scores.E >= scores.I ? 'E' : 'I'
      const S_N = scores.S >= scores.N ? 'S' : 'N'
      const T_F = scores.T >= scores.F ? 'T' : 'F'
      const J_P = scores.J >= scores.P ? 'J' : 'P'
      return `${E_I}${S_N}${T_F}${J_P}`
    }
  }
})