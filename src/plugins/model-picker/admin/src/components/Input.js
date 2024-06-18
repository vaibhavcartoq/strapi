import * as React from "react";
import { useIntl } from "react-intl";
import { useState, useEffect } from 'react';
import {
    Combobox,
    ComboboxOption,
    Flex
} from '@strapi/design-system';
import apiRequest from '../api/data';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';


const Input = React.forwardRef((props, ref) => {
    // @ts-ignore
    const { attribute, disabled, intlLabel, name, onChange, required, value } = props;

    const { modifiedData, onChangeField } = useCMEditViewDataManager();

    // State to hold the fetched data
    const [models, setModels] = useState([]);

    useEffect(() => {
        const searchModel = async (type) => {
            const modelsData = await apiRequest.searchModel(type);
            console.log("models: " + modelsData.length);
            setModels(modelsData);
        };

        searchModel(modifiedData.Car_Type);
    }, [modifiedData.Car_Type])

    const handleChange = (targetValue) => {
        onChange({
            target: { name, type: attribute.type, value: targetValue },
        });
    };

    return (
        <Flex direction="column" alignItems="stretch" gap={5}>

            <Combobox placeholder={value ? value : "Select Model"} label="Model" value={value} onChange={(e) => { handleChange(e) }} onClear={() => handleChange('')}>
                {(models !== undefined || null) && models.map((field) => (
                    <ComboboxOption key={field.model} value={field.model}>{field.model}</ComboboxOption>
                ))}
            </Combobox>

        </Flex>

    );
});

export default Input;
