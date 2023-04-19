import { useMemo } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Unit } from "../models/redux-models";
import { AppDispatch, RootState } from "../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useUnits = () => {
  const availability = useAppSelector((state) => state.availability);

  // const availability = {
  //   apartments: [
  //     {
  //       name: "ENERGY GARDEN",
  //       code: "01GVES4DK1STANB8KCSN0H92WR",
  //       attributes: {
  //         area_constructed: 120.27,
  //         area_open: 456.96000000000004,
  //         area_total: 577.23,
  //         bathroom: 2,
  //         bedroom: 2,
  //         exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //         terrace: true,
  //       },
  //       units: [
  //         {
  //           name: "B100",
  //           code: "01GD0XS2K1FSTRJ7DFJ0239WVV",
  //           status: "nonavailable",
  //           attributes: {
  //             area_constructed: 120.27,
  //             area_open: 456.96000000000004,
  //             area_terrace: 200.55,
  //             area_total: 577.23,
  //             bathroom: 2,
  //             bedroom: 2,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13953/energy-garden.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13952/energy-garden-acotado.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13966/lautrec_garden.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "1",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13942/torre-b.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13937/b-1.jpg",
  //             ],
  //             price: 10892280,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //             roof_garden_area: 256.41,
  //           },
  //           typology: "ENERGY GARDEN",
  //         },
  //       ],
  //     },
  //     {
  //       name: "ENERGY",
  //       code: "01GVES4DK1STANB8KCSP4EKJQY",
  //       attributes: {
  //         area_constructed: 89.47,
  //         area_open: 31.2,
  //         area_total: 120.67,
  //         bathroom: 2,
  //         bedroom: 2,
  //         exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //         terrace: true,
  //       },
  //       units: [
  //         {
  //           name: "B101",
  //           code: "01GCYPW6GYN76QWEMZAJ10052S",
  //           status: "available",
  //           attributes: {
  //             area_constructed: 89.47,
  //             area_open: 31.2,
  //             area_terrace: 31.2,
  //             area_total: 120.67,
  //             bathroom: 2,
  //             bedroom: 2,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13951/energy.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13950/energy-acotado.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13966/lautrec_garden.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "0",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13942/torre-b.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13936/b.jpg",
  //             ],
  //             price: 7574190,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //           },
  //           typology: "ENERGY",
  //         },
  //         {
  //           name: "B102",
  //           code: "01GCYPW6GYN76QWEMZAFJBZY4S",
  //           status: "available",
  //           attributes: {
  //             area_constructed: 89.47,
  //             area_open: 31.2,
  //             area_terrace: 31.2,
  //             area_total: 120.67,
  //             bathroom: 2,
  //             bedroom: 2,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13951/energy.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13950/energy-acotado.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13966/lautrec_garden.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "2",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13942/torre-b.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13936/b.jpg",
  //             ],
  //             price: 7574190,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //           },
  //           typology: "ENERGY",
  //         },
  //         {
  //           name: "B103",
  //           code: "01GD0XS2K1FSTRJ7DFHWCKMEP1",
  //           status: "nonavailable",
  //           attributes: {
  //             area_constructed: 89.47,
  //             area_open: 31.2,
  //             area_terrace: 31.2,
  //             area_total: 120.67,
  //             bathroom: 2,
  //             bedroom: 2,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13951/energy.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13950/energy-acotado.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13966/lautrec_garden.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "1",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13942/torre-b.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13936/b.jpg",
  //             ],
  //             price: 6516180,
  //             product_subtype: "penthouse",
  //             product_type: "Apartamento",
  //           },
  //           typology: "ENERGY",
  //         },
  //       ],
  //     },
  //     {
  //       name: "ESSENCE GARDEN",
  //       code: "01GVES4DJTYJDNQ4WBJ2Q31N19",
  //       attributes: {
  //         area_constructed: 92.98,
  //         area_open: 91.69,
  //         area_total: 184.67,
  //         bathroom: 2,
  //         bedroom: 2,
  //         exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //         terrace: true,
  //       },
  //       units: [
  //         {
  //           name: "E106",
  //           code: "01GCYPW6H0RQAYKZ6GW5FFH6DZ",
  //           status: "nonavailable",
  //           attributes: {
  //             area_constructed: 92.98,
  //             area_open: 91.69,
  //             area_terrace: 31.58,
  //             area_total: 184.67,
  //             bathroom: 2,
  //             bedroom: 2,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14945/essence-garden.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14943/essence-garden-decorao.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13966/lautrec_garden.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "0",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13921/e-106.jpg",
  //             ],
  //             price: 8664880,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //             roof_garden_area: 60.11,
  //           },
  //           typology: "ESSENCE GARDEN",
  //         },
  //       ],
  //     },
  //     {
  //       name: "HARMONY",
  //       code: "01GVES4DJTYJDNQ4WBHT4ZBYZ4",
  //       attributes: {
  //         area_constructed: 49.04,
  //         area_open: 11.27,
  //         area_total: 60.31,
  //         bathroom: 1,
  //         bedroom: 1,
  //         exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //         terrace: true,
  //       },
  //       units: [
  //         {
  //           name: "E207",
  //           code: "01GCYPW6H1DN7V6DWZZKKCKVM1",
  //           status: "available",
  //           attributes: {
  //             area_constructed: 49.04,
  //             area_open: 13.61,
  //             area_terrace: 13.61,
  //             area_total: 62.65,
  //             bathroom: 1,
  //             bedroom: 1,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13954/harmony.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14646/harmony-n2.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13965/essence.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "1",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13929/e-207-307.jpg",
  //             ],
  //             price: 4446640,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //           },
  //           typology: "HARMONY",
  //         },
  //         {
  //           name: "E208",
  //           code: "01GCYPW6H1DN7V6DWZZNYNZQ7W",
  //           status: "available",
  //           attributes: {
  //             area_constructed: 49.04,
  //             area_open: 9.74,
  //             area_terrace: 9.74,
  //             area_total: 58.78,
  //             bathroom: 1,
  //             bedroom: 1,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13954/harmony.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14646/harmony-n2.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13965/essence.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "1",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13930/e-208-308.jpg",
  //             ],
  //             price: 4301920,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //           },
  //           typology: "HARMONY",
  //         },
  //         {
  //           name: "E205",
  //           code: "01GCYPW6H1DN7V6DWZZSGBG402",
  //           status: "available",
  //           attributes: {
  //             area_constructed: 49.66,
  //             area_open: 13.77,
  //             area_terrace: 13.77,
  //             area_total: 63.43,
  //             bathroom: 1,
  //             bedroom: 1,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13954/harmony.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14646/harmony-n2.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13965/essence.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "1",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13927/e-205-305.jpg",
  //             ],
  //             price: 4496560,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //           },
  //           typology: "HARMONY",
  //         },
  //         {
  //           name: "E202",
  //           code: "01GCYPW6H0RQAYKZ6GW7JHKVTE",
  //           status: "nonavailable",
  //           attributes: {
  //             area_constructed: 49.04,
  //             area_open: 9.74,
  //             area_terrace: 9.74,
  //             area_total: 58.78,
  //             bathroom: 1,
  //             bedroom: 1,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13954/harmony.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14646/harmony-n2.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13965/essence.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "1",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13924/e-202-302.jpg",
  //             ],
  //             price: 4066800,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //           },
  //           typology: "HARMONY",
  //         },
  //         {
  //           name: "E203",
  //           code: "01GCYPW6H0RQAYKZ6GWAJAXE6E",
  //           status: "available",
  //           attributes: {
  //             area_constructed: 49.04,
  //             area_open: 13.64,
  //             area_terrace: 13.64,
  //             area_total: 62.68,
  //             bathroom: 1,
  //             bedroom: 1,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13954/harmony.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14646/harmony-n2.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13965/essence.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "1",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13925/e-203-303.jpg",
  //             ],
  //             price: 4448560,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //           },
  //           typology: "HARMONY",
  //         },
  //         {
  //           name: "E204",
  //           code: "01GCYPW6H1DN7V6DWZZGY9NNKQ",
  //           status: "available",
  //           attributes: {
  //             area_constructed: 49.04,
  //             area_open: 9.74,
  //             area_terrace: 9.74,
  //             area_total: 58.78,
  //             bathroom: 1,
  //             bedroom: 1,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13954/harmony.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14646/harmony-n2.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13965/essence.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "1",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13926/e-204-304.jpg",
  //             ],
  //             price: 4301920,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //           },
  //           typology: "HARMONY",
  //         },
  //         {
  //           name: "E307",
  //           code: "01GCYPW6H2YVBMB73BCA2PKQY9",
  //           status: "available",
  //           attributes: {
  //             area_constructed: 49.04,
  //             area_open: 11.27,
  //             area_terrace: 11.27,
  //             area_total: 60.31,
  //             bathroom: 1,
  //             bedroom: 1,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13954/harmony.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14646/harmony-n2.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13965/essence.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "2",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13929/e-207-307.jpg",
  //             ],
  //             price: 4399840,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //           },
  //           typology: "HARMONY",
  //         },
  //         {
  //           name: "E302",
  //           code: "01GCYPW6H1DN7V6DWZZVWDJ66Y",
  //           status: "sold",
  //           attributes: {
  //             area_constructed: 49.04,
  //             area_open: 12.08,
  //             area_terrace: 12.08,
  //             area_total: 61.12,
  //             bathroom: 1,
  //             bedroom: 1,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13954/harmony.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14646/harmony-n2.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13965/essence.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "2",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13924/e-202-302.jpg",
  //             ],
  //             price: 4113600,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //           },
  //           typology: "HARMONY",
  //         },
  //         {
  //           name: "E308",
  //           code: "01GCYPW6H2YVBMB73BCDF89T7M",
  //           status: "available",
  //           attributes: {
  //             area_constructed: 49.04,
  //             area_open: 12.08,
  //             area_terrace: 12.08,
  //             area_total: 61.12,
  //             bathroom: 1,
  //             bedroom: 1,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13954/harmony.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14646/harmony-n2.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13965/essence.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "2",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13930/e-208-308.jpg",
  //             ],
  //             price: 4348720,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //           },
  //           typology: "HARMONY",
  //         },
  //         {
  //           name: "E305",
  //           code: "01GCYPW6H3XA8X8F1DVVNSZVS9",
  //           status: "available",
  //           attributes: {
  //             area_constructed: 49.66,
  //             area_open: 11.43,
  //             area_terrace: 11.43,
  //             area_total: 61.09,
  //             bathroom: 1,
  //             bedroom: 1,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13954/harmony.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14646/harmony-n2.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13965/essence.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "2",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13927/e-205-305.jpg",
  //             ],
  //             price: 4449760,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //           },
  //           typology: "HARMONY",
  //         },
  //         {
  //           name: "E303",
  //           code: "01GCYPW6H2YVBMB73BC3FYA2B7",
  //           status: "available",
  //           attributes: {
  //             area_constructed: 49.04,
  //             area_open: 11.3,
  //             area_terrace: 11.3,
  //             area_total: 60.34,
  //             bathroom: 1,
  //             bedroom: 1,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13954/harmony.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14646/harmony-n2.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13965/essence.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "2",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13925/e-203-303.jpg",
  //             ],
  //             price: 4401760,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //           },
  //           typology: "HARMONY",
  //         },
  //         {
  //           name: "E304",
  //           code: "01GCYPW6H2YVBMB73BC6FGS53A",
  //           status: "available",
  //           attributes: {
  //             area_constructed: 49.04,
  //             area_open: 12.08,
  //             area_terrace: 12.08,
  //             area_total: 61.12,
  //             bathroom: 1,
  //             bedroom: 1,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13954/harmony.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14646/harmony-n2.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13965/essence.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "2",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13926/e-204-304.jpg",
  //             ],
  //             price: 4348720,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //           },
  //           typology: "HARMONY",
  //         },
  //       ],
  //     },
  //     {
  //       name: "ESSENCE",
  //       code: "01GVES4DJTYJDNQ4WBHW62TEFE",
  //       attributes: {
  //         area_constructed: 92.98,
  //         area_open: 29.24,
  //         area_total: 122.22,
  //         bathroom: 2,
  //         bedroom: 2,
  //         exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //         terrace: true,
  //       },
  //       units: [
  //         {
  //           name: "E206",
  //           code: "01GCYPW6H1DN7V6DWZZJJ1QW62",
  //           status: "available",
  //           attributes: {
  //             area_constructed: 92.98,
  //             area_open: 29.24,
  //             area_terrace: 29.24,
  //             area_total: 122.22,
  //             bathroom: 2,
  //             bedroom: 2,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14944/essence-decorado.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14942/essence.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13966/lautrec_garden.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "1",
  //             pictures: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14158/tap_220826_corte.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14159/tap_220826_corte.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14160/tap_220826_exterior.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14161/tap_220826_exterior.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14157/tap_220826_corte.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14162/tap_220826_recamara.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14163/tap_220826_sala.jpg",
  //             ],
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13928/e-206-306.jpg",
  //             ],
  //             price: 7735840,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //           },
  //           typology: "ESSENCE",
  //         },
  //         {
  //           name: "E402",
  //           code: "01GCYPW6GZH5NDBQYGK8JVNY0X",
  //           status: "available",
  //           attributes: {
  //             area_constructed: 92.98,
  //             area_open: 28.46,
  //             area_terrace: 28.46,
  //             area_total: 121.44,
  //             bathroom: 2,
  //             bedroom: 2,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14944/essence-decorado.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14942/essence.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13966/lautrec_garden.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "3",
  //             pictures: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14158/tap_220826_corte.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14159/tap_220826_corte.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14160/tap_220826_exterior.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14161/tap_220826_exterior.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14157/tap_220826_corte.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14162/tap_220826_recamara.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14163/tap_220826_sala.jpg",
  //             ],
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13931/e-402.jpg",
  //             ],
  //             price: 7960000,
  //             product_subtype: "penthouse",
  //             product_type: "Apartamento",
  //           },
  //           typology: "ESSENCE",
  //         },
  //         {
  //           name: "E406",
  //           code: "01GCYPW6GYN76QWEMZAZYXJR3T",
  //           status: "available",
  //           attributes: {
  //             area_constructed: 92.98,
  //             area_open: 28.46,
  //             area_terrace: 28.46,
  //             area_total: 121.44,
  //             bathroom: 2,
  //             bedroom: 2,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14944/essence-decorado.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14942/essence.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13966/lautrec_garden.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "3",
  //             pictures: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14158/tap_220826_corte.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14159/tap_220826_corte.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14160/tap_220826_exterior.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14161/tap_220826_exterior.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14157/tap_220826_corte.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14162/tap_220826_recamara.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14163/tap_220826_sala.jpg",
  //             ],
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13933/e-406.jpg",
  //             ],
  //             price: 7960000,
  //             product_subtype: "penthouse",
  //             product_type: "Apartamento",
  //           },
  //           typology: "ESSENCE",
  //         },
  //         {
  //           name: "E407",
  //           code: "01GD15NGVWN4VJAGYYJ2M75X0X",
  //           status: "available",
  //           attributes: {
  //             area_constructed: 92.46,
  //             area_open: 29.01,
  //             area_terrace: 29.01,
  //             area_total: 121.47,
  //             bathroom: 2,
  //             bedroom: 2,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14944/essence-decorado.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14942/essence.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13966/lautrec_garden.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "3",
  //             pictures: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14159/tap_220826_corte.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14160/tap_220826_exterior.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14161/tap_220826_exterior.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14157/tap_220826_corte.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14162/tap_220826_recamara.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14163/tap_220826_sala.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14158/tap_220826_corte.jpg",
  //             ],
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/15708/e-408.jpg",
  //             ],
  //             price: 7961800,
  //             product_subtype: "penthouse",
  //             product_type: "Apartamento",
  //           },
  //           typology: "ESSENCE",
  //         },
  //         {
  //           name: "E404",
  //           code: "01GCYPW6GYN76QWEMZAYDX47RZ",
  //           status: "available",
  //           attributes: {
  //             area_constructed: 92.46,
  //             area_open: 29.01,
  //             area_terrace: 29.01,
  //             area_total: 121.47,
  //             bathroom: 2,
  //             bedroom: 2,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14944/essence-decorado.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14942/essence.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13966/lautrec_garden.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "3",
  //             pictures: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14158/tap_220826_corte.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14159/tap_220826_corte.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14160/tap_220826_exterior.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14161/tap_220826_exterior.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14157/tap_220826_corte.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14162/tap_220826_recamara.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14163/tap_220826_sala.jpg",
  //             ],
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13932/e-404.jpg",
  //             ],
  //             price: 7961800,
  //             product_subtype: "penthouse",
  //             product_type: "Apartamento",
  //           },
  //           typology: "ESSENCE",
  //         },
  //         {
  //           name: "E306",
  //           code: "01GCYPW6H2YVBMB73BC9RSK3S4",
  //           status: "available",
  //           attributes: {
  //             area_constructed: 92.98,
  //             area_open: 29.24,
  //             area_terrace: 29.24,
  //             area_total: 122.22,
  //             bathroom: 2,
  //             bedroom: 2,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14944/essence-decorado.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14942/essence.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13966/lautrec_garden.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "2",
  //             pictures: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14158/tap_220826_corte.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14159/tap_220826_corte.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14160/tap_220826_exterior.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14161/tap_220826_exterior.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14157/tap_220826_corte.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14162/tap_220826_recamara.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14163/tap_220826_sala.jpg",
  //             ],
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13928/e-206-306.jpg",
  //             ],
  //             price: 7975600,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //           },
  //           typology: "ESSENCE",
  //         },
  //       ],
  //     },
  //     {
  //       name: "HARMONY GARDEN",
  //       code: "01GVES4DJTYJDNQ4WBHZEN721T",
  //       attributes: {
  //         area_constructed: 49.04,
  //         area_open: 51.839999999999996,
  //         area_total: 100.88,
  //         bathroom: 1,
  //         bedroom: 1,
  //         exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //         terrace: true,
  //       },
  //       units: [
  //         {
  //           name: "E107",
  //           code: "01GCYPW6GZH5NDBQYGKF23ZAKT",
  //           status: "sold",
  //           attributes: {
  //             area_constructed: 49.04,
  //             area_open: 44.620000000000005,
  //             area_terrace: 13.64,
  //             area_total: 93.66,
  //             bathroom: 1,
  //             bedroom: 1,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13955/harmony-garden.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14645/harmony-pb.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13965/essence.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "0",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13922/e-107.jpg",
  //             ],
  //             price: 5040400,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //             roof_garden_area: 30.98,
  //           },
  //           typology: "HARMONY GARDEN",
  //         },
  //         {
  //           name: "E105",
  //           code: "01GCYPW6GZH5NDBQYGKEFAN6WR",
  //           status: "nonavailable",
  //           attributes: {
  //             area_constructed: 49.66,
  //             area_open: 51.7,
  //             area_terrace: 13.77,
  //             area_total: 101.36,
  //             bathroom: 1,
  //             bedroom: 1,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13955/harmony-garden.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14645/harmony-pb.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13965/essence.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "0",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13920/e-105.jpg",
  //             ],
  //             price: 5224400,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //             roof_garden_area: 37.93,
  //           },
  //           typology: "HARMONY GARDEN",
  //         },
  //         {
  //           name: "E104",
  //           code: "01GCYPW6H0RQAYKZ6GW4M8T1SG",
  //           status: "sold",
  //           attributes: {
  //             area_constructed: 49.04,
  //             area_open: 51.839999999999996,
  //             area_terrace: 12.08,
  //             area_total: 100.88,
  //             bathroom: 1,
  //             bedroom: 1,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13955/harmony-garden.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14645/harmony-pb.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13965/essence.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "0",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13919/e-104.jpg",
  //             ],
  //             price: 5028800,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //             roof_garden_area: 39.76,
  //           },
  //           typology: "HARMONY GARDEN",
  //         },
  //         {
  //           name: "E108",
  //           code: "01GCYPW6GZH5NDBQYGKG6J3ZR7",
  //           status: "available",
  //           attributes: {
  //             area_constructed: 49.04,
  //             area_open: 42.32,
  //             area_terrace: 12.08,
  //             area_total: 91.36,
  //             bathroom: 1,
  //             bedroom: 1,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13955/harmony-garden.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14645/harmony-pb.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13965/essence.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "0",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13923/e-108.jpg",
  //             ],
  //             price: 5073520,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //             roof_garden_area: 30.24,
  //           },
  //           typology: "HARMONY GARDEN",
  //         },
  //         {
  //           name: "E102",
  //           code: "01GD0S4W7GC11J8AQ261VXSEJX",
  //           status: "available",
  //           attributes: {
  //             area_constructed: 49.04,
  //             area_open: 51.839999999999996,
  //             area_terrace: 12.08,
  //             area_total: 100.88,
  //             bathroom: 1,
  //             bedroom: 1,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13955/harmony-garden.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14645/harmony-pb.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13965/essence.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "0",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13917/e-102.jpg",
  //             ],
  //             price: 5263920,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //             roof_garden_area: 39.76,
  //           },
  //           typology: "HARMONY GARDEN",
  //         },
  //         {
  //           name: "E103",
  //           code: "01GCYPW6GZH5NDBQYGKAXFKD8F",
  //           status: "available",
  //           attributes: {
  //             area_constructed: 49.04,
  //             area_open: 53.4,
  //             area_terrace: 13.64,
  //             area_total: 102.44,
  //             bathroom: 1,
  //             bedroom: 1,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13955/harmony-garden.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14645/harmony-pb.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13965/essence.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "0",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13946/torre-e.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13918/e-103.jpg",
  //             ],
  //             price: 5466720,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //             roof_garden_area: 39.76,
  //           },
  //           typology: "HARMONY GARDEN",
  //         },
  //       ],
  //     },
  //     {
  //       name: "LAUTREC GARDEN",
  //       code: "01GVES4DJTYJDNQ4WBHM0N30CP",
  //       attributes: {
  //         area_constructed: 131.1,
  //         area_open: 226.54,
  //         area_total: 357.64,
  //         bathroom: 2,
  //         bedroom: 2,
  //         exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //         terrace: true,
  //       },
  //       units: [
  //         {
  //           name: "D100",
  //           code: "01GD0XS2JZ1VXHAT03MPA12G3B",
  //           status: "nonavailable",
  //           attributes: {
  //             area_constructed: 131.1,
  //             area_open: 226.54,
  //             area_terrace: 226.54,
  //             area_total: 357.64,
  //             bathroom: 2,
  //             bedroom: 2,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13964/lautrec-gardens.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13963/lautrec-garden-acotado.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13966/lautrec_garden.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "1",
  //             pictures: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14165/tap_220822_-_terraza_cocina_v3.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14169/tap_220913_bano.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14166/tap_220822_-_terraza_cocina_v3.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14167/tap_220822_-_terraza_lateral_v2.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14168/tap_220822_-_terraza_lateral_v2.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/14164/tap_220822_-_recamara_v2.jpg",
  //             ],
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13944/torre-d.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13939/d-1.jpg",
  //             ],
  //             price: 12360640,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //           },
  //           typology: "LAUTREC GARDEN",
  //         },
  //       ],
  //     },
  //     {
  //       name: "LAUTREC",
  //       code: "01GVES4DJTYJDNQ4WBHFN7QR67",
  //       attributes: {
  //         area_constructed: 131.1,
  //         area_open: 47.72,
  //         area_total: 178.82,
  //         bathroom: 2,
  //         bedroom: 2,
  //         exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //         terrace: true,
  //       },
  //       units: [
  //         {
  //           name: "D101",
  //           code: "01GD0XS2JZ1VXHAT03MSNTYFZ9",
  //           status: "nonavailable",
  //           attributes: {
  //             area_constructed: 131.1,
  //             area_open: 47.72,
  //             area_terrace: 47.72,
  //             area_total: 178.82,
  //             bathroom: 2,
  //             bedroom: 2,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13956/lua.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13957/lautrec-acotado.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13966/lautrec_garden.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "1",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13944/torre-d.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13940/d.jpg",
  //             ],
  //             price: 10181840,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //           },
  //           typology: "LAUTREC",
  //         },
  //         {
  //           name: "D102",
  //           code: "01GD0XS2K0W83BNKA46NY24AXY",
  //           status: "nonavailable",
  //           attributes: {
  //             area_constructed: 131.1,
  //             area_open: 47.72,
  //             area_terrace: 47.72,
  //             area_total: 178.82,
  //             bathroom: 2,
  //             bedroom: 2,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13956/lua.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13957/lautrec-acotado.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13966/lautrec_garden.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "2",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13944/torre-d.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13940/d.jpg",
  //             ],
  //             price: 10181840,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //           },
  //           typology: "LAUTREC",
  //         },
  //       ],
  //     },
  //     {
  //       name: "NATURE",
  //       code: "01GVES4DJTYJDNQ4WBHK2YV544",
  //       attributes: {
  //         area_constructed: 131.1,
  //         area_open: 47.72,
  //         area_total: 178.82,
  //         bathroom: 3,
  //         bedroom: 3,
  //         exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //         terrace: true,
  //       },
  //       units: [
  //         {
  //           name: "D103",
  //           code: "01GCYPW6H3XA8X8F1DW1PG3B6S",
  //           status: "sold",
  //           attributes: {
  //             area_constructed: 131.1,
  //             area_open: 47.72,
  //             area_terrace: 47.72,
  //             area_total: 178.82,
  //             bathroom: 3,
  //             bedroom: 3,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13956/lua.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13957/lautrec-acotado.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13967/tap_220822_-_terraza_lateral_v2.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "0",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13944/torre-d.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13940/d.jpg",
  //             ],
  //             price: 10718300,
  //             product_subtype: "penthouse",
  //             product_type: "Apartamento",
  //           },
  //           typology: "NATURE",
  //         },
  //       ],
  //     },
  //     {
  //       name: "RENOIR",
  //       code: "01GVES4DK0TVV5NNSV2YTHXVCM",
  //       attributes: {
  //         area_constructed: 101.55,
  //         area_open: 35.7,
  //         area_total: 137.25,
  //         bathroom: 2,
  //         bedroom: 2,
  //         exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //         terrace: true,
  //       },
  //       units: [
  //         {
  //           name: "C102",
  //           code: "01GD0XS2K2T7YT0A6XTGK79XRJ",
  //           status: "nonavailable",
  //           attributes: {
  //             area_constructed: 101.55,
  //             area_open: 35.7,
  //             area_terrace: 35.7,
  //             area_total: 137.25,
  //             bathroom: 2,
  //             bedroom: 2,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13959/renior.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13958/renior-acotado.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13966/lautrec_garden.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "2",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13943/torre-c.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13938/c.jpg",
  //             ],
  //             price: 8010250,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //           },
  //           typology: "RENOIR",
  //         },
  //         {
  //           name: "C101",
  //           code: "01GD0XS2K1FSTRJ7DFJ7WWV7AA",
  //           status: "nonavailable",
  //           attributes: {
  //             area_constructed: 101.55,
  //             area_open: 35.7,
  //             area_terrace: 35.7,
  //             area_total: 137.25,
  //             bathroom: 2,
  //             bedroom: 2,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13959/renior.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13958/renior-acotado.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13966/lautrec_garden.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "1",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13943/torre-c.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13938/c.jpg",
  //             ],
  //             price: 8010250,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //           },
  //           typology: "RENOIR",
  //         },
  //         {
  //           name: "C103",
  //           code: "01GD0XS2K1FSTRJ7DFJ8N6Y5G9",
  //           status: "nonavailable",
  //           attributes: {
  //             area_constructed: 101.55,
  //             area_open: 35.7,
  //             area_terrace: 35.7,
  //             area_total: 137.25,
  //             bathroom: 2,
  //             bedroom: 2,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13959/renior.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13958/renior-acotado.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13966/lautrec_garden.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "1",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13943/torre-c.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13938/c.jpg",
  //             ],
  //             price: 7274250,
  //             product_subtype: "penthouse",
  //             product_type: "Apartamento",
  //           },
  //           typology: "RENOIR",
  //         },
  //       ],
  //     },
  //     {
  //       name: "AURA",
  //       code: "01GVES4DJZ22WQRJQ2Y2RVBC5G",
  //       attributes: {
  //         area_constructed: 55.8,
  //         area_open: 11.15,
  //         area_total: 66.95,
  //         bathroom: 2,
  //         bedroom: 2,
  //         exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //         terrace: true,
  //       },
  //       units: [
  //         {
  //           name: "A103",
  //           code: "01GCYPW6GYN76QWEMZAAK2HVSJ",
  //           status: "available",
  //           attributes: {
  //             area_constructed: 55.8,
  //             area_open: 11.15,
  //             area_terrace: 11.15,
  //             area_total: 66.95,
  //             bathroom: 1,
  //             bedroom: 1,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13949/aura.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13948/aura-acotado.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13965/essence.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "3",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13941/torre-a.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13935/a.jpg",
  //             ],
  //             price: 4597000,
  //             product_subtype: "penthouse",
  //             product_type: "Apartamento",
  //           },
  //           typology: "AURA",
  //         },
  //         {
  //           name: "A102",
  //           code: "01GD0XS2K0W83BNKA474PGEZD4",
  //           status: "nonavailable",
  //           attributes: {
  //             area_constructed: 55.8,
  //             area_open: 11.15,
  //             area_terrace: 11.15,
  //             area_total: 66.95,
  //             bathroom: 2,
  //             bedroom: 2,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13949/aura.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13948/aura-acotado.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13966/lautrec_garden.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "2",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13941/torre-a.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13935/a.jpg",
  //             ],
  //             price: 4396150,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //           },
  //           typology: "AURA",
  //         },
  //         {
  //           name: "A101",
  //           code: "01GD0XS2K0W83BNKA470SW5WG9",
  //           status: "nonavailable",
  //           attributes: {
  //             area_constructed: 55.8,
  //             area_open: 11.15,
  //             area_terrace: 11.15,
  //             area_total: 66.95,
  //             bathroom: 1,
  //             bedroom: 1,
  //             blueprint: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13949/aura.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13948/aura-acotado.jpg",
  //             ],
  //             cover:
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13965/essence.jpg",
  //             exclusive_code: "01GCWJYRQZG86M00T6WHM7QGGR",
  //             level: "1",
  //             plans: [
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13941/torre-a.jpg",
  //               "https://ims.imgix.net/uploads/ims/asset/attachment/13935/a.jpg",
  //             ],
  //             price: 4396150,
  //             product_subtype: "apartment",
  //             product_type: "Apartamento",
  //           },
  //           typology: "AURA",
  //         },
  //       ],
  //     },
  //   ],
  // };

  return useMemo(() => {
    const units: Unit[] = [];
    availability.apartments?.forEach((apartment: any) => {
      units.push(...apartment.units);
    });
    return units;
  }, [availability.apartments]);
};
export const useFilters = () => {
  ///
  const numberFormat = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }),
    []
  );
  const availability = useAppSelector((state) => state.availability);

  const units = useUnits();
  const bedrooms = useMemo(() => {
    const numberOfBedrooms = new Set<number>();
    availability.apartments?.forEach((apartment) => {
      numberOfBedrooms.add(apartment.attributes.bedroom);
    });
    return Array.from(numberOfBedrooms)?.map((bedroom) => ({
      text: `${bedroom.toString()} \\ ${bedroom.toString()}`,
      value: bedroom,
    }));
  }, [availability.apartments]);
  const bathrooms = useMemo(() => {
    const numberOfBathrooms = new Set<number>();
    availability.apartments?.forEach((apartment) => {
      numberOfBathrooms.add(apartment.attributes.bathroom);
    });
    return Array.from(numberOfBathrooms)?.map((bathroom) => ({
      text: bathroom.toString(),
      value: bathroom,
    }));
  }, [availability.apartments]);
  const floorplanTypes = useMemo(
    () =>
      availability.apartments?.map((apartment) => ({
        text: apartment.name,
        value: apartment.name,
      })) || [],
    [availability.apartments]
  );
  const prices = useMemo(
    () =>
      availability.filters.prices?.map(
        (
          {
            min,
            max,
            currency,
          }: { min: number; max: number; currency: string },
          i: number
        ) => {
          let optionText = `${numberFormat.format(min)} - ${numberFormat.format(
            max
          )} ${currency}`;
          if (i === 1) {
            optionText = `Menos de ${numberFormat.format(max)} ${currency}`;
          }
          if (i === availability.filters.prices.length - 1) {
            optionText = `Más de ${numberFormat.format(min)} ${currency}`;
          }
          return {
            text: optionText,
            value: i === 0 ? 0 : `${min} - ${max}`,
          };
        }
      ) || [],
    [availability.filters.prices, numberFormat]
  );
  const areas = useMemo(
    () =>
      availability.filters.areas?.map(
        (
          {
            min,
            max,
            areaMetric = "m2",
          }: { min: number; max: number; areaMetric: string },
          i: any
        ) => {
          let optionText = `${min} - ${max} ${areaMetric}`;
          if (i === 1) {
            optionText = `Menos de ${max} ${areaMetric}`;
          }
          if (i === availability.filters.areas.length - 1) {
            optionText = `Más de ${min} ${areaMetric}`;
          }
          return {
            text: optionText,
            value: i === 0 ? 0 : `${min} - ${max}`,
          };
        }
      ) || [],
    [availability.filters.areas]
  );

  const levels = useMemo(() => {
    const levelNumbers = new Set<string>();
    units?.forEach((unit) => levelNumbers.add(unit.attributes.level));

    return Array.from(levelNumbers)
      ?.map((floor) => ({
        text: `Level ${floor}`,
        value: parseInt(floor, 10),
      }))
      .sort((a: any, b: any) => b.value - a.value);
  }, [units]);

  return { bedrooms, bathrooms, floorplanTypes, prices, areas, levels };
};

