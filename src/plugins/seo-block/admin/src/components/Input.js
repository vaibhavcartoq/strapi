import * as React from "react";
import { useIntl } from "react-intl";
import { useState, useEffect } from 'react';
import {
    TextInput,
    Flex
} from '@strapi/design-system';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';


const Input = React.forwardRef((props, ref) => {
    // @ts-ignore
    const { attribute, disabled, intlLabel, name, onChange, required, value } = props;

    const { modifiedData, onChangeField } = useCMEditViewDataManager();

    const [isDefault, setIsDefault] = useState(false);

    const [seo, setSeo] = useState({title: "", description: "", keywords: ""});


    useEffect(() => {
        if (value) {
            const json = JSON.parse(value);
            setSeo({title: json.title, description: json.description, keywords: json.keywords});
        }
    },[])


    useEffect(() => {
        console.log(modifiedData)

        if (modifiedData.IsDefault === true || modifiedData.IsDefault === false) setIsDefault(modifiedData.IsDefault)

        console.log("From SEO: IsDefault: " + modifiedData.IsDefault);

    }, [modifiedData])

    useEffect(() => {
        const handleChange = (targetValue) => {
            onChange({
                target: { name, type: attribute.type, value: JSON.stringify({title: targetValue.title, description: targetValue.description, keywords: targetValue.keywords}) },
            });
        };

        handleChange(seo)
    },[seo])

    

    return (
        <Flex direction="column" alignItems="stretch" gap={5}>
            {isDefault ? (<div style={{ display: "grid", gap: "20px" }}>

                <p style={{ fontWeight: "bolder" }}>SEO Block</p>
                <TextInput
                    placeholder="Title"
                    size="M"
                    type="text"
                    label="Title"
                    value={seo.title}
                    onChange={(e) => setSeo({ ...seo, title: e.target.value })}
                />
                <TextInput
                    placeholder="Description"
                    size="M"
                    type="text"
                    label="Description"
                    value={seo.description}
                    onChange={(e) => setSeo({ ...seo, description: e.target.value })}
                />
                <TextInput
                    placeholder="Keywords"
                    size="M"
                    type="text"
                    label="Keywords"
                    value={seo.keywords}
                    onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
                />
            </div>) : <p style={{fontSize: "15px"}}>This is not a default article.</p>}
        </Flex>

    );
});

export default Input;
