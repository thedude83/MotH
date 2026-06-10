// LANGUAGE — word → builder. Add bits here as we build them.
import { section                               } from './bits/section.mjs';
import { card                                  } from './bits/card.mjs';
import { cardTitle                             } from './bits/card-title.mjs';
import { cardLink                              } from './bits/card-link.mjs';
import { grid                                  } from './bits/grid.mjs';
import { img                                   } from './bits/image.mjs';
import { cardGate                              } from './bits/card-gate.mjs';
import { cardTabletRight, cardTabletLeft,
         cardTitleRight,  cardTitleLeft        } from './bits/card-tablet.mjs';
import { cardFaceRight, cardFaceLeft           } from './bits/card-face.mjs';
import { principle                             } from './bits/principle.mjs';
import { sequence                              } from './bits/sequence.mjs';
import { cardPairPole, cardPairMini            } from './bits/card-pair.mjs';
import { svgThreeGates                         } from './bits/svg-threegates.mjs';

export const registry = {
  section,
  card,
  'card-title':        cardTitle,
  'card-link':         cardLink,
  grid,
  image:               img,
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
};
