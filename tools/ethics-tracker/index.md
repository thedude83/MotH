page
  type content
  title Ethics Tracker
  subtitle Daily practice log

nav-link ethics-tracker/index
  title Daily Practice
nav-link ethics-tracker/stats
  title Statistics

mode-tabs

mode-section morning

  section morning-checklist
    title Morning Checklist

  para Set your intention for each domain before you begin.

  grid 2

    card
      title Consumption
      checklist
        domain consumption
        obs-consumption-no-heedlessness: No heedlessness — receive each sense input intentionally
        obs-consumption-guard-inputs: Guard inputs — choose what enters mind and body
        obs-consumption-take-only-what-is-needed: Take only what is needed
        obs-consumption-no-forced-harm: No forced harm to the natural order

    card
      title Speech
      checklist
        domain speech
        obs-speech-no-gossip: No gossip or lashon hara
        obs-speech-no-idle-chatter: No idle or performative chatter
        obs-speech-no-oaths: No oaths or exaggeration

    card
      title Action
      checklist
        domain action
        obs-action-give: Give — find one act of bestowal today
        obs-action-pay-promptly: Pay promptly — honour debts without delay
        obs-action-yield: Yield — let go of contention
        obs-action-act-in-secret: Act in secret — no virtue performance

    card
      title Screen / Masach
      checklist
        domain screen
        obs-screen-pause-before-reacting: Pause before reacting
        obs-screen-no-coveting: No coveting or grasping
        obs-screen-no-auto-reaction-to-praise: No auto-reaction to praise
        obs-screen-no-auto-reaction-to-insult: No auto-reaction to insult

  section five-boundaries
    title Five Boundaries

  checklist
    label Sila
    bound-1: Harm nothing and no one
    bound-2: Speak only what is true and kind
    bound-3: Take nothing that is not freely given
    bound-4: Guard life-energy — no heedless dissipation
    bound-5: Do not grasp after pleasure or approval

  section five-mindsets
    title Five Mindsets

  checklist
    label Niyama
    mind-1: Clean motives — why am I really doing this?
    mind-2: Accept what is — santosha in this moment
    mind-3: Lean into friction — tapas, not avoidance
    mind-4: Know yourself — svadhyaya, observe the pattern
    mind-5: Surrender pride — ishvara pranidhana

  form-field
    label Morning Kavanah
    name kavanah_morning
    type textarea
    placeholder Set your kavvanah for today...

  form-submit
    label Log Morning Practice
    target data/tools/ethics-tracker/daily/{date}.md
    mode morning

mode-section nightly

  section nightly-audit
    title Nightly Audit

  section key-moments
    title Key Moments

  para Four scenes from today — describe each briefly and mark Bestowal (B) or Taking (T).

  scene-row
    index 1
    placeholder Scene one...
  scene-row
    index 2
    placeholder Scene two...
  scene-row
    index 3
    placeholder Scene three...
  scene-row
    index 4
    placeholder Scene four...

  section domain-check
    title Domain Check

  grid 2

    card
      title Consumption
      checklist
        domain consumption
        hind-consumption-heedlessness: Heedlessness — received inputs without intention
        hind-consumption-unguarded-inputs: Unguarded inputs — let harmful content in
        hind-consumption-waste-or-excess: Waste or excess
        hind-consumption-forced-harm: Forced harm on the natural order

    card
      title Speech
      checklist
        domain speech
        hind-speech-failed-gate: Failed a gate — spoke without checking
        hind-speech-gossip-or-damage: Gossip or damage — harmed someone with words
        hind-speech-idle-chatter: Idle or performative talk
        hind-speech-oath-or-exaggeration: Oath or exaggeration

    card
      title Action
      checklist
        domain action
        hind-action-withheld-giving: Withheld giving — missed the moment
        hind-action-delayed-payment: Delayed payment or debt
        hind-action-contended-for-status: Contended for status
        hind-action-virtue-performance: Virtue for applause — acted to be seen

    card
      title Screen / Masach
      checklist
        domain screen
        hind-screen-auto-reacted-to-insult: Auto-reacted to insult
        hind-screen-inflated-on-praise: Inflated on praise
        hind-screen-acted-without-pausing: Acted without pausing
        hind-screen-coveted-or-grasped: Coveted or grasped

  section failure-diagnosis
    title Failure Diagnosis

  form-field
    label Main slip today
    name main_slip
    type textarea
    placeholder The most important slip was...

  form-field
    label What would bestowal have looked like?
    name slip_correction
    type textarea
    placeholder A bestowal response would have been...

  section ledger
    title Tonight's Ledger

  checklist
    label Summary
    tonight_merits: Merits present — I acted in accordance with practice
    tonight_demerits: Demerits present — there were violations to account for

  form-field
    label Tomorrow's one correction
    name tomorrow_correction
    type text
    placeholder One concrete adjustment...

  form-submit
    label Log Nightly Audit
    target data/tools/ethics-tracker/daily/{date}.md
    mode nightly

mode-section weekly

  section weekly-reset
    title Weekly Reset

  section pattern-check
    title This Week's Patterns

  checklist
    label Recurring slip by domain
    pattern_consumption: Consumption — a recurring pattern this week
    pattern_speech: Speech — a recurring pattern this week
    pattern_action: Action — a recurring pattern this week
    pattern_screen: Screen / Masach — a recurring pattern this week

  form-field
    label Root slip — this week's deepest pattern
    name root_slip
    type textarea
    placeholder The root was...

  form-field
    label Structural correction — one lever for next week
    name structural_correction
    type textarea
    placeholder Next week I will...

  section harm-log
    title Unrepaired Harm

  para Person · What happened · Repaired? · Action needed

  harm-row
    index 1
  harm-row
    index 2
  harm-row
    index 3
  harm-row
    index 4
  harm-row
    index 5

  section obligations
    title Obligations

  checklist
    label Financial and giving
    wages_settled: Wages and debts settled
    tzedakah_done: Tzedakah accounted for

  important
    label Santosha
    Contentment is not complacency. It is the radical acceptance of what is, paired with the will to act rightly within it. You are not behind. You are exactly where the practice requires.

  section coming-week
    title Coming Week

  form-field
    label Kavanah for the coming week
    name kavanah
    type textarea
    placeholder This week I intend to...

  form-field
    label One relationship to serve
    name relationship_to_serve
    type text
    placeholder Name one person...

  form-field
    label One speech discipline to guard
    name speech_discipline
    type text
    placeholder This week I will guard...

  form-submit
    label Log Weekly Reset
    target data/tools/ethics-tracker/weekly/{week}.md
    mode weekly
