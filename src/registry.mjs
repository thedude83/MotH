// LANGUAGE — word → builder. Add bits here as we build them.
import { section                               } from './bits/section.mjs';
import { subsection                           } from './bits/subsection.mjs';
import { card                                  } from './bits/card.mjs';
import { cardTitle                             } from './bits/card-title.mjs';
import { cardLink                              } from './bits/card-link.mjs';
import { cardTerm                              } from './bits/card-term.mjs';
import { grid                                  } from './bits/grid.mjs';
import { img                                   } from './bits/image.mjs';
import { note                                  } from './bits/note.mjs';
import { para                                  } from './bits/para.mjs';
import { cardGate                              } from './bits/card-gate.mjs';
import { cardTabletRight, cardTabletLeft,
         cardTitleRight,  cardTitleLeft        } from './bits/card-tablet.mjs';
import { cardFaceRight, cardFaceLeft           } from './bits/card-face.mjs';
import { principle                             } from './bits/principle.mjs';
import { sequence                              } from './bits/sequence.mjs';
import { cardPairPole, cardPairMini            } from './bits/card-pair.mjs';
import { svgThreeGates                         } from './bits/svg-threegates.mjs';
import { svgPhase0a, svgPhase0b, svgPhase1, svgPhase2,
         svgPhase3, svgPhase4, svgPhase5       } from './bits/svg-creation.mjs';
import { svgDesire1, svgDesire2, svgDesire3,
         svgDesire4, svgDesire5                } from './bits/svg-desire.mjs';
import { quote, quoteBig                      } from './bits/quote.mjs';
import { list                                 } from './bits/list.mjs';
import { important                            } from './bits/important.mjs';
import { checklist                            } from './bits/checklist.mjs';
import { formField                            } from './bits/form-field.mjs';
import { sceneRow                             } from './bits/scene-row.mjs';
import { harmRow                              } from './bits/harm-row.mjs';
import { formSubmit                           } from './bits/form-submit.mjs';
import { modeSection                          } from './bits/mode-section.mjs';
import { modeTabs                             } from './bits/mode-tabs.mjs';
import { scriptBlock                          } from './bits/script-block.mjs';
import { statBar                              } from './bits/stat-bar.mjs';
import { calGrid                              } from './bits/cal-grid.mjs';
import { ethicsStats                          } from './bits/ethics-stats.mjs';

export const registry = {
  section,
  subsection,
  card,
  'card-mirror':       card,
  'card-title':        cardTitle,
  'card-link':         cardLink,
  'card-term':         cardTerm,
  grid,
  image:               img,
  note,
  para,
  'card-gate':         cardGate,
  'card-tablet.right': cardTabletRight,
  'card-tablet.left':  cardTabletLeft,
  'card-title.right':  cardTitleRight,
  'card-title.left':   cardTitleLeft,
  'card-face.right':   cardFaceRight,
  'card-face.left':    cardFaceLeft,
  principle,
  sequence,
  'card-pair.pole':    cardPairPole,
  'card-pair.mini':    cardPairMini,
  'svg.threegates':    svgThreeGates,
  'svg.phase0a':       svgPhase0a,
  'svg.phase0b':       svgPhase0b,
  'svg.phase1':        svgPhase1,
  'svg.phase2':        svgPhase2,
  'svg.phase3':        svgPhase3,
  'svg.phase4':        svgPhase4,
  'svg.phase5':        svgPhase5,
  'svg.desire1':       svgDesire1,
  'svg.desire2':       svgDesire2,
  'svg.desire3':       svgDesire3,
  'svg.desire4':       svgDesire4,
  'svg.desire5':       svgDesire5,
  quote,
  'quote.big':         quoteBig,
  list,
  important,
  checklist,
  'form-field':     formField,
  'scene-row':      sceneRow,
  'harm-row':       harmRow,
  'form-submit':    formSubmit,
  'mode-section':   modeSection,
  'mode-tabs':      modeTabs,
  'script-block':   scriptBlock,
  'stat-bar':       statBar,
  'cal-grid':       calGrid,
  'ethics-stats':   ethicsStats,
};
