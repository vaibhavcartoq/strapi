import * as React from "react";

import { useIntl } from "react-intl";
import { useState, useEffect } from "react";
import {
    SingleSelect,
    SingleSelectOption,
    MultiSelect,
    MultiSelectOption,
    Combobox,
    ComboboxOption,
    Flex,
    Grid,
    TextInput,
    ToggleInput
} from '@strapi/design-system';
import imageRequest from '../api/image';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';

const Input = React.forwardRef((props, ref) => {
    const { attribute, disabled, intlLabel, name, onChange, required, value } =
        props;

    const { modifiedData, onChangeField } = useCMEditViewDataManager();

    const [cartypes, setCartypes] = useState(["Hatchback"]);
    const [selectedCartype, setSelectedCartype] = useState("");

    const [models, setModels] = useState([]);
    const [selectedModel, SetSelectedModel] = useState('');

    const [personas, setPersonas] = useState(["First-time Buyer"]);
    const [selectedPersona, setSelectedPersona] = useState("");

    const [authors, setAuthors] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState("");

    const [headline, setHeadline] = useState([]);

    const [images, setImages] = useState([]);
    const [imageName, setImageName] = useState("");
    const [selectedImages, setSelectedImages] = useState("");

    const [isDefault, setIsDefault] = useState(false);
    const [isDefaultPresent, setIsDefaultPresent] = useState(false);

    const [seo, setSeo] = useState({ title: "", description: "", keywords: "" });

    const [json, setJson] = useState({});

    useEffect(() => {
        console.log(modifiedData)

        if (modifiedData.Model) SetSelectedModel(modifiedData.Model)

    }, [modifiedData])


    useEffect(() => {
        const searchModel = async (model) => {
            const modelsData = await imageRequest.searchModel(model);
            console.log("models: " + modelsData.length);
            setModels(modelsData);
        };

        searchModel("");

        let json = {}

        if (value) { json = JSON.parse(value); setJson(JSON.parse(value)); }
        if (value && json.image) {
            setSelectedImages(json.image);
            setImageName(json.image.substring(0, json.image.lastIndexOf(".")).replaceAll("https://cartoq.s3.ap-south-1.amazonaws.com/", "").replaceAll("media/Car/","").replaceAll("_", " ").replaceAll("-", " "));
        }
        if (value && json.cartype) setSelectedCartype(json.cartype);
        if (value && json.model) SetSelectedModel(json.model);
        if (value && json.persona) setSelectedPersona(json.persona);
        if (value && json.author) setSelectedAuthor(json.author);
        if (value && json.headline) setHeadline(json.headline);
        if (value && json.seo) setSeo(json.seo);

        console.log(json);
    }, []);

    useEffect(() => {
        const fetchImages = async (model) => {
            const imagesData = await imageRequest.getModelImages(model);
            const data = [
                {
                    name: "Aurora Black Pearl",
                    img: "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Aurora_Black_Pearl.webp",
                    hexcode: "#18181a",
                },
                {
                    name: "Glacier White Pearl With Aurora Black Pearl",
                    img: "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Glacier_White_Pearl_With_Aurora_Black_Pearl.webp",
                    hexcode: "#bbc3c5",
                },
                {
                    name: "Glacier White Pearl",
                    img: "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Glacier_White_Pearl.webp",
                    hexcode: "#b3b5b4",
                },
                {
                    name: "Gravity Gray",
                    img: "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Gravity_Gray.webp",
                    hexcode: "#424448",
                },
                {
                    name: "Imperial Blue",
                    img: "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Imperial_Blue.webp",
                    hexcode: "#001149",
                },
                {
                    name: "Intense Red With Aurora Black Pearl",
                    img: "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Intense_Red_With_Aurora_Black_Pearl.webp",
                    hexcode: "#8b0002",
                },
                {
                    name: "Intense Red",
                    img: "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Intense_Red.webp",
                    hexcode: "#9d0000",
                },
                {
                    name: "Pewter Olive",
                    img: "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Pewter_Olive.webp",
                    hexcode: "#2b3d0d",
                },
                {
                    name: "Sparkling Silver",
                    img: "https://cartoq.s3.ap-south-1.amazonaws.com/Kia_Seltos-Color-Sparkling_Silver.webp",
                    hexcode: "#b6b2a0",
                },
            ];
            console.log(imagesData.color);
            setImages(imagesData.color);
        };

        const getIsDefault = async (model) => {
            const isDefaultData = await imageRequest.getIsDefault(model);
            if (isDefaultData.data && isDefaultData.data.length > 0 && isDefault.data.Head_Block && !isDefault.data.Head_Block.isDefault) setIsDefault(false)
            console.log("isDefaultData: " + JSON.stringify(isDefaultData));
        };

        selectedModel
            ? fetchImages(selectedModel.toLowerCase().replaceAll(" ", "-"))
            : "";

        selectedModel
            ? getIsDefault(selectedModel)
            : "";

    }, [selectedModel]);

    const { formatMessage } = useIntl();

    useEffect(() => {
        handleChange();
    }, [selectedCartype, selectedModel, selectedPersona, selectedAuthor, headline, selectedImages, isDefault, seo])

    const handleChange = () => {
        const targetValue = JSON.stringify({
            cartype: selectedCartype,
            model: selectedModel,
            persona: selectedPersona,
            author: selectedAuthor,
            headline: headline,
            image: selectedImages,
            isDefault: isDefault,
            seo: seo
        });
        console.log({
            cartype: selectedCartype,
            model: selectedModel,
            persona: selectedPersona,
            author: selectedAuthor,
            headline: headline,
            image: selectedImages,
            isDefault: isDefault,
            seo: seo
        });

        onChange({
            target: { name, type: attribute.type, value: targetValue },
        });
    };

    return (
        <div style={{ display: "grid", gap: "20px" }}>

            <SingleSelect
                label="Car Type"
                placeholder="Select Car Type"
                hint=""
                ref={ref}
                name={name}
                disabled={disabled}
                value={selectedCartype}
                required={required}
                onChange={(e) => { setSelectedCartype(e) }}
            >
                {cartypes && cartypes.map((cartype) => (
                    <SingleSelectOption key={cartype} value={cartype}>
                        {cartype}
                    </SingleSelectOption>
                ))}
            </SingleSelect>


            <Combobox
                placeholder={json ? json.model : "Select Model"}
                label="Models"
                value={selectedModel ? selectedModel : (json ? json.model : "")}
                onChange={SetSelectedModel}
                onClear={() => SetSelectedModel("")}
                col={2}
            >
                {(models !== undefined || null) && models.map((field) => (
                    <ComboboxOption key={field.model} value={field.model}>
                        {field.model}
                    </ComboboxOption>
                ))}
            </Combobox>

            <SingleSelect
                label="Persona"
                placeholder="Select Persona"
                hint=""
                ref={ref}
                name={name}
                disabled={disabled}
                value={selectedPersona}
                required={required}
                onChange={(e) => { setSelectedPersona(e); }}
                col={3}
            >
                {personas && personas.map((persona) => (
                    <SingleSelectOption key={persona} value={persona}>
                        {persona}
                    </SingleSelectOption>
                ))}
            </SingleSelect>

            {/* <Combobox
                placeholder={"Select Author"}
                label="Author"
                value={selectedAuthor}
                onChange={setSelectedAuthor}
                onClear={() => setSelectedAuthor("")}
            >
                {authors.map((author) => (
                    <ComboboxOption key={author} value={author}>
                        {author}
                    </ComboboxOption>
                ))}
            </Combobox> */}

            <TextInput
                placeholder="Author"
                size="M"
                type="text"
                label="Author"
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
            />

            <TextInput
                placeholder="Headline"
                size="M"
                type="text"
                label="Headline"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
            />

            {(
                <SingleSelect
                    label="Featured Image"
                    placeholder="Select Featured Image"
                    hint={""}
                    ref={ref}
                    name={name}
                    disabled={disabled}
                    value={imageName.toString()}
                    required={required}
                    onChange={(e) => { setSelectedImages(e); setImageName(e.substring(0, e.lastIndexOf(".")).replaceAll("https://cartoq.s3.ap-south-1.amazonaws.com/", "").replaceAll("media/Car/","").replaceAll("_", " ").replaceAll("-", " ")) }}
                >
                    {images && images.map((field) => (
                        <SingleSelectOption key={field.img} value={field.img}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <img src={field.img} style={{ height: "25px" }} />
                                <p style={{ paddingLeft: "10px" }}>{field.name}</p>
                            </div>
                        </SingleSelectOption>
                    ))}
                </SingleSelect>
            )}

            {selectedImages && (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={selectedImages} style={{ height: "75px" }} />
                    <p style={{ paddingLeft: "10px" }}>{imageName}</p>
                </div>
            )}

            <ToggleInput
                label="Is Default?"
                onLabel="True"
                offLabel="False"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
            />

            {
                isDefault && (
                    <div style={{ display: "grid", gap: "20px" }}>
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
                    </div>
                )
            }

        </div>

    );
});

export default Input;
