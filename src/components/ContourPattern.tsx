import React from 'react';

export default function ContourPattern({ className, opacity = 0.5 }: { className?: string; opacity?: number }) {
    return (
        <svg
            className={className}
            width="100%"
            height="100%"
            viewBox="0 0 1440 400"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity }}
        >
            <g fill="none" stroke="currentColor" strokeWidth="0.8">
                {/* --- Left Island Group --- */}
                {/* Outermost */}
                <path d="M-50,200 Q100,50 250,200 T450,250 T250,450 T-50,350" />
                {/* Middle */}
                <path d="M0,200 Q100,100 220,200 T400,250 T220,400 T0,300" />
                {/* Inner */}
                <path d="M50,200 Q120,150 200,200 T350,250 T200,350 T50,250" />
                {/* Core */}
                <path d="M100,220 Q140,190 180,220 T280,250 T180,300 T100,250" />

                {/* --- Center Flowing Lines --- */}
                {/* Top waves */}
                <path d="M300,100 C500,50 700,150 900,100 S1300,50 1500,100" />
                <path d="M320,130 C520,80 720,180 920,130 S1320,80 1520,130" />
                <path d="M340,160 C540,110 740,210 940,160 S1340,110 1540,160" />

                {/* Middle waves */}
                <path d="M400,250 C600,200 800,300 1000,250 S1400,200 1540,250" />
                <path d="M420,280 C620,230 820,330 1020,280 S1420,230 1540,280" />

                {/* Bottom waves */}
                <path d="M300,350 C500,300 700,400 900,350 S1300,300 1500,350" />
                <path d="M320,380 C520,330 720,430 920,380 S1320,330 1520,380" />

                {/* --- Right Island Group --- */}
                {/* Outermost */}
                <path d="M1000,200 Q1150,100 1300,200 T1500,250 T1300,400 T1000,300" />
                {/* Middle */}
                <path d="M1050,220 Q1150,150 1250,220 T1450,250 T1250,350 T1050,280" />
                {/* Inner */}
                <path d="M1100,240 Q1160,200 1220,240 T1350,250 T1220,300 T1100,260" />

                {/* --- Small Detail Islands --- */}
                {/* Center-Top Small Island */}
                <path d="M600,80 Q630,60 660,80 T700,100 T660,120 T600,100" />
                <path d="M620,85 Q640,75 660,85 T680,100 T660,115 T620,100" />

                {/* Center-Bottom Small Island */}
                <path d="M800,350 Q830,330 860,350 T900,370 T860,390 T800,370" />
            </g>
        </svg>
    );
}
