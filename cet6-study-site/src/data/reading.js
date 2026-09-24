export const readingPassages = [
  {
    id: 1,
    title: "The Future of Remote Work",
    difficulty: "中等",
    wordCount: 280,
    passage: `The COVID-19 pandemic has fundamentally transformed the way we work. What was once considered a temporary measure has evolved into a permanent shift in workplace culture. Remote work, or telecommuting, has proven to be not only viable but often preferable for many employees and employers alike.

Studies conducted by major research institutions reveal that productivity levels among remote workers have remained stable or even increased compared to traditional office settings. Employees report higher job satisfaction due to reduced commute times, greater flexibility in managing personal responsibilities, and improved work-life balance. Companies, in turn, benefit from reduced overhead costs and access to a broader talent pool unconstrained by geographical limitations.

However, the transition to remote work is not without challenges. Many workers struggle with feelings of isolation and the blurring of boundaries between professional and personal life. Managers face difficulties in maintaining team cohesion and fostering company culture in a virtual environment. Additionally, concerns about data security and the adequacy of home office setups persist.

Looking ahead, experts predict that a hybrid model combining remote and in-office work will become the dominant paradigm. This approach aims to harness the benefits of both arrangements while mitigating their respective drawbacks. Organizations that successfully navigate this transition will likely gain a competitive advantage in attracting and retaining top talent.

The implications of this shift extend beyond individual companies to society at large. Urban planning, real estate markets, and transportation infrastructure may all require significant adaptation as the geography of work continues to evolve.`,
    questions: [
      {
        id: 1,
        question: "According to the passage, what has the COVID-19 pandemic done to workplace culture?",
        options: [
          "A. It has temporarily disrupted work patterns.",
          "B. It has caused a fundamental and permanent transformation.",
          "C. It has had minimal impact on how people work.",
          "D. It has only affected certain industries."
        ],
        correctAnswer: 1,
        explanation: "文章第一段明确指出疫情已经从临时措施演变为工作文化的永久性转变 (permanent shift in workplace culture)。"
      },
      {
        id: 2,
        question: "What benefit do companies gain from remote work according to the passage?",
        options: [
          "A. Higher employee turnover rates",
          "B. Increased office space requirements",
          "C. Access to a broader talent pool without geographical constraints",
          "D. More frequent team meetings"
        ],
        correctAnswer: 2,
        explanation: "第二段提到公司从远程工作中获益，包括减少间接成本和获得不受地理限制的更广泛人才库 (broader talent pool unconstrained by geographical limitations)。"
      },
      {
        id: 3,
        question: "Which of the following is mentioned as a challenge of remote work?",
        options: [
          "A. Increased productivity pressure",
          "B. Higher transportation costs",
          "C. Feelings of isolation among workers",
          "D. Excessive overtime requirements"
        ],
        correctAnswer: 2,
        explanation: "第三段指出许多工人在远程工作中面临孤立感 (feelings of isolation) 的困扰。"
      },
      {
        id: 4,
        question: "What work model do experts predict will become dominant in the future?",
        options: [
          "A. Fully remote work for all employees",
          "B. Complete return to traditional office work",
          "C. A hybrid model combining remote and in-office work",
          "D. Rotating shifts between different office locations"
        ],
        correctAnswer: 2,
        explanation: "第四段明确指出专家预测混合模式 (hybrid model) 将成为主导范式。"
      },
      {
        id: 5,
        question: "The passage suggests that the shift to remote work will affect all of the following EXCEPT:",
        options: [
          "A. Urban planning",
          "B. Real estate markets",
          "C. Educational curricula",
          "D. Transportation infrastructure"
        ],
        correctAnswer: 2,
        explanation: "最后一段提到城市规划、房地产市场和交通基础设施都会受影响，但没有提到教育课程 (educational curricula)。"
      }
    ]
  },
  {
    id: 2,
    title: "Artificial Intelligence in Healthcare",
    difficulty: "较难",
    wordCount: 310,
    passage: `Artificial intelligence is revolutionizing the healthcare industry, offering unprecedented opportunities to improve patient outcomes while reducing costs. From diagnostic imaging to drug discovery, AI applications are transforming virtually every aspect of medical practice.

One of the most promising applications of AI in healthcare is in medical imaging analysis. Machine learning algorithms can now detect abnormalities in X-rays, CT scans, and MRIs with accuracy that rivals or exceeds that of experienced radiologists. In some studies, AI systems have demonstrated the ability to identify early-stage cancers that human doctors might miss, potentially saving countless lives through earlier intervention.

The pharmaceutical industry has also embraced AI to accelerate drug development. Traditional drug discovery is a lengthy and expensive process, often taking over a decade and billions of dollars to bring a single medication to market. AI can dramatically shorten this timeline by predicting how different compounds will interact with biological targets, identifying promising candidates for further development, and optimizing clinical trial designs.

Despite these advances, the integration of AI into healthcare raises important ethical and practical concerns. Questions about data privacy, algorithmic bias, and the appropriate role of machines in medical decision-making remain unresolved. There is also the challenge of ensuring that AI systems are transparent and explainable, so that physicians can understand and verify their recommendations.

Furthermore, the healthcare workforce must adapt to work alongside AI tools. Medical education will need to evolve to prepare future doctors for a technology-augmented practice. Rather than replacing human physicians, AI is likely to serve as a powerful assistant, handling routine tasks and analysis while allowing doctors to focus on the uniquely human aspects of patient care: empathy, communication, and complex clinical judgment.

The transformation of healthcare through AI represents both an enormous opportunity and a significant responsibility for society to manage wisely.`,
    questions: [
      {
        id: 1,
        question: "What is one of the most promising applications of AI in healthcare mentioned in the passage?",
        options: [
          "A. Patient scheduling systems",
          "B. Medical imaging analysis",
          "C. Hospital administration",
          "D. Insurance claim processing"
        ],
        correctAnswer: 1,
        explanation: "第二段开头明确指出医学影像分析 (medical imaging analysis) 是AI在医疗领域最有前景的应用之一。"
      },
      {
        id: 2,
        question: "According to the passage, how does AI help in drug discovery?",
        options: [
          "A. By replacing all human researchers",
          "B. By eliminating the need for clinical trials",
          "C. By predicting compound interactions and optimizing trial designs",
          "D. By directly manufacturing medications"
        ],
        correctAnswer: 2,
        explanation: "第三段说明AI可以预测化合物与生物靶点的相互作用，识别有前景的候选药物，以及优化临床试验设计。"
      },
      {
        id: 3,
        question: "Which concern about AI in healthcare is NOT mentioned in the passage?",
        options: [
          "A. Data privacy issues",
          "B. Algorithmic bias",
          "C. High implementation costs",
          "D. Lack of transparency in AI systems"
        ],
        correctAnswer: 2,
        explanation: "第四段提到了数据隐私、算法偏见和透明度问题，但没有提到实施成本高的问题。"
      },
      {
        id: 4,
        question: "What role does the passage suggest AI will play for physicians?",
        options: [
          "A. AI will completely replace human doctors.",
          "B. AI will serve as a powerful assistant to doctors.",
          "C. AI will only be used for administrative tasks.",
          "D. AI will make medical education unnecessary."
        ],
        correctAnswer: 1,
        explanation: "第五段明确指出AI很可能作为强大的助手 (powerful assistant)，而不是取代人类医生。"
      },
      {
        id: 5,
        question: "The author's attitude toward AI in healthcare can best be described as:",
        options: [
          "A. Entirely skeptical and critical",
          "B. Cautiously optimistic with awareness of challenges",
          "C. Unconditionally enthusiastic",
          "D. Indifferent and neutral"
        ],
        correctAnswer: 1,
        explanation: "作者既强调了AI的巨大机遇，又指出了伦理和实践方面的问题，表现出谨慎乐观的态度。"
      }
    ]
  },
  {
    id: 3,
    title: "Sustainable Urban Development",
    difficulty: "中等",
    wordCount: 295,
    passage: `As the world's population increasingly concentrates in urban areas, the concept of sustainable urban development has gained critical importance. Cities now house more than half of the global population and are responsible for approximately 70 percent of worldwide carbon emissions. The way we design, build, and manage our cities will largely determine whether humanity can successfully address the climate crisis.

Sustainable urban development encompasses multiple dimensions, including environmental protection, social equity, and economic viability. Green building standards, efficient public transportation systems, and renewable energy infrastructure are essential components of environmentally sustainable cities. Equally important are affordable housing, accessible public services, and inclusive governance structures that ensure all residents can participate in and benefit from urban development.

Innovative cities around the world are pioneering approaches to sustainability. Singapore has implemented comprehensive water recycling systems and vertical gardens to maximize green space in a densely populated environment. Copenhagen has invested heavily in cycling infrastructure, with the goal of becoming the world's first carbon-neutral capital. Medellín, Colombia, has transformed from one of the most dangerous cities in the world to a model of inclusive urban renewal through investments in public transportation and community spaces.

These examples demonstrate that sustainable urban development is not merely an idealistic vision but an achievable goal. However, success requires sustained political commitment, substantial financial investment, and active citizen engagement. It also demands a willingness to challenge entrenched interests and conventional approaches to urban planning.

The stakes could not be higher. Cities that embrace sustainability will be better positioned to attract talent, foster innovation, and provide high quality of life for their residents. Those that fail to adapt may face mounting environmental, social, and economic challenges in the decades ahead.`,
    questions: [
      {
        id: 1,
        question: "According to the passage, what percentage of global carbon emissions do cities produce?",
        options: [
          "A. About 50 percent",
          "B. About 60 percent",
          "C. About 70 percent",
          "D. About 80 percent"
        ],
        correctAnswer: 2,
        explanation: "第一段明确指出城市约占全球碳排放的70% (approximately 70 percent)。"
      },
      {
        id: 2,
        question: "Which of the following is NOT mentioned as a dimension of sustainable urban development?",
        options: [
          "A. Environmental protection",
          "B. Social equity",
          "C. Military security",
          "D. Economic viability"
        ],
        correctAnswer: 2,
        explanation: "第二段提到可持续城市发展包括环境保护、社会公平和经济可行性，但没有提到军事安全。"
      },
      {
        id: 3,
        question: "What is Copenhagen's sustainability goal mentioned in the passage?",
        options: [
          "A. To eliminate all private vehicles",
          "B. To become the world's first carbon-neutral capital",
          "C. To build the largest vertical garden",
          "D. To achieve zero waste by 2030"
        ],
        correctAnswer: 1,
        explanation: "第三段指出哥本哈根的目标是成为世界上第一个碳中和首都 (first carbon-neutral capital)。"
      },
      {
        id: 4,
        question: "According to the passage, what does successful sustainable development require?",
        options: [
          "A. Only technological innovation",
          "B. Political commitment, financial investment, and citizen engagement",
          "C. International military cooperation",
          "D. Reduced urban population"
        ],
        correctAnswer: 1,
        explanation: "第四段明确列出成功需要持续的政治承诺、大量财政投资和积极的公民参与。"
      },
      {
        id: 5,
        question: "The passage mentions Medellín as an example of:",
        options: [
          "A. Failed urban planning",
          "B. Inclusive urban renewal through public investment",
          "C. Excessive industrialization",
          "D. Population decline"
        ],
        correctAnswer: 1,
        explanation: "第三段将麦德林描述为通过投资公共交通和社区空间实现包容性城市更新的典范。"
      }
    ]
  }
];

export default readingPassages;
