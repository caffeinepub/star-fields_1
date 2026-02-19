export interface PadaInfo {
  nakshatraName: string;
  padaNumber: 1 | 2 | 3 | 4;
  degreeRange: string;
  navamsaSign: string;
  title: string;
  description: string;
}

export const PADA_DATA: PadaInfo[] = [
  // ASHWINI
  {
    nakshatraName: 'Ashwini',
    padaNumber: 1,
    degreeRange: '0°00\'–3°20\'',
    navamsaSign: 'Aries',
    title: 'Initiatory Fire',
    description: 'Ashwini\'s first pada is pure ignition. This is raw, undiluted cardinal fire expressing itself without hesitation. There is instinct before thought, action before analysis. When the Moon occupies this pada, the emotional body responds immediately to stimulus. Reactions are fast, decisive, and sometimes impulsive — but rarely passive. This energy favors beginnings: starting conversations, launching projects, making first moves. Healing here happens through movement rather than contemplation. The body wants to move; stagnation feels intolerable.\n\nPsychologically, this pada operates from survival intelligence — a deep somatic knowing. It can manifest as bravery or recklessness depending on awareness. During this lunar phase, the collective mood leans toward urgency and independence. It\'s not ideal for long deliberation but powerful for cutting through hesitation. Trust instinct, but slow down just enough to ensure intention aligns with action. This is the spark before the journey begins.'
  },
  {
    nakshatraName: 'Ashwini',
    padaNumber: 2,
    degreeRange: '3°20\'–6°40\'',
    navamsaSign: 'Taurus',
    title: 'Grounded Vitality',
    description: 'The second pada stabilizes Ashwini\'s speed. The same initiating force becomes embodied and more sensual. Emotional reactions slow slightly and become tied to material security, comfort, and tangible outcomes. This phase favors practical action rather than impulsive movement. You may feel the desire to begin something — but now with intention to sustain it.\n\nThere is a strong connection between physical pleasure and emotional clarity in this pada. Food, touch, rest, and financial stability feel more important. Healing energy expresses through nourishment and grounding rather than adrenaline. The instinct to act remains, but it seeks durability.\n\nCollectively, this lunar tone supports building foundations. It\'s less about risk, more about anchoring vitality into something stable. If the previous pada was the spark, this is the first solid step. Avoid stubbornness or resistance to change — Ashwini\'s core nature is still movement — but now movement can root itself in something lasting.'
  },
  {
    nakshatraName: 'Ashwini',
    padaNumber: 3,
    degreeRange: '6°40\'–10°00\'',
    navamsaSign: 'Gemini',
    title: 'Curious Motion',
    description: 'Ashwini\'s third pada turns fire into thought. Initiative becomes intellectual and communicative. There is heightened curiosity, fast speech, and a need to exchange ideas. Emotionally, this phase feels restless — not physically urgent like Pada 1, but mentally stimulated.\n\nHealing here happens through conversation, information, and reframing. The impulse to start something may come through writing, messaging, learning, or networking. There is lightness and playfulness, but also a risk of scattering attention across too many pursuits.\n\nDuring this lunar period, the collective atmosphere becomes mentally charged. Decisions may be made quickly based on new information. It\'s an excellent time to brainstorm or gather data before taking larger action. However, grounding practices are essential to avoid burnout. Ashwini\'s fire still burns — but now it moves through language and thought rather than raw motion.'
  },
  {
    nakshatraName: 'Ashwini',
    padaNumber: 4,
    degreeRange: '10°00\'–13°20\'',
    navamsaSign: 'Cancer',
    title: 'Protective Instinct',
    description: 'The fourth pada internalizes Ashwini\'s fire. Initiative becomes emotionally guided. Instinct here is protective rather than aggressive. There is sensitivity beneath the surface, and action may arise in response to emotional needs — your own or others\'.\n\nThis phase encourages tending to personal boundaries and emotional security. You may feel driven to support loved ones or defend what feels vulnerable. Healing becomes more relational and nurturing.\n\nThe mood can fluctuate more strongly in this pada, as Cancer\'s influence brings memory and attachment into Ashwini\'s fast-moving energy. There is courage here — but it protects rather than conquers.\n\nAs the Moon prepares to leave Ashwini, this pada feels like the final emotional ignition before grounding into Bharani\'s depth. Reflect before reacting. Let instinct serve care rather than urgency.'
  },
  // BHARANI
  {
    nakshatraName: 'Bharani',
    padaNumber: 1,
    degreeRange: '13°20\'–16°40\'',
    navamsaSign: 'Leo',
    title: 'Dramatic Will',
    description: 'Bharani\'s first pada intensifies personal power. This is emotional heat with pride and creative force. Themes of authority, identity, and control may surface strongly. There is a desire to be seen, recognized, and validated.\n\nThis energy can feel dramatic — not necessarily negative, but potent. Emotional reactions are tied to ego and dignity. If handled consciously, this phase supports bold creative expression and courageous honesty. If unconscious, it can manifest as domination or stubbornness.\n\nThe lunar climate favors visibility and confidence. It is a strong time for performing, presenting, or asserting personal boundaries. But humility is essential — Bharani carries karmic undertones, and actions have consequences.\n\nThe fire here burns steadily, not impulsively. It wants to create something meaningful, not just initiate it.'
  },
  {
    nakshatraName: 'Bharani',
    padaNumber: 2,
    degreeRange: '16°40\'–20°00\'',
    navamsaSign: 'Virgo',
    title: 'Contained Intensity',
    description: 'This pada internalizes Bharani\'s force. Emotional intensity becomes analytical and controlled. You may feel pressure building beneath a composed exterior. There is focus on responsibility, detail, and consequence.\n\nDuring this phase, the mind seeks to organize emotional chaos. It\'s a powerful time for structured transformation — editing, refining, correcting. However, excessive self-criticism may arise.\n\nThe lunar mood feels serious. Productivity can be high if emotions are channeled constructively. Avoid suppressing feelings in pursuit of perfection. Bharani\'s depth demands acknowledgment, not repression.\n\nThis is the karmic workroom of Bharani — quiet, precise, but powerful.'
  },
  {
    nakshatraName: 'Bharani',
    padaNumber: 3,
    degreeRange: '20°00\'–23°20\'',
    navamsaSign: 'Libra',
    title: 'Relational Karma',
    description: 'In this pada, Bharani\'s intensity plays out through relationships. Emotional themes revolve around fairness, attraction, and power exchange. Partnerships feel charged.\n\nThere may be heightened awareness of imbalance or unspoken tension. Conversations carry weight. This phase favors honest negotiation and emotional maturity.\n\nCreatively, it supports collaboration — but only if both parties meet equally. The karmic undertone of Bharani becomes visible through interpersonal dynamics.\n\nHandle agreements carefully. What begins here may bind.'
  },
  {
    nakshatraName: 'Bharani',
    padaNumber: 4,
    degreeRange: '23°20\'–26°40\'',
    navamsaSign: 'Scorpio',
    title: 'Transformative Depth',
    description: 'This is Bharani at its most intense. Emotional experiences feel profound, private, and transformative. Themes of secrecy, endings, and rebirth surface.\n\nThe lunar climate may feel heavy — but it is purifying. It\'s an excellent time for psychological insight and releasing attachments that no longer serve growth.\n\nPower struggles are possible. Awareness is essential.\n\nThis pada marks the final compression of Bharani\'s energy before entering Krittika\'s cutting fire.'
  },
  // KRITTIKA
  {
    nakshatraName: 'Krittika',
    padaNumber: 1,
    degreeRange: '26°40\'–30°00\'',
    navamsaSign: 'Sagittarius',
    title: 'Philosophical Fire',
    description: 'Krittika\'s first pada channels fire through belief. This is conviction sharpened into clarity. Emotional reactions feel principled — as if something must be said or defended. The Moon here activates themes of truth, morality, and ideological alignment. Words may carry force, and honesty can feel uncompromising.\n\nThis phase favors cutting away illusions and false narratives. It is an excellent time for making decisions rooted in higher values. However, righteousness can harden into judgment if not tempered with humility.\n\nThere is a sense of mission here — a desire to purify not just behavior but meaning. Collectively, the mood may feel outspoken and direct. Fire burns upward in this pada, seeking philosophical coherence. It is a strong moment to realign your actions with your stated beliefs.'
  },
  {
    nakshatraName: 'Krittika',
    padaNumber: 2,
    degreeRange: '30°00\'–33°20\'',
    navamsaSign: 'Capricorn',
    title: 'Disciplined Edge',
    description: 'This pada contains Krittika\'s fire within structure. Emotional intensity becomes strategic. Rather than dramatic expression, there is calculation and restraint. Decisions feel deliberate and long-term.\n\nThe lunar climate supports setting boundaries, cutting excess, and restructuring commitments. This is a productive phase — particularly for serious conversations and responsibility-driven action. The tone is mature, sometimes austere.\n\nThere may be emotional heaviness, but it is purposeful. This is purification through discipline rather than impulse. If conflict arises, it will likely revolve around power or responsibility. Act carefully; the consequences of decisions made now may have enduring impact.'
  },
  {
    nakshatraName: 'Krittika',
    padaNumber: 3,
    degreeRange: '33°20\'–36°40\'',
    navamsaSign: 'Aquarius',
    title: 'Reforming Flame',
    description: 'Here, Krittika\'s cutting nature becomes reformist. The fire no longer burns for personal conviction alone but seeks systemic change. Emotional energy may feel detached yet radical.\n\nThis phase favors innovation, questioning outdated systems, and redefining social structures. Conversations may feel unconventional. There is clarity, but also unpredictability.\n\nCollectively, the mood may tilt toward rebellion or breakthrough thinking. This is a powerful time for progressive ideas. However, detachment can make emotional empathy feel distant. Balance clarity with connection.'
  },
  {
    nakshatraName: 'Krittika',
    padaNumber: 4,
    degreeRange: '36°40\'–40°00\'',
    navamsaSign: 'Pisces',
    title: 'Spiritual Purification',
    description: 'Krittika\'s fire dissolves into emotional cleansing. This phase softens the blade into compassion. Emotional intensity may turn inward, manifesting as reflection or spiritual sensitivity.\n\nThe Moon here supports emotional release and forgiveness. What is cut away now may be illusion rather than structure. There is a sense of surrender — purification through letting go rather than force.\n\nCreatively, this phase is intuitive and deeply expressive. Avoid escapism. Instead, allow the fire to illuminate inner truth.'
  },
  // ROHINI
  {
    nakshatraName: 'Rohini',
    padaNumber: 1,
    degreeRange: '40°00\'–43°20\'',
    navamsaSign: 'Aries',
    title: 'Creative Assertion',
    description: 'Rohini\'s fertile energy gains initiative here. Emotional desires feel active and expressive. There is drive to create, attract, and manifest. The Moon in this pada amplifies confidence and sensual magnetism.\n\nThis is a favorable phase for launching creative ideas. However, possessiveness can surface if emotional security feels threatened. Passion runs strong.\n\nThe collective tone leans toward bold self-expression. Grounded creativity thrives.'
  },
  {
    nakshatraName: 'Rohini',
    padaNumber: 2,
    degreeRange: '43°20\'–46°40\'',
    navamsaSign: 'Taurus',
    title: 'Embodied Abundance',
    description: 'This is Rohini at full potency. Sensuality, fertility, comfort, and material growth peak. Emotional experience feels stable yet deeply pleasurable.\n\nThe Moon here encourages building something tangible — art, relationships, financial plans. Security becomes central.\n\nAvoid overindulgence. Growth must remain balanced. This phase is ideal for nurturing long-term prosperity.'
  },
  {
    nakshatraName: 'Rohini',
    padaNumber: 3,
    degreeRange: '46°40\'–50°00\'',
    navamsaSign: 'Gemini',
    title: 'Expressive Growth',
    description: 'Rohini\'s creativity becomes communicative. Emotional experience flows into language, art, and dialogue. There is charm and wit in interactions.\n\nThis is excellent for sharing ideas, collaborating, or marketing creative projects. However, restlessness may interrupt steady growth.\n\nStability remains important, but now it moves through conversation.'
  },
  {
    nakshatraName: 'Rohini',
    padaNumber: 4,
    degreeRange: '50°00\'–53°20\'',
    navamsaSign: 'Cancer',
    title: 'Emotional Fertility',
    description: 'Rohini\'s nurturing nature deepens. Emotional bonds strengthen. The desire for safety and intimacy intensifies.\n\nThis phase favors family, home, and emotional repair. Sensitivity increases.\n\nThe lunar climate feels warm but protective. Attachment is strong; choose carefully what you nurture.'
  },
  // MRIGASHIRA
  {
    nakshatraName: 'Mrigashira',
    padaNumber: 1,
    degreeRange: '53°20\'–56°40\'',
    navamsaSign: 'Leo',
    title: 'Expressive Curiosity',
    description: 'Mrigashira\'s searching energy becomes dramatic and visible. Emotional curiosity wants an audience.\n\nThis phase favors storytelling and creative exploration. Pride may shape inquiry.\n\nConfidence supports discovery, but avoid performative distraction.'
  },
  {
    nakshatraName: 'Mrigashira',
    padaNumber: 2,
    degreeRange: '56°40\'–60°00\'',
    navamsaSign: 'Virgo',
    title: 'Analytical Search',
    description: 'The quest becomes precise. Emotional energy channels into problem-solving and refinement.\n\nThis is ideal for research, editing, and organizing. However, overanalysis may stall momentum.\n\nSeek clarity without paralysis.'
  },
  {
    nakshatraName: 'Mrigashira',
    padaNumber: 3,
    degreeRange: '60°00\'–63°20\'',
    navamsaSign: 'Libra',
    title: 'Relational Exploration',
    description: 'Curiosity turns toward partnership. Conversations feel probing but diplomatic.\n\nThis phase supports collaboration and emotional negotiation.\n\nBalance intellectual fascination with emotional sincerity.'
  },
  {
    nakshatraName: 'Mrigashira',
    padaNumber: 4,
    degreeRange: '63°20\'–66°40\'',
    navamsaSign: 'Scorpio',
    title: 'Obsessive Investigation',
    description: 'Mrigashira\'s search becomes intense. Emotional focus narrows. Secrets may surface.\n\nThis is a powerful time for deep insight, but beware suspicion.\n\nTransformation begins with truth.'
  },
  // ARDRA
  {
    nakshatraName: 'Ardra',
    padaNumber: 1,
    degreeRange: '66°40\'–70°00\'',
    navamsaSign: 'Sagittarius',
    title: 'Ideological Storm',
    description: 'Ardra\'s turbulence attaches to belief. Emotional reactions feel dramatic and philosophical.\n\nThis phase may trigger debates or strong opinions. Catharsis comes through confronting truth.\n\nStorms clarify what matters.'
  },
  {
    nakshatraName: 'Ardra',
    padaNumber: 2,
    degreeRange: '70°00\'–73°20\'',
    navamsaSign: 'Capricorn',
    title: 'Pressure and Endurance',
    description: 'Emotional heaviness meets discipline. This phase feels serious and structured.\n\nProductivity can emerge from discomfort.\n\nEndure rather than react impulsively.'
  },
  {
    nakshatraName: 'Ardra',
    padaNumber: 3,
    degreeRange: '73°20\'–76°40\'',
    navamsaSign: 'Aquarius',
    title: 'Radical Disruption',
    description: 'The storm becomes revolutionary. Emotional detachment accompanies sudden shifts.\n\nThis phase favors innovation but may destabilize routines.\n\nLet disruption teach rather than destroy.'
  },
  {
    nakshatraName: 'Ardra',
    padaNumber: 4,
    degreeRange: '76°40\'–80°00\'',
    navamsaSign: 'Pisces',
    title: 'Emotional Catharsis',
    description: 'The storm dissolves into release. Tears, insight, surrender.\n\nHealing occurs through emotional honesty.\n\nThis is the final rainfall before renewal.'
  },
  // PUNARVASU
  {
    nakshatraName: 'Punarvasu',
    padaNumber: 1,
    degreeRange: '80°00\'–83°20\'',
    navamsaSign: 'Aries',
    title: 'Renewed Initiative',
    description: 'Punarvasu\'s theme is restoration, and in its first pada that restoration takes decisive form. Emotional experience feels like a reset — as though something previously fragmented is being reassembled. There is renewed confidence, but it is softer than Ashwini\'s urgency. This energy favors beginning again with wisdom gained from prior missteps.\n\nThe Moon here supports re-approaching goals with greater clarity. Emotional optimism rises. You may feel drawn to revisit unfinished conversations or projects with fresh perspective. The drive is not reckless; it carries memory.\n\nCollectively, this phase encourages second chances. However, impatience can reappear if growth feels too slow. Trust that restoration unfolds in stages. This pada is the spark of return — not naïve, but resilient.'
  },
  {
    nakshatraName: 'Punarvasu',
    padaNumber: 2,
    degreeRange: '83°20\'–86°40\'',
    navamsaSign: 'Taurus',
    title: 'Restored Stability',
    description: 'Here renewal finds grounding. Emotional energy stabilizes into security and comfort. There is a desire to rebuild foundations, strengthen relationships, and invest in long-term peace.\n\nThe Moon in this pada supports reconciliation and practical planning. Financial and domestic matters may feel more manageable. The emotional tone is steady rather than dramatic.\n\nHowever, avoid clinging to past structures simply because they feel familiar. Punarvasu restores — but only what is aligned with growth. This phase favors nurturing stability without stagnation.'
  },
  {
    nakshatraName: 'Punarvasu',
    padaNumber: 3,
    degreeRange: '86°40\'–90°00\'',
    navamsaSign: 'Gemini',
    title: 'Reframed Perspective',
    description: 'This pada activates mental renewal. Emotional clarity comes through communication and insight. Conversations can reset misunderstandings.\n\nThere is intellectual flexibility here — a willingness to see alternative angles. This is an excellent time for learning, writing, or clarifying intentions.\n\nBe mindful of over-talking feelings rather than feeling them. The mind is active; ensure the heart remains present. Renewal begins in perspective.'
  },
  {
    nakshatraName: 'Punarvasu',
    padaNumber: 4,
    degreeRange: '90°00\'–93°20\'',
    navamsaSign: 'Cancer',
    title: 'Emotional Reset',
    description: 'This is Punarvasu\'s most nurturing expression. Emotional safety becomes central. The Moon here invites forgiveness, comfort, and reconnection.\n\nIt is a gentle phase. Relationships may soften. Family matters come into focus. There is deep capacity for emotional repair.\n\nLet go of emotional defensiveness. Renewal is strongest when vulnerability is allowed.'
  },
  // PUSHYA
  {
    nakshatraName: 'Pushya',
    padaNumber: 1,
    degreeRange: '93°20\'–96°40\'',
    navamsaSign: 'Leo',
    title: 'Protective Authority',
    description: 'Pushya nourishes, and in Leo it protects through strength. Emotional energy may feel steady and dignified. There is instinct to lead or care for others responsibly.\n\nThis phase supports mentorship, guidance, and structured generosity. However, pride can interfere with vulnerability.\n\nThe Moon here encourages leadership rooted in compassion. True authority nurtures rather than dominates.'
  },
  {
    nakshatraName: 'Pushya',
    padaNumber: 2,
    degreeRange: '96°40\'–100°00\'',
    navamsaSign: 'Virgo',
    title: 'Service Through Care',
    description: 'This pada emphasizes responsibility and refinement. Emotional support is practical and detail-oriented. You may feel drawn to improve systems around you.\n\nIt is a productive phase — especially for caretaking roles. However, avoid perfectionism.\n\nPushya thrives when service is offered freely, not from obligation alone.'
  },
  {
    nakshatraName: 'Pushya',
    padaNumber: 3,
    degreeRange: '100°00\'–103°20\'',
    navamsaSign: 'Libra',
    title: 'Balanced Support',
    description: 'Here nurturing becomes relational. Emotional harmony and fairness matter deeply. Partnerships may strengthen.\n\nThe Moon supports mediation, compromise, and diplomacy. However, suppressing needs to maintain peace can backfire.\n\nBalanced care requires mutual exchange.'
  },
  {
    nakshatraName: 'Pushya',
    padaNumber: 4,
    degreeRange: '103°20\'–106°40\'',
    navamsaSign: 'Scorpio',
    title: 'Emotional Loyalty',
    description: 'This is Pushya\'s deepest expression. Emotional bonds feel intense and protective. Trust becomes central.\n\nThe lunar climate may feel heavy but committed. Devotion runs strong.\n\nAvoid possessiveness. Loyalty thrives through freedom, not control.'
  },
  // ASHLESHA
  {
    nakshatraName: 'Ashlesha',
    padaNumber: 1,
    degreeRange: '106°40\'–110°00\'',
    navamsaSign: 'Sagittarius',
    title: 'Moral Entanglement',
    description: 'Ashlesha\'s subtle psychology meets belief systems. Emotional patterns may feel tied to ideology.\n\nThis phase supports confronting uncomfortable truths. However, manipulation disguised as righteousness can emerge.\n\nBe honest about motives — especially your own.'
  },
  {
    nakshatraName: 'Ashlesha',
    padaNumber: 2,
    degreeRange: '110°00\'–113°20\'',
    navamsaSign: 'Capricorn',
    title: 'Strategic Emotion',
    description: 'Emotional energy becomes calculating. There is awareness of power dynamics.\n\nThe Moon here favors careful planning but may suppress vulnerability.\n\nUse strategy wisely; do not armor the heart excessively.'
  },
  {
    nakshatraName: 'Ashlesha',
    padaNumber: 3,
    degreeRange: '113°20\'–116°40\'',
    navamsaSign: 'Aquarius',
    title: 'Detached Observation',
    description: 'This phase allows emotional patterns to be seen clearly. Psychological insight sharpens.\n\nIt\'s an excellent time for therapy, journaling, or stepping back from reactive cycles.\n\nHowever, emotional detachment must not become avoidance.'
  },
  {
    nakshatraName: 'Ashlesha',
    padaNumber: 4,
    degreeRange: '116°40\'–120°00\'',
    navamsaSign: 'Pisces',
    title: 'Psychic Sensitivity',
    description: 'Ashlesha dissolves into intuition. Emotional boundaries may blur.\n\nThe lunar climate feels subtle and empathic. Dreams intensify.\n\nGrounding practices are essential. Sensitivity is power when conscious.'
  },
  // MAGHA
  {
    nakshatraName: 'Magha',
    padaNumber: 1,
    degreeRange: '120°00\'–123°20\'',
    navamsaSign: 'Aries',
    title: 'Ancestral Assertion',
    description: 'Magha carries lineage energy. In Aries, it becomes bold. Emotional reactions may feel tied to identity and legacy.\n\nThis phase supports reclaiming personal authority. However, ego conflicts may arise.\n\nHonor your roots without dominating others.'
  },
  {
    nakshatraName: 'Magha',
    padaNumber: 2,
    degreeRange: '123°20\'–126°40\'',
    navamsaSign: 'Taurus',
    title: 'Legacy Stability',
    description: 'Here ancestral themes seek security. Emotional energy focuses on material continuity.\n\nIt\'s a strong phase for financial planning and preserving tradition.\n\nAvoid rigid attachment to outdated structures.'
  },
  {
    nakshatraName: 'Magha',
    padaNumber: 3,
    degreeRange: '126°40\'–130°00\'',
    navamsaSign: 'Gemini',
    title: 'Storytelling Lineage',
    description: 'Magha becomes communicative. Family narratives and cultural stories surface.\n\nThis is ideal for documenting history or reconnecting through conversation.\n\nTruth must be spoken gently.'
  },
  {
    nakshatraName: 'Magha',
    padaNumber: 4,
    degreeRange: '130°00\'–133°20\'',
    navamsaSign: 'Cancer',
    title: 'Emotional Heritage',
    description: 'This is deeply nostalgic. Emotional memory is strong.\n\nThe Moon invites honoring ancestors and emotional roots.\n\nHealing lineage begins with acknowledgment.'
  },
  // PURVA PHALGUNI
  {
    nakshatraName: 'Purva Phalguni',
    padaNumber: 1,
    degreeRange: '133°20\'–136°40\'',
    navamsaSign: 'Leo',
    title: 'Radiant Pleasure',
    description: 'Purva Phalguni in its first pada is expressive, warm, and creative. Emotional energy seeks joy, affection, and visible celebration. There is charisma here — a natural magnetism that draws attention. The Moon in this pada amplifies desire for romance, beauty, and artistic expression.\n\nThis phase supports leisure, intimacy, and creative performance. However, indulgence can tip into vanity if awareness is lost. Emotional validation feels important; seek it without demanding it.\n\nThe collective atmosphere becomes more social and dramatic. It is a powerful time for showcasing talent or reconnecting with pleasure. Let yourself enjoy without overextending your energy.'
  },
  {
    nakshatraName: 'Purva Phalguni',
    padaNumber: 2,
    degreeRange: '136°40\'–140°00\'',
    navamsaSign: 'Virgo',
    title: 'Refined Enjoyment',
    description: 'Here pleasure becomes selective. Emotional expression remains warm but gains discernment. You may feel drawn to improve aesthetics, refine creative projects, or tidy relational dynamics.\n\nThe Moon supports intelligent enjoyment — pleasure with structure. This is an excellent time for thoughtful dating, editing art, or planning meaningful events.\n\nAvoid overanalyzing joy. Allow spontaneity to coexist with order.'
  },
  {
    nakshatraName: 'Purva Phalguni',
    padaNumber: 3,
    degreeRange: '140°00\'–143°20\'',
    navamsaSign: 'Libra',
    title: 'Romantic Diplomacy',
    description: 'Purva Phalguni becomes relationally elegant. Emotional tone leans toward harmony, seduction, and partnership. Conversations feel charming.\n\nThis phase favors cooperation and romantic expression. However, people-pleasing tendencies may emerge.\n\nBalance fairness with authenticity. Attraction deepens when honesty remains intact.'
  },
  {
    nakshatraName: 'Purva Phalguni',
    padaNumber: 4,
    degreeRange: '143°20\'–146°40\'',
    navamsaSign: 'Scorpio',
    title: 'Intense Attraction',
    description: 'Here pleasure deepens into emotional intensity. Passion runs strong. Attachments feel magnetic and sometimes consuming.\n\nThe Moon highlights themes of intimacy and vulnerability. This can be transformative if handled consciously.\n\nAvoid jealousy or control. Let passion reveal truth rather than distort it.'
  },
  // UTTARA PHALGUNI
  {
    nakshatraName: 'Uttara Phalguni',
    padaNumber: 1,
    degreeRange: '146°40\'–150°00\'',
    navamsaSign: 'Sagittarius',
    title: 'Principled Commitment',
    description: 'Uttara Phalguni marks commitment. In Sagittarius, commitment aligns with belief systems. Emotional tone favors promises made from moral conviction.\n\nThis phase supports contracts, agreements, and partnerships rooted in shared values. However, ideological rigidity may create friction.\n\nCommit where integrity feels strong.'
  },
  {
    nakshatraName: 'Uttara Phalguni',
    padaNumber: 2,
    degreeRange: '150°00\'–153°20\'',
    navamsaSign: 'Capricorn',
    title: 'Structured Partnership',
    description: 'Here commitment becomes practical. Emotional tone emphasizes reliability and duty.\n\nThis is ideal for signing contracts, defining roles, and building stable alliances.\n\nAvoid emotional coldness. Structure must still allow warmth.'
  },
  {
    nakshatraName: 'Uttara Phalguni',
    padaNumber: 3,
    degreeRange: '153°20\'–156°40\'',
    navamsaSign: 'Aquarius',
    title: 'Collective Alliance',
    description: 'Partnership expands socially. Emotional energy favors community and collaboration.\n\nThis phase supports networking and group commitments.\n\nBalance individuality within collective agreements.'
  },
  {
    nakshatraName: 'Uttara Phalguni',
    padaNumber: 4,
    degreeRange: '156°40\'–160°00\'',
    navamsaSign: 'Pisces',
    title: 'Compassionate Loyalty',
    description: 'Commitment softens into empathy. Emotional tone feels forgiving and devoted.\n\nThis phase encourages long-term bonds rooted in understanding rather than obligation.\n\nAllow compassion to guide agreements.'
  },
  // HASTA
  {
    nakshatraName: 'Hasta',
    padaNumber: 1,
    degreeRange: '160°00\'–163°20\'',
    navamsaSign: 'Aries',
    title: 'Active Manifestation',
    description: 'Hasta is the hand; here it acts quickly. Emotional energy favors productivity and physical effort.\n\nThis phase supports initiating practical tasks and creative crafting.\n\nAvoid impatience — skill requires rhythm.'
  },
  {
    nakshatraName: 'Hasta',
    padaNumber: 2,
    degreeRange: '163°20\'–166°40\'',
    navamsaSign: 'Taurus',
    title: 'Material Craftsmanship',
    description: 'Hands work steadily. Emotional tone favors material creation and financial planning.\n\nThis is an excellent time for budgeting, building, or refining tangible goals.\n\nStability enhances creativity.'
  },
  {
    nakshatraName: 'Hasta',
    padaNumber: 3,
    degreeRange: '166°40\'–170°00\'',
    navamsaSign: 'Gemini',
    title: 'Dexterity and Speech',
    description: 'Communication becomes skillful. Emotional tone favors negotiation and persuasion.\n\nIt is a strong time for teaching, writing, or presenting ideas.\n\nAvoid manipulation; clarity is power.'
  },
  {
    nakshatraName: 'Hasta',
    padaNumber: 4,
    degreeRange: '170°00\'–173°20\'',
    navamsaSign: 'Cancer',
    title: 'Nurturing Creation',
    description: 'Work becomes emotional. Projects feel personal.\n\nThe Moon encourages caring craftsmanship and heartfelt expression.\n\nProtect what you create.'
  },
  // CHITRA
  {
    nakshatraName: 'Chitra',
    padaNumber: 1,
    degreeRange: '173°20\'–176°40\'',
    navamsaSign: 'Leo',
    title: 'Visible Brilliance',
    description: 'Chitra shines. Emotional energy seeks recognition and aesthetic excellence.\n\nThis phase supports showcasing talents and personal style.\n\nAvoid ego inflation.'
  },
  {
    nakshatraName: 'Chitra',
    padaNumber: 2,
    degreeRange: '176°40\'–180°00\'',
    navamsaSign: 'Virgo',
    title: 'Technical Refinement',
    description: 'Art becomes precise. Emotional tone favors detailed craftsmanship.\n\nImprove, adjust, perfect — but avoid obsession.'
  },
  {
    nakshatraName: 'Chitra',
    padaNumber: 3,
    degreeRange: '180°00\'–183°20\'',
    navamsaSign: 'Libra',
    title: 'Aesthetic Harmony',
    description: 'Beauty becomes relational. Emotional tone favors design, balance, and partnership.\n\nExcellent for collaboration.'
  },
  {
    nakshatraName: 'Chitra',
    padaNumber: 4,
    degreeRange: '183°20\'–186°40\'',
    navamsaSign: 'Scorpio',
    title: 'Magnetic Depth',
    description: 'Charm deepens into intensity. Emotional tone feels private yet powerful.\n\nTransformation hides beneath beauty.'
  },
  // SWATI
  {
    nakshatraName: 'Swati',
    padaNumber: 1,
    degreeRange: '186°40\'–190°00\'',
    navamsaSign: 'Sagittarius',
    title: 'Philosophy of Freedom',
    description: 'Swati\'s nature is independence, and in Sagittarius it seeks freedom through belief and exploration. Emotional tone feels restless yet idealistic. There is a desire to expand horizons, travel mentally or physically, and question limiting structures.\n\nThe Moon in this pada supports broad thinking and courageous honesty. However, emotional detachment may surface if commitments feel restrictive.\n\nThis is a powerful time for redefining personal truth. Conversations may feel liberating. Avoid dogmatism — freedom must allow others space too.\n\nThe collective atmosphere leans toward openness and experimentation. Movement clears stagnation.'
  },
  {
    nakshatraName: 'Swati',
    padaNumber: 2,
    degreeRange: '190°00\'–193°20\'',
    navamsaSign: 'Capricorn',
    title: 'Structured Independence',
    description: 'Freedom meets discipline. Emotional tone becomes measured and self-contained. Swati\'s airy quality grounds into responsibility.\n\nThis phase favors independent work, long-term planning, and quiet perseverance. You may feel drawn to build something stable without interference.\n\nAvoid emotional isolation. Autonomy thrives when balanced with connection.'
  },
  {
    nakshatraName: 'Swati',
    padaNumber: 3,
    degreeRange: '193°20\'–196°40\'',
    navamsaSign: 'Aquarius',
    title: 'Unconventional Thought',
    description: 'Here Swati\'s independence turns radical. Emotional energy favors innovation and nonconformity.\n\nThe Moon supports new ideas, social reform, and technological thinking. However, unpredictability may disrupt stability.\n\nAllow flexibility without detachment from emotional reality.'
  },
  {
    nakshatraName: 'Swati',
    padaNumber: 4,
    degreeRange: '196°40\'–200°00\'',
    navamsaSign: 'Pisces',
    title: 'Drifting Imagination',
    description: 'Swati softens into sensitivity. Emotional tone becomes fluid and imaginative.\n\nThis phase supports artistic vision and spiritual reflection. Boundaries may blur.\n\nGround yourself. Freedom must remain conscious, not escapist.'
  },
  // VISHAKHA
  {
    nakshatraName: 'Vishakha',
    padaNumber: 1,
    degreeRange: '200°00\'–203°20\'',
    navamsaSign: 'Aries',
    title: 'Focused Drive',
    description: 'Vishakha intensifies toward goals. Emotional energy feels purposeful and ambitious.\n\nThis is an excellent time for decisive action. However, impatience can strain relationships.\n\nChannel intensity into clear objectives.'
  },
  {
    nakshatraName: 'Vishakha',
    padaNumber: 2,
    degreeRange: '203°20\'–206°40\'',
    navamsaSign: 'Taurus',
    title: 'Steady Ambition',
    description: 'Drive stabilizes. Emotional tone favors persistence and material growth.\n\nThis phase supports sustained effort and practical planning.\n\nAvoid stubborn attachment to one path if adaptation is needed.'
  },
  {
    nakshatraName: 'Vishakha',
    padaNumber: 3,
    degreeRange: '206°40\'–210°00\'',
    navamsaSign: 'Gemini',
    title: 'Persuasive Speech',
    description: 'Ambition moves through communication. Emotional energy seeks influence through dialogue.\n\nThis is ideal for negotiation, presentation, or advocacy.\n\nBe mindful of manipulation. Clarity matters.'
  },
  {
    nakshatraName: 'Vishakha',
    padaNumber: 4,
    degreeRange: '210°00\'–213°20\'',
    navamsaSign: 'Cancer',
    title: 'Emotional Goal Attachment',
    description: 'Ambition becomes personal. Emotional investment in outcomes deepens.\n\nThe Moon highlights attachment and sensitivity around success.\n\nBalance ambition with emotional well-being.'
  },
  // ANURADHA
  {
    nakshatraName: 'Anuradha',
    padaNumber: 1,
    degreeRange: '213°20\'–216°40\'',
    navamsaSign: 'Leo',
    title: 'Loyal Heart',
    description: 'Anuradha emphasizes devotion. In Leo, loyalty becomes expressive and proud.\n\nEmotional tone supports friendship, celebration, and visible support.\n\nAvoid pride interfering with humility.'
  },
  {
    nakshatraName: 'Anuradha',
    padaNumber: 2,
    degreeRange: '216°40\'–220°00\'',
    navamsaSign: 'Virgo',
    title: 'Devotional Service',
    description: 'Loyalty becomes practical. Emotional energy channels into helping others.\n\nThis phase supports structured collaboration.\n\nDo not overextend in service.'
  },
  {
    nakshatraName: 'Anuradha',
    padaNumber: 3,
    degreeRange: '220°00\'–223°20\'',
    navamsaSign: 'Libra',
    title: 'Balanced Friendship',
    description: 'Partnership and mutual respect define this pada. Emotional harmony matters.\n\nThis is a favorable time for reconciliation and diplomacy.\n\nFairness strengthens bonds.'
  },
  {
    nakshatraName: 'Anuradha',
    padaNumber: 4,
    degreeRange: '223°20\'–226°40\'',
    navamsaSign: 'Scorpio',
    title: 'Emotional Depth',
    description: 'Anuradha reaches profound intimacy. Emotional intensity strengthens commitment.\n\nThe Moon supports trust and shared vulnerability.\n\nAvoid possessiveness.'
  },
  // JYESHTHA
  {
    nakshatraName: 'Jyeshtha',
    padaNumber: 1,
    degreeRange: '226°40\'–230°00\'',
    navamsaSign: 'Sagittarius',
    title: 'Moral Authority',
    description: 'Jyeshtha carries power. In Sagittarius, authority links to belief.\n\nEmotional tone may feel commanding. Leadership themes surface.\n\nAvoid superiority. Wisdom requires humility.'
  },
  {
    nakshatraName: 'Jyeshtha',
    padaNumber: 2,
    degreeRange: '230°00\'–233°20\'',
    navamsaSign: 'Capricorn',
    title: 'Controlled Power',
    description: 'Power becomes strategic and contained.\n\nThis phase favors disciplined decision-making.\n\nAvoid emotional rigidity.'
  },
  {
    nakshatraName: 'Jyeshtha',
    padaNumber: 3,
    degreeRange: '233°20\'–236°40\'',
    navamsaSign: 'Aquarius',
    title: 'Strategic Intellect',
    description: 'Authority becomes intellectual. Emotional tone favors planning and foresight.\n\nExcellent for long-term vision.\n\nBalance logic with empathy.'
  },
  {
    nakshatraName: 'Jyeshtha',
    padaNumber: 4,
    degreeRange: '236°40\'–240°00\'',
    navamsaSign: 'Pisces',
    title: 'Subtle Influence',
    description: 'Power softens into quiet influence. Emotional tone feels intuitive and perceptive.\n\nThis phase favors subtle leadership and spiritual awareness.\n\nAct gently but firmly.'
  },
  // MULA
  {
    nakshatraName: 'Mula',
    padaNumber: 1,
    degreeRange: '240°00\'–243°20\'',
    navamsaSign: 'Aries',
    title: 'Radical Initiation',
    description: 'Mula uproots. In Aries, that uprooting is immediate and forceful. Emotional tone feels direct, uncompromising, and sometimes disruptive. There is a desire to strip situations down to their essential truth. Illusions become intolerable.\n\nThe Moon in this pada activates instinctive confrontation with root causes. This can manifest as courage or volatility depending on awareness. It is a powerful time to cut unhealthy patterns at their source.\n\nCollectively, this phase may feel destabilizing but clarifying. Avoid impulsively burning bridges — but do not avoid necessary endings either. This is the beginning of deep transformation.'
  },
  {
    nakshatraName: 'Mula',
    padaNumber: 2,
    degreeRange: '243°20\'–246°40\'',
    navamsaSign: 'Taurus',
    title: 'Material Uprooting',
    description: 'Here Mula\'s destruction becomes tangible. Emotional tone may center on finances, stability, or physical security. Something foundational may feel unsettled.\n\nThis phase supports reassessing values and material attachments. Release what is no longer aligned.\n\nAvoid clinging to comfort out of fear. Growth sometimes requires dismantling outdated structures.'
  },
  {
    nakshatraName: 'Mula',
    padaNumber: 3,
    degreeRange: '246°40\'–250°00\'',
    navamsaSign: 'Gemini',
    title: 'Investigative Mind',
    description: 'Mula turns intellectual. Emotional tone favors questioning narratives and analyzing systems.\n\nThis is a powerful time for research, therapy, and deep conversation.\n\nTruth may feel uncomfortable, but clarity is liberating.'
  },
  {
    nakshatraName: 'Mula',
    padaNumber: 4,
    degreeRange: '250°00\'–253°20\'',
    navamsaSign: 'Cancer',
    title: 'Emotional Excavation',
    description: 'The deepest emotional roots surface here. Old memories, family dynamics, and subconscious patterns emerge.\n\nThe Moon invites healing through vulnerability.\n\nAllow grief or release without resistance. Renewal begins after excavation.'
  },
  // PURVA ASHADHA
  {
    nakshatraName: 'Purva Ashadha',
    padaNumber: 1,
    degreeRange: '253°20\'–256°40\'',
    navamsaSign: 'Leo',
    title: 'Bold Conviction',
    description: 'Purva Ashadha asserts belief with confidence. Emotional tone feels passionate and persuasive.\n\nThis phase favors advocacy, teaching, and creative self-expression.\n\nAvoid self-righteousness. Conviction is strongest when paired with humility.'
  },
  {
    nakshatraName: 'Purva Ashadha',
    padaNumber: 2,
    degreeRange: '256°40\'–260°00\'',
    navamsaSign: 'Virgo',
    title: 'Refined Ideals',
    description: 'Beliefs become precise and structured. Emotional energy channels into improving systems and aligning actions with principles.\n\nThis is ideal for strategic planning.\n\nBe careful not to over-criticize yourself or others.'
  },
  {
    nakshatraName: 'Purva Ashadha',
    padaNumber: 3,
    degreeRange: '260°00\'–263°20\'',
    navamsaSign: 'Libra',
    title: 'Persuasive Charm',
    description: 'Here conviction becomes diplomatic. Emotional tone favors negotiation and influence.\n\nRelationships may revolve around shared ideals.\n\nBalance persuasion with authenticity.'
  },
  {
    nakshatraName: 'Purva Ashadha',
    padaNumber: 4,
    degreeRange: '263°20\'–266°40\'',
    navamsaSign: 'Scorpio',
    title: 'Emotional Intensity',
    description: 'Beliefs deepen into emotional investment. Passion runs strong.\n\nThis phase may trigger power struggles around values.\n\nTransform rather than dominate.'
  },
  // UTTARA ASHADHA
  {
    nakshatraName: 'Uttara Ashadha',
    padaNumber: 1,
    degreeRange: '266°40\'–270°00\'',
    navamsaSign: 'Sagittarius',
    title: 'Ethical Victory',
    description: 'Uttara Ashadha represents enduring success. In Sagittarius, victory aligns with moral clarity.\n\nEmotional tone favors principled leadership and long-term vision.\n\nAct with integrity; outcomes now have lasting impact.'
  },
  {
    nakshatraName: 'Uttara Ashadha',
    padaNumber: 2,
    degreeRange: '270°00\'–273°20\'',
    navamsaSign: 'Capricorn',
    title: 'Sustained Achievement',
    description: 'Ambition becomes disciplined. Emotional energy supports perseverance and responsibility.\n\nThis is an excellent time for setting realistic goals and committing fully.\n\nAvoid emotional coldness.'
  },
  {
    nakshatraName: 'Uttara Ashadha',
    padaNumber: 3,
    degreeRange: '273°20\'–276°40\'',
    navamsaSign: 'Aquarius',
    title: 'Collective Success',
    description: 'Achievement expands beyond the personal. Emotional tone favors teamwork and social contribution.\n\nProgress may feel innovative.\n\nBalance group goals with individual well-being.'
  },
  {
    nakshatraName: 'Uttara Ashadha',
    padaNumber: 4,
    degreeRange: '276°40\'–280°00\'',
    navamsaSign: 'Pisces',
    title: 'Compassionate Authority',
    description: 'Power softens into empathy. Emotional tone encourages leadership through understanding.\n\nLong-term stability arises from emotional wisdom.'
  },
  // SHRAVANA
  {
    nakshatraName: 'Shravana',
    padaNumber: 1,
    degreeRange: '280°00\'–283°20\'',
    navamsaSign: 'Aries',
    title: 'Assertive Listening',
    description: 'Shravana governs hearing and learning. In Aries, communication becomes active. Emotional tone favors direct conversation and decisive interpretation.\n\nYou may feel compelled to respond quickly to information.\n\nPause before reacting. Listening remains primary.'
  },
  {
    nakshatraName: 'Shravana',
    padaNumber: 2,
    degreeRange: '283°20\'–286°40\'',
    navamsaSign: 'Taurus',
    title: 'Practical Wisdom',
    description: 'Knowledge becomes tangible. Emotional energy supports steady learning and grounded advice.\n\nThis is a strong time for financial or career planning.'
  },
  {
    nakshatraName: 'Shravana',
    padaNumber: 3,
    degreeRange: '286°40\'–290°00\'',
    navamsaSign: 'Gemini',
    title: 'Communicative Learning',
    description: 'Curiosity intensifies. Emotional tone favors dialogue and information exchange.\n\nExcellent for teaching, studying, and negotiation.'
  },
  {
    nakshatraName: 'Shravana',
    padaNumber: 4,
    degreeRange: '290°00\'–293°20\'',
    navamsaSign: 'Cancer',
    title: 'Intuitive Hearing',
    description: 'Listening becomes emotional and empathetic. Emotional tone feels sensitive to subtle cues.\n\nTrust intuition, but verify facts.'
  },
  // DHANISHTA (placeholder - not provided in user request)
  {
    nakshatraName: 'Dhanishta',
    padaNumber: 1,
    degreeRange: '293°20\'–296°40\'',
    navamsaSign: 'Leo',
    title: 'Rhythmic Expression',
    description: 'Dhanishta\'s first pada brings rhythm and prosperity through creative expression.'
  },
  {
    nakshatraName: 'Dhanishta',
    padaNumber: 2,
    degreeRange: '296°40\'–300°00\'',
    navamsaSign: 'Virgo',
    title: 'Practical Prosperity',
    description: 'The second pada channels wealth through practical organization and service.'
  },
  {
    nakshatraName: 'Dhanishta',
    padaNumber: 3,
    degreeRange: '300°00\'–303°20\'',
    navamsaSign: 'Libra',
    title: 'Harmonious Abundance',
    description: 'The third pada seeks prosperity through partnership and balanced exchange.'
  },
  {
    nakshatraName: 'Dhanishta',
    padaNumber: 4,
    degreeRange: '303°20\'–306°40\'',
    navamsaSign: 'Scorpio',
    title: 'Transformative Wealth',
    description: 'The fourth pada brings deep transformation through material and spiritual resources.'
  },
  // SHATABHISHA (placeholder - not provided in user request)
  {
    nakshatraName: 'Shatabhisha',
    padaNumber: 1,
    degreeRange: '306°40\'–310°00\'',
    navamsaSign: 'Sagittarius',
    title: 'Healing Vision',
    description: 'Shatabhisha\'s first pada brings healing through philosophical understanding and truth.'
  },
  {
    nakshatraName: 'Shatabhisha',
    padaNumber: 2,
    degreeRange: '310°00\'–313°20\'',
    navamsaSign: 'Capricorn',
    title: 'Structured Healing',
    description: 'The second pada channels healing energy through discipline and systematic approaches.'
  },
  {
    nakshatraName: 'Shatabhisha',
    padaNumber: 3,
    degreeRange: '313°20\'–316°40\'',
    navamsaSign: 'Aquarius',
    title: 'Innovative Medicine',
    description: 'The third pada brings revolutionary healing methods and unconventional wisdom.'
  },
  {
    nakshatraName: 'Shatabhisha',
    padaNumber: 4,
    degreeRange: '316°40\'–320°00\'',
    navamsaSign: 'Pisces',
    title: 'Mystical Healing',
    description: 'The fourth pada dissolves boundaries through spiritual and intuitive healing practices.'
  },
  // PURVA BHADRAPADA (placeholder - not provided in user request)
  {
    nakshatraName: 'Purva Bhadrapada',
    padaNumber: 1,
    degreeRange: '320°00\'–323°20\'',
    navamsaSign: 'Aries',
    title: 'Fierce Transformation',
    description: 'Purva Bhadrapada\'s first pada brings intense spiritual awakening through direct action.'
  },
  {
    nakshatraName: 'Purva Bhadrapada',
    padaNumber: 2,
    degreeRange: '323°20\'–326°40\'',
    navamsaSign: 'Taurus',
    title: 'Grounded Sacrifice',
    description: 'The second pada channels spiritual intensity through material stability and endurance.'
  },
  {
    nakshatraName: 'Purva Bhadrapada',
    padaNumber: 3,
    degreeRange: '326°40\'–330°00\'',
    navamsaSign: 'Gemini',
    title: 'Intellectual Awakening',
    description: 'The third pada brings transformation through knowledge and communication of deeper truths.'
  },
  {
    nakshatraName: 'Purva Bhadrapada',
    padaNumber: 4,
    degreeRange: '330°00\'–333°20\'',
    navamsaSign: 'Cancer',
    title: 'Emotional Purification',
    description: 'The fourth pada dissolves emotional attachments through compassionate surrender.'
  },
  // UTTARA BHADRAPADA (placeholder - not provided in user request)
  {
    nakshatraName: 'Uttara Bhadrapada',
    padaNumber: 1,
    degreeRange: '333°20\'–336°40\'',
    navamsaSign: 'Leo',
    title: 'Dignified Depth',
    description: 'Uttara Bhadrapada\'s first pada brings stable wisdom through confident inner authority.'
  },
  {
    nakshatraName: 'Uttara Bhadrapada',
    padaNumber: 2,
    degreeRange: '336°40\'–340°00\'',
    navamsaSign: 'Virgo',
    title: 'Practical Wisdom',
    description: 'The second pada channels deep understanding through service and detailed attention.'
  },
  {
    nakshatraName: 'Uttara Bhadrapada',
    padaNumber: 3,
    degreeRange: '340°00\'–343°20\'',
    navamsaSign: 'Libra',
    title: 'Balanced Depth',
    description: 'The third pada brings profound wisdom through harmonious relationships and fairness.'
  },
  {
    nakshatraName: 'Uttara Bhadrapada',
    padaNumber: 4,
    degreeRange: '343°20\'–346°40\'',
    navamsaSign: 'Scorpio',
    title: 'Mystical Foundation',
    description: 'The fourth pada establishes deep spiritual roots through transformative inner work.'
  },
  // REVATI (placeholder - not provided in user request)
  {
    nakshatraName: 'Revati',
    padaNumber: 1,
    degreeRange: '346°40\'–350°00\'',
    navamsaSign: 'Sagittarius',
    title: 'Nourishing Journey',
    description: 'Revati\'s first pada brings completion through philosophical understanding and guidance.'
  },
  {
    nakshatraName: 'Revati',
    padaNumber: 2,
    degreeRange: '350°00\'–353°20\'',
    navamsaSign: 'Capricorn',
    title: 'Protective Structure',
    description: 'The second pada channels nurturing energy through responsible care and stability.'
  },
  {
    nakshatraName: 'Revati',
    padaNumber: 3,
    degreeRange: '353°20\'–356°40\'',
    navamsaSign: 'Aquarius',
    title: 'Universal Compassion',
    description: 'The third pada brings collective nourishment through innovative care and community.'
  },
  {
    nakshatraName: 'Revati',
    padaNumber: 4,
    degreeRange: '356°40\'–360°00\'',
    navamsaSign: 'Pisces',
    title: 'Transcendent Care',
    description: 'The fourth pada completes the cycle through spiritual nourishment and divine protection.'
  }
];

/**
 * Get pada information by nakshatra name and pada number
 */
export function getPadaInfo(nakshatraName: string, padaNumber: 1 | 2 | 3 | 4): PadaInfo | undefined {
  return PADA_DATA.find(
    (pada) => pada.nakshatraName === nakshatraName && pada.padaNumber === padaNumber
  );
}

/**
 * Get all padas for a specific nakshatra
 */
export function getPadasForNakshatra(nakshatraName: string): PadaInfo[] {
  return PADA_DATA.filter((pada) => pada.nakshatraName === nakshatraName);
}