export const useFiltersValues = () => {
  const availability = useAppSelector((state) => state.availability);
  const bathrooms = useMemo(
    () => availability.bathrooms,
    [availability.bathrooms]
  );
  const bedrooms = useMemo(
    () => availability.bedrooms,
    [availability.bedrooms]
  );
  const prices = useMemo(() => availability.prices, [availability.prices]);
  const areas = useMemo(() => availability.areas, [availability.areas]);
  const floorplanType = useMemo(
    () => availability.floorplanType,
    [availability.floorplanType]
  );
  const level = useMemo(() => availability.level, [availability.level]);
  return [bedrooms, bathrooms, floorplanType, prices, areas, level];
};

export const useSVGImage = () => {
  const availability = useAppSelector((state) => state.availability);

  let stage = "";
  if (availability.stage)
    stage = availability.stage === "etapa-1" ? "Etapa 1" : "Etapa 2";

  const svgs = availability.svgs?.filter(
    (svg) => svg.type === availability.svgType && svg.stage === stage
  );

  return useMemo(() => svgs[0]?.svg || "", [svgs]);
};

export const useGetProjectId = () => {
  const availability = useAppSelector((state) => state.availability);
  const getProjectId = availability.projectId;
  return getProjectId;
};

export const useFloors = () => {
  const availability = useAppSelector((state) => state.availability);
  return useMemo(() => availability.floors, [availability.floors]);
};

