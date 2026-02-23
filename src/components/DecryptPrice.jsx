import { useState, useEffect } from "react";

const chars = "0123456789%#@&";

const DecryptPrice = ({ target, duration = 600 }) => {
    const [displayText, setDisplayText] = useState(target.toString());
    const [isDecrypting, setIsDecrypting] = useState(false);

    useEffect(() => {
        let interval;
        let iteration = 0;
        const targetStr = target.toString();
        setIsDecrypting(true);

        interval = setInterval(() => {
            setDisplayText(
                targetStr
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return targetStr[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= targetStr.length) {
                clearInterval(interval);
                setIsDecrypting(false);
            }

            iteration += 1 / 3;
        }, duration / (targetStr.length * 3));

        return () => clearInterval(interval);
    }, [target, duration]);

    return (
        <span className={`decrypt-text ${isDecrypting ? "is-decrypting" : ""}`}>
            {displayText}
        </span>
    );
};

export default DecryptPrice;
