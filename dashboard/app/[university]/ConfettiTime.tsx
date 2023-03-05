"use client"

import ConfettiExplosion, { ConfettiProps } from "react-confetti-explosion";

const largeProps: ConfettiProps = {
    force: 0.8,
    duration: 3000,
    particleCount: 300,
    width: 1600,
    colors: ["#041E43", "#1471BF", "#5BB4DC", "#FC027B", "#66D805"],
};

export default function ConfettiTime({ show }: { show: boolean }) {
    return <>{show && <ConfettiExplosion {...largeProps} />}</>;
}
