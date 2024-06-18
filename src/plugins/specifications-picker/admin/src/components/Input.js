import * as React from "react";
import { useIntl } from "react-intl";
import { useState, useEffect } from 'react';
import {
    SingleSelect,
    SingleSelectOption,
    MultiSelect,
    MultiSelectOption,
    Combobox,
    ComboboxOption,
    Flex
} from '@strapi/design-system';
import imageRequest from '../api/image';

const Input = React.forwardRef((props, ref) => {
    // @ts-ignore
    const { attribute, disabled, intlLabel, name, onChange, required, value } = props;
    const { formatMessage } = useIntl();

    // State to hold the fetched data
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState('');
    const [variants, setVariants] = useState([]);
    const [selectedVariants, setSelectedVariants] = useState([]);
    const [selectedColumn, setSelectedColumn] = useState("");
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const [data, setData] = useState();
    const [hideCommonFeatures, setHideCommonFeatures] = useState(false);

    const [json, setJson] = useState({});

    useEffect(() => {
        const searchModel = async (model) => {
            const modelsData = await imageRequest.searchModel(model);
            console.log("models: " + modelsData.length);
            setModels(modelsData);
        };

        let json = {}

        if (value) { json = JSON.parse(value); setJson(JSON.parse(value)); }
        if (value) { setSelectedModel(json.selectedModel); setSelectedVariants(json.selectedVariants); setSelectedColumn(json.selectedColumn); setSelectedAttributes(json.selectedAttributes) }
        if (value) { setData(json.data) }

        console.log("Specifications: " + value);

        searchModel("");

    }, [])

    // useEffect(() => {
    //     setSelectedAttributes([])
    // }, [selectedColumn])

    useEffect(() => {

        if (selectedVariants && selectedVariants.length > 0 && data && data.length > 0 && selectedColumn && selectedAttributes) {

            const attributes = Object.keys(data[0].specifications[selectedColumn]).filter((attribute) => selectedAttributes.includes(attribute));

            const filteredAttributes = hideCommonFeatures
                ? attributes.filter((attribute) =>
                    data.some(
                        (car, index) =>
                            index !== 0 &&
                            car.specifications[selectedColumn] !== undefined &&
                            car.specifications[selectedColumn][attribute] !==
                            data[0].specifications[selectedColumn][attribute]
                    )
                )
                : attributes.filter((attribute) =>
                    data.some(
                        (car) => car.specifications[selectedColumn][attribute] !== ""
                    )
                );

            const dataJSON = [];

            data.map((car) => {

                let attributesData = {}

                filteredAttributes.map((attribute) => {
                    const value = (car.specifications[selectedColumn] !== undefined &&
                        car.specifications[selectedColumn][attribute] !== "")
                        ? car.specifications[selectedColumn][attribute]
                        : "-"

                    attributesData[attribute] = value;
                })

                let specificationsJSON = {
                    [selectedColumn]: attributesData
                }
                let object = {
                    variant: car.variant,
                    specifications: specificationsJSON
                }
                dataJSON.push(object)
            })

            setJson({
                selectedModel: selectedModel,
                selectedVariants: selectedVariants,
                selectedColumn: selectedColumn,
                selectedAttributes: selectedAttributes,
                data: dataJSON
            })

            handleChange(JSON.stringify({
                selectedModel: selectedModel,
                selectedVariants: selectedVariants,
                selectedColumn: selectedColumn,
                selectedAttributes: selectedAttributes,
                data: dataJSON
            }))
        }

    }, [selectedAttributes])

    useEffect(() => {
        async function getVariants(e) {
            if (e) {
                const model = e.toLowerCase().replaceAll(" ", "-")
                console.log("modelName: " + model);
                const variantsList = await imageRequest.getVariants(model);
                console.log(variantsList);
                setVariants(variantsList.variants)
            }
        }

        getVariants(selectedModel)
    }, [selectedModel])

    const getSpecifications = async () => {
        // console.log("selectedVariants: " + selectedVariants.length);

        // const formattedVariants = selectedVariants.map((variant) => variant.toLowerCase().replaceAll(" ", "-"))
        // const variantsData = await imageRequest.getSpecifications(formattedVariants);
        // console.log(variantsData);
        setData([{
            "_id": "664ccde7289d2c224b49f412",
            "brand": "Kia",
            "model": "Kia Seltos",
            "variant": "Kia Seltos HTE",
            "type": "Crossover",
            "price": 1089900,
            "price_band": "Budget",
            "model_sh": "Seltos",
            "variant_sh": "HTE",
            "slug": "kia-seltos-hte",
            "model_slug": "kia-seltos",
            "specifications": {
                "Engine & Transmission": {
                    "Engine Type": "SmartStream G1.5",
                    "Displacement": "1497 cc",
                    "Max Power": "113.42bhp@6300rpm",
                    "Max Torque": "144Nm@4500rpm",
                    "No. of Cylinders": "4",
                    "Fuel Supply System": "Multi Point Inspection",
                    "Transmission Type": "Manual",
                    "Gear Box": "6-Speed",
                    "Drive Type": "FWD",
                    "Mild HybridA": "",
                    "Motor Type": "",
                    "Battery Type": "",
                    "Drive Mode Types": "No",
                    "Clutch Type": ""
                },
                "Fuel & Performance": {
                    "Fuel Type": "Petrol",
                    "Petrol Mileage": "",
                    "Petrol Fuel Tank Capacity": "",
                    "Emission Norm Compliance": "BS VI 2.0",
                    "0-100Kmph (Tested)": "",
                    "Petrol Highway Mileage": "",
                    "Top Speed": "167 kmph",
                    "CNG Mileage": "",
                    "CNG Fuel Tank Capacity": "",
                    "Secondary Fuel Type": "",
                    "Diesel Mileage": "",
                    "Diesel Fuel Tank Capacity": "",
                    "Acceleration 0-100kmph": "",
                    "Petrol City Mileage": "",
                    "Acceleration 0-60kmph": "",
                    "Diesel Highway Mileage": "",
                    "Acceleration": "",
                    "0-100kmph": "",
                    "Emission Control System": ""
                },
                "Suspension, Steering & Brakes": {
                    "Front Suspension": "McPherson Strut With Coil Spring",
                    "Rear Suspension": "Coupled Torsion Beam Axle With Coil Spring",
                    "Steering Type": "Electric",
                    "Steering Column": "Tilt",
                    "Turning Radius": "",
                    "Front Brake Type": "Disc",
                    "Rear Brake Type": "Disc",
                    "Braking (100-0kmph)": "",
                    "Braking (80-0 kmph)": "",
                    "Shock Absorbers Type": ""
                },
                "Exterior": {
                    "Wheel Size Front": "",
                    "Wheel Size Rear": "",
                    "Adjustable Headlights": "",
                    "Power Rear View Mirror": "No",
                    "Manual Rear View Mirror": "Yes",
                    "Folding Rear View Mirror": "No",
                    "Rear Window Wiper": "No",
                    "Rear Window Defogger": "No",
                    "Alloy Wheels": "No",
                    "Projector Headlamps": "Yes",
                    "Fog Lights": "No",
                    "Tyre Size": "205/65 R16",
                    "Tyre Type": "Tubeless, Radial",
                    "LED DRLs": "No",
                    "LED Taillights": "No",
                    "Halogen Headlamps": "Yes",
                    "Sun Roof": "",
                    "LED Headlights": "No",
                    "LED Fog Lamps": "No",
                    "Rain Sensing Wiper": "No",
                    "Cornering Headlamps": "",
                    "Lighting": "",
                    "Dual Tone Body Colour": "",
                    "Alloy Wheel Size": "",
                    "Other Features - Exterior": "Steel Wheel with Full Cover, Front Map & Room Lamps (Halogen), High Mount Stop Lamp, Grey Front & Rear Skid Plates"
                },
                "Dimensions & Capacity": {
                    "Length": "4365 mm",
                    "Width": "1800 mm",
                    "Height": "1645 mm",
                    "Boot Space": "433 Litres",
                    "Seating Capacity": "5",
                    "Wheel Base": "2610 mm",
                    "Kerb Weight": "",
                    "Ground Clearance Unladen": "",
                    "Wheel Size": "16 Inch",
                    "Ground Clearance": "",
                    "Rear Headroom": ""
                },
                "Comfort & Convenience": {
                    "Power Steering": "Yes",
                    "Power Windows-Front": "Yes",
                    "Power Windows-Rear": "Yes",
                    "Heater": "Yes",
                    "Adjustable Driver Seat": "Yes",
                    "Automatic Climate Control": "No",
                    "Accessory Power Outlet": "Yes",
                    "Trunk Light": "No",
                    "Cruise Control": "No",
                    "Parking Sensors": "Rear",
                    "KeyLess Entry": "No",
                    "Engine Start/Stop Button": "No",
                    "Voice Command": "No",
                    "Gear Shift Indicator": "Yes",
                    "Automatic Headlamps": "No",
                    "Follow Me Home Headlamps": "Yes",
                    "Adjustable Steering": "Yes",
                    "Rear Reading Lamp": "Yes",
                    "Rear Seat Headrest": "Yes",
                    "Rear Seat Centre Arm Rest": "No",
                    "Cup Holders-Front": "Yes",
                    "Cup Holders-Rear": "No",
                    "Rear AC Vents": "Yes",
                    "Glove Box Cooling": "",
                    "Idle Start-Stop System": "Yes",
                    "Remote Door Lock/Unlock": "No",
                    "Real-Time Vehicle Tracking": "No",
                    "Ventilated Seats": "No",
                    "Electric Adjustable Seats": "No",
                    "Heated Seats Front": "",
                    "Heated Seats - Rear": "",
                    "Battery Saver": "",
                    "Low Fuel Warning Light": "",
                    "Seat Lumbar Support": "",
                    "Navigation System": "",
                    "Find my Car": "",
                    "Other Features - Comfort-Convenience": "Sunglass Holder"
                },
                "Interior": {
                    "Tachometer": "Yes",
                    "Glove Compartment": "Yes",
                    "Dual Tone Dashboard": "",
                    "Upholstery": "Fabric",
                    "Fabric Upholstery": "",
                    "Leather Seats": "",
                    "Other Features - Interior": "Silver Dashboard Garnish"
                },
                "Safety": {
                    "Anti-Lock Braking System": "Yes",
                    "Brake Assist": "Yes",
                    "Central Locking": "Yes",
                    "Child Safety Locks": "Yes",
                    "Anti-Theft Alarm": "Yes",
                    "No. of Airbags": "6",
                    "Driver Airbag": "Yes",
                    "Passenger Airbag": "Yes",
                    "Day & Night Rear View Mirror": "Yes",
                    "Electronic Brakeforce Distribution": "Yes",
                    "Seat Belt Warning": "Yes",
                    "Engine Immobilizer": "Yes",
                    "Electronic Stability Control": "Yes",
                    "Advance Safety Features": "Vehicle Stability Management, Emergency Stop Signal",
                    "Rear Camera": "No",
                    "ISOFIX Child Seat Mounts": "No",
                    "Side Airbag-Front": "Yes",
                    "Side Airbag-Rear": "No",
                    "Curtain Airbag": "Yes",
                    "360 View Camera": "No",
                    "Knee Airbags": "No",
                    "Lane-watch Camera": "",
                    "Cornering Foglamps": "",
                    "NCAP Safety Rating": "",
                    "Fog Lights - Front": "",
                    "NCAP Child Safety Rating": "",
                    "Xenon Headlamps": "",
                    "Power Door Locks": "",
                    "Rear Seat Belts": "",
                    "Adjustable Seats": "",
                    "Crash Sensor": "",
                    "EBDA system": "",
                    "Engine Check Warning": ""
                },
                "Driving Assistance": {
                    "Hill Assist": "Yes",
                    "Speed Assist System": "",
                    "Blind Spot Collision Avoidance Assist": "No",
                    "Adaptive Cruise Control": "No",
                    "Adaptive High Beam Assist": "No",
                    "Hill Descent Control": "",
                    "Blind Spot Monitor": "No",
                    "Traction Control": "",
                    "Vehicle Stability Control System": ""
                },
                "Entertainment & Communication": {
                    "Speakers Front": "No",
                    "Speakers Rear": "No",
                    "Bluetooth Connectivity": "No",
                    "Touch Screen": "No",
                    "Touch Screen size": "",
                    "Connectivity": "",
                    "Apple CarPlay": "No",
                    "No. of Speakers": "",
                    "Usb Ports": "No",
                    "Wireless Phone Charging": "No",
                    "Google / Alexa Connectivity": "No",
                    "In Car Remote Control App": "",
                    "Subwoofer": "",
                    "Wi-Fi Connectivity": "",
                    "Compass": "",
                    "Other Features - Entertainment-Communication": "180W Power Outlet Front"
                }
            },
            "highlights": {
                "engine": 1497,
                "fuel": "Petrol",
                "mileage": 17,
                "safety": 6,
                "seating": 5,
                "transmission": "Manual",
                "bhp": "113.42bhp@6300rpm",
                "torque": "144Nm@4500rpm",
                "boot_space": 433
            },
            "seo": {
                "title": "Kia Seltos HTE: Full specs, features, price, images, reviews",
                "description": "The Kia Seltos HTE has an ex-showroom price of 10.9 Lakh. It has a 1497 cc engine, with a Manual, and gives a mileage of 17 kmpl.",
                "keywords": "Kia Seltos HTE, full specs, features, price, images, reviews",
                "og_image": {
                    "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                    "width": 1200,
                    "height": 600
                }
            },
            "status": "active",
            "canonical_url": "kia-cars/seltos/hte",
            "variant_slug": "kia-seltos-hte",
            "model_details": [{
                "_id": "66404e959ef8c8497b0b28fc",
                " ": "661fc464a6bc89c49c1efa0d",
                "model": "Kia Seltos",
                "slug": "kia-seltos",
                "model_sh": "Seltos",
                "type": "Mid Size SUV",
                "brand": "Kia",
                "status": "active",
                "seo": {
                    "vehicleEngine": {
                        "Petrol": 1482,
                        "Diesel": 1493
                    },
                    "fuelCapacity": 50,
                    "title": "Kia Seltos: Full Specs, Features, Price, Colours, Images, Reviews",
                    "description": "The Kia Seltos, a 5 seater Mid Size SUV, ranges from 10.9 Lakh - 20.35 Lakh. It is available in 26 variants, with engine cc ranging from 1482 to 1497 and a choice of 2 transmissions: Manual, Automatic.",
                    "keywords": "Kia Seltos 2023, price, specs, reviews, colours, images, launch in India",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    },
                    "color_page": {
                        "title": "Kia Seltos 2023: See all colours",
                        "description": "The Kia Seltos is available in 9 colors: Aurora Black Pearl, Glacier White Pearl With Aurora Black Pearl, Glacier White Pearl, Gravity Gray, Imperial Blue, Intense Red With Aurora Black Pearl, Intense Red, Pewter Olive, Sparkling Silver",
                        "keywords": "Kia Seltos colours, Aurora Black Pearl, Glacier White Pearl With Aurora Black Pearl, Glacier White Pearl, Gravity Gray, Imperial Blue, Intense Red With Aurora Black Pearl, Intense Red, Pewter Olive, Sparkling Silver"
                    }
                },
                "highlights": {
                    "engine": {
                        "min": 1482,
                        "max": 1497
                    },
                    "fuel": ["Petrol", "Diesel"],
                    "mileage": {
                        "min": 17,
                        "max": 20.7
                    },
                    "safety": {
                        "min": 6,
                        "max": 6
                    },
                    "seating": {
                        "min": 5,
                        "max": 5
                    },
                    "transmission": ["Manual", "Automatic"],
                    "bhp": {
                        "min": 113.42,
                        "max": 157.81
                    },
                    "torque": {
                        "min": 144,
                        "max": 253
                    },
                    "airbags": {
                        "min": 6,
                        "max": 6
                    },
                    "ground_clearance": {
                        "min": 190,
                        "max": 190
                    }
                },
                "rating": {
                    "score": 8.29,
                    "summary": "The 2023 Kia Seltos emerges as a more comprehensive offering compared to its pre-facelift version with more features and a more premium feel and now boasts a fresh turbo-petrol engine varian Level 2 Advanced Driver-Assistance Systems (ADAS), alongside aesthetic enhancements."
                },
                "overview": ["The {{model}} is an {{_type}} with a seating capacity of {{seating}} people. It is available in India at a price range of Rs.{{min_price}} to {{max_price}}.", "It is available in {{variant_count}} variants, with engine options ranging from {{min_engine}} to {{max_engine}} and a choice of {{len(transmission)}} transmissions: {{','.join(transmission)}}.", "{{model}} comes with {{airbags}} airbags and a ground clearance of {{ground_clearance}}. It is available in {{color_count}} colours."],
                "model_year": 2023,
                "color": [{
                    "name": "Aurora Black Pearl",
                    "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                    "hexcode": "#18181a"
                }, {
                    "name": "Glacier White Pearl With Aurora Black Pearl",
                    "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Glacier_White_Pearl_With_Aurora_Black_Pearl.webp",
                    "hexcode": "#bbc3c5"
                }, {
                    "name": "Glacier White Pearl",
                    "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Glacier_White_Pearl.webp",
                    "hexcode": "#b3b5b4"
                }, {
                    "name": "Gravity Gray",
                    "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Gravity_Gray.webp",
                    "hexcode": "#424448"
                }, {
                    "name": "Imperial Blue",
                    "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Imperial_Blue.webp",
                    "hexcode": "#001149"
                }, {
                    "name": "Intense Red With Aurora Black Pearl",
                    "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Intense_Red_With_Aurora_Black_Pearl.webp",
                    "hexcode": "#8b0002"
                }, {
                    "name": "Intense Red",
                    "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Intense_Red.webp",
                    "hexcode": "#9d0000"
                }, {
                    "name": "Pewter Olive",
                    "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Pewter_Olive.webp",
                    "hexcode": "#2b3d0d"
                }, {
                    "name": "Sparkling Silver",
                    "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Sparkling_Silver.webp",
                    "hexcode": "#b6b2a0"
                }],
                "images_videos": {
                    "interiors": [{
                        "name": "AC",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Interior_Parts-AC.webp"
                    }, {
                        "name": "Dashboard",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Interior_Parts-Dashboard.webp"
                    }, {
                        "name": "Door View",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Interior_Parts-Door_View.webp"
                    }, {
                        "name": "Gears",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Interior_Parts-Gears.webp"
                    }, {
                        "name": "Infotainment System",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Interior_Parts-Infotainment_System.webp"
                    }, {
                        "name": "Interior Embelishments",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Interior_Parts-Interior_Embelishments.webp"
                    }, {
                        "name": "Seats",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Interior_Parts-Seats.webp"
                    }, {
                        "name": "Steering Wheel",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Interior_Parts-Steering_Wheel.webp"
                    }, {
                        "name": "Steering Wheels",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Interior_Parts-Steering_Wheels.webp"
                    }],
                    "exteriors": [{
                        "name": "Outer Lights",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Outer_Parts-Outer_Lights.webp"
                    }, {
                        "name": "Wheels",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Outer_Parts-Wheels.webp"
                    }, {
                        "name": "Front View",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Outer_View-Front_View.webp"
                    }, {
                        "name": "Left View",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Outer_View-Left_View.webp"
                    }, {
                        "name": "Outer Lights",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Outer_View-Outer_Lights.webp"
                    }, {
                        "name": "Rear View",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Outer_View-Rear_View.webp"
                    }, {
                        "name": "Right View",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Outer_View-Right_View.webp"
                    }]
                },
                "is_popular": true,
                "is_upcoming": false,
                "cin": "CT-CAR-0000007114",
                "canonical_url": "kia-cars/seltos"
            }],
            "variants_details": [{
                "_id": "664ccde7289d2c224b49f412",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTE",
                "type": "Crossover",
                "price": 1089900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTE",
                "slug": "kia-seltos-hte",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1497,
                    "fuel": "Petrol",
                    "mileage": 17,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Manual",
                    "bhp": "113.42bhp@6300rpm",
                    "torque": "144Nm@4500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTE: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTE has an ex-showroom price of 10.9 Lakh. It has a 1497 cc engine, with a Manual, and gives a mileage of 17 kmpl.",
                    "keywords": "Kia Seltos HTE, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/hte",
                "variant_slug": "kia-seltos-hte"
            }, {
                "_id": "664ccde7289d2c224b49f413",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTK",
                "type": "Crossover",
                "price": 1223900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTK",
                "slug": "kia-seltos-htk",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1497,
                    "fuel": "Petrol",
                    "mileage": 17,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Manual",
                    "bhp": "113.42bhp@6300rpm",
                    "torque": "144Nm@4500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTK: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTK has an ex-showroom price of 12.24 Lakh. It has a 1497 cc engine, with a Manual, and gives a mileage of 17 kmpl.",
                    "keywords": "Kia Seltos HTK, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htk",
                "variant_slug": "kia-seltos-htk"
            }, {
                "_id": "664ccde7289d2c224b49f414",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTE Diesel",
                "type": "Crossover",
                "price": 1234900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTE Diesel",
                "slug": "kia-seltos-hte-diesel",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1497,
                    "fuel": "Diesel",
                    "mileage": 20.7,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Manual",
                    "bhp": "114.41bhp@4000rpm",
                    "torque": "250Nm@1500-2750rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTE Diesel: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTE Diesel has an ex-showroom price of 12.35 Lakh. It has a 1497 cc engine, with a Manual, and gives a mileage of 20.7 kmpl.",
                    "keywords": "Kia Seltos HTE Diesel, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/hte-diesel",
                "variant_slug": "kia-seltos-hte-diesel"
            }, {
                "_id": "664ccde7289d2c224b49f415",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTK Diesel",
                "type": "Crossover",
                "price": 1367900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTK Diesel",
                "slug": "kia-seltos-htk-diesel",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1497,
                    "fuel": "Diesel",
                    "mileage": 20.7,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Manual",
                    "bhp": "114.41bhp@4000rpm",
                    "torque": "250Nm@1500-2750rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTK Diesel: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTK Diesel has an ex-showroom price of 13.68 Lakh. It has a 1497 cc engine, with a Manual, and gives a mileage of 20.7 kmpl.",
                    "keywords": "Kia Seltos HTK Diesel, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htk-diesel",
                "variant_slug": "kia-seltos-htk-diesel"
            }, {
                "_id": "664ccde7289d2c224b49f416",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTK Plus",
                "type": "Crossover",
                "price": 1405900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTK Plus",
                "slug": "kia-seltos-htk-plus",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1497,
                    "fuel": "Petrol",
                    "mileage": 17,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Manual",
                    "bhp": "113.42bhp@6300rpm",
                    "torque": "144Nm@4500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTK Plus: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTK Plus has an ex-showroom price of 14.06 Lakh. It has a 1497 cc engine, with a Manual, and gives a mileage of 17 kmpl.",
                    "keywords": "Kia Seltos HTK Plus, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htk-plus",
                "variant_slug": "kia-seltos-htk-plus"
            }, {
                "_id": "664ccde7289d2c224b49f417",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTX",
                "type": "Crossover",
                "price": 1529900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTX",
                "slug": "kia-seltos-htx",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1497,
                    "fuel": "Petrol",
                    "mileage": 17,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Manual",
                    "bhp": "113.42bhp@6300rpm",
                    "torque": "144Nm@4500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTX: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTX has an ex-showroom price of 15.3 Lakh. It has a 1497 cc engine, with a Manual, and gives a mileage of 17 kmpl.",
                    "keywords": "Kia Seltos HTX, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htx",
                "variant_slug": "kia-seltos-htx"
            }, {
                "_id": "664ccde7289d2c224b49f418",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTK Plus IVT",
                "type": "Crossover",
                "price": 1541900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTK Plus IVT",
                "slug": "kia-seltos-htk-plus-ivt",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1497,
                    "fuel": "Petrol",
                    "mileage": 17.7,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "113.42bhp@6300rpm",
                    "torque": "144Nm@4500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTK Plus IVT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTK Plus IVT has an ex-showroom price of 15.42 Lakh. It has a 1497 cc engine, with a Automatic, and gives a mileage of 17.7 kmpl.",
                    "keywords": "Kia Seltos HTK Plus IVT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htk-plus-ivt",
                "variant_slug": "kia-seltos-htk-plus-ivt"
            }, {
                "_id": "664ccde7289d2c224b49f419",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTK Plus Turbo iMT",
                "type": "Crossover",
                "price": 1544900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTK Plus Turbo iMT",
                "slug": "kia-seltos-htk-plus-turbo-imt",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1482,
                    "fuel": "Petrol",
                    "mileage": 17.7,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "157.81bhp@5500rpm",
                    "torque": "253Nm@1500-3500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTK Plus Turbo iMT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTK Plus Turbo iMT has an ex-showroom price of 15.45 Lakh. It has a 1482 cc engine, with a Automatic, and gives a mileage of 17.7 kmpl.",
                    "keywords": "Kia Seltos HTK Plus Turbo iMT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htk-plus-turbo-imt",
                "variant_slug": "kia-seltos-htk-plus-turbo-imt"
            }, {
                "_id": "664ccde7289d2c224b49f41a",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTK Plus Diesel",
                "type": "Crossover",
                "price": 1554900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTK Plus Diesel",
                "slug": "kia-seltos-htk-plus-diesel",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1497,
                    "fuel": "Diesel",
                    "mileage": 20.7,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Manual",
                    "bhp": "114.41bhp@4000rpm",
                    "torque": "250Nm@1500-2750rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTK Plus Diesel: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTK Plus Diesel has an ex-showroom price of 15.55 Lakh. It has a 1497 cc engine, with a Manual, and gives a mileage of 20.7 kmpl.",
                    "keywords": "Kia Seltos HTK Plus Diesel, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htk-plus-diesel",
                "variant_slug": "kia-seltos-htk-plus-diesel"
            }, {
                "_id": "664ccde7289d2c224b49f41b",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTX IVT",
                "type": "Crossover",
                "price": 1671900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTX IVT",
                "slug": "kia-seltos-htx-ivt",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1497,
                    "fuel": "Petrol",
                    "mileage": 17.7,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "113.42bhp@6300rpm",
                    "torque": "144Nm@4500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTX IVT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTX IVT has an ex-showroom price of 16.72 Lakh. It has a 1497 cc engine, with a Automatic, and gives a mileage of 17.7 kmpl.",
                    "keywords": "Kia Seltos HTX IVT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htx-ivt",
                "variant_slug": "kia-seltos-htx-ivt"
            }, {
                "_id": "664ccde7289d2c224b49f41c",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTX Diesel",
                "type": "Crossover",
                "price": 1679900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTX Diesel",
                "slug": "kia-seltos-htx-diesel",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1493,
                    "fuel": "Diesel",
                    "mileage": 17,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Manual",
                    "bhp": "113.42bhp@6300rpm",
                    "torque": "144Nm@4500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTX Diesel: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTX Diesel has an ex-showroom price of 16.8 Lakh. It has a 1493 cc engine, with a Manual, and gives a mileage of 17 kmpl.",
                    "keywords": "Kia Seltos HTX Diesel, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htx-diesel",
                "variant_slug": "kia-seltos-htx-diesel"
            }, {
                "_id": "664ccde7289d2c224b49f41d",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTK Plus Diesel AT",
                "type": "Crossover",
                "price": 1691900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTK Plus Diesel AT",
                "slug": "kia-seltos-htk-plus-diesel-at",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1493,
                    "fuel": "Diesel",
                    "mileage": 20.7,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "114.41bhp@4000rpm",
                    "torque": "250Nm@1500-2750rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTK Plus Diesel AT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTK Plus Diesel AT has an ex-showroom price of 16.92 Lakh. It has a 1493 cc engine, with a Automatic, and gives a mileage of 20.7 kmpl.",
                    "keywords": "Kia Seltos HTK Plus Diesel AT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htk-plus-diesel-at",
                "variant_slug": "kia-seltos-htk-plus-diesel-at"
            }, {
                "_id": "664ccde7289d2c224b49f41e",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTX Diesel iMT",
                "type": "Crossover",
                "price": 1699900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTX Diesel iMT",
                "slug": "kia-seltos-htx-diesel-imt",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1493,
                    "fuel": "Diesel",
                    "mileage": 20.7,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "114.41bhp@4000rpm",
                    "torque": "250Nm@1500-2750rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTX Diesel iMT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTX Diesel iMT has an ex-showroom price of 17.0 Lakh. It has a 1493 cc engine, with a Automatic, and gives a mileage of 20.7 kmpl.",
                    "keywords": "Kia Seltos HTX Diesel iMT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htx-diesel-imt",
                "variant_slug": "kia-seltos-htx-diesel-imt"
            }, {
                "_id": "664ccde7289d2c224b49f41f",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTX Diesel AT",
                "type": "Crossover",
                "price": 1821900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTX Diesel AT",
                "slug": "kia-seltos-htx-diesel-at",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1493,
                    "fuel": "Diesel",
                    "mileage": 19.1,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "114.41bhp@4000rpm",
                    "torque": "250Nm@1500-2750rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTX Diesel AT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTX Diesel AT has an ex-showroom price of 18.22 Lakh. It has a 1493 cc engine, with a Automatic, and gives a mileage of 19.1 kmpl.",
                    "keywords": "Kia Seltos HTX Diesel AT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htx-diesel-at",
                "variant_slug": "kia-seltos-htx-diesel-at"
            }, {
                "_id": "664ccde7289d2c224b49f420",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTX Plus Diesel",
                "type": "Crossover",
                "price": 1869900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTX Plus Diesel",
                "slug": "kia-seltos-htx-plus-diesel",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1497,
                    "fuel": "Diesel",
                    "mileage": 20.7,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "114.41bhp@4000rpm",
                    "torque": "250Nm@1500-2750rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTX Plus Diesel: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTX Plus Diesel has an ex-showroom price of 18.7 Lakh. It has a 1497 cc engine, with a Automatic, and gives a mileage of 20.7 kmpl.",
                    "keywords": "Kia Seltos HTX Plus Diesel, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htx-plus-diesel",
                "variant_slug": "kia-seltos-htx-plus-diesel"
            }, {
                "_id": "664ccde7289d2c224b49f421",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTX Plus Turbo iMT",
                "type": "Crossover",
                "price": 1872900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTX Plus Turbo iMT",
                "slug": "kia-seltos-htx-plus-turbo-imt",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1482,
                    "fuel": "Petrol",
                    "mileage": 17.7,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "157.81bhp@5500rpm",
                    "torque": "253Nm@1500-3500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTX Plus Turbo iMT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTX Plus Turbo iMT has an ex-showroom price of 18.73 Lakh. It has a 1482 cc engine, with a Automatic, and gives a mileage of 17.7 kmpl.",
                    "keywords": "Kia Seltos HTX Plus Turbo iMT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htx-plus-turbo-imt",
                "variant_slug": "kia-seltos-htx-plus-turbo-imt"
            }, {
                "_id": "664ccde7289d2c224b49f422",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTX Plus Diesel iMT",
                "type": "Crossover",
                "price": 1894900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTX Plus Diesel iMT",
                "slug": "kia-seltos-htx-plus-diesel-imt",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1493,
                    "fuel": "Diesel",
                    "mileage": 20.7,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "114.41bhp@4000rpm",
                    "torque": "250Nm@1500-2750rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTX Plus Diesel iMT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTX Plus Diesel iMT has an ex-showroom price of 18.95 Lakh. It has a 1493 cc engine, with a Automatic, and gives a mileage of 20.7 kmpl.",
                    "keywords": "Kia Seltos HTX Plus Diesel iMT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htx-plus-diesel-imt",
                "variant_slug": "kia-seltos-htx-plus-diesel-imt"
            }, {
                "_id": "664ccde7289d2c224b49f423",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos GTX Plus S Diesel AT",
                "type": "Crossover",
                "price": 1939900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "GTX Plus S Diesel AT",
                "slug": "kia-seltos-gtx-plus-s-diesel-at",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1493,
                    "fuel": "Diesel",
                    "mileage": 19.1,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "114.41bhp@4000rpm",
                    "torque": "250Nm@1500-2750rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos GTX Plus S Diesel AT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos GTX Plus S Diesel AT has an ex-showroom price of 19.4 Lakh. It has a 1493 cc engine, with a Automatic, and gives a mileage of 19.1 kmpl.",
                    "keywords": "Kia Seltos GTX Plus S Diesel AT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/gtx-plus-s-diesel-at",
                "variant_slug": "kia-seltos-gtx-plus-s-diesel-at"
            }, {
                "_id": "664ccde7289d2c224b49f424",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos GTX Plus S Turbo DCT",
                "type": "Crossover",
                "price": 1939900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "GTX Plus S Turbo DCT",
                "slug": "kia-seltos-gtx-plus-s-turbo-dct",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1482,
                    "fuel": "Petrol",
                    "mileage": 17.9,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "157.81bhp@5500rpm",
                    "torque": "253Nm@1500-3500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos GTX Plus S Turbo DCT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos GTX Plus S Turbo DCT has an ex-showroom price of 19.4 Lakh. It has a 1482 cc engine, with a Automatic, and gives a mileage of 17.9 kmpl.",
                    "keywords": "Kia Seltos GTX Plus S Turbo DCT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/gtx-plus-s-turbo-dct",
                "variant_slug": "kia-seltos-gtx-plus-s-turbo-dct"
            }, {
                "_id": "664ccde7289d2c224b49f425",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos X-Line S DIesel AT",
                "type": "Crossover",
                "price": 1964900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "X-Line S DIesel AT",
                "slug": "kia-seltos-x-line-s-diesel-at",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1493,
                    "fuel": "Diesel",
                    "mileage": 19.1,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "114.41bhp@4000rpm",
                    "torque": "250Nm@1500-2750rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos X-Line S DIesel AT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos X-Line S DIesel AT has an ex-showroom price of 19.65 Lakh. It has a 1493 cc engine, with a Automatic, and gives a mileage of 19.1 kmpl.",
                    "keywords": "Kia Seltos X-Line S DIesel AT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/x-line-s-diesel-at",
                "variant_slug": "kia-seltos-x-line-s-diesel-at"
            }, {
                "_id": "664ccde7289d2c224b49f426",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos X-Line S Turbo DCT",
                "type": "Crossover",
                "price": 1964900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "X-Line S Turbo DCT",
                "slug": "kia-seltos-x-line-s-turbo-dct",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1482,
                    "fuel": "Petrol",
                    "mileage": 17.9,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "157.81bhp@5500rpm",
                    "torque": "253Nm@1500-3500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos X-Line S Turbo DCT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos X-Line S Turbo DCT has an ex-showroom price of 19.65 Lakh. It has a 1482 cc engine, with a Automatic, and gives a mileage of 17.9 kmpl.",
                    "keywords": "Kia Seltos X-Line S Turbo DCT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/x-line-s-turbo-dct",
                "variant_slug": "kia-seltos-x-line-s-turbo-dct"
            }, {
                "_id": "664ccde7289d2c224b49f427",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTX Plus Turbo DCT",
                "type": "Crossover",
                "price": 1972900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTX Plus Turbo DCT",
                "slug": "kia-seltos-htx-plus-turbo-dct",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1482,
                    "fuel": "Petrol",
                    "mileage": 17.9,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "157.81bhp@5500rpm",
                    "torque": "253Nm@1500-3500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTX Plus Turbo DCT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTX Plus Turbo DCT has an ex-showroom price of 19.73 Lakh. It has a 1482 cc engine, with a Automatic, and gives a mileage of 17.9 kmpl.",
                    "keywords": "Kia Seltos HTX Plus Turbo DCT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htx-plus-turbo-dct",
                "variant_slug": "kia-seltos-htx-plus-turbo-dct"
            }, {
                "_id": "664ccde7289d2c224b49f428",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos GTX Plus Diesel AT",
                "type": "Crossover",
                "price": 1999900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "GTX Plus Diesel AT",
                "slug": "kia-seltos-gtx-plus-diesel-at",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1493,
                    "fuel": "Diesel",
                    "mileage": 19.1,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "114.41bhp@4000rpm",
                    "torque": "250Nm@1500-2750rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos GTX Plus Diesel AT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos GTX Plus Diesel AT has an ex-showroom price of 20.0 Lakh. It has a 1493 cc engine, with a Automatic, and gives a mileage of 19.1 kmpl.",
                    "keywords": "Kia Seltos GTX Plus Diesel AT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/gtx-plus-diesel-at",
                "variant_slug": "kia-seltos-gtx-plus-diesel-at"
            }, {
                "_id": "664ccde7289d2c224b49f429",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos GTX Plus Turbo DCT",
                "type": "Crossover",
                "price": 1999900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "GTX Plus Turbo DCT",
                "slug": "kia-seltos-gtx-plus-turbo-dct",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1482,
                    "fuel": "Petrol",
                    "mileage": 17.9,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "157.81bhp@5500rpm",
                    "torque": "253Nm@1500-3500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos GTX Plus Turbo DCT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos GTX Plus Turbo DCT has an ex-showroom price of 20.0 Lakh. It has a 1482 cc engine, with a Automatic, and gives a mileage of 17.9 kmpl.",
                    "keywords": "Kia Seltos GTX Plus Turbo DCT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/gtx-plus-turbo-dct",
                "variant_slug": "kia-seltos-gtx-plus-turbo-dct"
            }, {
                "_id": "664ccde7289d2c224b49f42a",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos X-Line Diesel AT",
                "type": "Crossover",
                "price": 2034900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "X-Line Diesel AT",
                "slug": "kia-seltos-x-line-diesel-at",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1493,
                    "fuel": "Diesel",
                    "mileage": 19.1,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "114.41bhp@4000rpm",
                    "torque": "250Nm@1500-2750rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos X-Line Diesel AT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos X-Line Diesel AT has an ex-showroom price of 20.35 Lakh. It has a 1493 cc engine, with a Automatic, and gives a mileage of 19.1 kmpl.",
                    "keywords": "Kia Seltos X-Line Diesel AT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/x-line-diesel-at",
                "variant_slug": "kia-seltos-x-line-diesel-at"
            }, {
                "_id": "664ccde7289d2c224b49f42b",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos X-Line Turbo DCT",
                "type": "Crossover",
                "price": 2034900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "X-Line Turbo DCT",
                "slug": "kia-seltos-x-line-turbo-dct",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1482,
                    "fuel": "Petrol",
                    "mileage": 17.9,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "157.81bhp@5500rpm",
                    "torque": "253Nm@1500-3500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos X-Line Turbo DCT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos X-Line Turbo DCT has an ex-showroom price of 20.35 Lakh. It has a 1482 cc engine, with a Automatic, and gives a mileage of 17.9 kmpl.",
                    "keywords": "Kia Seltos X-Line Turbo DCT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/x-line-turbo-dct",
                "variant_slug": "kia-seltos-x-line-turbo-dct"
            }],
            "price_details": []
        }, {
            "_id": "664ccde7289d2c224b49f413",
            "brand": "Kia",
            "model": "Kia Seltos",
            "variant": "Kia Seltos HTK",
            "type": "Crossover",
            "price": 1223900,
            "price_band": "Budget",
            "model_sh": "Seltos",
            "variant_sh": "HTK",
            "slug": "kia-seltos-htk",
            "model_slug": "kia-seltos",
            "specifications": {
                "Engine & Transmission": {
                    "Engine Type": "SmartStream G1.5",
                    "Displacement": "1497 cc",
                    "Max Power": "113.42bhp@6300rpm",
                    "Max Torque": "144Nm@4500rpm",
                    "No. of Cylinders": "4",
                    "Fuel Supply System": "Multi Point Inspection",
                    "Transmission Type": "Manual",
                    "Gear Box": "6-Speed",
                    "Drive Type": "FWD",
                    "Mild HybridA": "",
                    "Motor Type": "",
                    "Battery Type": "",
                    "Drive Mode Types": "No",
                    "Clutch Type": ""
                },
                "Fuel & Performance": {
                    "Fuel Type": "Petrol",
                    "Petrol Mileage": "",
                    "Petrol Fuel Tank Capacity": "",
                    "Emission Norm Compliance": "BS VI 2.0",
                    "0-100Kmph (Tested)": "",
                    "Petrol Highway Mileage": "",
                    "Top Speed": "167 kmph",
                    "CNG Mileage": "",
                    "CNG Fuel Tank Capacity": "",
                    "Secondary Fuel Type": "",
                    "Diesel Mileage": "",
                    "Diesel Fuel Tank Capacity": "",
                    "Acceleration 0-100kmph": "",
                    "Petrol City Mileage": "",
                    "Acceleration 0-60kmph": "",
                    "Diesel Highway Mileage": "",
                    "Acceleration": "",
                    "0-100kmph": "",
                    "Emission Control System": ""
                },
                "Suspension, Steering & Brakes": {
                    "Front Suspension": "McPherson Strut With Coil Spring",
                    "Rear Suspension": "Coupled Torsion Beam Axle With Coil Spring",
                    "Steering Type": "Electric",
                    "Steering Column": "Tilt",
                    "Turning Radius": "",
                    "Front Brake Type": "Disc",
                    "Rear Brake Type": "Disc",
                    "Braking (100-0kmph)": "",
                    "Braking (80-0 kmph)": "",
                    "Shock Absorbers Type": ""
                },
                "Exterior": {
                    "Wheel Size Front": "",
                    "Wheel Size Rear": "",
                    "Adjustable Headlights": "",
                    "Power Rear View Mirror": "Yes",
                    "Manual Rear View Mirror": "No",
                    "Folding Rear View Mirror": "No",
                    "Rear Window Wiper": "No",
                    "Rear Window Defogger": "No",
                    "Alloy Wheels": "No",
                    "Projector Headlamps": "Yes",
                    "Fog Lights": "No",
                    "Tyre Size": "205/65 R16",
                    "Tyre Type": "Tubeless, Radial",
                    "LED DRLs": "Yes",
                    "LED Taillights": "Yes",
                    "Halogen Headlamps": "Yes",
                    "Sun Roof": "",
                    "LED Headlights": "No",
                    "LED Fog Lamps": "No",
                    "Rain Sensing Wiper": "No",
                    "Cornering Headlamps": "",
                    "Lighting": "",
                    "Dual Tone Body Colour": "",
                    "Alloy Wheel Size": "",
                    "Other Features - Exterior": "Steel Wheel with Full Cover, Front Map & Room Lamps (Halogen), High Mount Stop Lamp, Star Map LED Connected Tail Lamps, Grey Front & Rear Skid Plates"
                },
                "Dimensions & Capacity": {
                    "Length": "4365 mm",
                    "Width": "1800 mm",
                    "Height": "1645 mm",
                    "Boot Space": "433 Litres",
                    "Seating Capacity": "5",
                    "Wheel Base": "2610 mm",
                    "Kerb Weight": "",
                    "Ground Clearance Unladen": "",
                    "Wheel Size": "16 Inch",
                    "Ground Clearance": "",
                    "Rear Headroom": ""
                },
                "Comfort & Convenience": {
                    "Power Steering": "Yes",
                    "Power Windows-Front": "Yes",
                    "Power Windows-Rear": "Yes",
                    "Heater": "Yes",
                    "Adjustable Driver Seat": "Yes",
                    "Automatic Climate Control": "No",
                    "Accessory Power Outlet": "Yes",
                    "Trunk Light": "Yes",
                    "Cruise Control": "No",
                    "Parking Sensors": "Front & Rear",
                    "KeyLess Entry": "Yes",
                    "Engine Start/Stop Button": "Yes",
                    "Voice Command": "Yes",
                    "Gear Shift Indicator": "Yes",
                    "Automatic Headlamps": "Yes",
                    "Follow Me Home Headlamps": "Yes",
                    "Adjustable Steering": "Yes",
                    "Rear Reading Lamp": "Yes",
                    "Rear Seat Headrest": "Yes",
                    "Rear Seat Centre Arm Rest": "No",
                    "Cup Holders-Front": "Yes",
                    "Cup Holders-Rear": "No",
                    "Rear AC Vents": "Yes",
                    "Glove Box Cooling": "",
                    "Idle Start-Stop System": "Yes",
                    "Remote Door Lock/Unlock": "No",
                    "Real-Time Vehicle Tracking": "No",
                    "Ventilated Seats": "No",
                    "Electric Adjustable Seats": "No",
                    "Heated Seats Front": "",
                    "Heated Seats - Rear": "",
                    "Battery Saver": "",
                    "Low Fuel Warning Light": "",
                    "Seat Lumbar Support": "",
                    "Navigation System": "",
                    "Find my Car": "",
                    "Other Features - Comfort-Convenience": "Sunglass Holder, Driver Rear View Monitor"
                },
                "Interior": {
                    "Tachometer": "Yes",
                    "Glove Compartment": "Yes",
                    "Dual Tone Dashboard": "",
                    "Upholstery": "Fabric",
                    "Fabric Upholstery": "",
                    "Leather Seats": "",
                    "Other Features - Interior": "Silver Dashboard Garnish"
                },
                "Safety": {
                    "Anti-Lock Braking System": "Yes",
                    "Brake Assist": "Yes",
                    "Central Locking": "Yes",
                    "Child Safety Locks": "Yes",
                    "Anti-Theft Alarm": "Yes",
                    "No. of Airbags": "6",
                    "Driver Airbag": "Yes",
                    "Passenger Airbag": "Yes",
                    "Day & Night Rear View Mirror": "Yes",
                    "Electronic Brakeforce Distribution": "Yes",
                    "Seat Belt Warning": "Yes",
                    "Engine Immobilizer": "Yes",
                    "Electronic Stability Control": "Yes",
                    "Advance Safety Features": "Vehicle Stability Management, Emergency Stop Signal",
                    "Rear Camera": "With Guidedlines",
                    "ISOFIX Child Seat Mounts": "No",
                    "Side Airbag-Front": "Yes",
                    "Side Airbag-Rear": "No",
                    "Curtain Airbag": "Yes",
                    "360 View Camera": "No",
                    "Knee Airbags": "No",
                    "Lane-watch Camera": "",
                    "Cornering Foglamps": "",
                    "NCAP Safety Rating": "",
                    "Fog Lights - Front": "",
                    "NCAP Child Safety Rating": "",
                    "Xenon Headlamps": "",
                    "Power Door Locks": "",
                    "Rear Seat Belts": "",
                    "Adjustable Seats": "",
                    "Crash Sensor": "",
                    "EBDA system": "",
                    "Engine Check Warning": ""
                },
                "Driving Assistance": {
                    "Hill Assist": "Yes",
                    "Speed Assist System": "",
                    "Blind Spot Collision Avoidance Assist": "No",
                    "Adaptive Cruise Control": "No",
                    "Adaptive High Beam Assist": "No",
                    "Hill Descent Control": "",
                    "Blind Spot Monitor": "No",
                    "Traction Control": "",
                    "Vehicle Stability Control System": ""
                },
                "Entertainment & Communication": {
                    "Speakers Front": "Yes",
                    "Speakers Rear": "Yes",
                    "Bluetooth Connectivity": "Yes",
                    "Touch Screen": "Yes",
                    "Touch Screen size": "8 Inch",
                    "Connectivity": "Android Auto, Apple CarPlay",
                    "Apple CarPlay": "Yes",
                    "No. of Speakers": "4",
                    "Usb Ports": "Yes",
                    "Wireless Phone Charging": "No",
                    "Google / Alexa Connectivity": "No",
                    "In Car Remote Control App": "",
                    "Subwoofer": "",
                    "Wi-Fi Connectivity": "",
                    "Compass": "",
                    "Other Features - Entertainment-Communication": "180W Power Outlet Front, Wireless Android Auto & Apple Carplay"
                }
            },
            "highlights": {
                "engine": 1497,
                "fuel": "Petrol",
                "mileage": 17,
                "safety": 6,
                "seating": 5,
                "transmission": "Manual",
                "bhp": "113.42bhp@6300rpm",
                "torque": "144Nm@4500rpm",
                "boot_space": 433
            },
            "seo": {
                "title": "Kia Seltos HTK: Full specs, features, price, images, reviews",
                "description": "The Kia Seltos HTK has an ex-showroom price of 12.24 Lakh. It has a 1497 cc engine, with a Manual, and gives a mileage of 17 kmpl.",
                "keywords": "Kia Seltos HTK, full specs, features, price, images, reviews",
                "og_image": {
                    "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                    "width": 1200,
                    "height": 600
                }
            },
            "status": "active",
            "canonical_url": "kia-cars/seltos/htk",
            "variant_slug": "kia-seltos-htk",
            "model_details": [{
                "_id": "66404e959ef8c8497b0b28fc",
                " ": "661fc464a6bc89c49c1efa0d",
                "model": "Kia Seltos",
                "slug": "kia-seltos",
                "model_sh": "Seltos",
                "type": "Mid Size SUV",
                "brand": "Kia",
                "status": "active",
                "seo": {
                    "vehicleEngine": {
                        "Petrol": 1482,
                        "Diesel": 1493
                    },
                    "fuelCapacity": 50,
                    "title": "Kia Seltos: Full Specs, Features, Price, Colours, Images, Reviews",
                    "description": "The Kia Seltos, a 5 seater Mid Size SUV, ranges from 10.9 Lakh - 20.35 Lakh. It is available in 26 variants, with engine cc ranging from 1482 to 1497 and a choice of 2 transmissions: Manual, Automatic.",
                    "keywords": "Kia Seltos 2023, price, specs, reviews, colours, images, launch in India",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    },
                    "color_page": {
                        "title": "Kia Seltos 2023: See all colours",
                        "description": "The Kia Seltos is available in 9 colors: Aurora Black Pearl, Glacier White Pearl With Aurora Black Pearl, Glacier White Pearl, Gravity Gray, Imperial Blue, Intense Red With Aurora Black Pearl, Intense Red, Pewter Olive, Sparkling Silver",
                        "keywords": "Kia Seltos colours, Aurora Black Pearl, Glacier White Pearl With Aurora Black Pearl, Glacier White Pearl, Gravity Gray, Imperial Blue, Intense Red With Aurora Black Pearl, Intense Red, Pewter Olive, Sparkling Silver"
                    }
                },
                "highlights": {
                    "engine": {
                        "min": 1482,
                        "max": 1497
                    },
                    "fuel": ["Petrol", "Diesel"],
                    "mileage": {
                        "min": 17,
                        "max": 20.7
                    },
                    "safety": {
                        "min": 6,
                        "max": 6
                    },
                    "seating": {
                        "min": 5,
                        "max": 5
                    },
                    "transmission": ["Manual", "Automatic"],
                    "bhp": {
                        "min": 113.42,
                        "max": 157.81
                    },
                    "torque": {
                        "min": 144,
                        "max": 253
                    },
                    "airbags": {
                        "min": 6,
                        "max": 6
                    },
                    "ground_clearance": {
                        "min": 190,
                        "max": 190
                    }
                },
                "rating": {
                    "score": 8.29,
                    "summary": "The 2023 Kia Seltos emerges as a more comprehensive offering compared to its pre-facelift version with more features and a more premium feel and now boasts a fresh turbo-petrol engine varian Level 2 Advanced Driver-Assistance Systems (ADAS), alongside aesthetic enhancements."
                },
                "overview": ["The {{model}} is an {{_type}} with a seating capacity of {{seating}} people. It is available in India at a price range of Rs.{{min_price}} to {{max_price}}.", "It is available in {{variant_count}} variants, with engine options ranging from {{min_engine}} to {{max_engine}} and a choice of {{len(transmission)}} transmissions: {{','.join(transmission)}}.", "{{model}} comes with {{airbags}} airbags and a ground clearance of {{ground_clearance}}. It is available in {{color_count}} colours."],
                "model_year": 2023,
                "color": [{
                    "name": "Aurora Black Pearl",
                    "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                    "hexcode": "#18181a"
                }, {
                    "name": "Glacier White Pearl With Aurora Black Pearl",
                    "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Glacier_White_Pearl_With_Aurora_Black_Pearl.webp",
                    "hexcode": "#bbc3c5"
                }, {
                    "name": "Glacier White Pearl",
                    "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Glacier_White_Pearl.webp",
                    "hexcode": "#b3b5b4"
                }, {
                    "name": "Gravity Gray",
                    "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Gravity_Gray.webp",
                    "hexcode": "#424448"
                }, {
                    "name": "Imperial Blue",
                    "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Imperial_Blue.webp",
                    "hexcode": "#001149"
                }, {
                    "name": "Intense Red With Aurora Black Pearl",
                    "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Intense_Red_With_Aurora_Black_Pearl.webp",
                    "hexcode": "#8b0002"
                }, {
                    "name": "Intense Red",
                    "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Intense_Red.webp",
                    "hexcode": "#9d0000"
                }, {
                    "name": "Pewter Olive",
                    "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Pewter_Olive.webp",
                    "hexcode": "#2b3d0d"
                }, {
                    "name": "Sparkling Silver",
                    "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Sparkling_Silver.webp",
                    "hexcode": "#b6b2a0"
                }],
                "images_videos": {
                    "interiors": [{
                        "name": "AC",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Interior_Parts-AC.webp"
                    }, {
                        "name": "Dashboard",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Interior_Parts-Dashboard.webp"
                    }, {
                        "name": "Door View",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Interior_Parts-Door_View.webp"
                    }, {
                        "name": "Gears",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Interior_Parts-Gears.webp"
                    }, {
                        "name": "Infotainment System",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Interior_Parts-Infotainment_System.webp"
                    }, {
                        "name": "Interior Embelishments",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Interior_Parts-Interior_Embelishments.webp"
                    }, {
                        "name": "Seats",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Interior_Parts-Seats.webp"
                    }, {
                        "name": "Steering Wheel",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Interior_Parts-Steering_Wheel.webp"
                    }, {
                        "name": "Steering Wheels",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Interior_Parts-Steering_Wheels.webp"
                    }],
                    "exteriors": [{
                        "name": "Outer Lights",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Outer_Parts-Outer_Lights.webp"
                    }, {
                        "name": "Wheels",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Outer_Parts-Wheels.webp"
                    }, {
                        "name": "Front View",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Outer_View-Front_View.webp"
                    }, {
                        "name": "Left View",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Outer_View-Left_View.webp"
                    }, {
                        "name": "Outer Lights",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Outer_View-Outer_Lights.webp"
                    }, {
                        "name": "Rear View",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Outer_View-Rear_View.webp"
                    }, {
                        "name": "Right View",
                        "img": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Outer_View-Right_View.webp"
                    }]
                },
                "is_popular": true,
                "is_upcoming": false,
                "cin": "CT-CAR-0000007114",
                "canonical_url": "kia-cars/seltos"
            }],
            "variants_details": [{
                "_id": "664ccde7289d2c224b49f412",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTE",
                "type": "Crossover",
                "price": 1089900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTE",
                "slug": "kia-seltos-hte",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1497,
                    "fuel": "Petrol",
                    "mileage": 17,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Manual",
                    "bhp": "113.42bhp@6300rpm",
                    "torque": "144Nm@4500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTE: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTE has an ex-showroom price of 10.9 Lakh. It has a 1497 cc engine, with a Manual, and gives a mileage of 17 kmpl.",
                    "keywords": "Kia Seltos HTE, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/hte",
                "variant_slug": "kia-seltos-hte"
            }, {
                "_id": "664ccde7289d2c224b49f413",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTK",
                "type": "Crossover",
                "price": 1223900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTK",
                "slug": "kia-seltos-htk",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1497,
                    "fuel": "Petrol",
                    "mileage": 17,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Manual",
                    "bhp": "113.42bhp@6300rpm",
                    "torque": "144Nm@4500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTK: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTK has an ex-showroom price of 12.24 Lakh. It has a 1497 cc engine, with a Manual, and gives a mileage of 17 kmpl.",
                    "keywords": "Kia Seltos HTK, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htk",
                "variant_slug": "kia-seltos-htk"
            }, {
                "_id": "664ccde7289d2c224b49f414",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTE Diesel",
                "type": "Crossover",
                "price": 1234900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTE Diesel",
                "slug": "kia-seltos-hte-diesel",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1497,
                    "fuel": "Diesel",
                    "mileage": 20.7,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Manual",
                    "bhp": "114.41bhp@4000rpm",
                    "torque": "250Nm@1500-2750rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTE Diesel: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTE Diesel has an ex-showroom price of 12.35 Lakh. It has a 1497 cc engine, with a Manual, and gives a mileage of 20.7 kmpl.",
                    "keywords": "Kia Seltos HTE Diesel, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/hte-diesel",
                "variant_slug": "kia-seltos-hte-diesel"
            }, {
                "_id": "664ccde7289d2c224b49f415",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTK Diesel",
                "type": "Crossover",
                "price": 1367900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTK Diesel",
                "slug": "kia-seltos-htk-diesel",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1497,
                    "fuel": "Diesel",
                    "mileage": 20.7,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Manual",
                    "bhp": "114.41bhp@4000rpm",
                    "torque": "250Nm@1500-2750rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTK Diesel: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTK Diesel has an ex-showroom price of 13.68 Lakh. It has a 1497 cc engine, with a Manual, and gives a mileage of 20.7 kmpl.",
                    "keywords": "Kia Seltos HTK Diesel, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htk-diesel",
                "variant_slug": "kia-seltos-htk-diesel"
            }, {
                "_id": "664ccde7289d2c224b49f416",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTK Plus",
                "type": "Crossover",
                "price": 1405900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTK Plus",
                "slug": "kia-seltos-htk-plus",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1497,
                    "fuel": "Petrol",
                    "mileage": 17,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Manual",
                    "bhp": "113.42bhp@6300rpm",
                    "torque": "144Nm@4500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTK Plus: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTK Plus has an ex-showroom price of 14.06 Lakh. It has a 1497 cc engine, with a Manual, and gives a mileage of 17 kmpl.",
                    "keywords": "Kia Seltos HTK Plus, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htk-plus",
                "variant_slug": "kia-seltos-htk-plus"
            }, {
                "_id": "664ccde7289d2c224b49f417",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTX",
                "type": "Crossover",
                "price": 1529900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTX",
                "slug": "kia-seltos-htx",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1497,
                    "fuel": "Petrol",
                    "mileage": 17,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Manual",
                    "bhp": "113.42bhp@6300rpm",
                    "torque": "144Nm@4500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTX: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTX has an ex-showroom price of 15.3 Lakh. It has a 1497 cc engine, with a Manual, and gives a mileage of 17 kmpl.",
                    "keywords": "Kia Seltos HTX, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htx",
                "variant_slug": "kia-seltos-htx"
            }, {
                "_id": "664ccde7289d2c224b49f418",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTK Plus IVT",
                "type": "Crossover",
                "price": 1541900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTK Plus IVT",
                "slug": "kia-seltos-htk-plus-ivt",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1497,
                    "fuel": "Petrol",
                    "mileage": 17.7,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "113.42bhp@6300rpm",
                    "torque": "144Nm@4500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTK Plus IVT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTK Plus IVT has an ex-showroom price of 15.42 Lakh. It has a 1497 cc engine, with a Automatic, and gives a mileage of 17.7 kmpl.",
                    "keywords": "Kia Seltos HTK Plus IVT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htk-plus-ivt",
                "variant_slug": "kia-seltos-htk-plus-ivt"
            }, {
                "_id": "664ccde7289d2c224b49f419",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTK Plus Turbo iMT",
                "type": "Crossover",
                "price": 1544900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTK Plus Turbo iMT",
                "slug": "kia-seltos-htk-plus-turbo-imt",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1482,
                    "fuel": "Petrol",
                    "mileage": 17.7,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "157.81bhp@5500rpm",
                    "torque": "253Nm@1500-3500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTK Plus Turbo iMT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTK Plus Turbo iMT has an ex-showroom price of 15.45 Lakh. It has a 1482 cc engine, with a Automatic, and gives a mileage of 17.7 kmpl.",
                    "keywords": "Kia Seltos HTK Plus Turbo iMT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htk-plus-turbo-imt",
                "variant_slug": "kia-seltos-htk-plus-turbo-imt"
            }, {
                "_id": "664ccde7289d2c224b49f41a",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTK Plus Diesel",
                "type": "Crossover",
                "price": 1554900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTK Plus Diesel",
                "slug": "kia-seltos-htk-plus-diesel",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1497,
                    "fuel": "Diesel",
                    "mileage": 20.7,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Manual",
                    "bhp": "114.41bhp@4000rpm",
                    "torque": "250Nm@1500-2750rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTK Plus Diesel: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTK Plus Diesel has an ex-showroom price of 15.55 Lakh. It has a 1497 cc engine, with a Manual, and gives a mileage of 20.7 kmpl.",
                    "keywords": "Kia Seltos HTK Plus Diesel, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htk-plus-diesel",
                "variant_slug": "kia-seltos-htk-plus-diesel"
            }, {
                "_id": "664ccde7289d2c224b49f41b",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTX IVT",
                "type": "Crossover",
                "price": 1671900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTX IVT",
                "slug": "kia-seltos-htx-ivt",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1497,
                    "fuel": "Petrol",
                    "mileage": 17.7,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "113.42bhp@6300rpm",
                    "torque": "144Nm@4500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTX IVT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTX IVT has an ex-showroom price of 16.72 Lakh. It has a 1497 cc engine, with a Automatic, and gives a mileage of 17.7 kmpl.",
                    "keywords": "Kia Seltos HTX IVT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htx-ivt",
                "variant_slug": "kia-seltos-htx-ivt"
            }, {
                "_id": "664ccde7289d2c224b49f41c",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTX Diesel",
                "type": "Crossover",
                "price": 1679900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTX Diesel",
                "slug": "kia-seltos-htx-diesel",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1493,
                    "fuel": "Diesel",
                    "mileage": 17,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Manual",
                    "bhp": "113.42bhp@6300rpm",
                    "torque": "144Nm@4500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTX Diesel: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTX Diesel has an ex-showroom price of 16.8 Lakh. It has a 1493 cc engine, with a Manual, and gives a mileage of 17 kmpl.",
                    "keywords": "Kia Seltos HTX Diesel, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htx-diesel",
                "variant_slug": "kia-seltos-htx-diesel"
            }, {
                "_id": "664ccde7289d2c224b49f41d",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTK Plus Diesel AT",
                "type": "Crossover",
                "price": 1691900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTK Plus Diesel AT",
                "slug": "kia-seltos-htk-plus-diesel-at",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1493,
                    "fuel": "Diesel",
                    "mileage": 20.7,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "114.41bhp@4000rpm",
                    "torque": "250Nm@1500-2750rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTK Plus Diesel AT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTK Plus Diesel AT has an ex-showroom price of 16.92 Lakh. It has a 1493 cc engine, with a Automatic, and gives a mileage of 20.7 kmpl.",
                    "keywords": "Kia Seltos HTK Plus Diesel AT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htk-plus-diesel-at",
                "variant_slug": "kia-seltos-htk-plus-diesel-at"
            }, {
                "_id": "664ccde7289d2c224b49f41e",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTX Diesel iMT",
                "type": "Crossover",
                "price": 1699900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTX Diesel iMT",
                "slug": "kia-seltos-htx-diesel-imt",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1493,
                    "fuel": "Diesel",
                    "mileage": 20.7,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "114.41bhp@4000rpm",
                    "torque": "250Nm@1500-2750rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTX Diesel iMT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTX Diesel iMT has an ex-showroom price of 17.0 Lakh. It has a 1493 cc engine, with a Automatic, and gives a mileage of 20.7 kmpl.",
                    "keywords": "Kia Seltos HTX Diesel iMT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htx-diesel-imt",
                "variant_slug": "kia-seltos-htx-diesel-imt"
            }, {
                "_id": "664ccde7289d2c224b49f41f",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTX Diesel AT",
                "type": "Crossover",
                "price": 1821900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTX Diesel AT",
                "slug": "kia-seltos-htx-diesel-at",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1493,
                    "fuel": "Diesel",
                    "mileage": 19.1,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "114.41bhp@4000rpm",
                    "torque": "250Nm@1500-2750rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTX Diesel AT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTX Diesel AT has an ex-showroom price of 18.22 Lakh. It has a 1493 cc engine, with a Automatic, and gives a mileage of 19.1 kmpl.",
                    "keywords": "Kia Seltos HTX Diesel AT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htx-diesel-at",
                "variant_slug": "kia-seltos-htx-diesel-at"
            }, {
                "_id": "664ccde7289d2c224b49f420",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTX Plus Diesel",
                "type": "Crossover",
                "price": 1869900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTX Plus Diesel",
                "slug": "kia-seltos-htx-plus-diesel",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1497,
                    "fuel": "Diesel",
                    "mileage": 20.7,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "114.41bhp@4000rpm",
                    "torque": "250Nm@1500-2750rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTX Plus Diesel: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTX Plus Diesel has an ex-showroom price of 18.7 Lakh. It has a 1497 cc engine, with a Automatic, and gives a mileage of 20.7 kmpl.",
                    "keywords": "Kia Seltos HTX Plus Diesel, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htx-plus-diesel",
                "variant_slug": "kia-seltos-htx-plus-diesel"
            }, {
                "_id": "664ccde7289d2c224b49f421",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTX Plus Turbo iMT",
                "type": "Crossover",
                "price": 1872900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTX Plus Turbo iMT",
                "slug": "kia-seltos-htx-plus-turbo-imt",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1482,
                    "fuel": "Petrol",
                    "mileage": 17.7,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "157.81bhp@5500rpm",
                    "torque": "253Nm@1500-3500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTX Plus Turbo iMT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTX Plus Turbo iMT has an ex-showroom price of 18.73 Lakh. It has a 1482 cc engine, with a Automatic, and gives a mileage of 17.7 kmpl.",
                    "keywords": "Kia Seltos HTX Plus Turbo iMT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htx-plus-turbo-imt",
                "variant_slug": "kia-seltos-htx-plus-turbo-imt"
            }, {
                "_id": "664ccde7289d2c224b49f422",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTX Plus Diesel iMT",
                "type": "Crossover",
                "price": 1894900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTX Plus Diesel iMT",
                "slug": "kia-seltos-htx-plus-diesel-imt",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1493,
                    "fuel": "Diesel",
                    "mileage": 20.7,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "114.41bhp@4000rpm",
                    "torque": "250Nm@1500-2750rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTX Plus Diesel iMT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTX Plus Diesel iMT has an ex-showroom price of 18.95 Lakh. It has a 1493 cc engine, with a Automatic, and gives a mileage of 20.7 kmpl.",
                    "keywords": "Kia Seltos HTX Plus Diesel iMT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htx-plus-diesel-imt",
                "variant_slug": "kia-seltos-htx-plus-diesel-imt"
            }, {
                "_id": "664ccde7289d2c224b49f423",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos GTX Plus S Diesel AT",
                "type": "Crossover",
                "price": 1939900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "GTX Plus S Diesel AT",
                "slug": "kia-seltos-gtx-plus-s-diesel-at",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1493,
                    "fuel": "Diesel",
                    "mileage": 19.1,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "114.41bhp@4000rpm",
                    "torque": "250Nm@1500-2750rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos GTX Plus S Diesel AT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos GTX Plus S Diesel AT has an ex-showroom price of 19.4 Lakh. It has a 1493 cc engine, with a Automatic, and gives a mileage of 19.1 kmpl.",
                    "keywords": "Kia Seltos GTX Plus S Diesel AT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/gtx-plus-s-diesel-at",
                "variant_slug": "kia-seltos-gtx-plus-s-diesel-at"
            }, {
                "_id": "664ccde7289d2c224b49f424",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos GTX Plus S Turbo DCT",
                "type": "Crossover",
                "price": 1939900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "GTX Plus S Turbo DCT",
                "slug": "kia-seltos-gtx-plus-s-turbo-dct",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1482,
                    "fuel": "Petrol",
                    "mileage": 17.9,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "157.81bhp@5500rpm",
                    "torque": "253Nm@1500-3500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos GTX Plus S Turbo DCT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos GTX Plus S Turbo DCT has an ex-showroom price of 19.4 Lakh. It has a 1482 cc engine, with a Automatic, and gives a mileage of 17.9 kmpl.",
                    "keywords": "Kia Seltos GTX Plus S Turbo DCT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/gtx-plus-s-turbo-dct",
                "variant_slug": "kia-seltos-gtx-plus-s-turbo-dct"
            }, {
                "_id": "664ccde7289d2c224b49f425",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos X-Line S DIesel AT",
                "type": "Crossover",
                "price": 1964900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "X-Line S DIesel AT",
                "slug": "kia-seltos-x-line-s-diesel-at",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1493,
                    "fuel": "Diesel",
                    "mileage": 19.1,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "114.41bhp@4000rpm",
                    "torque": "250Nm@1500-2750rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos X-Line S DIesel AT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos X-Line S DIesel AT has an ex-showroom price of 19.65 Lakh. It has a 1493 cc engine, with a Automatic, and gives a mileage of 19.1 kmpl.",
                    "keywords": "Kia Seltos X-Line S DIesel AT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/x-line-s-diesel-at",
                "variant_slug": "kia-seltos-x-line-s-diesel-at"
            }, {
                "_id": "664ccde7289d2c224b49f426",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos X-Line S Turbo DCT",
                "type": "Crossover",
                "price": 1964900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "X-Line S Turbo DCT",
                "slug": "kia-seltos-x-line-s-turbo-dct",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1482,
                    "fuel": "Petrol",
                    "mileage": 17.9,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "157.81bhp@5500rpm",
                    "torque": "253Nm@1500-3500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos X-Line S Turbo DCT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos X-Line S Turbo DCT has an ex-showroom price of 19.65 Lakh. It has a 1482 cc engine, with a Automatic, and gives a mileage of 17.9 kmpl.",
                    "keywords": "Kia Seltos X-Line S Turbo DCT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/x-line-s-turbo-dct",
                "variant_slug": "kia-seltos-x-line-s-turbo-dct"
            }, {
                "_id": "664ccde7289d2c224b49f427",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos HTX Plus Turbo DCT",
                "type": "Crossover",
                "price": 1972900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "HTX Plus Turbo DCT",
                "slug": "kia-seltos-htx-plus-turbo-dct",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1482,
                    "fuel": "Petrol",
                    "mileage": 17.9,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "157.81bhp@5500rpm",
                    "torque": "253Nm@1500-3500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos HTX Plus Turbo DCT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos HTX Plus Turbo DCT has an ex-showroom price of 19.73 Lakh. It has a 1482 cc engine, with a Automatic, and gives a mileage of 17.9 kmpl.",
                    "keywords": "Kia Seltos HTX Plus Turbo DCT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/htx-plus-turbo-dct",
                "variant_slug": "kia-seltos-htx-plus-turbo-dct"
            }, {
                "_id": "664ccde7289d2c224b49f428",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos GTX Plus Diesel AT",
                "type": "Crossover",
                "price": 1999900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "GTX Plus Diesel AT",
                "slug": "kia-seltos-gtx-plus-diesel-at",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1493,
                    "fuel": "Diesel",
                    "mileage": 19.1,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "114.41bhp@4000rpm",
                    "torque": "250Nm@1500-2750rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos GTX Plus Diesel AT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos GTX Plus Diesel AT has an ex-showroom price of 20.0 Lakh. It has a 1493 cc engine, with a Automatic, and gives a mileage of 19.1 kmpl.",
                    "keywords": "Kia Seltos GTX Plus Diesel AT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/gtx-plus-diesel-at",
                "variant_slug": "kia-seltos-gtx-plus-diesel-at"
            }, {
                "_id": "664ccde7289d2c224b49f429",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos GTX Plus Turbo DCT",
                "type": "Crossover",
                "price": 1999900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "GTX Plus Turbo DCT",
                "slug": "kia-seltos-gtx-plus-turbo-dct",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1482,
                    "fuel": "Petrol",
                    "mileage": 17.9,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "157.81bhp@5500rpm",
                    "torque": "253Nm@1500-3500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos GTX Plus Turbo DCT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos GTX Plus Turbo DCT has an ex-showroom price of 20.0 Lakh. It has a 1482 cc engine, with a Automatic, and gives a mileage of 17.9 kmpl.",
                    "keywords": "Kia Seltos GTX Plus Turbo DCT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/gtx-plus-turbo-dct",
                "variant_slug": "kia-seltos-gtx-plus-turbo-dct"
            }, {
                "_id": "664ccde7289d2c224b49f42a",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos X-Line Diesel AT",
                "type": "Crossover",
                "price": 2034900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "X-Line Diesel AT",
                "slug": "kia-seltos-x-line-diesel-at",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1493,
                    "fuel": "Diesel",
                    "mileage": 19.1,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "114.41bhp@4000rpm",
                    "torque": "250Nm@1500-2750rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos X-Line Diesel AT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos X-Line Diesel AT has an ex-showroom price of 20.35 Lakh. It has a 1493 cc engine, with a Automatic, and gives a mileage of 19.1 kmpl.",
                    "keywords": "Kia Seltos X-Line Diesel AT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/x-line-diesel-at",
                "variant_slug": "kia-seltos-x-line-diesel-at"
            }, {
                "_id": "664ccde7289d2c224b49f42b",
                "brand": "Kia",
                "model": "Kia Seltos",
                "variant": "Kia Seltos X-Line Turbo DCT",
                "type": "Crossover",
                "price": 2034900,
                "price_band": "Budget",
                "model_sh": "Seltos",
                "variant_sh": "X-Line Turbo DCT",
                "slug": "kia-seltos-x-line-turbo-dct",
                "model_slug": "kia-seltos",
                "highlights": {
                    "engine": 1482,
                    "fuel": "Petrol",
                    "mileage": 17.9,
                    "safety": 6,
                    "seating": 5,
                    "transmission": "Automatic",
                    "bhp": "157.81bhp@5500rpm",
                    "torque": "253Nm@1500-3500rpm",
                    "boot_space": 433
                },
                "seo": {
                    "title": "Kia Seltos X-Line Turbo DCT: Full specs, features, price, images, reviews",
                    "description": "The Kia Seltos X-Line Turbo DCT has an ex-showroom price of 20.35 Lakh. It has a 1482 cc engine, with a Automatic, and gives a mileage of 17.9 kmpl.",
                    "keywords": "Kia Seltos X-Line Turbo DCT, full specs, features, price, images, reviews",
                    "og_image": {
                        "image": "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                        "width": 1200,
                        "height": 600
                    }
                },
                "status": "active",
                "canonical_url": "kia-cars/seltos/x-line-turbo-dct",
                "variant_slug": "kia-seltos-x-line-turbo-dct"
            }],
            "price_details": []
        }])

        // setData(variantsData)
    }

    const handleChange = (targetValue) => {

        console.log(targetValue);

        onChange({
            target: { name, type: attribute.type, value: targetValue },
        });
    };

    return (
        <Flex direction="column" alignItems="stretch" gap={5}>

            <Combobox placeholder={selectedModel ? selectedModel : "Select Model"} label="Models" value={selectedModel ? selectedModel : json.selectedModel} onChange={(e) => { setSelectedModel(e) }} onClear={() => setSelectedModel('')}>
                {(models !== undefined || null) && models.map((field) => (
                    <ComboboxOption key={field.model} value={field.model}>{field.model}</ComboboxOption>
                ))}
            </Combobox>

            {(variants || selectedVariants) && (variants.length > 0 || selectedVariants.length > 0) && (
                <MultiSelect label="Variants" required placeholder={selectedVariants ? selectedVariants.join(", ") : "Select Variants"} onClear={() => {
                    setSelectedVariants([]);
                }} value={selectedVariants ? selectedVariants : json.selectedVariants} onChange={setSelectedVariants} withTags>
                    {variants && variants.map((field) => (
                        <MultiSelectOption key={field.variant} value={field.variant}>
                            {field.variant}
                        </MultiSelectOption>
                    ))}
                </MultiSelect>
            )}

            {selectedVariants && selectedVariants.length > 0 && <p style={{ cursor: "pointer", color: "#4945FF", fontWeight: "bold" }} onClick={() => getSpecifications()}>Get Secifications</p>}

            {selectedVariants && selectedVariants.length > 0 && data && data.length > 0 &&
                <SingleSelect label="Category" required placeholder="Select Category" onClear={() => { setSelectedColumn("") }} value={selectedColumn} onChange={(e) => { setSelectedColumn(e) }} withTags>
                    {Object.keys(data[0].specifications) && Object.keys(data[0].specifications).map((column) => {
                        return (<SingleSelectOption key={column} value={column}>
                            {column}
                        </SingleSelectOption>)
                    })}
                </SingleSelect>
            }

            {selectedVariants && selectedVariants.length > 0 && data && data.length > 0 && selectedColumn &&
                <MultiSelect label="Attributes" required placeholder="Select Attributes" onClear={() => { setSelectedAttributes([]) }} value={selectedAttributes} onChange={(e) => { setSelectedAttributes(e) }} withTags>
                    {Object.keys(data[0].specifications[selectedColumn]).map((attribute) => {

                        const isEmpty = data.some(
                            (car) => car.specifications[selectedColumn][attribute] !== ""
                        )

                        return isEmpty ? (<MultiSelectOption key={attribute} value={attribute}>
                            {attribute}
                        </MultiSelectOption>) : ""
                    })}
                </MultiSelect>
            }

            {selectedVariants && selectedVariants.length > 0 && data && data.length > 0 && selectedColumn && selectedAttributes &&
                Object.keys(data[0].specifications).filter((column) => column === selectedColumn).map((column) => {
                    const attributes = Object.keys(data[0].specifications[column]).filter((attribute) => selectedAttributes.includes(attribute));

                    const filteredAttributes = hideCommonFeatures
                        ? attributes.filter((attribute) =>
                            data.some(
                                (car, index) =>
                                    index !== 0 &&
                                    car.specifications[column] !== undefined &&
                                    car.specifications[column][attribute] !==
                                    data[0].specifications[column][attribute]
                            )
                        )
                        : attributes.filter((attribute) =>
                            data.some(
                                (car) => car.specifications[column][attribute] !== ""
                            )
                        );

                    return (
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            key={column}
                        >
                            {(hideCommonFeatures ? filteredAttributes.length !== 0 : true) && (
                                <div
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        margin: '1rem 0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'start',
                                        overflowX: 'scroll'
                                    }}
                                >
                                    <table style={{ width: '100%', height: '100%' }}>
                                        <thead style={{ width: '100%', height: '100%' }}>
                                            <tr style={{ width: '100%', backgroundColor: '#212529', color: 'white' }}>
                                                <th
                                                    style={{
                                                        padding: '0.5rem 1rem',
                                                        textAlign: 'start'
                                                    }}
                                                >
                                                    {column}
                                                </th>
                                                {data.map((car) => (
                                                    <th
                                                        style={{
                                                            padding: '0.5rem 1rem',
                                                            borderRight: '1px solid white',
                                                            color: 'white'
                                                        }}
                                                        key={car.variant}
                                                    >
                                                        {car.variant}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody style={{ textAlign: 'center' }}>
                                            {filteredAttributes.map((attribute) => (
                                                <tr
                                                    style={{
                                                        backgroundColor: '#f9f9f9',
                                                        borderBottom: '1px solid #ccc'
                                                    }}
                                                    key={attribute}
                                                >
                                                    <td
                                                        style={{
                                                            padding: '0.5rem 1rem',
                                                            fontWeight: '600',
                                                            textAlign: 'start',
                                                            fontSize: '0.875rem'
                                                        }}
                                                    >
                                                        {attribute}
                                                    </td>
                                                    {data.map((car) => (
                                                        <td
                                                            style={{
                                                                padding: '0.5rem 1rem',
                                                                whiteSpace: 'nowrap',
                                                                fontSize: '1rem'
                                                            }}
                                                            key={car.variant}
                                                        >
                                                            {car.specifications[column] !== undefined &&
                                                                car.specifications[column][attribute] !== ""
                                                                ? car.specifications[column][attribute]
                                                                : "-"}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                    );
                })}

            {/* {images.length > 0 && (
                <SingleSelect
                    label="Images"
                    placeholder="Select Image"
                    hint=""
                    ref={ref}
                    name={name}
                    disabled={disabled}
                    value={currentModel}
                    required={required}
                    onChange={(e) => { }}
                >
                    {images.map((field) => (
                        <SingleSelectOption key={field.img} value={field.img}>
                            <input
                                type="checkbox"
                                checked={false}
                                onChange={() => { }}
                            />
                            <p>{field.name}</p>
                            <img src={field.img} style={{ height: "100px" }} />
                        </SingleSelectOption>
                    ))}
                </SingleSelect>
            )}

            {images.length > 0 && (
                <MultiSelect label="Images" required placeholder="Select Images" onClear={() => {
                    setValues([]); 
                }} value={values} onChange={setValues} withTags>
                    {images.map((field) => (
                        <MultiSelectOption key={field.img} value={field.img}>
                           <p>{field.name}</p>
                            <img src={field.img} style={{ height: "100px" }} />
                        </MultiSelectOption>
                    ))}
                </MultiSelect>
            )} */}
        </Flex>

    );
});

export default Input;
