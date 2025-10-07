"use client";

import React, { useEffect, useRef, useState } from "react";
import { createChart, ColorType, LineSeries } from "lightweight-charts";
import { useTheme } from "next-themes";

function readVars() {
  const css = getComputedStyle(document.documentElement);
  return {
    bg: css.getPropertyValue("--background").trim(),
    text: css.getPropertyValue("--foreground").trim(),
    accent: css.getPropertyValue("--accentColor").trim(),
  };
}

export default function CoinChart({data}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const resizeObserverRef = useRef(null);

  useEffect(() => setMounted(true), []);

  // Initial chart creation
  useEffect(() => {
    if (!mounted || !containerRef.current || chartRef.current) return;

    const container = containerRef.current;

    const { bg, text, accent } = readVars();

    const chart = createChart(container, {
      width: container.clientWidth,
      height: 360,
      layout: {
        background: { type: ColorType.Solid, color: bg},
        textColor: text,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
    });

    const series = chart.addSeries(LineSeries, {
      color: accent,
      lineWidth: 2,
      priceLineVisible: false,
    });

    series.setData(data);

    chart.timeScale().fitContent();

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          chart.applyOptions({ width: Math.floor(entry.contentRect.width) });
        }
      }
    });
    ro.observe(container);

    chartRef.current = chart;
    seriesRef.current = series;
    resizeObserverRef.current = ro;

    return () => {
      ro.disconnect();
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, [mounted, data]);

  useEffect(() => {
    if (!mounted || !chartRef.current || !seriesRef.current) return;

    let raf = requestAnimationFrame(() => {
      const { bg, text, accent } = readVars();
      chartRef.current.applyOptions({
        layout: {
          background: { type: ColorType.Solid, color: bg },
          textColor: text,
        },
      });
      seriesRef.current.applyOptions({ color: accent });
    });

    return () => cancelAnimationFrame(raf);
  }, [resolvedTheme, mounted]);

  return (
    <div 
        ref={containerRef} 
        className="w-xl" 
        style={{ height: 360 }} 
        data-lenis-prevent-wheel
    />
  );
}