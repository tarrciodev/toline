"use client";
import { useEffect, useState } from "react";

interface ITimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export interface IUseTimeLeft {
    timeLeft: ITimeLeft;
    formatNumber: (time: number) => string | number;
}

export function useTimeLeft(date: Date): IUseTimeLeft {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        // Data do workshop (3 de maio de 2025)
        const workshopDate = new Date(date).getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = workshopDate - now;

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor(
                        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                    ),
                    minutes: Math.floor(
                        (distance % (1000 * 60 * 60)) / (1000 * 60)
                    ),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Função para adicionar zero à esquerda se necessário
    const formatNumber = (time: number) => {
        return time < 10 ? `0${time}` : time;
    };

    return {
        timeLeft,
        formatNumber,
    };
}
