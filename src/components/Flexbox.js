const Flexbox = ({justifyContent, alignItems, children, style, className}) => {
    return (
        <div className={className} style={{display: 'flex', justifyContent: `${justifyContent ? justifyContent : 'flex-start'}`, alignItems: `${alignItems ? alignItems : 'flex-start'}`, ...style}}>
            {children}
        </div>
    );
}
 
export default Flexbox;