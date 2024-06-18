import * as React from "react";
import { useIntl } from "react-intl";
import { useState, useEffect } from 'react';
import {
    Combobox,
    ComboboxOption,
    Flex
} from '@strapi/design-system';
import apiRequest from '../api/data';

const Input = React.forwardRef((props, ref) => {
    // @ts-ignore
    const { attribute, disabled, intlLabel, name, onChange, required, value } = props;

    // State to hold the fetched data
    const [cartypes, setCartypes] = useState([]);

    useEffect(() => {
        const getCartypes = async () => {
            const cartypes = await apiRequest.getCartypes();
            setCartypes(cartypes.segments);
        };

        getCartypes();

    }, [])

    const handleChange = (targetValue) => {
        onChange({
            target: { name, type: attribute.type, value: targetValue },
        });
    };

    return (
        <Flex direction="column" alignItems="stretch" gap={5}>

            <Combobox placeholder="Select Car Type" label="Car Type" value={value} onChange={(e) => { handleChange(e) }} onClear={() => handleChange('')}>
                {cartypes && cartypes.map((cartype) => (
                    <ComboboxOption key={cartype} value={cartype}>{cartype}</ComboboxOption>
                ))}
            </Combobox>

        </Flex>

    );
});

export default Input;
