"use client";

import { Card } from "@/components";
import ConfettiExplosion, { ConfettiProps } from "react-confetti-explosion";
import { useState, useEffect } from "react";

const largeProps: ConfettiProps = {
    force: 0.8,
    duration: 3000,
    particleCount: 300,
    width: 1600,
    colors: ["#041E43", "#1471BF", "#5BB4DC", "#FC027B", "#66D805"],
};

export default function Page({ params }: { params: { university: string } }) {
    const [isLargeExploding, setIsLargeExploding] = useState(false);

    const SCORE = 100;

    useEffect(() => {
        if (SCORE > 80) setIsLargeExploding(true);
    }, [SCORE]);

    return (
        <div className="space-y-8">
            <h1 className="text-6xl font-bold">
                Overview - {decodeURIComponent(params.university)}
            </h1>
            <div className="flex gap-8">
                <Card className="max-w-max">
                    <>{isLargeExploding && <ConfettiExplosion {...largeProps} />}</>
                    <h2 className="text-2xl font-bold">
                        Score ({isLargeExploding ? "true" : "false"})
                    </h2>
                    <p className="text-6xl text-green-600 font-black">{SCORE}</p>
                </Card>
                <Card className="">
                    <h2 className="text-2xl font-bold">Goals</h2>
                </Card>
            </div>
        </div>
    );
}
