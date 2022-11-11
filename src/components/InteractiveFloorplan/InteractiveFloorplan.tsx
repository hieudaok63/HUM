import {
  useAvailabilityFilter,
  useFiltersValues,
  useSVGImage,
  useUnits
} from "../../hooks";
import { ReactSVG } from "react-svg";
import { useCallback, useRef, useState } from "react";
import { FloorplanCard } from "../FloorplanCard";
import { ModalFloorplan } from "../ModalFlooplan";

const fills: { [key: string]: string } = {
  available: "#B4FFEE",
  reserved: "#FFE7B6",
  taken: "#C0C7FF",
  sold: "#FFC0C0",
  "not-available": "#C4C4C4"
};

export const InteractiveFloorplan = () => {
  const currentSvg = useRef(null);
  const hoveredElementRef = useRef<any>(null);
  const selectedElementRef = useRef<any>(null);
  const lockElementRef = useRef<any>(null);
  const lockUnitRef = useRef<any>(null);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [
    bedroomFilter,
    bathroomFilter,
    floorplanFilter,
    priceFilter,
    areaFilter,
    level
  ] = useFiltersValues();
  const availability = useAvailabilityFilter();
  const units = useUnits();
  const svgImage = useSVGImage();

  const renderSVG = useCallback(() => {
    units.forEach((unit) => {
      const currentLevelNode = document.getElementById(
        `Level${unit.attributes.level}`
      );

      if (currentLevelNode) {
        currentLevelNode.classList.add("floor");
        if (unit.attributes.level === level?.toString() || level === null) {
          currentLevelNode.classList.remove("floor");
        }
      }

      const floorPlans =
        !bathroomFilter &&
        !bedroomFilter &&
        !floorplanFilter &&
        !priceFilter &&
        !areaFilter
          ? units
          : units.filter(
              (el) =>
                el.attributes.bathroom === bathroomFilter ||
                el.attributes.bedroom === bedroomFilter ||
                el.typology === floorplanFilter
            );

      floorPlans.forEach((el) => {
        const { name, status } = el;
        const floorplan = document.getElementById(`U-${name}`);
        const floorplanPolygon = document.getElementById(`P-${name}`);
        const floorplanCircleNumber = document.getElementById(`M-${name}`);

        if (floorplanPolygon) {
          floorplanPolygon.classList.add("st2");
          floorplanPolygon.setAttribute(
            "style",
            "fill:transparent; border: none"
          );
          if (status === availability) {
            floorplanPolygon.classList.remove("st2");
            floorplanPolygon.setAttribute(
              "style",
              `fill:${fills[availability]}; opacity: 0.5`
            );
          }

          if (lockUnitRef.current === name) {
            floorplanPolygon.classList.remove("st2");
            floorplanPolygon.setAttribute(
              "style",
              `fill:${fills[status]}; opacity: 0.5`
            );
          }
        }

        if (floorplanCircleNumber) {
          floorplanCircleNumber.setAttribute(
            "style",
            `fill:${fills[status]}; opacity: 1;`
          );
        }

        if (floorplan) {
          floorplan.addEventListener("mousedown", (e: any) => {
            const { clientX: x, clientY: y } = e;
            setMousePosition({ x, y });
            lockElementRef.current = true;
            lockUnitRef.current = name;
            hoveredElementRef.current = el;
            selectedElementRef.current = el;
          });
          floorplan.addEventListener(
            "mouseenter",
            (e: any) => {
              if (!lockElementRef.current) {
                const { clientX: x, clientY: y } = e;
                setMousePosition({ x, y });
                if (floorplanPolygon) {
                  floorplanPolygon.classList.remove("st2");
                  floorplanPolygon.setAttribute(
                    "style",
                    `fill:${fills[status]}; opacity: 0.5`
                  );
                }
                hoveredElementRef.current = el;
              }
            },
            false
          );
        }
      });
    });
  }, [
    units,
    bathroomFilter,
    bedroomFilter,
    floorplanFilter,
    priceFilter,
    areaFilter,
    level,
    availability
  ]);

  if (!svgImage) return null;

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        paddingLeft: "9px",
        paddingRight: "12px",
        position: "relative"
      }}
      onMouseEnter={() => {
        if (!lockElementRef.current) {
          setMousePosition(null);
          hoveredElementRef.current = null;
        }
      }}
    >
      <ReactSVG
        ref={currentSvg}
        afterInjection={(err, svg) => {
          if (svg) renderSVG();
        }}
        src={`${svgImage}?v2`}
        style={{
          height: "100%",
          width: "100%"
        }}
        className="svg-container"
      />
      {mousePosition?.x && mousePosition?.y && hoveredElementRef.current && (
        <FloorplanCard
          x={mousePosition?.x}
          y={mousePosition?.y}
          selectedFloorplan={hoveredElementRef.current}
          clearSelectedFloor={() => {
            hoveredElementRef.current = null;
            selectedElementRef.current = null;
            lockElementRef.current = false;
            lockUnitRef.current = null;
            setMousePosition(null);
          }}
          onClick={() => {
            hoveredElementRef.current = null;
            lockElementRef.current = false;
            lockUnitRef.current = null;
            setMousePosition(null);
            setOpenModal(true);
          }}
        />
      )}
      {selectedElementRef.current && (
        <ModalFloorplan
          open={openModal}
          handleClose={() => setOpenModal(false)}
          selectedFloorplan={selectedElementRef.current}
        />
      )}
    </div>
  );
};
