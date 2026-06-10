// LANGUAGE — word → builder. Add bits here as we build them.
import { section   } from './bits/section.mjs';
import { card      } from './bits/card.mjs';
import { cardTitle } from './bits/card-title.mjs';
import { cardLink  } from './bits/card-link.mjs';
import { grid      } from './bits/grid.mjs';
import { img       } from './bits/image.mjs';

export const registry = {
  section,
  card,
  'card-mirror': card,
  'card-title': cardTitle,
  'card-link':  cardLink,
  grid,
  image: img,
};
