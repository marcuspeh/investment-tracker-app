function FormatLargeNumber(num: number): string {
  if (num >= 1e12) {
    return `${(num / 1e12).toFixed(3)}T`
  } 
  
  if (num >= 1e9) {
    return `${(num / 1e9).toFixed(3)}B`;
  } 
  
  if (num >= 1e6) {
    return `${(num / 1e6).toFixed(3)}M`;
  } 
  
  if (num >= 1e3) {
    return `${(num / 1e3).toFixed(3)}K`;
  } 
    
  return num.toFixed(3);
};

const ParsePrice = (price: number): string => {
  if (price >= 0) {
    return `\$${price.toFixed(3)}`
  }
  return `-\$${-price.toFixed(3)}`
}


export {
  FormatLargeNumber,
  ParsePrice
}
