import { LineSeries, createChart, ColorType, CrosshairMode } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function CoinChart(props) {
    const { resolvedTheme, setTheme } = useTheme();

    const isDark = resolvedTheme === "Dark";

    const {
        data,
        colors: {
            backgroundColor = '#ededed',
            lineColor = '#2962FF',
            textColor = 'black',
            areaTopColor = '#2962FF',
            areaBottomColor = 'rgba(41, 98, 255, 0.28)',
        } = {},
    } = props;

    const chartContainerRef = useRef();

    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };

            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: isDark ? "#121212" : "#ededed"},
                    textColor,
                },
                width: chartContainerRef.current.clientWidth,
                height: 300,
                grid: {
                    vertLines: {visible: false },
                    horzLines: {visible: false },
                },
                watermark: {
                    visible: false,
                },
                rightPriceScale: {
                    borderVisible: false,
                    scaleMargins: { top: 0.1, bottom: 0.2 },
                    mode: 0, // 0=Normal, 1=Logarithmic, 2=Percentage, 3=IndexedTo100
                },
                timeScale: {
                    rightOffset: 5,
                    barSpacing: 6,
                    fixLeftEdge: true,
                    lockVisibleTimeRangeOnResize: true,
                    borderVisible: false,
                    timeVisible: false,
                    secondsVisible: false,
                },
            });
            chart.timeScale().fitContent();

            const newSeries = chart.addSeries(LineSeries, { lineColor });
            newSeries.setData(data);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );

    return (
        <div
            ref={chartContainerRef}
            className='max-w-xl min-w-xl'
        />
    );
};