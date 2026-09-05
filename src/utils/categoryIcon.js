const ICONS_BY_TYPE = {
  Ração: 'nutrition-outline',
  Higiene: 'water-outline',
  Brinquedo: 'happy-outline',
  Acessório: 'ribbon-outline',
  Petisco: 'fast-food-outline',
};

export function iconForTipo(tipo) {
  return ICONS_BY_TYPE[tipo] || 'paw-outline';
}
