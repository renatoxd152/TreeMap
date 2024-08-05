export const getColorWithTone = (baseHue, quantity, totalQuantity) => {
    const minLightness = 50;
    const maxLightness = 90;
  

    const lightness = minLightness + (1 - quantity / totalQuantity) * (maxLightness - minLightness);
  

    return `hsl(${baseHue}, 70%, ${lightness}%)`;
  };
  
 

export const getColorForFood = (quantity, totalQuantity) => {
    const baseHue = 200; 
    const minLightness = 50;
    const maxLightness = 90; 
   
    const lightness = minLightness + (1 - quantity / totalQuantity) * (maxLightness - minLightness);
  
    return `hsl(${baseHue}, 70%, ${lightness}%)`;
  };
  