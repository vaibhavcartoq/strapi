import * as React from "react";
import { useIntl } from "react-intl";
import { useState, useEffect } from 'react';
import {
    ToggleInput,
    Flex
} from '@strapi/design-system';
import apiRequest from '../api/data';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';


const Input = React.forwardRef((props, ref) => {
    // @ts-ignore
    const { attribute, disabled, intlLabel, name, onChange, required, value } = props;

    const { modifiedData, onChangeField } = useCMEditViewDataManager();

    const [selectedModel, SetSelectedModel] = useState('');

    const [isDefault, setIsDefault] = useState(value);
    const [isDefaultPresent, setIsDefaultPresent] = useState(false);

    useEffect(() => {

        if (modifiedData.Model) SetSelectedModel(modifiedData.Model)

    }, [modifiedData])

    useEffect(() => {

        const getIsDefault = async (model) => {
            const isDefaultData = await apiRequest.getIsDefault(model);
            if (isDefaultData.data && isDefaultData.data.length > 0) { setIsDefault(false); setIsDefaultPresent(true); } else { setIsDefault(false); setIsDefaultPresent(false); }
        };

        if (!value) { getIsDefault(selectedModel) }

    }, [selectedModel]);

    useEffect(() => {
        handleChange(isDefault)
    }, [isDefault])

    const handleChange = (targetValue) => {
        onChange({
            target: { name, type: attribute.type, value: targetValue },
        });
    };

    return (
        <Flex direction="column" alignItems="stretch" gap={5}>

            <ToggleInput
                label="Is Default?"
                onLabel="True"
                offLabel="False"
                checked={isDefault}
                disabled={isDefaultPresent}
                onChange={(e) => setIsDefault(e.target.checked)}
            />

        </Flex>

    );
});

export default Input;
