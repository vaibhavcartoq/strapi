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
} from "@strapi/design-system";
import imageRequest from "../api/image";

const Input = React.forwardRef((props, ref) => {
  const { attribute, disabled, intlLabel, name, onChange, required, value } =
    props; // these are just some of the props passed by the content-manager

  const [models, setModels] = useState([]);
  const [comboboxValue, setComboBoxValue] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [json, setJson] = useState({});

  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    const searchModel = async () => {
      const modelsData = await imageRequest.searchModel();
      console.log("models: " + modelsData[0].model);
      setModels(modelsData);
    };

    searchModel();

    let json = {}

    if (value) { json = JSON.parse(value); setJson(JSON.parse(value)); }
    if (value) setComboBoxValue(json.selectedModel);
    if (value) setSelectedImages(json.carouselImages);

  }, []);

  useEffect(() => {
  
    const fetchImages = async (model) => {
      const imagesData = await imageRequest.getModelImages(model);
      const allParts = imagesData.images_videos.interiors.concat(imagesData.images_videos.exteriors);
      setImages(allParts);
  
      if (!isFirst) {
        setSelectedImages([]);
      }
  
      setIsFirst(false)
    };
  
    if (comboboxValue) {
      fetchImages(comboboxValue.toLowerCase().replaceAll(" ", "-"));
    }
  
    console.log("ISFIRST: " + isFirst);
    console.log("value: " + comboboxValue);
  
  }, [comboboxValue]); // Depend on comboboxValue for changes
  

  const { formatMessage } = useIntl();

  useEffect(() => {
    console.log(selectedImages);
  }, [selectedImages])

  const handleChange = (e) => {
    const targetValue = JSON.stringify({
      selectedModel: comboboxValue,
      carouselImages: e,
    });
    console.log(targetValue);

    onChange({
      target: { name, type: attribute.type, value: targetValue },
    });
  };

  return (
    <Flex direction="column" alignItems="stretch" gap={5}>
      {/* {formatMessage(intlLabel)}
            <input
                ref={ref}
                name={name}
                disabled={disabled}
                value={value}
                required={required}
                onChange={handleChange}
            /> */}

      <Combobox
        placeholder={json ? json.selectedModel : "Select Model"}
        label="Models"
        value={comboboxValue ? comboboxValue : json.selectedModel}
        onChange={setComboBoxValue}
        onClear={() => setComboBoxValue("")}
      >
        {(models !== undefined || null) && models.map((field) => (
          <ComboboxOption key={field.model} value={field.model}>
            {field.model}
          </ComboboxOption>
        ))}
      </Combobox>

      {(
        <MultiSelect
          label="Carousel Images"
          required
          placeholder="Select Images"
          onClear={() => {
            setSelectedImages([]);
          }}
          value={selectedImages}
          onChange={(e) => { setSelectedImages(e); handleChange(e) }}
          withTags
        >
          {images.map((field) => (
            <MultiSelectOption key={field.img} value={field.img}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={field.img} style={{ height: "25px" }} />
                <p style={{ paddingLeft: "10px" }}>{field.name}</p>
              </div>
            </MultiSelectOption>
          ))}
        </MultiSelect>
      )}

      {selectedImages &&
        selectedImages.map((value) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={value} style={{ height: "75px" }} />
            <p style={{ paddingLeft: "10px" }}>{value.substring(0, value.lastIndexOf(".")).replaceAll("https://cartoq.s3.ap-south-1.amazonaws.com/", "").replaceAll("media/Car/","").replaceAll("_", " ").replaceAll("-", " ").replaceAll(`${comboboxValue} Color`, "")}</p>
          </div>
        ))}
    </Flex>
  );
});

export default Input;
