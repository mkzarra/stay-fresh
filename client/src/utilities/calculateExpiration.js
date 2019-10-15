export default function (category, storage) {
  const day = 3600000 * 24;
  switch(storage) {
    case 'Refrigerator': switch(category) {
      case 'Seafood': return day * 3;
      case 'Meat': return day * 3;
      case 'Dairy': return day * 7;
      case 'Produce': return day * 10;
      default: return day * 30; 
    }
    case 'Pantry': switch(category) {
      case 'Produce': return day * 10;
      default: return day * 365;
    }
    case 'Freezer': return day * 182;
    default: return day * 7;
  }
}