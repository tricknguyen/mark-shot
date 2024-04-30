export module Utils {
    export function generateGradient(colors: string[]): string {
        const numColors = colors.length;
        if (numColors === 0) {
            return ''; // No colors provided
        }
    
        // Calculate the angle step for the gradient
        const angleStep = 360 / numColors;
    
        // Generate the gradient string
        const gradientStops = colors.map((color, index) => {
            const angle = index * angleStep;
            return `hsl(${angle}deg 100% 50%) ${index * (100 /  numColors - 1)}%`;
        });
    
        const gradientString = `linear-gradient(45deg, ${gradientStops.join(', ')})`;
        return gradientString;
    }
}