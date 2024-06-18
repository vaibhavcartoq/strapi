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
    const [personas, setPersonas] = useState([]);

    useEffect(() => {
        const getPersonas = async (cartype) => {
            const personas = await apiRequest.getPersonas(cartype);
            setPersonas(personas);
        };

        if (modifiedData.Car_Type) {getPersonas(modifiedData.Car_Type);}
        if (modifiedData.Car_Type === null) handleChange(null);

    }, [modifiedData])

    const handleChange = (targetValue) => {
        onChange({
            target: { name, type: attribute.type, value: targetValue },
        });
    };

    return (
        <Flex direction="column" alignItems="stretch" gap={5}>

            <Combobox placeholder="Select Persona" label="Persona" value={value} onChange={(e) => { handleChange(e) }} onClear={() => handleChange('')}>
                {personas && personas.map((persona) => (
                    <ComboboxOption key={persona.persona} value={persona.persona}>{persona.persona}</ComboboxOption>
                ))}
            </Combobox>

        </Flex>

    );
});

export default Input;
