import { Block, SettingImageBlock } from "@/types";

interface ImageBlockProps {
    value: Block;
}

export function ImageBlock({ value }: ImageBlockProps) {
    const settings = value.settings as SettingImageBlock;

    const containerStyle: React.CSSProperties = {
        transform: `scale(${settings?.size ? settings.size / 100 : 1})`,
        transition: 'all 0.2s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    };

    const imageStyle: React.CSSProperties = {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
        borderRadius: `${settings?.corner || 0}px`,
        boxShadow: settings?.shadow ? 
            `rgb(0 0 0 / 35%) 0px ${settings.shadow + 15}px ${settings.shadow + 25}px` : 
            'none',
        transition: 'all 0.2s ease-in-out'
    };

    return (
        <div style={containerStyle}>
            {
                settings?.image ? (
                    <img
                        src={settings.image}
                        alt="Block content"
                        style={imageStyle}
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200">
                        <p>No image</p>
                    </div>
                )
            }
        </div>
    );
}