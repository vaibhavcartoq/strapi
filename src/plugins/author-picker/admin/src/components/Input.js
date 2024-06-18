import * as React from "react";
import { useIntl } from "react-intl";
import { useState, useEffect } from 'react';
import {
    Combobox,
    ComboboxOption,
    TextInput,
    Flex
} from '@strapi/design-system';
import apiRequest from '../api/data';

const Input = React.forwardRef((props, ref) => {
    // @ts-ignore
    const { attribute, disabled, intlLabel, name, onChange, required, value } = props;

    // State to hold the fetched data
    const [authors, setAuthors] = useState(["Manoj K.", "Sahil N.", "Kumar S."]);

    useEffect(() => {
        console.log("Author Value: " + value);
    }, [])

    const handleChange = (targetValue) => {
        onChange({
            target: { name, type: attribute.type, value: targetValue },
        });
    };

    return (
        <Flex direction="column" alignItems="stretch" gap={5}>

            {/* <Combobox placeholder="Select Author" label="Author" value={value} onChange={(e) => { handleChange(e) }} onClear={() => handleChange('')}>
                {authors && authors.map((author) => (
                    <ComboboxOption key={author} value={author}>{author}</ComboboxOption>
                ))}
            </Combobox> */}

            <TextInput
                placeholder="Author"
                size="M"
                type="text"
                label="Author"
                value={value}
                onChange={(e) => handleChange(e.target.value)}
            />

        </Flex>

    );
});

export default Input;
