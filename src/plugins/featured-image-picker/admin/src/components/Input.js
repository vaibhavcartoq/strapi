import * as React from "react";

import { useState, useEffect } from "react";
import {
  SingleSelect,
  SingleSelectOption,
  Flex
} from '@strapi/design-system';
import apiRequest from '../api/data';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';

const Input = React.forwardRef((props, ref) => {
  const { attribute, disabled, intlLabel, name, onChange, required, value } =
    props; // these are just some of the props passed by the content-manager


  const [selectedModel, setSelectedModel] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageName, setImageName] = useState("");

  const { modifiedData, onChangeField } = useCMEditViewDataManager();

  useEffect(() => {
    console.log("image url" + value)
    setSelectedImage(value);
    if(selectedModel) setImageName(value.substring(0, value.lastIndexOf(".")).replaceAll("https://cartoq.s3.ap-south-1.amazonaws.com/", "").replaceAll("_", " ").replaceAll("-", " ").replaceAll(`${selectedModel} Color`, ""))
  }, [])

  useEffect(() => {

    if (modifiedData.Model) setSelectedModel(modifiedData.Model)

  }, [modifiedData]);

  useEffect(() => {
    const fetchImages = async (model) => {
      const imagesData = await apiRequest.getModelImages(model);
      setImages(imagesData.color);
    };

    selectedModel
      ? fetchImages(selectedModel.toLowerCase().replaceAll(" ", "-"))
      : "";

    console.log("value: " + selectedModel);
  }, [selectedModel]);

  const handleChange = (targetValue) => {
    onChange({
      target: { name, type: attribute.type, value: targetValue },
    });
  };

  return (
    <Flex direction="column" alignItems="stretch" gap={5}>

      {(
        <SingleSelect
          label="Featured Image"
          placeholder="Select Image"
          hint=""
          ref={ref}
          name={name}
          disabled={disabled}
          value={imageName}
          required={required}
          onChange={(e) => { setSelectedImage(e); handleChange(e); setImageName(e.substring(0, e.lastIndexOf(".")).replaceAll("https://cartoq.s3.ap-south-1.amazonaws.com/", "").replaceAll("_", " ").replaceAll("-", " ").replaceAll(`${selectedModel} Color`, "")) }}
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
