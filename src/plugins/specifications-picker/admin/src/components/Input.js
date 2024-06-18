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
        console.log("selectedVariants: " + selectedVariants.length);

        const formattedVariants = selectedVariants.map((variant) => variant.toLowerCase().replaceAll(" ", "-"))
        const variantsData = await imageRequest.getSpecifications(formattedVariants);
        console.log(variantsData);
        setData(variantsData)

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
