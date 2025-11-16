import type { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./button-circle.css";


interface ButtonCircleProps {
    icon: IconProp;
    size: SizeProp;
    callback: (data: unknown) => void;
}

export function ButtonCircle({ icon, size, callback }: ButtonCircleProps) {
    return (
        <button onClick={callback}>
            <FontAwesomeIcon icon={icon} size={size} className="btn-circle"/>
        </button>
    )
}