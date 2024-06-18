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
  Flex
} from '@strapi/design-system';
import imageRequest from '../api/image';

const Input = React.forwardRef((props, ref) => {
  const { attribute, disabled, intlLabel, name, onChange, required, value } =
    props; // these are just some of the props passed by the content-manager

  const [models, setModels] = useState([]);
  const [comboboxValue, setComboBoxValue] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [json, setJson] = useState({});
  const [imageName, setImageName] = useState("");


  useEffect(() => {
    const searchModel = async (model) => {
      const modelsData = await imageRequest.searchModel(model);
      console.log("models: " + modelsData.length);
      setModels(modelsData);
    };

    searchModel("");

    let json = {}

    if (value) { json = JSON.parse(value); setJson(JSON.parse(value)); }
    if (value) setSelectedImage(json.image);
    if (value) setImageName(json.image.substring(0, json.image.lastIndexOf(".")).replaceAll("https://cartoq.s3.ap-south-1.amazonaws.com/", "").replaceAll("_"," ").replaceAll("-", " ").replaceAll(`${json.selectedModel} Color`, ""))

    // if (json) {
    //   console.log("valuejson: " + json);
    //   console.log("valuejsonmodel: " + json.selectedModel);
    //   console.log("valuejsonimages: " + json.images);
      // setImages(json.images)
    // }
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

    comboboxValue
      ? fetchImages(comboboxValue.toLowerCase().replaceAll(" ", "-"))
      : "";

    console.log("value: " + comboboxValue);
  }, [comboboxValue]);

  const { formatMessage } = useIntl();

  const handleChange = (e) => {
    const targetValue = JSON.stringify({
      selectedModel: comboboxValue,
      image: e
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
                value={valu
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
        <SingleSelect
          label="Images"
          placeholder="Select Image"
          hint=""
          ref={ref}
          name={name}
          disabled={disabled}
          value={imageName}
          required={required}
          onChange={(e) => { setSelectedImage(e); handleChange(e); setImageName(e.substring(0, e.lastIndexOf(".")).replaceAll("https://cartoq.s3.ap-south-1.amazonaws.com/", "").replaceAll("_"," ").replaceAll("-", " ").replaceAll(`${comboboxValue} Color`, "")) }}
        >
          {images.map((field) => (
            <SingleSelectOption key={field.img} value={field.img}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={field.img} style={{ height: "25px" }} />
                <p style={{ paddingLeft: "10px" }}>{field.name}</p>
              </div>
            </SingleSelectOption>
          ))}
        </SingleSelect>
      )}

      {selectedImage && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={selectedImage} style={{ height: "75px" }} />
          <p style={{ paddingLeft: "10px" }}>{imageName}</p>
        </div>
      )}
    </Flex>
  );
});

export default Input;
