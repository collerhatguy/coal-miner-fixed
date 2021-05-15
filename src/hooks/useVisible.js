import {useState, useRef, useEffect, useCallback} from "react";

export default function useVisible() {

    const [visible, setVisible] = useState(true);

    const reveal = useCallback(() => {
        setVisible(prevVisible => !prevVisible)
    }, [])
    const element = useRef();
    useEffect(() => {
        if (visible) element.current.style.display = "block";
        if (!visible) element.current.style.display = "none";
        console.log(element)
    }, [visible]);
    return [element, visible, reveal];
}