export const useAvailabilityFilter = () => {
  const availability = useAppSelector(
    (state) => state.availability.availability
  );
  return useMemo(() => availability, [availability]);
};

export const useSvgType = () => {
  const svgType = useAppSelector((state) => state.availability.svgType);
  return useMemo(() => svgType, [svgType]);
};

export const useStage = () => {
  const stage = useAppSelector((state) => state.availability.stage);
  return useMemo(() => stage, [stage]);
};

export const useExternalId = () => {
  const externalId = useAppSelector((state) => state.availability.externalId);
  return useMemo(() => externalId, [externalId]);
};

export const useProjectId = () => {
  const projectId = useAppSelector((state) => state.availability.projectId);
  return useMemo(() => projectId, [projectId]);
};

export const useLocations = () => {
  const locations = useAppSelector((state) => state.availability.locations);
  return useMemo(() => locations, [locations]);
};

export const useCurrentLocation = () => {
  const currentLocation = useAppSelector(
    (state) => state.availability.currentLocation
  );
  return useMemo(() => currentLocation, [currentLocation]);
};

export const useCurrentView = () => {
  const currentView = useAppSelector((state) => state.availability.currentView);
  return useMemo(() => currentView, [currentView]);
};

export const usePastView = () => {
  const pastView = useAppSelector((state) => state.availability.pastView);
  return useMemo(() => pastView, [pastView]);
};

export const useCurrentVideo = () => {
  const currentVideo = useAppSelector(
    (state) => state.availability.currentVideo
  );
  return useMemo(() => currentVideo, [currentVideo]);
};

export const useCurrentType = () => {
  const currentVideoType = useAppSelector(
    (state) => state.availability.currentVideoType
  );
  return useMemo(() => currentVideoType, [currentVideoType]);
};

export const useHideImage = () => {
  const hideImage = useAppSelector((state) => state.availability.hideImage);
  return useMemo(() => hideImage, [hideImage]);
};

export const useCurrentLoading = () => {
  const loading = useAppSelector((state) => state.availability.loading);
  return useMemo(() => loading, [loading]);
};
