import { useRef, useEffect } from "react";

import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

export default function ScrumbleText({text, className}) {
    const textRef = useRef(null);

    useEffect(() => {
    // Анимация при загрузке
    gsap.to(textRef.current, {
        duration: 2,
        scrambleText: {
        text: text,
        chars: "XOX0",
        revealDelay: 0.3,
        speed: 0.4,
        },
    });
    }, []);

    return (
        <div className={`flex ${className}`}>
            <div className="relative inline-block">
                <p className="invisible text-9xl font-mono whitespace-pre">
                    AAAAAAAAAAAAAAAAAAAA
                </p>

                <p
                    ref={textRef}
                    className="absolute inset-0 text-9xl font-mono"
                >
                </p>
            </div>
        </div>
    )
}