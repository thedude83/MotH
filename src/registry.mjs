// LANGUAGE — word → builder. Add bits here as we build them.
import { section   } from './bits/section.mjs';
import { card      } from './bits/card.mjs';
import { cardTitle } from './bits/card-title.mjs';
import { cardLink  } from './bits/card-link.mjs';
import { cardTerm  } from './bits/card-term.mjs';
import { grid      } from './bits/grid.mjs';
import { img       } from './bits/image.mjs';
import { note      } from './bits/note.mjs';
import { para      } from './bits/para.mjs';
import { svgPhase0a, svgPhase0b, svgPhase1, svgPhase2,
         svgPhase3, svgPhase4, svgPhase5 } from './bits/svg-creation.mjs';
import { svgDesire1, svgDesire2, svgDesire3,
         svgDesire4, svgDesire5           } from './bits/svg-desire.mjs';

export const registry = {
  section,
  card,
  'card-mirror': card,
  'card-title':  cardTitle,
  'card-link':   cardLink,
  'card-term':   cardTerm,
  grid,
  image: img,
  note,
  para,
  'svg.phase0a': svgPhase0a,
  'svg.phase0b': svgPhase0b,
  'svg.phase1':  svgPhase1,
  'svg.phase2':  svgPhase2,
  'svg.phase3':  svgPhase3,
  'svg.phase4':  svgPhase4,
  'svg.phase5':  svgPhase5,
  'svg.desire1': svgDesire1,
  'svg.desire2': svgDesire2,
  'svg.desire3': svgDesire3,
  'svg.desire4': svgDesire4,
  'svg.desire5': svgDesire5,
};
