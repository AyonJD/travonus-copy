import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

const PieChartV2 = ({ data, height, width }) => {
  const wrapperRef = React.useRef();
  const dimensions = { width: width, height: height };
  const [tooltip, setTooltip] = useState(null);
  const pie = d3.pie().value((d) => d.value);
  const arcs = pie(data);

  const showTooltip = (event, data) => {
    setTooltip({
      x: event.pageX,
      y: event.pageY,
      label: data.data.label,
      color: event.target.getAttribute('fill')
    });
  };

  const hideTooltip = () => {
    setTooltip(null);
  };

  useEffect(() => {
    if (tooltip === null) return;

    const tooltipEl = document.getElementById('tooltip');
    const tooltipRect = tooltipEl.getBoundingClientRect();

    const x = tooltip.x - tooltipRect.width / 2;
    const y = tooltip.y - tooltipRect.height - 10;

    tooltipEl.style.left = x + 'px';
    tooltipEl.style.top = y + 'px';
  }, [tooltip]);

  return (
    <div ref={wrapperRef} style={{ width: '100%', height: '100%' }}>
      <svg width={dimensions.width} height={dimensions.height}>
        <g transform={`translate(${dimensions.width / 2}, ${dimensions.height / 2})`}>
          {arcs.map((arc, index) => {
            const path = d3.arc()
              .outerRadius(dimensions.width / 2)
              .innerRadius(0)
              .startAngle(arc.startAngle)
              .endAngle(arc.endAngle)();
            return (
              <path
                key={index}
                d={path}
                fill={`hsl(${index * 360 / arcs.length}, 80%, 70%)`}
                onMouseMove={(e) => showTooltip(e, arc)}
                onMouseLeave={() => hideTooltip()}
              />
            );
          })}
        </g>
      </svg>
      {tooltip && (
        <div
          id="tooltip"
          className="tooltip"
          style={{
            backgroundColor: tooltip.color,
            color: 'white',
          }}
        >
          {tooltip.label}
        </div>
      )}
    </div>
  );
};

export default PieChartV2;
