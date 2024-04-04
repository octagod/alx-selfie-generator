const Spacebox = ({children, padding, className, style}) => {
    return (
        <div style={{padding, ...style}} className={className} >
            {children}
        </div>
    );
}
 
export default Spacebox;