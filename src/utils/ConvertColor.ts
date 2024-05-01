export module Utils {
    export function generateGradient(colors: string[]): string {
        const angle = 45; 

        if (colors.length === 1) {
            return `linear-gradient(${angle}deg, ${colors[0]} 0%, ${colors[0]} 100%)`
        } else {
            
            const step = 100 / (colors.length - 1); 
    
            const colorStops = colors.map((color, index) => {
                const position = index * step;
                return `${color} ${position}%`;
            });
    
            const gradient = `linear-gradient(${angle}deg, ${colorStops.join(', ')})`;
            return gradient;
        }
        

    }
}