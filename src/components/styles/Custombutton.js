import '../../css/customButton.css'

const CustomButton = ({ handleClick, className, children, style }) => {
    return (
        <button
            onClick={handleClick}
            style={{...style}}
            className={className}
        >{children}</button>
    );
}

export default CustomButton;