import {
  useAvailabilityFilter,
  useFiltersValues,
  useFloors,
  useSVGImage
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
  const svgImage = useSVGImage();
  const floors = useFloors();

  const renderSVG = useCallback(() => {
    const areaMinMax =
      typeof areaFilter === "string"
        ? areaFilter.split(" - ")
        : [0, 999999999999999];
    const priceMinMax =
      typeof priceFilter === "string"
        ? priceFilter.split(" - ")
        : [0, 999999999999999];

    floors.forEach((floor) => {
      const currentLevelNode = document.getElementById(`Level${floor.floor}`);

      if (currentLevelNode) {
        currentLevelNode.classList.add("floor");
        if (floor.floor === level || level === null) {
          currentLevelNode.classList.remove("floor");
        }
      }

      const floorPlans =
        !bathroomFilter &&
        !bedroomFilter &&
        !floorplanFilter &&
        !priceFilter &&
        !areaFilter
          ? floor.floorPlans
          : floor.floorPlans.filter(
              (el) =>
                el.bathrooms === bathroomFilter ||
                el.bedrooms === bedroomFilter ||
                el.unitName === floorplanFilter ||
                (el.area < Number(areaMinMax[0]) &&
                  el.area > Number(areaMinMax[1])) ||
                (el.price < Number(priceMinMax[0]) &&
                  el.price > Number(priceMinMax[1]))
            );

      floorPlans.forEach((el) => {
        const { unitNumber, status } = el;
        const floorplan = document.getElementById(`U-${unitNumber}`);
        const floorplanPolygon = document.getElementById(`P-${unitNumber}`);
        const floorplanCircleNumber = document.getElementById(
          `M-${unitNumber}`
        );

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

          if (lockUnitRef.current === unitNumber) {
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
            lockUnitRef.current = unitNumber;
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
    areaFilter,
    priceFilter,
    floors,
    bathroomFilter,
    bedroomFilter,
    floorplanFilter,
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
